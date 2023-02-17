module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ["plugin:react/recommended", "standard"],
    overrides: [],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
    },
    plugins: ["react"],
    rules: {
        indent: ["error", 4], // отступы
        semi: [2, "always"], // точка с запятой
        "space-before-function-paren": ["error", "never"], // убираем пробел перед скобками при обозначении функции
        quotes: ["error", "double", { allowTemplateLiterals: true }] // двойные кавычки
    }
};