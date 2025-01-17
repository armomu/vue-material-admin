// eslint-disable-next-line no-undef
require('@rushstack/eslint-patch/modern-module-resolution');

// eslint-disable-next-line no-undef
module.exports = {
    root: true,
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/eslint-config-typescript/recommended',
        '@vue/eslint-config-prettier',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    // 0 = off, 1 = warn, 2 = error
    rules: {
        'prettier/prettier': 2,
        '@typescript-eslint/ban-ts-comment': 0,
        '@typescript-eslint/no-unused-vars': 1,
        '@typescript-eslint/no-explicit-any': 0,
        'vue/multi-word-component-names': 0,
        'vue/valid-v-slot': 1,
        'vue/no-unused-components': [
            1,
            {
                ignoreWhenBindingPresent: true,
            },
        ],
        semi: 2,
        noEmit: 0,
        incremental: 0,
    },
};
