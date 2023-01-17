<template>
    <div id="canvas_wrap">
        想把 cznull.github.io 的毒蘑菇放进来，但是尝试了好久都不行
        <!-- <canvas id="canvas" width="1024" height="800">
            <span>目前不支持canvas浏览器</span>
        </canvas>
        <button id="btn">配置</button>
        <div id="config">
            <textarea name="" id="kernel" cols="30" rows="10"></textarea>
            <br />
            <button id="apply">应用</button>
            <button id="cancel">取消</button>
        </div> -->
    </div>
</template>
<script setup lang="ts">
// return;
// var cx, cy;
// var glposition;
// var glright;
// var glforward;
// var glup;
// var glorigin;
// var glx;
// var gly;
// var gllen;
// var canvas;
// var gl;
// var date = new Date();
// var md = 0;
// var mx;
// var my;
// var t2;
// var t1 = date.getTime();
// var mx = 0;
// var my = 0;
// var mx1 = 0;
// var my1 = 0;
// var lasttimen = 0;
// var ml = 0;
// var mr = 0;
// var mm = 0;
// var len = 1.6;
// var ang1 = 2.8;
// var ang2 = 0.4;
// var cenx = 0.0;
// var ceny = 0.0;
// var cenz = 0.0;
// var KERNEL =
//     'float kernal(vec3 ver){\n' +
//     '   vec3 a;\n' +
//     'float b,c,d,e;\n' +
//     '   a=ver;\n' +
//     '   for(int i=0;i<5;i++){\n' +
//     '       b=length(a);\n' +
//     '       c=atan(a.y,a.x)*8.0;\n' +
//     '       e=1.0/b;\n' +
//     '       d=acos(a.z/b)*8.0;\n' +
//     '       b=pow(b,8.0);\n' +
//     '       a=vec3(b*sin(d)*cos(c),b*sin(d)*sin(c),b*cos(d))+ver;\n' +
//     '       if(b>6.0){\n' +
//     '           break;\n' +
//     '       }\n' +
//     '   }' +
//     '   return 4.0-a.x*a.x-a.y*a.y-a.z*a.z;' +
//     '}';
// var vertshade;
// var fragshader;
// var shaderProgram;
// function ontimer() {
//     ang1 += 0.01;
//     draw();
//     window.requestAnimationFrame(ontimer);
// }
// document.addEventListener(
//     'mousedown',
//     function (ev) {
//         var oEvent = ev || event;
//         if (oEvent.button == 0) {
//             ml = 1;
//             mm = 0;
//         }
//         if (oEvent.button == 2) {
//             mr = 1;
//             mm = 0;
//         }
//         mx = oEvent.clientX;
//         my = oEvent.clientY;
//     },
//     false
// );
// document.addEventListener(
//     'mouseup',
//     function (ev) {
//         var oEvent = ev || event;
//         if (oEvent.button == 0) {
//             ml = 0;
//         }
//         if (oEvent.button == 2) {
//             mr = 0;
//         }
//     },
//     false
// );
// document.addEventListener(
//     'mousemove',
//     function (ev) {
//         var oEvent = ev || event;
//         if (ml == 1) {
//             ang1 += (oEvent.clientX - mx) * 0.002;
//             ang2 += (oEvent.clientY - my) * 0.002;
//             if (oEvent.clientX != mx || oEvent.clientY != my) {
//                 mm = 1;
//             }
//         }
//         if (mr == 1) {
//             var l = (len * 4.0) / (cx + cy);
//             cenx +=
//                 l *
//                 (-(oEvent.clientX - mx) * Math.sin(ang1) -
//                     (oEvent.clientY - my) * Math.sin(ang2) * Math.cos(ang1));
//             ceny += l * ((oEvent.clientY - my) * Math.cos(ang2));
//             cenz +=
//                 l *
//                 ((oEvent.clientX - mx) * Math.cos(ang1) -
//                     (oEvent.clientY - my) * Math.sin(ang2) * Math.sin(ang1));
//             if (oEvent.clientX != mx || oEvent.clientY != my) {
//                 mm = 1;
//             }
//         }
//         mx = oEvent.clientX;
//         my = oEvent.clientY;
//     },
//     false
// );
// document.addEventListener(
//     'mousewheel',
//     function (ev) {
//         ev.preventDefault();
//         var oEvent = ev || event;
//         len *= Math.exp(-0.001 * oEvent.wheelDelta);
//     },
//     false
// );
// document.addEventListener(
//     'touchstart',
//     function (ev) {
//         var n = ev.touches.length;
//         if (n == 1) {
//             var oEvent = ev.touches[0];
//             mx = oEvent.clientX;
//             my = oEvent.clientY;
//         } else if (n == 2) {
//             var oEvent = ev.touches[0];
//             mx = oEvent.clientX;
//             my = oEvent.clientY;
//             oEvent = ev.touches[1];
//             mx1 = oEvent.clientX;
//             my1 = oEvent.clientY;
//         }
//         lasttimen = n;
//     },
//     false
// );
// document.addEventListener(
//     'touchend',
//     function (ev) {
//         var n = ev.touches.length;
//         if (n == 1) {
//             var oEvent = ev.touches[0];
//             mx = oEvent.clientX;
//             my = oEvent.clientY;
//         } else if (n == 2) {
//             var oEvent = ev.touches[0];
//             mx = oEvent.clientX;
//             my = oEvent.clientY;
//             oEvent = ev.touches[1];
//             mx1 = oEvent.clientX;
//             my1 = oEvent.clientY;
//         }
//         lasttimen = n;
//     },
//     false
// );
// document.addEventListener(
//     'touchmove',
//     function (ev) {
//         ev.preventDefault();
//         var n = ev.touches.length;
//         if (n == 1 && lasttimen == 1) {
//             var oEvent = ev.touches[0];
//             ang1 += (oEvent.clientX - mx) * 0.002;
//             ang2 += (oEvent.clientY - my) * 0.002;
//             mx = oEvent.clientX;
//             my = oEvent.clientY;
//         } else if (n == 2) {
//             var oEvent = ev.touches[0];
//             var oEvent1 = ev.touches[1];
//             var l = (len * 2.0) / (cx + cy);
//             var l1;
//             cenx +=
//                 l *
//                 (-(oEvent.clientX + oEvent1.clientX - mx - mx1) * Math.sin(ang1) -
//                     (oEvent.clientY + oEvent1.clientY - my - my1) *
//                         Math.sin(ang2) *
//                         Math.cos(ang1));
//             ceny += l * ((oEvent.clientY + oEvent1.clientY - my - my1) * Math.cos(ang2));
//             cenz +=
//                 l *
//                 ((oEvent.clientX + oEvent1.clientX - mx - mx1) * Math.cos(ang1) -
//                     (oEvent.clientY + oEvent1.clientY - my - my1) *
//                         Math.sin(ang2) *
//                         Math.sin(ang1));
//             l1 = Math.sqrt((mx - mx1) * (mx - mx1) + (my - my1) * (my - my1) + 1.0);
//             mx = oEvent.clientX;
//             my = oEvent.clientY;
//             mx1 = oEvent1.clientX;
//             my1 = oEvent1.clientY;
//             l = Math.sqrt((mx - mx1) * (mx - mx1) + (my - my1) * (my - my1) + 1.0);
//             len *= l1 / l;
//         }
//         lasttimen = n;
//     },
//     false
// );
// document.oncontextmenu = function (event) {
//     if (mm == 1) {
//         event.preventDefault();
//     }
// };
// function draw() {
//     date = new Date();
//     var t2 = date.getTime();
//     // ang1 += (t2 - t1)*0.001;
//     t1 = t2;
//     // ang1 += 0.1;
//     gl.uniform1f(glx, (cx * 2.0) / (cx + cy));
//     gl.uniform1f(gly, (cy * 2.0) / (cx + cy));
//     gl.uniform1f(gllen, len);
//     gl.uniform3f(
//         glorigin,
//         len * Math.cos(ang1) * Math.cos(ang2) + cenx,
//         len * Math.sin(ang2) + ceny,
//         len * Math.sin(ang1) * Math.cos(ang2) + cenz
//     );
//     gl.uniform3f(glright, Math.sin(ang1), 0, -Math.cos(ang1));
//     gl.uniform3f(
//         glup,
//         -Math.sin(ang2) * Math.cos(ang1),
//         Math.cos(ang2),
//         -Math.sin(ang2) * Math.sin(ang1)
//     );
//     gl.uniform3f(
//         glforward,
//         -Math.cos(ang1) * Math.cos(ang2),
//         -Math.sin(ang2),
//         -Math.sin(ang1) * Math.cos(ang2)
//     );
//     gl.drawArrays(gl.TRIANGLES, 0, 6);
//     gl.finish();
// }
// window.onresize = function () {
//     cx = document.body.clientWidth;
//     cy = document.body.clientHeight;
//     if (cx > cy) {
//         cx = cy;
//     } else {
//         cy = cx;
//     }
//     document.getElementById('canvas_wrap').style.width = 1024 + 'px';
//     document.getElementById('canvas_wrap').style.height = 800 + 'px';
//     document.getElementById('canvas_wrap').style.transform =
//         'scale(' + cx / 1024 + ',' + cy / 800 + ')';
// };
// window.onload = function () {
//     cx = document.body.clientWidth;
//     cy = document.body.clientHeight;
//     if (cx > cy) {
//         cx = cy;
//     } else {
//         cy = cx;
//     }
//     document.getElementById('canvas_wrap').style.width = 1024 + 'px';
//     document.getElementById('canvas_wrap').style.height = 800 + 'px';
//     document.getElementById('canvas_wrap').style.transform =
//         'scale(' + cx / 1024 + ',' + cy / 800 + ')';
//     var positions = [
//         -1.0, -1.0, 0.0, 1.0, -1.0, 0.0, 1.0, 1.0, 0.0, -1.0, -1.0, 0.0, 1.0, 1.0, 0.0, -1.0, 1.0,
//         0.0,
//     ];
//     var VSHADER_SOURCE =
//         '#version 100 \n' +
//         'precision highp float;\n' +
//         'attribute vec4 position;' +
//         'varying vec3 dir, localdir;' +
//         'uniform vec3 right, forward, up, origin;' +
//         'uniform float x,y;' +
//         'void main() {' +
//         '   gl_Position = position; ' +
//         '   dir = forward + right * position.x*x + up * position.y*y;' +
//         '   localdir.x = position.x*x;' +
//         '   localdir.y = position.y*y;' +
//         '   localdir.z = -1.0;' +
//         '} ';
//     var FSHADER_SOURCE =
//         '#version 100 \n' +
//         '#define PI 3.14159265358979324\n' +
//         '#define M_L 0.3819660113\n' +
//         '#define M_R 0.6180339887\n' +
//         '#define MAXR 8\n' +
//         '#define SOLVER 8\n' +
//         'precision highp float;\n' +
//         'float kernal(vec3 ver)\n;' +
//         'uniform vec3 right, forward, up, origin;\n' +
//         'varying vec3 dir, localdir;\n' +
//         'uniform float len;\n' +
//         'vec3 ver;\n' +
//         'int sign;' +
//         'float v, v1, v2;\n' +
//         'float r1, r2, r3, r4, m1, m2, m3, m4;\n' +
//         'vec3 n, reflect;\n' +
//         'const float step = 0.002;\n' +
//         'vec3 color;\n' +
//         'void main() {\n' +
//         '   color.r=0.0;\n' +
//         '   color.g=0.0;\n' +
//         '   color.b=0.0;\n' +
//         '   sign=0;' +
//         '   v1 = kernal(origin + dir * (step*len));\n' +
//         '   v2 = kernal(origin);\n' +
//         '   for (int k = 2; k < 1002; k++) {\n' +
//         '      ver = origin + dir * (step*len*float(k));\n' +
//         '      v = kernal(ver);\n' +
//         '      if (v > 0.0 && v1 < 0.0) {\n' +
//         '         r1 = step * len*float(k - 1);\n' +
//         '         r2 = step * len*float(k);\n' +
//         '         m1 = kernal(origin + dir * r1);\n' +
//         '         m2 = kernal(origin + dir * r2);\n' +
//         '         for (int l = 0; l < SOLVER; l++) {\n' +
//         '            r3 = r1 * 0.5 + r2 * 0.5;\n' +
//         '            m3 = kernal(origin + dir * r3);\n' +
//         '            if (m3 > 0.0) {\n' +
//         '               r2 = r3;\n' +
//         '               m2 = m3;\n' +
//         '            }\n' +
//         '            else {\n' +
//         '               r1 = r3;\n' +
//         '               m1 = m3;\n' +
//         '            }\n' +
//         '         }\n' +
//         '         if (r3 < 2.0 * len) {\n' +
//         '               sign=1;' +
//         '            break;\n' +
//         '         }\n' +
//         '      }\n' +
//         '      if (v < v1&&v1>v2&&v1 < 0.0 && (v1*2.0 > v || v1 * 2.0 > v2)) {\n' +
//         '         r1 = step * len*float(k - 2);\n' +
//         '         r2 = step * len*(float(k) - 2.0 + 2.0*M_L);\n' +
//         '         r3 = step * len*(float(k) - 2.0 + 2.0*M_R);\n' +
//         '         r4 = step * len*float(k);\n' +
//         '         m2 = kernal(origin + dir * r2);\n' +
//         '         m3 = kernal(origin + dir * r3);\n' +
//         '         for (int l = 0; l < MAXR; l++) {\n' +
//         '            if (m2 > m3) {\n' +
//         '               r4 = r3;\n' +
//         '               r3 = r2;\n' +
//         '               r2 = r4 * M_L + r1 * M_R;\n' +
//         '               m3 = m2;\n' +
//         '               m2 = kernal(origin + dir * r2);\n' +
//         '            }\n' +
//         '            else {\n' +
//         '               r1 = r2;\n' +
//         '               r2 = r3;\n' +
//         '               r3 = r4 * M_R + r1 * M_L;\n' +
//         '               m2 = m3;\n' +
//         '               m3 = kernal(origin + dir * r3);\n' +
//         '            }\n' +
//         '         }\n' +
//         '         if (m2 > 0.0) {\n' +
//         '            r1 = step * len*float(k - 2);\n' +
//         '            r2 = r2;\n' +
//         '            m1 = kernal(origin + dir * r1);\n' +
//         '            m2 = kernal(origin + dir * r2);\n' +
//         '            for (int l = 0; l < SOLVER; l++) {\n' +
//         '               r3 = r1 * 0.5 + r2 * 0.5;\n' +
//         '               m3 = kernal(origin + dir * r3);\n' +
//         '               if (m3 > 0.0) {\n' +
//         '                  r2 = r3;\n' +
//         '                  m2 = m3;\n' +
//         '               }\n' +
//         '               else {\n' +
//         '                  r1 = r3;\n' +
//         '                  m1 = m3;\n' +
//         '               }\n' +
//         '            }\n' +
//         '            if (r3 < 2.0 * len&&r3> step*len) {\n' +
//         '                   sign=1;' +
//         '               break;\n' +
//         '            }\n' +
//         '         }\n' +
//         '         else if (m3 > 0.0) {\n' +
//         '            r1 = step * len*float(k - 2);\n' +
//         '            r2 = r3;\n' +
//         '            m1 = kernal(origin + dir * r1);\n' +
//         '            m2 = kernal(origin + dir * r2);\n' +
//         '            for (int l = 0; l < SOLVER; l++) {\n' +
//         '               r3 = r1 * 0.5 + r2 * 0.5;\n' +
//         '               m3 = kernal(origin + dir * r3);\n' +
//         '               if (m3 > 0.0) {\n' +
//         '                  r2 = r3;\n' +
//         '                  m2 = m3;\n' +
//         '               }\n' +
//         '               else {\n' +
//         '                  r1 = r3;\n' +
//         '                  m1 = m3;\n' +
//         '               }\n' +
//         '            }\n' +
//         '            if (r3 < 2.0 * len&&r3> step*len) {\n' +
//         '                   sign=1;' +
//         '               break;\n' +
//         '            }\n' +
//         '         }\n' +
//         '      }\n' +
//         '      v2 = v1;\n' +
//         '      v1 = v;\n' +
//         '   }\n' +
//         '   if (sign==1) {\n' +
//         '      ver = origin + dir*r3 ;\n' +
//         '       r1=ver.x*ver.x+ver.y*ver.y+ver.z*ver.z;' +
//         '      n.x = kernal(ver - right * (r3*0.00025)) - kernal(ver + right * (r3*0.00025));\n' +
//         '      n.y = kernal(ver - up * (r3*0.00025)) - kernal(ver + up * (r3*0.00025));\n' +
//         '      n.z = kernal(ver + forward * (r3*0.00025)) - kernal(ver - forward * (r3*0.00025));\n' +
//         '      r3 = n.x*n.x+n.y*n.y+n.z*n.z;\n' +
//         '      n = n * (1.0 / sqrt(r3));\n' +
//         '      ver = localdir;\n' +
//         '      r3 = ver.x*ver.x+ver.y*ver.y+ver.z*ver.z;\n' +
//         '      ver = ver * (1.0 / sqrt(r3));\n' +
//         '      reflect = n * (-2.0*dot(ver, n)) + ver;\n' +
//         '      r3 = reflect.x*0.276+reflect.y*0.920+reflect.z*0.276;\n' +
//         '      r4 = n.x*0.276+n.y*0.920+n.z*0.276;\n' +
//         '      r3 = max(0.0,r3);\n' +
//         '      r3 = r3 * r3*r3*r3;\n' +
//         '      r3 = r3 * 0.45 + r4 * 0.25 + 0.3;\n' +
//         '      n.x = sin(r1*10.0)*0.5+0.5;\n' +
//         '      n.y = sin(r1*10.0+2.05)*0.5+0.5;\n' +
//         '      n.z = sin(r1*10.0-2.05)*0.5+0.5;\n' +
//         '      color = n*r3;\n' +
//         '   }\n' +
//         '   gl_FragColor = vec4(color.x, color.y, color.z, 1.0);' +
//         '}';
//     canvas = document.getElementById('canvas');
//     gl = canvas.getContext('webgl');
//     vertshader = gl.createShader(gl.VERTEX_SHADER);
//     fragshader = gl.createShader(gl.FRAGMENT_SHADER);
//     shaderProgram = gl.createProgram();
//     gl.shaderSource(vertshader, VSHADER_SOURCE);
//     gl.compileShader(vertshader);
//     var infov = gl.getShaderInfoLog(vertshader);
//     gl.shaderSource(fragshader, FSHADER_SOURCE + KERNEL);
//     gl.compileShader(fragshader);
//     var infof = gl.getShaderInfoLog(fragshader);
//     gl.attachShader(shaderProgram, vertshader);
//     gl.attachShader(shaderProgram, fragshader);
//     gl.linkProgram(shaderProgram);
//     gl.useProgram(shaderProgram);
//     if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
//         var info = gl.getProgramInfoLog(shaderProgram);
//         throw 'Could not compile WebGL program. \n\n' + infov + infof + info;
//     }
//     glposition = gl.getAttribLocation(shaderProgram, 'position');
//     glright = gl.getUniformLocation(shaderProgram, 'right');
//     glforward = gl.getUniformLocation(shaderProgram, 'forward');
//     glup = gl.getUniformLocation(shaderProgram, 'up');
//     glorigin = gl.getUniformLocation(shaderProgram, 'origin');
//     glx = gl.getUniformLocation(shaderProgram, 'x');
//     gly = gl.getUniformLocation(shaderProgram, 'y');
//     gllen = gl.getUniformLocation(shaderProgram, 'len');
//     var buffer = gl.createBuffer();
//     gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
//     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
//     gl.vertexAttribPointer(glposition, 3, gl.FLOAT, false, 0, 0);
//     gl.enableVertexAttribArray(glposition);

