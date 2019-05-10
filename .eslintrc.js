module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'prettier',
    ],
    parserOptions: {
        ecmaVersion: 2018, // expect to read modern JS syntax
        sourceType: 'module', // allow 'import' syntax
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ['react', 'react-hooks'],
    env: {
        browser: true,
        node: true,
    },
    rules: {
        'react/prop-types': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-member-accessibility': 'off',
        '@typescript-eslint/indent': 'off', // conflicts w prettier
        '@typescript-eslint/member-delimiter-style': 'off', // conflicts w prettier
        '@typescript-eslint/type-annotation-spacing': 'off', // conflicts w prettier
        'no-console': 'warn',
        'prettier/prettier': 'warn',
    },
};
