// / <reference types="vite/client" />
interface ImportMetaEnv {
    readonly MODE: string;
    BASE_URL: string;
    PROD: boolean;
    SSR: boolean;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