//     gl.viewport(0, 0, 1024, 800);
//     draw();
//     window.requestAnimationFrame(ontimer);
//     document.getElementById('kernel').value = KERNEL;
//     document.getElementById('btn').addEventListener('click', function () {
//         var state = this.innerText == '配置';
//         this.innerText = state ? '隐藏' : '配置';
//         document.getElementById('config').style.display = state ? 'inline' : 'none';
//     });
//     document.getElementById('apply').addEventListener('click', function () {
//         KERNEL = document.getElementById('kernel').value;
//         gl.shaderSource(fragshader, FSHADER_SOURCE + KERNEL);
//         gl.compileShader(fragshader);
//         var infof = gl.getShaderInfoLog(fragshader);
//         gl.linkProgram(shaderProgram);
//         gl.useProgram(shaderProgram);
//         if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
//             var info = gl.getProgramInfoLog(shaderProgram);
//             alert(infof + info);
//         }
//         glposition = gl.getAttribLocation(shaderProgram, 'position');
//         glright = gl.getUniformLocation(shaderProgram, 'right');
//         glforward = gl.getUniformLocation(shaderProgram, 'forward');
//         glup = gl.getUniformLocation(shaderProgram, 'up');
//         glorigin = gl.getUniformLocation(shaderProgram, 'origin');
//         glx = gl.getUniformLocation(shaderProgram, 'x');
//         gly = gl.getUniformLocation(shaderProgram, 'y');
//         gllen = gl.getUniformLocation(shaderProgram, 'len');
//     });
//     document.getElementById('cancel').addEventListener('click', function () {
//         document.getElementById('kernel').value = KERNEL;
//     });
// };
</script>
<style scoped lang="scss">
#canvas_wrap {
    transform-origin: 0px 0px;
    // position: fixed;
    // left: 0px;
    // top: 0px;

    #canvas {
        background: #fbf7fe;
    }

    #btn {
        position: fixed;
        left: 0px;
        top: 0px;
    }

    #canvas {
        position: fixed;
        left: 0px;
        top: 0px;
    }
    #config {
        position: fixed;
        left: 0px;
        top: 30px;
        display: none;
    }
}
</style>
