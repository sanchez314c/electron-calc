# Development Guide

This comprehensive guide covers everything you need to know about developing and contributing to the Electron Calculator application.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Development Environment Setup](#development-environment-setup)
- [Project Architecture](#project-architecture)
- [Development Workflow](#development-workflow)
- [Testing Strategy](#testing-strategy)
- [Build System](#build-system)
- [Debugging](#debugging)
- [Code Style & Conventions](#code-style--conventions)
- [Security Guidelines](#security-guidelines)
- [Performance Optimization](#performance-optimization)
- [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Software

- **Node.js**: Version 16.0 or higher
- **npm**: Version 7.0 or higher (comes with Node.js)
- **Git**: For version control
- **VS Code**: Recommended IDE (optional but recommended)

### System Requirements

- **RAM**: Minimum 4GB, recommended 8GB
- **Storage**: Minimum 2GB free space
- **Operating System**: Windows 10+, macOS 10.15+, or Ubuntu 18.04+

### Optional Tools

- **GitHub Desktop**: For Git GUI management
- **Postman**: For API testing (if future features include APIs)
- **Chrome DevTools**: For debugging renderer process

## Development Environment Setup

### 1. Clone the Repository

```bash
git clone https://github.com/superclaude/electron-calculator.git
cd electron-calculator
```

### 2. Install Dependencies

```bash
# Install all dependencies
npm install

# Or use ci for faster, reliable builds
npm ci
```

### 3. Verify Installation

```bash
# Check Node.js version
node --version  # Should be >= 16.0.0

# Check npm version
npm --version   # Should be >= 7.0.0

# Run the application in development mode
npm run dev
```

### 4. Configure Development Tools

#### VS Code Extensions (Recommended)

Install these VS Code extensions for optimal development experience:

```json
{
  "recommendations": [
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint",
    "ms-vscode.vscode-jest",
    "ms-vscode.vscode-json",
    "redhat.vscode-yaml",
    "ms-vscode.vscode-node-azure-pack"
  ]
}
```

#### Environment Configuration

Create a `.env.local` file for development-specific settings:

```env
NODE_ENV=development
DEBUG=true
ELECTRON_IS_DEV=true
```

## Project Architecture

### Application Structure

```
electron-calculator/
├── 📁 src/                     # Source code
│   ├── main.js                 # Main Electron process
│   ├── preload.js              # Security bridge
│   ├── index.html              # UI structure
│   ├── style.css               # Dark mode styles
│   └── renderer.js             # UI logic and calculations
├── 📁 assets/                  # Static assets
│   └── icons/                  # Application icons
├── 📁 scripts/                 # Build and utility scripts
│   ├── build-compile-dist.sh   # Comprehensive build script
│   └── bloat-check.sh          # Dependency analysis
├── 📁 tests/                   # Test files
│   ├── calculator.test.js      # Calculator logic tests
│   ├── electron.test.js        # Electron functionality tests
│   └── jest.config.js          # Test configuration
├── 📁 docs/                    # Documentation
│   ├── DEVELOPMENT.md          # This file
│   ├── API_REFERENCE.md        # API documentation
│   ├── ARCHITECTURE.md         # System architecture
│   └── DEPLOYMENT.md           # Deployment guide
├── 📁 build-resources/         # Build assets
│   └── icons/                  # Build-time icons
└── 📄 package.json             # Project configuration
```

### Electron Process Architecture

The application follows Electron's multi-process architecture:

#### Main Process (`src/main.js`)
- Application lifecycle management
- Window creation and management
- System integration (file system, notifications)
- Security configuration

#### Renderer Process (`src/renderer.js`)
- User interface logic
- DOM manipulation
- User input handling
- Mathematical calculations

#### Preload Script (`src/preload.js`)
- Secure bridge between main and renderer processes
- Context isolation implementation
- API exposure to renderer process

### Security Model

The application implements a security-first approach:

```javascript
// Main process security settings
const mainWindow = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false,        // Disable Node.js integration
    contextIsolation: true,        // Enable context isolation
    enableRemoteModule: false,     // Disable remote module
    preload: path.join(__dirname, 'preload.js')
  }
});
```

## Development Workflow

### 1. Start Development

```bash
# Start in development mode with DevTools
npm run dev

# Or start normally
npm start
```

### 2. Make Changes

- **Hot Reload**: The application does not have hot reload by default
- **Manual Reload**: Press `Cmd+R` (macOS) or `Ctrl+R` (Windows/Linux) in the application window
- **DevTools**: Open automatically in development mode for debugging

### 3. Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### 4. Build and Test

```bash
# Build for current platform
npm run build

# Test the built application
# Navigate to dist/ directory and run the appropriate executable
```

### Git Workflow

```bash
# Create a new feature branch
git checkout -b feature/your-feature-name

# Make your changes and commit them
git add .
git commit -m "feat: add your feature description"

# Push to your fork
git push origin feature/your-feature-name

# Create a pull request
```

### Commit Message Convention

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
feat: add new feature
fix: fix bug
docs: update documentation
style: code formatting changes
refactor: code refactoring
test: add or update tests
chore: maintenance tasks
```

## Testing Strategy

### Test Categories

#### Unit Tests (`tests/calculator.test.js`)
- Mathematical operations
- Input validation
- Error handling
- Edge cases

#### Integration Tests (`tests/electron.test.js`)
- IPC communication
- Window management
- File system operations
- System integration

#### End-to-End Tests
- User interface interactions
- Keyboard navigation
- Cross-platform functionality

### Test Configuration

The test suite uses Jest with Electron-specific configuration:

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  testMatch: ['<rootDir>/tests/**/*.test.js'],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/main.js'  // Skip main process for now
  ]
};
```

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test calculator.test.js

# Run tests with coverage
npm run test:coverage

# Watch mode (re-runs tests on file changes)
npm run test:watch
```

### Writing Tests

#### Unit Test Example

```javascript
// tests/calculator.test.js
describe('Calculator Operations', () => {
  test('should add two numbers correctly', () => {
    expect(calculate('2 + 3')).toBe('5');
  });

  test('should handle division by zero', () => {
    expect(() => calculate('5 / 0')).toThrow('Division by zero');
  });
});
```

#### Integration Test Example

```javascript
// tests/electron.test.js
describe('Electron Integration', () => {
  test('should create main window', async () => {
    const app = require('electron').app;
    await app.whenReady();
    // Test window creation logic
  });
});
```

## Build System

### Build Scripts Overview

The project includes comprehensive build automation:

#### Primary Build Script (`scripts/build-compile-dist.sh`)
- Multi-platform compilation
- Dependency optimization
- Package generation
- Bloat analysis
- Automated cleanup

#### Usage Examples

```bash
# Build all platforms and architectures
npm run build:maximum

# Build specific platforms
./scripts/build-compile-dist.sh --platforms mac,win

# Skip cleanup and bloat analysis
./scripts/build-compile-dist.sh --skip-cleanup --skip-bloat-check

# Verbose output
./scripts/build-compile-dist.sh --verbose
```

### Build Configuration

The build system is configured in `package.json` under the `build` section:

- **macOS**: DMG, ZIP, PKG packages for Intel and Apple Silicon
- **Windows**: NSIS, MSI, Portable, ZIP packages for x64 and 32-bit
- **Linux**: AppImage, DEB, RPM, SNAP, TAR.GZ, PACMAN packages

### Build Output

```
dist/
├── Calculator-1.0.0.dmg           # macOS DMG
├── Calculator-1.0.0.exe           # Windows NSIS
├── Calculator-1.0.0.AppImage      # Linux AppImage
├── mac/                           # macOS app bundle
├── win-unpacked/                  # Windows unpacked
└── linux-unpacked/                # Linux unpacked
```

## Debugging

### Main Process Debugging

```bash
# Start with debugging enabled
npm run dev -- --inspect=5858

# Or use Chrome DevTools
chrome://inspect
```

### Renderer Process Debugging

In development mode, DevTools open automatically. Use:

- **Console**: For JavaScript debugging
- **Elements**: For DOM inspection
- **Network**: For API calls (if any)
- **Application**: For storage and service workers

### Common Debugging Scenarios

#### Application Won't Start

```bash
# Check for missing dependencies
npm ls

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Build Failures

```bash
# Check build logs
./scripts/build-compile-dist.sh --verbose

# Check system requirements
node --version
npm --version
```

#### Performance Issues

```bash
# Run bloat analysis
npm run bloat-check

# Check memory usage
# Use Chrome DevTools Performance tab
```

## Code Style & Conventions

### JavaScript Standards

- **ES6+**: Use modern JavaScript features
- **JSDoc**: Document all functions and classes
- **Camel Case**: For variables and functions
- **Pascal Case**: For classes and constructors

### Code Formatting

```javascript
// ✅ Good
const calculateSum = (a, b) => {
  return a + b;
};

// ❌ Bad
const calculatesum=(a,b)=>{return a+b};
```

### File Organization

```
src/
├── main.js          # Main process entry point
├── preload.js       # Security bridge
├── index.html       # UI structure
├── style.css        # Styles and themes
└── renderer.js      # UI logic and calculations
```

### Naming Conventions

```javascript
// Variables and functions: camelCase
const currentDisplay = '';
const calculateResult = () => {};

// Classes: PascalCase
class CalculatorEngine {}

// Constants: UPPER_SNAKE_CASE
const MAX_DIGITS = 10;

// Files: kebab-case
// calculator-engine.js, style-constants.css
```

## Security Guidelines

### Context Isolation

Always use context isolation and preload scripts:

```javascript
// ✅ Secure
const mainWindow = new BrowserWindow({
  webPreferences: {
    contextIsolation: true,
    nodeIntegration: false,
    preload: path.join(__dirname, 'preload.js')
  }
});

// ❌ Insecure
const mainWindow = new BrowserWindow({
  webPreferences: {
    nodeIntegration: true
  }
});
```

### Input Validation

Always validate user inputs:

```javascript
// ✅ Validate input
function validateInput(input) {
  if (typeof input !== 'string') {
    throw new Error('Input must be a string');
  }
  if (!/^[\d+\-*/.() ]*$/.test(input)) {
    throw new Error('Invalid characters in input');
  }
  return input;
}

// ❌ No validation
function calculate(input) {
  return eval(input); // Dangerous!
}
```

### Content Security Policy

Implement strict CSP headers:

```javascript
mainWindow.webContents.session.webRequest.onHeadersReceived(
  (details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'"
        ]
      }
    });
  }
);
```

## Performance Optimization

### Bundle Size Optimization

```bash
# Analyze dependency bloat
npm run bloat-check

# Remove unused dependencies
npm uninstall unused-package

# Use production builds
NODE_ENV=production npm run build
```

### Memory Management

```javascript
// ✅ Clean up event listeners
window.addEventListener('beforeunload', () => {
  // Clean up resources
  if (calculator) {
    calculator.destroy();
  }
});

// ✅ Avoid memory leaks
function updateDisplay(value) {
  const display = document.getElementById('display');
  if (display) {
    display.textContent = value;
  }
}
```

### Startup Optimization

- Lazy load non-critical features
- Minimize initial bundle size
- Optimize icon and asset sizes
- Use code splitting for large features

## Troubleshooting

### Common Development Issues

#### Node.js Version Conflicts

```bash
# Check current version
node --version

# Use nvm to manage versions
nvm use 16
nvm install 18
```

#### Electron Version Issues

```bash
# Rebuild native modules
npm rebuild

# Update Electron
npm install electron@latest
```

#### Build Failures on Different Platforms

```bash
# Install platform-specific dependencies
npm install --platform=win32 electron-builder

# Use Docker for cross-platform builds
docker run --rm -v $(pwd):/project electronuserland/builder
```

### Performance Debugging

```bash
# Start with performance monitoring
npm run dev -- --enable-logging

# Use Chrome DevTools Performance tab
# Record performance traces
# Analyze memory usage
```

### Security Issues

```bash
# Run security audit
npm audit

# Fix automatically fixable issues
npm audit fix

# Review security best practices
# Check preload script for exposed APIs
```

## Getting Help

### Resources

- **Electron Documentation**: https://electronjs.org/docs
- **electron-builder**: https://electron.build
- **Jest Testing**: https://jestjs.io
- **VS Code Docs**: https://code.visualstudio.com/docs

### Community

- **GitHub Issues**: https://github.com/superclaude/electron-calculator/issues
- **GitHub Discussions**: https://github.com/superclaude/electron-calculator/discussions
- **Electron Discord**: https://discord.gg/electronjs

### Contributing

Please read the [Contributing Guide](../CONTRIBUTING.md) for detailed information on how to contribute to this project.

---

For specific questions or issues, please open an issue on GitHub or contact the development team.