export * from './common';

export function delay(time = 2000) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
}

export function cn(
    ...inputs: (string | boolean | null | undefined | Record<string, any> | Array<any>)[]
): string {
    const classes: string[] = [];

    for (const input of inputs) {
        // 1. 处理字符串、数字、布尔值、null/undefined
        if (typeof input === 'string' && input.length > 0) {
            classes.push(input);
        }

        // 2. 处理数组
        else if (Array.isArray(input)) {
            // 递归调用自身处理数组中的每一项
            const innerClasses = cn(...input);
            if (innerClasses) {
                classes.push(innerClasses);
            }
        }

        // 3. 处理对象 (最常用于条件类名)
        else if (typeof input === 'object' && input !== null) {
            for (const key in input) {
                // 只有当值为 true 或 'truthy' 时，才加入 key (类名)
                if (input[key]) {
                    classes.push(key);
                }
            }
        }
    }

    // 用空格连接所有收集到的类名
    return classes.join(' ');
}
