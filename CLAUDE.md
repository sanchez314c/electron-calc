# Claude Instructions: Electron Calculator

## 📋 Project Overview

**Project Name**: Electron Calculator
**Version**: 1.0.0
**Type**: Cross-platform Desktop Application
**Technology**: Electron + JavaScript

This is a modern calculator application built with Electron, featuring a clean dark mode interface and professional architecture. The application demonstrates best practices in Electron development, security, and cross-platform compatibility.

## 🗂️ Technology Stack

### Core Technologies
- **Framework**: Electron v27.0.0
- **Language**: JavaScript (ES6+)
- **Build System**: electron-builder v24.6.4
- **Testing**: Jest
- **Package Manager**: npm

### Application Architecture
```
├── src/
│   ├── main.js          # Main Electron process (app lifecycle)
│   ├── preload.js       # Secure IPC bridge
│   ├── index.html       # Application UI
│   ├── style.css        # Dark theme styles
│   └── renderer.js      # UI logic and calculations
├── tests/
│   ├── calculator.test.js
│   ├── electron.test.js
│   └── jest.config.js
└── assets/icons/        # Application icons
```

### Key Locations
- **Entry Point**: `src/main.js`
- **UI Logic**: `src/renderer.js`
- **Styles**: `src/style.css`
- **Tests**: `tests/`
- **Build Config**: `package.json`

## 🎯 Development Context

### Code Conventions
- **JavaScript**: ES6+ features, modern syntax
- **Naming**: camelCase for variables/functions, PascalCase for classes
- **Structure**: Modular code with clear separation of concerns
- **Comments**: JSDoc style for functions, inline for complex logic

### Security Requirements
- **Context Isolation**: Must remain enabled
- **Node Integration**: Must remain disabled in renderer
- **Preload Scripts**: All IPC must go through secure preload bridge
- **CSP Headers**: Content Security Policy must be maintained

### Build Requirements
- **Platforms**: Windows (NSIS), macOS (DMG), Linux (AppImage + DEB)
- **Icons**: All required icon formats must be present
- **Signing**: Code signing for distribution builds

## 🚀 Common Tasks

### Development Workflow
```bash
# Setup development environment
npm install

# Run in development mode (with DevTools)
npm run dev

# Run in production mode
npm start

# Run tests
npm test

# Build for current platform
npm run build

# Build for all platforms
npm run build:all
```

### Testing Strategy
- **Unit Tests**: Calculator logic and utility functions
- **Integration Tests**: Electron-specific functionality
- **Coverage**: Maintain >85% test coverage
- **CI/CD**: Automated testing on all platforms

### Build Process
- **Development**: `npm run dev` - Hot reload, DevTools enabled
- **Production**: `npm run build` - Optimized build for distribution
- **All Platforms**: `npm run build:all` - Cross-platform builds
- **Packaging**: `npm run pack` - Directory build for testing

## 🧪 Testing Strategy

### Test Categories
1. **Calculator Logic**: Mathematical operations and edge cases
2. **UI Interactions**: Button clicks, keyboard input, display updates
3. **Electron Integration**: Window management, IPC communication
4. **Security**: Input validation, error handling

### Test Files
- `tests/calculator.test.js` - Core calculator functionality
- `tests/electron.test.js` - Electron-specific features
- `tests/jest.config.js` - Testing configuration

### Running Tests
```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- calculator.test.js
```

## 🔧 Configuration

### Environment Variables
```bash
# Development
NODE_ENV=development
DEBUG=true

# Build
BUILD_TARGET=all
BUILD_ARCH=x64,arm64

# Application
APP_VERSION=1.0.0
```

### Build Configuration (package.json)
```json
{
  "build": {
    "appId": "com.claude.calculator",
    "productName": "Calculator",
    "directories": {
      "output": "dist"
    }
  }
}
```

## 🚨 Important Notes

### Security Considerations
- **NEVER** enable nodeIntegration in renderer process
- **ALWAYS** use contextBridge for IPC communication
- **ALWAYS** validate and sanitize user inputs
- **NEVER** expose sensitive APIs to renderer process

### Platform-Specific Issues
- **macOS**: Requires specific icon formats and code signing
- **Windows**: NSIS installer requires proper file permissions
- **Linux**: AppImage and DEB packages have different requirements

### Performance Considerations
- Keep initial bundle size under 50MB
- Optimize images and assets
- Minimize IPC communication
- Use efficient DOM manipulation

## 🤝 Collaboration Guidelines

### Git Workflow
- **Branching**: `feature/`, `bugfix/`, `hotfix/` prefixes
- **Commits**: Clear, descriptive messages
- **PRs**: Include description, testing instructions, screenshots

### Code Quality
- **Linting**: ESLint configuration (if added)
- **Formatting**: Consistent code style
- **Testing**: All features must have tests
- **Documentation**: Update docs for API changes

### Release Process
1. Update version in package.json
2. Update CHANGELOG.md
3. Create git tag
4. Build for all platforms
5. Test installers on each platform
6. Create GitHub release

## 📚 Resources

### Documentation
- [Electron Docs](https://www.electronjs.org/docs) - Official documentation
- [Electron Security](https://www.electronjs.org/docs/tutorial/security) - Security best practices
- [Jest Docs](https://jestjs.io/docs/getting-started) - Testing framework

### Development Tools
- [electron-builder](https://www.electron.build/) - Build automation
- [Electron DevTools](https://www.electronjs.org/docs/tutorial/devtools-extension) - Development tools
- [VS Code Extensions](https://marketplace.visualstudio.com/) - Recommended extensions

### Community
- [Electron GitHub](https://github.com/electron/electron) - Issues and discussions
- [Electron Discord](https://discord.gg/electronjs) - Community support
- [Stack Overflow](https://stackoverflow.com/questions/tagged/electron) - Q&A

## 🚀 Current Focus Areas

### Immediate Priorities
1. **Quality Assurance**: Implement linting and formatting
2. **Testing**: Expand test coverage and add integration tests
3. **Performance**: Optimize bundle size and startup time
4. **Documentation**: Complete API documentation and guides

### Known Issues
1. **Large Numbers**: Display formatting for very large numbers
2. **Keyboard Input**: Some edge cases in keyboard handling
3. **Memory Usage**: Optimize memory usage during calculations
4. **Error Recovery**: Improve error handling and user feedback

### Enhancement Opportunities
1. **Scientific Mode**: Add advanced mathematical functions
2. **Themes**: Implement light mode and custom themes
3. **History**: Add calculation history feature
4. **Accessibility**: Improve screen reader support

## 🔧 Troubleshooting

### Common Issues
1. **Build Fails**: Clear node_modules and reinstall
2. **Icons Missing**: Run icon generation script
3. **Tests Fail**: Check Jest configuration and dependencies
4. **Security Warnings**: Verify preload script and CSP headers

### Debug Process
1. Check application logs in terminal/console
2. Use DevTools for renderer process debugging
3. Check main process logs for system-level issues
4. Verify all dependencies are installed correctly

---

**Remember**: This is a security-focused Electron application. Always prioritize security best practices and maintain the principle of least privilege in all IPC communications.