# Technology Stack

## Core Technologies

### Primary Language & Runtime
- **Language**: JavaScript (ES6+)
- **Runtime**: Node.js (via Electron)
- **Package Manager**: npm

### Framework & Platform
- **Framework**: Electron v27.0.0
- **Platform**: Cross-platform Desktop Application
- **Target OS**: Windows, macOS, Linux

### Build System
- **Build Tool**: electron-builder v24.6.4
- **Distribution**: DMG (macOS), NSIS/MSI (Windows), AppImage/DEB (Linux)
- **Packaging**: Multi-platform installer generation

## Architecture

### Application Structure
- **Main Process**: `src/main/index.js` - Controls application lifecycle
- **Renderer Process**: `src/renderer/index.js` - Handles UI and calculations
- **Preload Script**: `src/preload/index.js` - Secure API bridge between processes

### File Organization
```
electron-calculator/
├── src/
│   ├── main/                # Main Electron process
│   │   └── index.js         # Main process entry point
│   ├── renderer/            # Renderer process
│   │   ├── index.html       # UI structure
│   │   ├── styles/          # CSS styles
│   │   └── index.js         # UI logic and calculations
│   └── preload/             # Preload scripts
│       └── index.js         # Secure API bridge
├── tests/                   # Test files
├── docs/                    # Documentation
├── build-resources/         # Build assets (icons, etc.)
└── package.json             # Project configuration
```

### Security Implementation
- **Context Isolation**: Enabled to prevent code injection
- **Node Integration**: Disabled in renderer process
- **Preload Scripts**: Secure IPC communication
- **CSP Headers**: Strict Content Security Policy
- **Input Validation**: All user inputs validated and sanitized

## Key Dependencies

### Production Dependencies
- **electron**: ^27.0.0 - Cross-platform desktop app framework
- **electron-updater**: ^5.3.0 - Auto-update functionality

### Development Dependencies
- **electron-builder**: ^24.6.4 - Application packaging and distribution
- **jest**: ^29.7.0 - Testing framework
- **@jest/globals**: ^29.7.0 - Jest globals for testing
- **jsdom**: ^22.1.0 - DOM environment for testing

## Development Tools

### Testing Framework
- **Jest**: Comprehensive testing framework
- **Test Environment**: jsdom for renderer process testing
- **Coverage**: Istanbul for code coverage reporting

### Build & Packaging
- **electron-builder**: Multi-platform packaging
- **Code Signing**: Platform-specific signing support
- **Auto-Update**: GitHub releases integration

### Code Quality
- **ESLint**: Code linting and style enforcement
- **Prettier**: Code formatting
- **JSDoc**: Documentation generation

### Debugging & Development
- **VS Code**: Recommended IDE with Electron extensions
- **Chrome DevTools**: Integrated debugging tools
- **Electron Inspector**: Runtime debugging

## Project Classification

### Type & Scale
- **Type**: Desktop Application
- **Scale**: Small utility application
- **Category**: Productivity / Utilities
- **Target Users**: General users, developers learning Electron

### Platform Support
- **Primary Platforms**: Windows 10+, macOS 10.15+, Linux (Ubuntu 18.04+)
- **Architectures**: x64, arm64 (macOS), ia32 (Windows)
- **Distribution**: Native installers for all platforms

## Asset Management

### Icons
- **Location**: `build-resources/icons/`
- **Formats**: PNG (multiple sizes), ICO (Windows), ICNS (macOS)
- **Sizes**: 16x16 to 1024x1024 pixels
- **Generation**: Automated icon generation script available

### Static Assets
- **Styles**: `src/renderer/styles/style.css` - Dark mode theme
- **HTML**: `src/renderer/index.html` - Application UI template
- **Images**: Optimized for bundle size and performance

## Development Environment

### Node.js Requirements
- **Minimum Version**: 16.0.0
- **Recommended Version**: 18.x LTS
- **Package Manager**: npm 7.0+

### IDE Recommendations
- **Primary**: VS Code with Electron extensions
- **Alternatives**: WebStorm, Sublime Text with Electron plugins
- **Extensions**: ESLint, Prettier, Jest, GitLens

### Environment Variables
```bash
# Development
NODE_ENV=development
DEBUG=true
ELECTRON_IS_DEV=true

# Build
BUILD_TARGET=all
BUILD_ARCH=x64,arm64

# Application
APP_VERSION=1.0.0
```

## Deployment Strategy

### Build Targets
- **macOS**: DMG installer, ZIP archive, PKG package
- **Windows**: NSIS installer, MSI installer, Portable ZIP
- **Linux**: AppImage, DEB package, RPM package, SNAP package

### Distribution
- **GitHub Releases**: Primary distribution channel
- **Official Website**: Download portal with checksum verification
- **Auto-Update**: Integrated update mechanism

### Code Signing
- **macOS**: Developer ID Application certificate
- **Windows**: Authenticode code signing
- **Linux**: GPG signing for DEB/RPM packages

## Quality Assurance

### Testing
- **Unit Tests**: Calculator logic and utility functions
- **Integration Tests**: Electron-specific functionality
- **Coverage**: >85% code coverage target
- **CI/CD**: Automated testing on all platforms

### Code Quality
- **Linting**: ESLint with strict configuration
- **Formatting**: Prettier for consistent style
- **Documentation**: JSDoc for all public APIs
- **Security Scanning**: Regular dependency audits

### Performance
- **Bundle Size**: ~45MB compressed target
- **Startup Time**: < 2 seconds
- **Memory Usage**: < 80MB resident memory
- **CPU Usage**: Minimal when idle

---

**Last Updated**: 2025-01-12  
**Version**: 1.0.0