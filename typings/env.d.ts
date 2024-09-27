// / <reference types="vite/client" />
interface ImportMetaEnv {
    readonly MODE: 'production' | 'development';
    BASE_URL: string;
    PROD: boolean;
    SSR: boolean;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
