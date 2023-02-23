// / <reference types="vite/client" />
interface ImportMetaEnv {
    readonly MODE: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
