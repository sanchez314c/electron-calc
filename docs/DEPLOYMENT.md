# Deployment Guide

## Overview

This guide covers deploying the Electron Calculator application across different platforms and environments. It includes instructions for production deployment, distribution, and continuous deployment strategies.

## 🏗️ Deployment Targets

### Desktop Platforms

#### Windows
- **Target**: NSIS installer (.exe), MSI installer, Portable ZIP
- **Distribution**: GitHub Releases, official website, enterprise distribution
- **Signing**: Authenticode code signing recommended
- **Auto-Update**: Electron auto-updater integration

#### macOS
- **Target**: DMG installer, ZIP archive, PKG installer
- **Distribution**: GitHub Releases, Mac App Store (optional)
- **Signing**: Developer ID Application certificate required
- **Notarization**: Apple notarization for distribution outside App Store
- **Auto-Update**: Electron auto-updater integration

#### Linux
- **Target**: AppImage, DEB package, RPM package, SNAP package, TAR.GZ
- **Distribution**: GitHub Releases, Linux package repositories
- **Signing**: GPG signing for DEB/RPM packages recommended
- **Auto-Update**: Electron auto-updater integration

### Web Deployment (Optional)
- **Target**: Progressive Web App (PWA) version
- **Distribution**: Web hosting, CDN
- **Features**: Offline capability, installable on desktop

## 📦 Building for Deployment

### Prerequisites
- Node.js 16.0 or higher
- npm 7.0 or higher
- Git
- Platform-specific build tools (Xcode for macOS, Visual Studio for Windows)

### Build Commands
```bash
# Build for current platform
npm run build

# Build for all platforms
npm run build:all

# Build specific platform
npm run build:mac    # macOS
npm run build:win   # Windows
npm run build:linux # Linux

# Comprehensive build with all architectures
npm run build:maximum
```

### Build Output Structure
```
dist/
├── mac/                     # macOS builds
│   └── Calculator.app        # macOS application bundle
├── win-unpacked/             # Windows unpacked
├── linux-unpacked/           # Linux unpacked
├── Calculator Setup 1.0.0.exe  # Windows NSIS installer
├── Calculator-1.0.0.dmg      # macOS DMG
├── Calculator-1.0.0.AppImage  # Linux AppImage
└── latest.yml                # Auto-update metadata
```

## 🔐 Code Signing

### Windows (Authenticode)
1. Obtain a code signing certificate from a trusted CA
2. Install the certificate in Windows Certificate Store
3. Configure in `package.json`:
```json
{
  "build": {
    "win": {
      "certificateFile": "path/to/certificate.pfx",
      "certificatePassword": "password"
    }
  }
}
```
4. Build with signing: `npm run build:win`

### macOS (Developer ID)
1. Enroll in Apple Developer Program
2. Generate Developer ID Application certificate
3. Configure in `package.json`:
```json
{
  "build": {
    "mac": {
      "identity": "Developer ID Application: Your Name (TEAMID)"
    }
  }
}
```
4. Notarization (required for distribution):
```bash
xcrun notarytool submit dist/Calculator-1.0.0.dmg --keychain-profile "notarytool"
xcrun stapler staple dist/Calculator.app
```

### Linux (GPG Signing)
1. Generate GPG key pair
2. Configure for DEB/RPM signing
3. Sign packages post-build:
```bash
dpkg-sig --sign builder dist/Calculator-1.0.0.deb
rpm --addsign dist/Calculator-1.0.0.rpm
```

## 📤 Distribution

### GitHub Releases
1. Tag the release: `git tag v1.0.0`
2. Push tags: `git push --tags`
3. Create release on GitHub
4. Upload built packages to release assets
5. Update `latest.yml` for auto-updates

### Official Website
- Host installers on CDN (AWS S3, Cloudflare)
- Use HTTPS for all downloads
- Implement version checking
- Provide checksums for verification

### Enterprise Distribution
- Internal file servers
- MDM (Mobile Device Management) integration
- Custom update servers
- License key validation (if applicable)

## 🔄 Auto-Updates

### Configuration
Add to `package.json`:
```json
{
  "build": {
    "publish": [
      {
        "provider": "github",
        "owner": "superclaude",
        "repo": "electron-calculator"
      }
    ]
  }
}
```

### Implementation
1. Install `electron-updater`:
```bash
npm install --save-dev electron-updater
```
2. Configure in main process:
```javascript
const { autoUpdater } = require('electron-updater');

autoUpdater.setFeedURL({
  provider: 'github',
  owner: 'superclaude',
  repo: 'electron-calculator'
});

autoUpdater.checkForUpdatesAndNotify();
```
3. Handle update events in main process

### Update Strategy
- **Auto-Check**: Check for updates on startup
- **User Notification**: Show update dialog
- **Silent Updates**: Background updates when possible
- **Rollback**: Maintain previous version for recovery

## 🐳 Docker Deployment (Optional)

### Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY dist ./dist
COPY node_modules ./node_modules

EXPOSE 3000
CMD ["node", "dist/main/index.js"]
```

### Build and Run
```bash
# Build Docker image
docker build -t electron-calculator .

# Run container
docker run -p 3000:3000 electron-calculator
```

## 📊 Monitoring and Analytics

### Error Reporting
- Integrate with Sentry or similar service
- Capture crash reports
- Monitor usage patterns
- Track performance metrics

### Update Analytics
- Track update success rates
- Monitor adoption of new versions
- Identify common update issues
- Analyze user feedback

## 🔧 Troubleshooting

### Common Deployment Issues

#### Build Failures
- **Missing Dependencies**: Ensure all build tools are installed
- **Certificate Issues**: Verify code signing certificates are valid
- **Platform Mismatches**: Build on target platform or use CI/CD
- **Size Limits**: Optimize bundle size for distribution

#### Distribution Problems
- **Download Failures**: Check CDN availability and bandwidth
- **Signature Verification**: Ensure certificates are trusted
- **Installation Errors**: Verify compatibility with target OS
- **Auto-Update Failures**: Check network connectivity and firewall

#### Runtime Issues
- **Permission Errors**: Run installers with appropriate privileges
- **Path Issues**: Use relative paths in configuration
- **Version Conflicts**: Ensure consistent Node.js versions
- **Resource Limits**: Monitor memory and CPU usage

## 📚 Resources

### Official Documentation
- [Electron Builder](https://www.electron.build/) - Build and distribution
- [Electron Updater](https://www.electron.build/auto-update) - Auto-update implementation
- [Apple Developer](https://developer.apple.com/documentation/security/notarizing_macos_software_before_distribution) - macOS notarization
- [Microsoft Authenticode](https://docs.microsoft.com/en-us/windows/win32/seccrypto/authenticode) - Windows signing

### Tools
- [electron-builder](https://www.electron.build/) - Primary build tool
- [electron-updater](https://www.electron.build/auto-update) - Auto-update library
- [Sentry](https://sentry.io/) - Error monitoring
- [CodePush](https://docs.microsoft.com/en-us/appcenter/distribute/code-push) - Alternative update service

### Best Practices
- Always test on target platforms before distribution
- Use version pinning for dependencies
- Implement graceful degradation for updates
- Monitor deployment metrics and user feedback
- Maintain backward compatibility where possible

---

**Last Updated**: 2025-01-12  
**Version**: 1.0.0