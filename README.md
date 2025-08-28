# Mac Instructions

This repo contains UI components and documentation used across the Tellescope platform, built with [React](https://reactjs.org/) and [Storybook](https://storybook.js.org/).

## 📦 Prerequisites (Mac)

Make sure the following tools are installed on your machine:

### 1. Install Homebrew
Run this command in your Terminal
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### 2. Install Git
You can install Git using Homebrew:
```
brew install git
```

To verify
```
git --version
```

Install [NodeJS](https://nodejs.org/en/download)

To verify
```
node -v
npm -v
```

🚀 Getting Started
1. Clone the Repository (open the Terminal application)
```
git clone https://github.com/tellescope/storybook.git
cd storybook
npm install
```

🔀 Working with Branches
View existing branches:
```
git branch -r
```

Checkout a branch:
```
git checkout origin/<branch-name> -b <branch-name>
```

Example:
```
git checkout origin/feature/button-redesign -b feature/button-redesign
```

📚 Running Storybook Locally
Once you're on the desired branch and dependencies are installed:
```
npm run storybook
```

You should now be done setting up and running Storybook on a Mac. You can now checkout different branches to test them over time without having to follow the previous instructions.

## 🔧 Code Quality & Pre-commit Hooks

This project uses pre-commit hooks to ensure code quality and consistent formatting:

### Available Scripts
```bash
npm run format        # Format all files with Biome
npm run lint          # Check for code style issues
npm run lint:fix      # Fix code style issues automatically
npm run check         # Run both linting and TypeScript checks
```

### Pre-commit Hooks
The following hooks run automatically before commits and pushes:

- **Pre-commit**: Runs `lint-staged` to format and lint only staged files
- **Pre-push**: Runs full linting and type checking
- **Commit-msg**: Validates commit message format

### Code Formatting Rules
- **Indentation**: 4 spaces
- **Line width**: 100 characters
- **Quotes**: Single quotes
- **Semicolons**: As needed
- **Trailing commas**: ES5 style

### Manual Formatting
If you need to format files manually:
```bash
npm run format        # Format all files
npm run lint:fix      # Fix linting issues
```

<br/><br/><br/><br/>
### (Storybook Template Overview) React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
