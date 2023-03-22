import { registerSW } from 'virtual:pwa-register';
import { useMainStore } from '@/stores/appMain';

let pwaReg: ServiceWorkerRegistration | undefined;
registerSW({
    onRegisteredSW(swScriptUrl, registration) {
        pwaReg = registration;
        console.log('onRegisteredSW');
        if (import.meta.env.MODE !== 'production') {
            pwaReg
                ?.update()
                .then(() => {
                    console.log('update ok');
                })
                .catch(() => {
                    location.reload();
                });
        }
    },
});

window.getVersion = (version: string) => {
    const old = localStorage.frontendVersion;
    if (!old) {
        localStorage.frontendVersion = version;
    }
    if (version !== old && old) {
        const mainStore = useMainStore();
        old && mainStore.onShowUp(version);
    }
};

export function onUpVersion(code: string) {
    console.log(pwaReg);
    pwaReg
        ?.update()
        .then(() => {
            console.log('update ok');
            localStorage.frontendVersion = code;
            location.reload();
        })
        .catch(() => {
            location.reload();
        });
}

export function checkVersion() {
    try {
        const createVersionScript = document.createElement('script');
        createVersionScript.src =
            location.origin + `${import.meta.env.BASE_URL}/version.js?v=${new Date().getTime()}`;
        const script = document.getElementsByTagName('script')[0];
        script.parentNode?.insertBefore(createVersionScript, script);
    } catch (err) {
        console.log(err);
    }
}
