<template>
    <div class="silk-container">
        <canvas ref="canvasRef" class="silk-canvas"></canvas>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Renderer, Camera, Transform, Geometry, Program, Mesh, Vec2, Vec4 } from 'ogl';

// 顶点着色器
const vertex = `
attribute vec2 position;

void main() {
    gl_Position = vec4(position, 0.0, 1.0);
}
`;

// 片段着色器（修改自原 Shadertoy 代码）
const fragment = `
precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform vec4 uMouse;

#define INVERT 1

float noise(vec2 p) {
    return smoothstep(-0.5, 0.9, sin((p.x - p.y) * 555.0) * sin(p.y * 1444.0)) - 0.4;
}

float fabric(vec2 p) {
    const mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
    float f = 0.4 * noise(p);
    f += 0.3 * noise(p = m * p);
    f += 0.2 * noise(p = m * p);
    return f + 0.1 * noise(m * p);
}

float silk(vec2 uv, float t) {
    float s = sin(5.0 * (uv.x + uv.y + cos(2.0 * uv.x + 5.0 * uv.y)) + sin(12.0 * (uv.x + uv.y)) - t);
    s = 0.7 + 0.3 * (s * s * 0.5 + s);
    s *= 0.9 + 0.6 * fabric(uv * min(uResolution.x, uResolution.y) * 0.0006);
    return s * 0.9 + 0.1;
}

float silkd(vec2 uv, float t) {
    float xy = uv.x + uv.y;
    float d = (5.0 * (1.0 - 2.0 * sin(2.0 * uv.x + 5.0 * uv.y)) + 12.0 * cos(12.0 * xy)) * cos(5.0 * (cos(2.0 * uv.x + 5.0 * uv.y) + xy) + sin(12.0 * xy) - t);
    return 0.005 * d * (sign(d) + 3.0);
}

void main() {
    vec2 fragCoord = gl_FragCoord.xy;
    float mr = min(uResolution.x, uResolution.y);
    vec2 uv = fragCoord / mr;
    
    float t = uTime;
    uv.y += 0.03 * sin(8.0 * uv.x - t);
    
    if (uMouse.z > 1.0) {
        uv += smoothstep(0.5, 0.0, distance(uMouse.xy / mr, uv)) * 0.08;
    }

    float s = sqrt(silk(uv, t));
    float d = silkd(uv, t);
	
    vec3 c = vec3(s);
    c += 0.7 * vec3(1.0, 0.83, 0.6) * d;
    c *= 1.0 - max(0.0, 0.8 * d);
#if INVERT
    c = pow(c, 0.3 / vec3(0.52, 0.5, 0.4));
    c = 1.0 - c;
#else
    c = pow(c, vec3(0.52, 0.5, 0.4));
#endif

    gl_FragColor = vec4(c, 1.0);
}
`;

const canvasRef = ref<HTMLCanvasElement | null>(null);
let renderer: Renderer;
let camera: Camera;
let mesh: Mesh;
let program: Program;
let time = 0;
const mouse = new Vec4(0, 0, 0, 0);
let animationFrameId: number;

// 处理窗口大小变化
const resize = () => {
    if (!canvasRef.value) return;

    const { width, height } = canvasRef.value.getBoundingClientRect();
    renderer.setSize(width, height);
    camera.perspective({ aspect: width / height });
    program.uniforms.uResolution.value.set(width, height);
};

// 动画循环
const animate = (t: number) => {
    time = t * 0.001; // 转换为秒
    program.uniforms.uTime.value = time;
    program.uniforms.uMouse.value = mouse;

    renderer.render({ scene: mesh, camera });
    animationFrameId = requestAnimationFrame(animate);
};

// 鼠标移动事件处理
const handleMouseMove = (e: MouseEvent) => {
    if (!canvasRef.value) return;

    const rect = canvasRef.value.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = rect.height - (e.clientY - rect.top); // 翻转 Y 轴
};

// 鼠标按下事件处理
const handleMouseDown = () => {
    mouse.z = 1;
};

// 鼠标释放事件处理
const handleMouseUp = () => {
    mouse.z = 0;
};

onMounted(() => {
    if (!canvasRef.value) return;

    // 初始化 OGL
    renderer = new Renderer({
        canvas: canvasRef.value,
        dpr: Math.min(window.devicePixelRatio, 2),
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 1);

    // 创建相机
    camera = new Camera();
    camera.position.z = 1;

    // 创建全屏四边形几何体
    const geometry = new Geometry(gl, {
        position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) },
    });

    // 创建着色器程序
    program = new Program(gl, {
        vertex,
        fragment,
        uniforms: {
            uResolution: { value: new Vec2() },
            uTime: { value: 0 },
            uMouse: { value: mouse },
        },
    });

    // 创建网格
    mesh = new Mesh(gl, { geometry, program });

    // 初始化大小
    resize();

    // 添加事件监听器
    window.addEventListener('resize', resize);
    canvasRef.value.addEventListener('mousemove', handleMouseMove);
    canvasRef.value.addEventListener('mousedown', handleMouseDown);
    canvasRef.value.addEventListener('mouseup', handleMouseUp);

    // 开始动画
    animationFrameId = requestAnimationFrame(animate);
});

onUnmounted(() => {
    // 清理动画循环
    cancelAnimationFrame(animationFrameId);

    // 移除事件监听器
    window.removeEventListener('resize', resize);
    if (canvasRef.value) {
        canvasRef.value.removeEventListener('mousemove', handleMouseMove);
        canvasRef.value.removeEventListener('mousedown', handleMouseDown);
        canvasRef.value.removeEventListener('mouseup', handleMouseUp);
    }
});
</script>

<style>
.silk-canvas {
    display: block;
    width: 100% !important;
    height: 100% !important;
}
</style>
