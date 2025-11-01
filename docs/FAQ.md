# Frequently Asked Questions

## General

### What is Electron Calculator?
Electron Calculator is a cross-platform desktop application built with Electron that provides a modern, secure, and efficient calculator interface. It supports basic and advanced mathematical operations with a focus on user experience and security.

### Why use Electron for a calculator?
Electron allows for a consistent experience across Windows, macOS, and Linux while leveraging web technologies for UI development. It provides native-like performance and integration with desktop features.

### Is it free to use?
Yes, Electron Calculator is open-source and licensed under the MIT License. You can use, modify, and distribute it freely.

## Installation

### How do I install on Windows?
1. Download the `.exe` installer from the [Releases page](https://github.com/superclaude/electron-calculator/releases)
2. Run the installer as administrator
3. Follow the on-screen instructions
4. The application will be available in your Start Menu

### How do I install on macOS?
1. Download the `.dmg` file from the [Releases page](https://github.com/superclaude/electron-calculator/releases)
2. Open the DMG and drag the Calculator app to your Applications folder
3. If prompted, allow the application in System Preferences > Security & Privacy
4. Launch from Applications or Spotlight

### How do I install on Linux?
1. Download the `.AppImage` or `.deb` package from the [Releases page](https://github.com/superclaude/electron-calculator/releases)
2. For AppImage: Make it executable (`chmod +x Calculator.AppImage`) and run
3. For DEB: Install using your package manager (`sudo dpkg -i Calculator.deb`)
4. The application will be available in your applications menu

### Can I install from source?
Yes, follow these steps:

```bash
git clone https://github.com/superclaude/electron-calculator.git
cd electron-calculator
npm install
npm run build
```

Then run the built executable from the `dist/` folder.

## Usage

### How do I perform calculations?
- Use the on-screen buttons or keyboard
- Enter numbers using the number pad or top row keys
- Use `+`, `-`, `*`, `/` for operations
- Press `=` or `Enter` to calculate
- Use `C` or `Escape` to clear

### Does it support keyboard input?
Yes, full keyboard support is available:
- Numbers: `0-9`
- Operations: `+`, `-`, `*`, `/`
- Equals: `Enter` or `=`
- Clear: `Escape` or `C`
- Decimal: `.` or `,`

### Can I use memory functions?
Yes, the calculator supports memory operations:
- `MS`: Memory Store (save current value)
- `MR`: Memory Recall (use stored value)
- `MC`: Memory Clear (reset memory)
- `M+`: Memory Add (add to stored value)

### What happens if I divide by zero?
The calculator handles division by zero gracefully, displaying an error message instead of crashing. The display will show "Error" and the calculation will be cleared.

## Development

### How do I set up the development environment?
Follow the [Development Guide](development.md) for complete setup instructions, including Node.js installation, dependency management, and IDE configuration.

### What testing framework is used?
The project uses Jest for unit and integration testing. Run `npm test` to execute the test suite.

### How do I build for different platforms?
Use the build scripts in `package.json`:
- `npm run build:win` for Windows
- `npm run build:mac` for macOS
- `npm run build:linux` for Linux
- `npm run build:all` for all platforms

### How do I contribute?
See the [Contributing Guide](../CONTRIBUTING.md) for detailed instructions on reporting issues, submitting pull requests, and following code style guidelines.

## Security

### Is the application secure?
Yes, the Electron Calculator follows Electron security best practices:
- Context isolation enabled
- Node integration disabled in renderer
- Secure IPC communication via preload scripts
- Content Security Policy implemented
- Input validation for all user inputs

### How are updates handled?
The application supports auto-updates through the Electron Updater module. Updates are downloaded from GitHub Releases and installed automatically.

### Does it collect any data?
No, the Electron Calculator does not collect or transmit any user data. All calculations are performed locally on your device.

## Performance

### Why is the startup time slow?
The initial startup time includes loading the Electron runtime and application resources. Subsequent launches are faster. The application is optimized for minimal bundle size (~45MB compressed).

### Can I make it faster?
- Close other resource-intensive applications
- Ensure sufficient RAM (8GB recommended)
- Update to the latest version for performance improvements
- Disable unnecessary browser extensions if using DevTools

### What are the system requirements?
- **Minimum**: 4GB RAM, 2GB storage, modern OS
- **Recommended**: 8GB RAM, SSD storage, latest OS updates

## Troubleshooting

### The application won't start
1. Ensure Node.js 16+ is installed if building from source
2. Check antivirus software isn't blocking the application
3. On macOS, allow the app in System Preferences > Security & Privacy
4. Try running as administrator on Windows

### Calculations are incorrect
- Verify input using the on-screen buttons
- Check for proper operator precedence
- Ensure decimal points are correctly placed
- Restart the application if memory functions seem off

### Keyboard shortcuts don't work
- Ensure focus is on the calculator window
- Check OS keyboard layout settings
- Try using the on-screen buttons to verify functionality
- Restart the application

### Build fails during development
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node.js version compatibility
- Ensure all dependencies are installed
- Review build logs for specific errors

### I found a bug
Please report it on the [GitHub Issues page](https://github.com/superclaude/electron-calculator/issues). Include:
- Steps to reproduce
- Expected vs actual behavior
- Operating system and version
- Application version

## Support

### Where can I get help?
- **Documentation**: Check the [Documentation Index](index.md)
- **Issues**: [GitHub Issues](https://github.com/superclaude/electron-calculator/issues)
- **Discussions**: [GitHub Discussions](https://github.com/superclaude/electron-calculator/discussions)
- **Community**: Join the [Electron Discord](https://discord.gg/electronjs)

### How do I report a security vulnerability?
Security issues should be reported privately to security@superclaude.ai. Do not open public issues for security concerns. See the [Security Policy](security.md) for details.

### Can I request new features?
Yes! Feature requests can be submitted through [GitHub Issues](https://github.com/superclaude/electron-calculator/issues) using the feature request template. Include use cases and expected behavior.

---

**Last Updated**: 2025-01-12  
**Version**: 1.0.0