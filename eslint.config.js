// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import importPlugin from 'eslint-plugin-import'
import react from 'eslint-plugin-react'
import testingLibrary from 'eslint-plugin-testing-library'

export default tseslint.config(
  { ignores: ['dist', 'node_modules', '*.config.js', 'docs', '.storybook'] }, 
  // Configuration for all TypeScript files
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
      'import': importPlugin,
      'react': react,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      'react-refresh/only-export-components': 'off',
      // Import rules
      'import/order': 'off',
      'import/no-unresolved': 'error',
      'import/no-cycle': 'error',
      'react-hooks/exhaustive-deps': 'off',
      'jsx-a11y/no-autofocus': 'off',
      // Core ESLint rules
      'prefer-const': 'error',
      'no-case-declarations': 'off',
      // TypeScript rules
      '@typescript-eslint/no-unused-vars': ['error', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-empty-object-type': 'off',
      
      // React rules
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'error',
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true
        }
      }
    }
  },
  storybook.configs["flat/recommended"],
  // Disable the Storybook renderer import rule globally
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      'storybook/no-uninstalled-addons': 'off',
      'storybook/no-renderer-packages': 'off',
      'react-hooks/exhaustive-deps': 'off',
    },
  }
);
