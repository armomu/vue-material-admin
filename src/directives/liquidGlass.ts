// liquidGlassDirective.ts

import type { App, Directive } from 'vue';

// 定义指令值（props）的接口
interface LiquidGlassOptions {
    radius?: number;
    border?: number;
    lightness?: number;
    displace?: number;
    blend?: string;
    xChannel?: 'R' | 'G' | 'B';
    yChannel?: 'R' | 'G' | 'B';
    alpha?: number;
    blur?: number;
    rOffset?: number;
    gOffset?: number;
    bOffset?: number;
    scale?: number;
    frost?: number;
    // 不接受 class 和 containerClass，它们是组件特有的
}

// 默认值
const defaultOptions: LiquidGlassOptions = {
    radius: 8,
    border: 0.07,
    lightness: 50,
    displace: 0.05,
    blend: 'difference',
    xChannel: 'R',
    yChannel: 'B',
    alpha: 0.93,
    blur: 11,
    rOffset: 0,
    gOffset: 10,
    bOffset: 20,
    scale: -180,
    frost: 0.05,
};

// 存储指令相关数据的 WeakMap，以确保指令实例之间的数据隔离和内存管理
const map = new WeakMap<
    HTMLElement,
    {
        observer: ResizeObserver;
        svgId: string;
        svgElement: SVGSVGElement;
        currentOptions: LiquidGlassOptions;
    }
>();

// --- 核心逻辑函数 ---

/**
 * 动态生成 SVG Displacement Map 的 Data URI
 */
function createDisplacementDataUri(
    options: LiquidGlassOptions,
    width: number,
    height: number,
    radius: number
): string {
    const { lightness, alpha, blur, blend } = options;
    const border = Math.min(width, height) * (options.border! * 0.5);

    const displacementImage = `
        <svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="red" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="#0000"/>
          <stop offset="100%" stop-color="red"/>
        </linearGradient>
        <linearGradient id="blue" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#0000"/>
          <stop offset="100%" stop-color="blue"/>
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="${width}" height="${height}" fill="black"></rect>
      <rect x="0" y="0" width="${width}" height="${height}" rx="${radius}" fill="url(#red)" />
      <rect x="0" y="0" width="${width}" height="${height}" rx="${radius}" fill="url(#blue)" style="mix-blend-mode: ${blend}" />
      <rect 
        x="${border}" 
        y="${border}" 
        width="${width - border * 2}" 
        height="${height - border * 2}" 
        rx="${radius}" 
        fill="hsl(0 0% ${lightness}% / ${alpha})" 
        style="filter:blur(${blur}px)" 
      />
    </svg>
    `;
    const encoded = encodeURIComponent(displacementImage);
    return `data:image/svg+xml,${encoded}`;
}

/**
 * 创建并返回完整的 SVG 滤镜元素
 */
function createSvgFilter(
    options: LiquidGlassOptions,
    svgId: string,
    displacementDataUri: string
): SVGSVGElement {
    const { xChannel, yChannel, scale, rOffset, gOffset, bOffset, displace } = options as any;

    // 使用 DOM API 创建 SVG 元素
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg') as SVGSVGElement;
    svg.classList.add('filter'); // 添加一个类名用于识别和隐藏

    // 构造 SVG 内部内容
    svg.innerHTML = `
        <defs>
                <filter id="${svgId}" color-interpolation-filters="sRGB">
                    <feImage
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        href="${displacementDataUri}"
                        result="map"
                    />
                    <feDisplacementMap
                        id="redchannel"
                        in="SourceGraphic"
                        in2="map"
                        xChannelSelector="${xChannel}"
                        yChannelSelector="${yChannel}"
                        scale="${scale + rOffset}"
                        result="dispRed"
                    />
                    <feColorMatrix
                        in="dispRed"
                        type="matrix"
                        values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
                        result="red"
                    />
                    <feDisplacementMap
                        id="greenchannel"
                        in="SourceGraphic"
                        in2="map"
                        xChannelSelector="${xChannel}"
                        yChannelSelector="${yChannel}"
                        scale="${scale + gOffset}"
                        result="dispGreen"
                    />
                    <feColorMatrix
                        in="dispGreen"
                        type="matrix"
                        values="0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0"
                        result="green"
                    />
                    <feDisplacementMap
                        id="bluechannel"
                        in="SourceGraphic"
                        in2="map"
                        xChannelSelector="${xChannel}"
                        yChannelSelector="${yChannel}"
                        scale="${scale + bOffset}"
                        result="dispBlue"
                    />
                    <feColorMatrix
                        in="dispBlue"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0"
                        result="blue"
                    />
                    <feBlend in="red" in2="green" mode="screen" result="rg" />
                    <feBlend in="rg" in2="blue" mode="screen" result="output" />
                    <feGaussianBlur stdDeviation="${displace}" />
                </filter>
            </defs>
    `;
    return svg;
}

