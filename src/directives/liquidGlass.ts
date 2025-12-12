import type { App, DirectiveBinding } from 'vue';

export const liquidGlass = {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
        const props = {
            radius: 16,
            border: 0.07,
            lightness: 50,
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
            ...binding.value, // allow overrides
        };

        const svgId = crypto.randomUUID();
        const filterId = `liquid-glass-${svgId}`;

        // Create <svg> filter element
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.classList.add('liquid-glass-filter');
        svg.setAttribute('style', 'position:absolute;width:0;height:0;');
        svg.innerHTML = `
            <defs>
                <filter id="${filterId}" color-interpolation-filters="sRGB">
                    <feImage x="0" y="0" width="100%" height="100%" href="" result="map"/>
                    <feDisplacementMap in="SourceGraphic" in2="map"
                        xChannelSelector="${props.xChannel}"
                        yChannelSelector="${props.yChannel}"
                        scale="${props.scale + props.rOffset}"
                        result="dispRed"/>
                    <feColorMatrix in="dispRed" type="matrix"
                        values="1 0 0 0 0 
                                0 0 0 0 0 
                                0 0 0 0 0 
                                0 0 0 1 0"
                        result="red"/>
                    <feDisplacementMap in="SourceGraphic" in2="map"
                        xChannelSelector="${props.xChannel}"
                        yChannelSelector="${props.yChannel}"
                        scale="${props.scale + props.gOffset}"
                        result="dispGreen"/>
                    <feColorMatrix in="dispGreen" type="matrix"
                        values="0 0 0 0 0 
                                0 1 0 0 0 
                                0 0 0 0 0 
                                0 0 0 1 0"
                        result="green"/>
                    <feDisplacementMap in="SourceGraphic" in2="map"
                        xChannelSelector="${props.xChannel}"
                        yChannelSelector="${props.yChannel}"
                        scale="${props.scale + props.bOffset}"
                        result="dispBlue"/>
                    <feColorMatrix in="dispBlue" type="matrix"
                        values="0 0 0 0 0 
                                0 0 0 0 0 
                                0 0 1 0 0 
                                0 0 0 1 0"
                        result="blue"/>
                    <feBlend in="red" in2="green" mode="screen" result="rg"/>
                    <feBlend in="rg" in2="blue" mode="screen" result="output"/>
                    <feGaussianBlur stdDeviation="${props.blur}"/>
                </filter>
            </defs>
        `;

        el.appendChild(svg);

        // apply
        el.style.borderRadius = props.radius + 'px';
        el.style.backdropFilter = `url(#${filterId})`;
        el.style.setProperty('--frost', props.frost.toString());

        const feImage = svg.querySelector('feImage')!;
        const ro = new ResizeObserver(() => {
            const { width, height } = el.getBoundingClientRect();

            const border = Math.min(width, height) * (props.border * 0.5);

            const displacementSvg = `
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
                    <rect width="${width}" height="${height}" fill="black"/>
                    <rect width="${width}" height="${height}" rx="${props.radius}" fill="url(#red)"/>
                    <rect width="${width}" height="${height}" rx="${props.radius}"
                        fill="url(#blue)" style="mix-blend-mode:${props.blend}"/>
                    <rect
                        x="${border}" y="${border}"
                        width="${width - border * 2}" height="${height - border * 2}"
                        rx="${props.radius}"
                        fill="hsl(0 0% ${props.lightness}% / ${props.alpha})"
                        style="filter:blur(${props.blur}px)"
                    />
                </svg>
            `;

            feImage.setAttribute(
                'href',
                `data:image/svg+xml,${encodeURIComponent(displacementSvg)}`
            );
        });

        ro.observe(el);

        (el as any).__liquidGlass__ = { ro, svg };
    },

    unmounted(el: HTMLElement) {
        const ctx = (el as any).__liquidGlass__;
        if (!ctx) return;

        ctx.ro.disconnect();
        ctx.svg.remove();
    },
};

// 导出插件形式便于全局注册
export function setupLiquidGlassDirective(app: App) {
    app.directive('liquidGlass', liquidGlass);
}
