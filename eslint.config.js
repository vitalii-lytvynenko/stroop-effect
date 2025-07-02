import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import prettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: globals.browser,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  //eslintPluginPrettier,
  {
    plugins: {
      prettier: {
        rules: eslintPluginPrettier.rules,
      },
    },
    rules: {
      'prettier/prettier': ['error'],
      'implicit-arrow-linebreak': 0,
      'import/prefer-default-export': 0,
      'max-len': [
        'error',
        {
          ignoreTemplateLiterals: true,
          ignoreComments: true,
        },
      ],
      'no-console': 'warn',
      'no-param-reassign': [2, { props: true }],
      'react/react-in-jsx-scope': 0,
      'react/destructuring-assignment': 0,
    },
  },
  prettier,
];