/**
 * 更新元素的样式和 SVG 滤镜（主要在 ResizeObserver 回调中调用）
 */
function updateElement(
    el: HTMLElement,
    binding: { value: LiquidGlassOptions },
    dimensions: { width: number; height: number }
) {
    const { svgId, svgElement, currentOptions } = map.get(el)!;

    // 合并新的 options
    const newOptions: LiquidGlassOptions = { ...defaultOptions, ...binding.value };

    // 如果尺寸或关键选项发生变化，则重新生成和插入 SVG
    if (
        dimensions.width !== el.clientWidth ||
        dimensions.height !== el.clientHeight ||
        JSON.stringify(newOptions) !== JSON.stringify(currentOptions)
    ) {
        // 1. 计算新的 Data URI
        const newDisplacementDataUri = createDisplacementDataUri(
            newOptions,
            dimensions.width,
            dimensions.height,
            newOptions.radius!
        );

        // 2. 重新创建 SVG 滤镜
        const newSvgElement = createSvgFilter(newOptions, svgId, newDisplacementDataUri);

        // 3. 替换旧的 SVG 元素
        svgElement.replaceWith(newSvgElement);
        map.get(el)!.svgElement = newSvgElement; // 更新引用
        map.get(el)!.currentOptions = newOptions; // 更新当前选项

        // 4. 应用 CSS 样式
        el.style.setProperty('--frost', newOptions.frost?.toString() || '0.05');
        el.style.borderRadius = `${newOptions.radius}px`;
        el.style.backdropFilter = `url(#${svgId})`;
    }
}

/**
 * 指令对象
 */
export const liquidGlassDirective: Directive<HTMLElement, LiquidGlassOptions> = {
    // 指令绑定到元素时调用
    mounted(el, binding) {
        // 确保元素具有定位上下文，以便 backdrop-filter 正确工作
        if (getComputedStyle(el).position === 'static') {
            el.style.position = 'relative';
        }

        // 初始设置
        const svgId = crypto.randomUUID();
        const initialOptions = { ...defaultOptions, ...binding.value };
        console.log('====================initialOptions====================');
        console.log(initialOptions);
        const initialWidth = el.clientWidth;
        const initialHeight = el.clientHeight;
        console.log(el.style.padding);
        // 初始 Data URI 和 SVG
        const initialDisplacementDataUri = createDisplacementDataUri(
            initialOptions,
            initialWidth,
            initialHeight,
            initialOptions.radius!
        );
        const svgElement = createSvgFilter(initialOptions, svgId, initialDisplacementDataUri);
        el.appendChild(svgElement);
        el.classList.add('liquid_glass');
        // 初始应用样式
        el.style.setProperty('--frost', initialOptions.frost?.toString() || '0.05');
        el.style.borderRadius = `${initialOptions.radius}px`;
        el.style.backdropFilter = `url(#${svgId})`;

        // 尺寸变化观测器
        const dimensions = { width: initialWidth, height: initialHeight };
        const observer = new ResizeObserver((entries) => {
            const entry = entries[0];
            if (!entry) return;

            const width = entry.contentRect.width;
            const height = entry.contentRect.height;

            // 确保尺寸有变化
            if (dimensions.width !== width || dimensions.height !== height) {
                dimensions.width = width;
                dimensions.height = height;
                updateElement(el, binding, dimensions);
            }
        });

        observer.observe(el);

        // 存储实例数据
        map.set(el, { observer, svgId, svgElement, currentOptions: initialOptions });

        // 首次渲染后立即更新一次，以确保使用最新的尺寸
        updateElement(el, binding, dimensions);
    },

    // 指令的参数发生变化时调用
    updated(el, binding) {
        const instanceData = map.get(el);
        if (!instanceData) return;

        const { width, height } = el.getBoundingClientRect();
        const dimensions = { width, height };

        // 仅在 value (props) 发生变化时才更新
        if (binding.value !== binding.oldValue) {
            updateElement(el, binding, dimensions);
        }
    },

    // 指令解除绑定时调用
    unmounted(el) {
        const instanceData = map.get(el);
        if (!instanceData) return;

        // 1. 停止观察
        instanceData.observer.disconnect();

        // 2. 移除 SVG 元素
        instanceData.svgElement.remove();

        // 3. 移除样式
        el.style.removeProperty('--frost');
        el.style.removeProperty('border-radius');
        el.style.removeProperty('backdrop-filter');
        el.style.removeProperty('-webkit-backdrop-filter');
        if (getComputedStyle(el).position === 'relative') {
            el.style.position = ''; // 恢复 position
        }

        // 4. 清理 WeakMap
        map.delete(el);
    },
};
// 导出插件形式便于全局注册
export function setupLiquidGlassDirective(app: App) {
    app.directive('liquidGlass', liquidGlassDirective);
}
