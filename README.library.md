# @tellescope/ui - Design System Library

A comprehensive React component library built with TypeScript, Material-UI, and optimized for tree shaking.

## 🚀 Installation

```bash
npm install @tellescope/ui
# or
yarn add @tellescope/ui
# or
pnpm add @tellescope/ui
```

## 📦 Usage

### Import Individual Components (Recommended for Tree Shaking)

```typescript
// ✅ GOOD: Only imports Button component (~15KB)
import { Button } from '@tellescope/ui';

// ✅ GOOD: Only imports Icon component (~8KB)
import { Icon } from '@tellescope/ui';

// ✅ GOOD: Only imports Typography component (~5KB)
import { Typography } from '@tellescope/ui';
```

### Import Multiple Components

```typescript
// ✅ GOOD: Only imports specified components
import { Button, Icon, Typography } from '@tellescope/ui';
```

### Import by Category

```typescript
// ✅ GOOD: Import only atoms (~50KB)
import { Button, Icon, Typography } from '@tellescope/ui/atoms';

// ✅ GOOD: Import only molecules (~80KB)
import { Dialog, FormBuilder } from '@tellescope/ui/molecules';

// ✅ GOOD: Import only organisms (~30KB)
import { ItemViewer } from '@tellescope/ui/organisms';
```

### Import Theme and Utilities

```typescript
// ✅ GOOD: Import theme configuration
import { theme } from '@tellescope/ui/theme';

// ✅ GOOD: Import shared types and utilities
import { AvatarSize, AvatarColor } from '@tellescope/ui/shared';
```

## ❌ Avoid These Patterns (Prevents Tree Shaking)

```typescript
// ❌ BAD: Imports entire library (~500KB)
import * as UI from '@tellescope/ui';

// ❌ BAD: Imports entire category
import * as Atoms from '@tellescope/ui/atoms';
```

## 🌳 Tree Shaking Benefits

| Import Pattern | Bundle Size | Tree Shaking |
|----------------|-------------|---------------|
| `{ Button }` | ~15KB | ✅ Full |
| `{ Button, Icon }` | ~23KB | ✅ Full |
| `{ Button, Icon, Typography }` | ~28KB | ✅ Full |
| `* as UI` | ~500KB | ❌ None |

## 🏗️ Building the Library

### Development Build
```bash
npm run build:lib
```

### Type Declarations
```bash
npm run build:types
```

### Complete Library Build
```bash
npm run build:all
```

### Bundle Analysis
After building, open `dist/stats.html` to analyze bundle composition and verify tree shaking.

## 📁 Library Structure

```
dist/
├── tellescope-ui.es.js          # ES Module bundle
├── tellescope-ui.cjs.js         # CommonJS bundle
├── index.d.ts                   # Main type declarations
├── atoms.d.ts                   # Atom component types
├── molecules.d.ts               # Molecule component types
├── organisms.d.ts               # Organism component types
├── theme.d.ts                   # Theme types
├── shared.d.ts                  # Shared utility types
└── stats.html                   # Bundle analysis
```

## 🔧 Configuration

### Vite Configuration
The library uses a separate Vite configuration (`vite.lib.config.ts`) optimized for:
- Library builds with proper external dependencies
- TypeScript declaration generation
- Bundle analysis and visualization
- Tree shaking optimization

### TypeScript Configuration
Library-specific TypeScript config (`tsconfig.lib.json`) ensures:
- Proper declaration file generation
- Excludes test and story files
- Optimized for library builds

## 📊 Bundle Analysis

After building, the bundle analyzer will automatically open showing:
- Component size breakdown
- Dependency relationships
- Tree shaking effectiveness
- Gzip and Brotli compression sizes

## 🎯 Best Practices

1. **Always use named imports** - `import { Button } from '@tellescope/ui'`
2. **Import only what you need** - Don't import unused components
3. **Use category imports sparingly** - Prefer individual component imports
4. **Verify tree shaking** - Check bundle analysis after builds
5. **Test with different bundlers** - Ensure compatibility with webpack, Rollup, Vite

## 🚨 Troubleshooting

### Tree Shaking Not Working?
- Ensure you're using named imports, not `import *`
- Check that your bundler supports tree shaking
- Verify the component is actually exported from the library

### Type Declarations Missing?
- Run `npm run build:types` first
- Check that `tsconfig.lib.json` is properly configured
- Ensure `vite-plugin-dts` is installed

### Bundle Too Large?
- Use bundle analysis to identify large dependencies
- Check for unnecessary imports
- Verify external dependencies are properly configured

## 📚 Additional Resources

- [Tree Shaking Guide](https://webpack.js.org/guides/tree-shaking/)
- [Vite Library Mode](https://vitejs.dev/guide/build.html#library-mode)
- [Rollup Bundle Analysis](https://github.com/btd/rollup-plugin-visualizer)
