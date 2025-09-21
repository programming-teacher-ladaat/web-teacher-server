import { defineConfig } from "eslint/config";

// Basic ESLint config for ESM Node.js project
export default defineConfig([
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
        // use ignorePatterns for flat config
        ignores: ["node_modules/**", "dist/**"]
    }
]);
