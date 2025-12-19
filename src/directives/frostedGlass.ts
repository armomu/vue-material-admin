import type { App, Directive } from 'vue';
import { useAppStore } from '@/stores/useAppStore';

interface FrostedGlassOptions {
    radius?: number;
    blur?: number;
    scale?: number;
    frost?: number;
}

const defaultOptions: Required<FrostedGlassOptions> = {
    radius: 8,
    blur: 4,
    scale: 60,
    frost: 0.05,
};

let sharedSvg: SVGSVGElement | null = null;
let currentOptions: Required<FrostedGlassOptions> | null = null;

function ensureSharedFilter(options: Required<FrostedGlassOptions>) {
    if (
        sharedSvg &&
        currentOptions &&
        options.blur === currentOptions.blur &&
        options.scale === currentOptions.scale
    ) {
        return;
    }

    currentOptions = options;

    if (sharedSvg) sharedSvg.remove();

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('style', 'position:fixed; width:0; height:0;');
    svg.innerHTML = `
    <defs>
      <filter id="glassShared" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.01"
          numOctaves="2"
          result="noise"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="noise"
          scale="${options.scale}"
        />
        <feGaussianBlur stdDeviation="${options.blur}" />
      </filter>
    </defs>
  `;

    document.body.appendChild(svg);
    sharedSvg = svg;
}

export const frostedGlass: Directive<HTMLElement, FrostedGlassOptions> = {
    mounted(el, binding) {
        const appState = useAppStore();
        if (appState.settings.cardStyle !== 'liquid-glass') return;

        const options = { ...defaultOptions, ...binding.value };

        ensureSharedFilter(options);

        el.classList.add('frosted_glass');
        el.style.borderRadius = `${options.radius}px`;
        el.style.backdropFilter = 'url(#glassShared)';
        el.style.setProperty('--frost', String(options.frost));
    },

    updated(el, binding) {
        if (!binding.value) return;

        const options = { ...defaultOptions, ...binding.value };

        ensureSharedFilter(options);

        el.style.borderRadius = `${options.radius}px`;
        el.style.setProperty('--frost', String(options.frost));
    },

    unmounted(el) {
        el.style.removeProperty('backdrop-filter');
        el.style.removeProperty('border-radius');
        el.style.removeProperty('--frost');
    },
};

export function setupLiquidGlassDirective(app: App) {
    app.directive('frostedGlass', frostedGlass);
}
