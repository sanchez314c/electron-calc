# Build & Compilation Guide

## Overview

This guide covers building and compiling the Electron Calculator application for all supported platforms and architectures.

## Prerequisites

### System Requirements

- **Node.js**: Version 16.0 or higher (18.x LTS recommended)
- **npm**: Version 7.0 or higher
- **Git**: For version control
- **Platform-specific tools**:
  - **macOS**: Xcode Command Line Tools
  - **Windows**: Visual Studio Build Tools
  - **Linux**: Build-essential packages

### Required Dependencies

All build dependencies are automatically installed with `npm install`:

```json
{
  "devDependencies": {
    "electron": "^27.0.0",
    "electron-builder": "^24.6.4",
    "electron-updater": "^5.3.0"
  }
}
```

## Build Scripts

### Available Build Commands

```bash
# Build for current platform only
npm run build

# Build for all platforms (Windows, macOS, Linux)
npm run build:all

# Build with maximum optimization (all platforms, all architectures)
npm run build:maximum

# Build without cleanup or bloat checking
npm run build:clean

# Pack without creating distributables
npm run pack

# Clean all build artifacts
npm run clean

# Validate build artifacts
npm run validate:build

# Check build size and identify bloat
npm run bloat-check
```

## Build Configuration

### Primary Configuration (`package.json`)

```json
{
  "build": {
    "appId": "com.superclaude.calculator",
    "productName": "Calculator",
    "directories": {
      "output": "dist",
      "buildResources": "build-resources"
    },
    "files": [
      "src/main/**/*",
      "src/preload/**/*",
      "src/renderer/**/*",
      "node_modules/**/*",
      "package.json"
    ],
    "mac": {
      "category": "public.app-category.productivity",
      "target": [
        {
          "target": "dmg",
          "arch": ["x64", "arm64"]
        },
        {
          "target": "zip",
          "arch": ["x64", "arm64"]
        }
      ],
      "icon": "build-resources/icons/icon.icns",
      "hardenedRuntime": true,
      "gatekeeperAssess": false,
      "entitlements": "build-resources/entitlements.mac.plist",
      "entitlementsInherit": "build-resources/entitlements.mac.plist"
    },
    "win": {
      "target": [
        {
          "target": "nsis",
          "arch": ["x64", "ia32"]
        },
        {
          "target": "msi",
          "arch": ["x64"]
        },
        {
          "target": "portable",
          "arch": ["x64"]
        }
      ],
      "icon": "build-resources/icons/icon.ico",
      "publisherName": "SuperClaude"
    },
    "linux": {
      "target": [
        {
          "target": "AppImage",
          "arch": ["x64"]
        },
        {
          "target": "deb",
          "arch": ["x64"]
        },
        {
          "target": "rpm",
          "arch": ["x64"]
        },
        {
          "target": "snap",
          "arch": ["x64"]
        }
      ],
      "icon": "build-resources/icons/icon.png",
      "category": "Utility"
    },
    "nsis": {
      "oneClick": false,
      "allowToChangeInstallationDirectory": true,
      "createDesktopShortcut": true,
      "createStartMenuShortcut": true,
      "shortcutName": "Calculator"
    },
    "publish": {
      "provider": "github",
      "owner": "superclaude",
      "repo": "electron-calculator"
    }
  }
}
```

### Secondary Configuration (`config/build.json`)

Additional build settings and validation hooks:

```json
{
  "validation": {
    "enabled": true,
    "checkDependencies": true,
    "checkBundleSize": true,
    "maxBundleSize": "50MB"
  },
  "optimization": {
    "compression": "maximum",
    "removeDevDependencies": true,
    "minify": true,
    "treeShaking": true
  },
  "hooks": {
    "preBuild": "scripts/pre-build.sh",
    "postBuild": "scripts/post-build.sh",
    "validate": "scripts/validate-build.sh"
  }
}
```

## Build Process

### Step-by-Step Build Flow

1. **Pre-build Validation**
   ```bash
   # Check for required tools
   node --version
   npm --version
   
   # Run linting
   npm run lint
   
   # Run tests
   npm test
   ```

2. **Clean Previous Builds**
   ```bash
   # Remove existing build artifacts
   rm -rf dist/
   rm -rf build/
   rm -rf out/
   ```

3. **Compile Application**
   ```bash
   # Run electron-builder
   npx electron-builder --config package.json
   ```

4. **Platform-Specific Packaging**
   ```bash
   # macOS
   electron-builder --mac --publish=never
   
   # Windows
   electron-builder --win --publish=never
   
   # Linux
   electron-builder --linux --publish=never
   ```

5. **Post-build Validation**
   ```bash
   # Check build artifacts
   npm run validate:build
   
   # Analyze bundle size
   npm run bloat-check
   ```

## Platform-Specific Builds

### macOS Build

```bash
# Build for macOS (Intel and Apple Silicon)
npx electron-builder --mac --x64 --arm64

# Output files:
# - Calculator-1.0.0.dmg
# - Calculator-1.0.0-mac.zip
# - Calculator.app (in dist/mac/)
```

