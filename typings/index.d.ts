// eslint-disable-next-line no-unused-vars
declare function getVersion(version: string): void;
declare const createObjectURL: any;
declare const frontendVersion: string;

declare module 'vue3-drag-resize' {
    const content: {
        isActive: boolean;
        h: number;
        w: number;
    };
    export = content;
}
