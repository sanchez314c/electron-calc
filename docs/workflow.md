# Development Workflow

## Daily Development Workflow

### 1. Environment Setup
```bash
# Clone the repository
git clone https://github.com/superclaude/electron-calculator.git
cd electron-calculator

# Install dependencies
npm install

# Verify setup
npm run dev
```

### 2. Making Changes
1. **Create Feature Branch**:
   ```bash
   git checkout -b feature/new-calculation-mode
   ```

2. **Development Cycle**:
   - Make code changes
   - Save files (auto-reload in dev mode)
   - Test functionality in the running app
   - Use DevTools for debugging

3. **Run Tests**:
   ```bash
   # Run all tests
   npm test

   # Run specific test file
   npm test -- tests/calculator.test.js

   # Watch mode for development
   npm run test:watch
   ```

### 3. Code Review Preparation
- Ensure all tests pass
- Check code style with ESLint
- Update documentation if API changes
- Verify cross-platform compatibility

### 4. Commit and Push
```bash
# Commit changes with conventional message
git add .
git commit -m "feat: add scientific calculation mode

Implement sin, cos, tan functions with proper error handling."

# Push to remote
git push origin feature/new-calculation-mode
```

### 5. Pull Request Process
1. Create pull request on GitHub
2. Reference related issues
3. Include testing instructions
4. Wait for review and address feedback
5. Merge when approved

## Continuous Integration

### GitHub Actions Workflow
The project uses GitHub Actions for CI/CD:

- **Linting**: ESLint for code quality
- **Testing**: Jest for unit and integration tests
- **Building**: Cross-platform builds
- **Security**: Dependency scanning

### Local CI Simulation
```bash
# Run full CI pipeline locally
npm run lint
npm test
npm run build:all
npm run test:coverage
```

## Release Workflow

### Preparation
1. **Update Version**:
   ```bash
   npm version patch  # or minor, major
   ```

2. **Update Changelog**:
   - Add new entries to CHANGELOG.md
   - Follow conventional commit format

3. **Tag Release**:
   ```bash
   git tag v1.0.1
   git push --tags
   ```

### Building Release
```bash
# Build all platforms
npm run build:maximum

# Verify builds
ls -la dist/
```

### Publishing
1. Create GitHub Release
2. Upload built packages
3. Update release notes
4. Test auto-update functionality

## Testing Workflow

### Unit Testing
- Write tests for new features immediately
- Maintain >85% code coverage
- Test edge cases and error conditions
- Use descriptive test names

### Integration Testing
- Test IPC communication between processes
- Verify preload script API exposure
- Test cross-platform behaviors

### Manual Testing Checklist
- [ ] Basic arithmetic operations
- [ ] Keyboard input functionality
- [ ] Error handling (division by zero, invalid input)
- [ ] Memory functions (store, recall, clear)
- [ ] Window management (minimize, close)
- [ ] Cross-platform appearance and behavior

## Debugging Workflow

### Development Debugging
1. **Enable DevTools**:
   ```javascript
   if (process.env.NODE_ENV === 'development') {
     mainWindow.webContents.openDevTools();
   }
   ```

2. **Console Logging**:
   - Use `console.log` in both main and renderer processes
   - Check DevTools console for renderer logs
   - Use `electron-log` for structured logging

3. **IPC Debugging**:
   ```javascript
   // In main process
   ipcMain.on('channel', (event, arg) => {
     console.log('IPC received:', arg);
     // Handle message
   });
   ```

### Production Debugging
- Enable crash reporting
- Use `electron-log` for file-based logging
- Implement error boundaries in renderer
- Monitor system resources

## Code Review Standards

### What to Check
- **Security**: Validate all inputs, check IPC exposure
- **Performance**: Look for inefficient operations
- **Compatibility**: Verify cross-platform behavior
- **Testing**: Ensure new features have tests
- **Documentation**: Check JSDoc and README updates

### Review Process
1. **Automated Checks**: Linting, testing, build verification
2. **Manual Review**: Code quality, security, performance
3. **Testing**: Verify functionality on multiple platforms
4. **Approval**: Merge when all checks pass

## Maintenance Workflow

### Weekly Tasks
- Run `npm audit` for dependency vulnerabilities
- Update dependencies with `npm update`
- Run full test suite
- Check code coverage
- Review open issues and PRs

### Monthly Tasks
- Performance benchmarking
- Bundle size analysis
- Security scanning
- Documentation review
- Backup verification

### Quarterly Tasks
- Major dependency upgrades
- Platform compatibility testing
- Security audit
- Performance optimization
- Release planning

---

**Last Updated**: 2025-01-12  
**Version**: 1.0.0