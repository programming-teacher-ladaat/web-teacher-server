// Basic ESLint config for ESM Node.js project
export default [
    {
        files: ["**/*.js"],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
        },
        rules: {
            semi: ["error", "always"],
            quotes: ["error", "double"],
            "no-unused-vars": "warn",
            "no-undef": "error"
        },
        ignores: ["node_modules/**", "dist/**"]
    }
];