**Code Signing (macOS)**
```bash
# Install developer certificate
security import-certificate -k ~/Library/Keychains/login.keychain-db build-resources/certificate.p12

# Sign application
codesign --deep --force --verify --verbose --sign "Developer ID Application: Your Name" dist/mac/Calculator.app

# Notarize (required for distribution)
xcrun altool --notarize-app --primary-bundle-id "com.superclaude.calculator" --username "your@email.com" --password "@keychain:AC_PASSWORD" --file dist/Calculator-1.0.0.dmg
```

### Windows Build

```bash
# Build for Windows (x64 and 32-bit)
npx electron-builder --win --x64 --ia32

# Output files:
# - Calculator Setup 1.0.0.exe (NSIS installer)
# - Calculator-1.0.0.msi (MSI installer)
# - Calculator-1.0.0-win.zip (Portable)
```

**Code Signing (Windows)**
```bash
# Install certificate
certutil -importpfx build-resources/certificate.pfx

# Sign with signtool
signtool sign /f build-resources/certificate.pfx /p PASSWORD /t http://timestamp.digicert.com /fd SHA256 dist/Calculator*.exe
signtool sign /f build-resources/certificate.pfx /p PASSWORD /t http://timestamp.digicert.com /fd SHA256 dist/Calculator*.msi
```

### Linux Build

```bash
# Build for Linux
npx electron-builder --linux

# Output files:
# - Calculator-1.0.0.AppImage
# - calculator_1.0.0_amd64.deb
# - calculator-1.0.0.x86_64.rpm
# - calculator-1.0.0.snap
```

## Build Optimization

### Bundle Size Optimization

```bash
# Analyze current bundle size
npm run bloat-check

# Remove unused dependencies
npm prune

# Use production dependencies only
NODE_ENV=production npm run build

# Enable compression
electron-builder --config.compression=maximum
```

### Performance Optimization

```bash
# Enable source maps for debugging
electron-builder --config.npmRebuild=true

# Optimize for specific architecture
electron-builder --x64 --config.asar=true

# Minimize bundle
electron-builder --config.minify=true
```

## Build Automation

### CI/CD Pipeline

The project includes automated builds via GitHub Actions:

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    strategy:
      matrix:
        os: [macos-latest, windows-latest, ubuntu-latest]
    runs-on: ${{ matrix.os }}
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test
      - run: npm run build
```

### Custom Build Scripts

**Pre-build Script** (`scripts/pre-build.sh`)
```bash
#!/bin/bash
# Validate environment
node --version
npm --version

# Run tests
npm test

# Check for linting errors
npm run lint

# Generate version info
echo "Build started at $(date)" > build-info.txt
```

**Post-build Script** (`scripts/post-build.sh`)
```bash
#!/bin/bash
# Validate build artifacts
ls -la dist/

# Generate checksums
sha256sum dist/* > checksums.txt

# Update build info
echo "Build completed at $(date)" >> build-info.txt
```

## Troubleshooting

### Common Build Issues

1. **Permission Denied**
   ```bash
   # Fix permissions on macOS/Linux
   chmod +x scripts/*.sh
   
   # Run with proper permissions
   sudo npm run build
   ```

2. **Missing Dependencies**
   ```bash
   # Rebuild native modules
   npm rebuild
   
   # Clear and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Code Signing Errors**
   ```bash
   # Check certificate validity
   codesign -dv --verbose=4 dist/Calculator.app
   
   # Verify timestamp server
   curl -I http://timestamp.digicert.com
   ```

4. **Build Size Too Large**
   ```bash
   # Analyze bundle
   npm run bloat-check
   
   # Remove development dependencies
   npm prune --production
   
   # Optimize assets
   npm run optimize:assets
   ```

### Debug Mode Builds

```bash
# Build with debug information
DEBUG=electron-builder npm run build

# Verbose output
npm run build -- --verbose

# Skip optimization for faster builds
npm run build:clean
```

## Distribution

### GitHub Releases

Automated release process:

1. **Tag Release**
   ```bash
   git tag -a v1.0.0 -m "Release version 1.0.0"
   git push origin v1.0.0
   ```

2. **Trigger Build**
   ```bash
   # Build and publish
   npm run build:all -- --publish=always
   ```

3. **Release Assets**
   - Installers for all platforms
   - Source code archive
   - Checksum files
   - Release notes

### Manual Distribution

For manual distribution without GitHub:

```bash
# Build all platforms
npm run build:maximum

# Create distribution folder
mkdir -p distribution/v1.0.0

# Copy artifacts
cp dist/* distribution/v1.0.0/

# Generate documentation
cp README.md distribution/v1.0.0/
cp CHANGELOG.md distribution/v1.0.0/
cp LICENSE distribution/v1.0.0/
```

---

**Last Updated**: 2025-01-12  
**Version**: 1.0.0