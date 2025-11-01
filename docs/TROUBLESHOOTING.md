# Troubleshooting

## Common Issues and Solutions

### Application Won't Start

#### Windows
- **Antivirus Blocking**: Some antivirus software may flag Electron applications. Add an exception for the Calculator executable.
- **Missing Dependencies**: Ensure Microsoft Visual C++ Redistributable is installed (usually included in the installer).
- **Permission Issues**: Run the installer as administrator and ensure the application has execute permissions.

#### macOS
- **Gatekeeper Blocking**: macOS may block unsigned applications. Right-click the app, select "Open", and confirm in the dialog.
- **Security & Privacy Settings**: Go to System Preferences > Security & Privacy > General and allow the application.
- **Rosetta 2**: On Apple Silicon Macs, ensure Rosetta 2 is installed if using an Intel build.

#### Linux
- **Missing Libraries**: Install required system libraries:
  ```bash
  # Ubuntu/Debian
  sudo apt install libgtk-3-0 libnotify4 libnss3 libxss1 libxtst6 libatspi2.0-0 libdrm2 libxkbcommon0 libxkbcommon-x11-0 libxcb1 libxdamage1 libxfixes3 libxrandr2 libgbm1 libasound2

  # Fedora
  sudo dnf install gtk3 libnotify nss libXScrnSaver libXtst at-spi2-atk libdrm libxkbcommon libxcb libXdamage libXrandr mesa-libgbm alsa-lib
  ```
- **AppImage Execution**: Make sure the AppImage is executable: `chmod +x Calculator.AppImage`
- **Desktop Integration**: Install `fuse` for better AppImage support: `sudo apt install fuse`

### Calculation Errors

#### Division by Zero
- **Symptom**: Display shows "Error" when dividing by zero
- **Solution**: The application handles division by zero gracefully. Clear the display (`C`) and enter a non-zero divisor.

#### Invalid Input
- **Symptom**: Operations fail with invalid characters or formats
- **Solution**: Only use numbers, decimal points, and operators (`+`, `-`, `*`, `/`). Use parentheses for complex expressions.

#### Large Numbers
- **Symptom**: Results display in scientific notation or show overflow
- **Solution**: The calculator handles large numbers appropriately. For precision work, consider using scientific mode (planned for v1.1).

### Keyboard Issues

#### Shortcuts Not Working
- **Cause**: Focus not on calculator window or OS keyboard layout conflicts
- **Solution**: 
  1. Click inside the calculator window to ensure focus
  2. Check OS keyboard settings for custom layouts
  3. Try the on-screen buttons to verify functionality
  4. Restart the application

#### International Keyboards
- **Issue**: Non-standard keyboard layouts may map differently
- **Solution**: Use the number pad for digits or switch to a standard US layout temporarily

### Performance Problems

#### Slow Startup
- **Causes**: Large bundle size, system resource constraints, antivirus scanning
- **Solutions**:
  - Close other resource-intensive applications
  - Ensure at least 8GB RAM available
  - Update to the latest version (performance improvements included)
  - Disable real-time antivirus scanning for the application

#### High Memory Usage
- **Causes**: Memory leaks, large calculation history, multiple instances
- **Solutions**:
  - Close and restart the application periodically
  - Clear calculation history regularly
  - Ensure no multiple instances are running
  - Update graphics drivers (GPU acceleration)

#### Application Freezes
- **Causes**: Complex calculations, system resource limits
- **Solutions**:
  - Wait for the calculation to complete (rare for basic operations)
  - Restart the application
  - Check system resources (CPU, RAM usage)
  - Update to latest version for performance fixes

### Build and Development Issues

#### npm install Fails
- **Causes**: Network issues, corrupted cache, version conflicts
- **Solutions**:
  ```bash
  # Clear npm cache
  npm cache clean --force

  # Remove node_modules and reinstall
  rm -rf node_modules package-lock.json
  npm install

  # Try with different registry
  npm install --registry https://registry.npmjs.org/
  ```

#### Build Errors
- **Common Causes**: Missing dependencies, platform mismatches, configuration issues
- **Solutions**:
  1. Ensure Node.js version is 16.0 or higher
  2. Check platform-specific requirements (Xcode for macOS, Visual Studio for Windows)
  3. Review build logs for specific error messages
  4. Try building for a single platform first

#### Test Failures
- **Causes**: Environment issues, dependency versions, test data problems
- **Solutions**:
  ```bash
  # Run specific test
  npm test -- tests/calculator.test.js

  # Update dependencies
  npm update

  # Clear test cache
  npx jest --clearCache
  ```

### Platform-Specific Issues

#### Windows
- **UAC Prompts**: Normal for first-time installations; subsequent launches shouldn't prompt
- **Antivirus Interference**: Add exception for the Calculator folder
- **High DPI Displays**: Ensure Windows display scaling is set appropriately

#### macOS
- **Sandboxing**: The application runs sandboxed for security; some file operations may be restricted
- **Rosetta 2**: Intel builds on Apple Silicon require Rosetta 2 (installed automatically on first run)
- **Gatekeeper**: First launch may require manual approval in Security settings

#### Linux
- **Library Dependencies**: Ensure all required libraries are installed (see installation guide)
- **Desktop Integration**: AppImage provides portable desktop integration; DEB packages integrate with system menus
- **Wayland Compatibility**: Some features may behave differently on Wayland vs X11

### Security Concerns

#### Unsigned Application
- **Issue**: macOS warns about unsigned applications
- **Solution**: Download from official GitHub Releases (signed) or build from source with proper signing

#### Network Access
- **Issue**: Application attempts to connect to the internet
- **Explanation**: Only for auto-updates; no data collection occurs. Disable auto-updates in settings if concerned.

#### Permissions
- **Issue**: Application requests unusual permissions
- **Explanation**: The calculator requires minimal permissions. File access is limited to necessary operations.

## Advanced Troubleshooting

### Log Files
Enable debug logging by setting `DEBUG=true` in your environment:

```bash
# Windows (Command Prompt)
set DEBUG=true && npm run dev

# macOS/Linux
DEBUG=true npm run dev
```

Logs will be output to the console. Check for error messages and share them when reporting issues.

### Crash Reports
If the application crashes, check the crash reporter output in the console. For production builds, crash reports are sent to the development team (anonymously) to improve stability.

### Memory Debugging
Use Chrome DevTools to profile memory usage:
1. Open DevTools (F12 or Cmd+Option+I)
2. Go to Memory tab
3. Take heap snapshots before and after operations
4. Look for memory leaks or excessive allocations

### Network Debugging
If experiencing update issues:
1. Check internet connectivity
2. Verify GitHub API access (no VPN blocking)
3. Disable firewall/antivirus temporarily for testing
4. Check the latest.yml file in the release assets

## Getting Support

### Community Support
- **GitHub Issues**: Report bugs and request features
- **Discussions**: Ask questions and share ideas
- **Electron Discord**: General Electron development help

### Professional Support
For enterprise deployments or custom integrations, contact support@superclaude.ai.

### Documentation
Refer to the [Documentation Index](index.md) for detailed guides on specific topics.

---

**Last Updated**: 2025-01-12  
**Version**: 1.0.0