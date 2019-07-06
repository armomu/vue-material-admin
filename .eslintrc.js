module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        'eslint:recommended'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        "object-curly-newline": ["warn", { "consistent": true }],
        "function-paren-newline": ["warn", "consistent"],
        "class-methods-use-this": 0,
        "import/prefer-default-export": 0,
        "arrow-parens": ["warn", "always"],
        "indent": ["warn", 4],
        "arrow-spacing": ["warn", { "before": true, "after": true }],
        "semi": ["warn", "always"],
        "quotes": ["warn", "single"],
        "quote-props": ["warn", "consistent-as-needed"]
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    globals: {
        "AMap": true,
    }
}
