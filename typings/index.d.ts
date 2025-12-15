import type { liquidGlassDirective } from '@/directives/liquidGlass';

declare const createObjectURL: any;
declare const frontendVersion: string;
declare const _treeCount_: number;

declare global {
    interface Window {
        getVersion: () => string;
    }
}

declare module 'vue' {
    export interface GlobalDirectives {
        // 注意：这里的名字要与你注册指令时用的名字一致（去掉 v-）
        'v-liquidGlass': typeof liquidGlassDirective;
    }
}
