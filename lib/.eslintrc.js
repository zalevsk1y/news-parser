module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:jsx-a11y/recommended"
    ],
    "parser": '@typescript-eslint/parser',
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ]
        }
    ],
    "parserOptions": {
        "project": "./tsconfig.json",
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint",
        "jsx-a11y"
    ],
    "settings": {
        "react": {
            "version": "17.0.2"
        }
    },
    "ignorePatterns": ["__tests__/*"],
    "rules": {
        "@typescript-eslint/no-explicit-any": "off",
        "jsx-a11y/aria-props": "error",
        "jsx-a11y/aria-role": "error",
        "jsx-a11y/aria-unsupported-elements": "error",
        "jsx-a11y/heading-has-content": "error",
        "jsx-a11y/label-has-associated-control": "error",
        "jsx-a11y/mouse-events-have-key-events": "error",
        "jsx-a11y/no-access-key": "error",
        "jsx-a11y/no-autofocus": "error",
        "jsx-a11y/no-distracting-elements": "error",
        "jsx-a11y/no-interactive-element-to-noninteractive-role": "error",
        "jsx-a11y/no-noninteractive-element-interactions": "error",
        "jsx-a11y/no-noninteractive-element-to-interactive-role": "error",
        "jsx-a11y/no-noninteractive-tabindex": "error",
        "jsx-a11y/no-redundant-roles": "error",
        "jsx-a11y/no-static-element-interactions": "error",
        "jsx-a11y/role-has-required-aria-props": "error",
        "jsx-a11y/role-supports-aria-props": "error",
        "jsx-a11y/tabindex-no-positive": "error"

    }
}