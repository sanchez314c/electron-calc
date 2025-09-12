# Technology Stack Documentation

## Core Technologies

### Primary Language & Runtime
- **Language**: JavaScript (ES6+)
- **Runtime**: Node.js (via Electron)
- **Package Manager**: npm

### Framework & Platform
- **Framework**: Electron v27.0.0
- **Platform**: Cross-platform Desktop Application
- **Target OS**: macOS, Windows, Linux

### Build System
- **Build Tool**: electron-builder v24.6.4
- **Distribution**: DMG (macOS), NSIS (Windows), AppImage/DEB (Linux)

## Architecture

### Application Structure
- **Main Process**: `main.js` - Controls application lifecycle
- **Renderer Process**: `index.html` + `script.js` - UI and user interactions
- **Preload Script**: `preload.js` - Secure API bridge between processes

### File Organization
```
├── main.js              # Electron main process
├── index.html           # Application UI
├── style.css            # Application styling
├── script.js            # Frontend logic
├── preload.js           # Context bridge
└── package.json         # Application configuration
```

## Key Dependencies

### Production Dependencies
- **Electron**: ^27.0.0 - Cross-platform desktop app framework

### Development Dependencies
- **electron-builder**: ^24.6.4 - Application packaging and distribution

## Development Tools

### Testing Framework
- **Jest**: Configured in `tests/jest.config.js`
- **Test Files**: `tests/calculator.test.js`, `tests/electron.test.js`

### Build Scripts
- `npm run start` - Launch application
- `npm run dev` - Development mode
- `npm run build` - Build for current platform
- `npm run build:all` - Build for all platforms

## Project Classification

### Type & Scale
- **Type**: Desktop Application
- **Scale**: Small utility application
- **Category**: Calculator/Utility

### Platform Support
- **Primary Platform**: Desktop
- **Supported OS**: macOS (Intel/Apple Silicon), Windows, Linux
- **Distribution**: Native installers

## Asset Management

### Icons
- **Location**: `assets/icons/`
- **Formats**: PNG (multiple sizes), ICO, ICNS, SVG
- **Sizes**: 16x16 to 1024x1024 pixels

### Static Assets
- **Styles**: `style.css` (main stylesheet)
- **HTML**: `index.html` (main UI template)

## Development Environment

### Node.js Requirements
- **Minimum Version**: Compatible with Electron v27.0.0
- **Package Manager**: npm

### IDE Recommendations
- **Primary**: VS Code with Electron extensions
- **Debugging**: Chrome DevTools (integrated with Electron)

## Deployment Strategy

### Build Targets
- **macOS**: DMG installer
- **Windows**: NSIS installer
- **Linux**: AppImage and DEB packages

### Distribution
- **App ID**: com.claude.calculator
- **Product Name**: Calculator
- **Output Directory**: dist/

## Quality Assurance

### Testing
- **Framework**: Jest
- **Coverage**: Calculator logic and Electron integration
- **CI/CD**: Ready for GitHub Actions integration

### Code Quality
- **Linting**: Not configured (can be added)
- **Formatting**: Not configured (can be added)
- **Type Checking**: Not configured (can be added)