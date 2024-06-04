import { createApp } from 'vue';
/**
 * @description 将 ./src/components 目录下的组件注册成为全局组件
 * @param {vue} Vue
 * @returns {void}
 */
export default function registeComponent(app: ReturnType<typeof createApp>): void {
    const files = import.meta.glob(['./*/*.vue', '!**/DragResizeble/*.vue']);
    for (const path in files) {
        const name = path.split('/')[1];
        files[path]().then((module) => {
            app.component(name, module['default']);
        });
    }
}
