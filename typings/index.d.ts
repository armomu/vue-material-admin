declare const createObjectURL: any;
declare const frontendVersion: string;
declare const _treeCount_: number;

declare module 'vue3-drag-resize' {
    const content: {
        isActive: boolean;
        h: number;
        w: number;
    };
    export = content;
}

declare global {
    interface Window {
        getVersion(): void;
    }
}
