# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a cross-platform Electron calculator application with a modern dark-mode interface. The application follows Electron's multi-process architecture with separate main, preload, and renderer processes.

## Development Commands

### Core Development
- `npm start` - Start the application in production mode
- `npm run dev` - Start in development mode with DevTools automatically opened
- `npm test` - Run Jest tests
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:watch` - Run tests in watch mode

### Code Quality
- `npm run lint` - Run ESLint on source code
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting without making changes

### Build & Distribution
- `npm run build` - Build for current platform
- `npm run build:all` - Build for all platforms (Windows, macOS, Linux)
- `npm run build:maximum` - Build with maximum optimization across all platforms and architectures
- `npm run build:clean` - Build without cleanup or bloat checking
- `npm run pack` - Pack application without creating distributables
- `npm run clean` - Remove all build artifacts (dist, build, out, release directories)

### Dependency Management
- `npm run deps:install` - Install dependencies using ci with offline preference
- `npm run deps:update` - Update all dependencies
- `npm run deps:audit` - Audit dependencies for security issues

### Specialized Scripts
- `npm run bloat-check` - Check build size and identify potential bloat
- `npm run validate:build` - Validate build artifacts
- `npm run prepare-release` - Complete release preparation pipeline
- `npm run temp-clean` - Remove temporary files (*.tmp, *.temp)

## Architecture Overview

### Process Structure
The application follows Electron's security-focused multi-process architecture:

1. **Main Process** (`src/main/index.js`)
   - Application lifecycle management
   - Window creation and management
   - Native menu bar setup
   - Inter-process communication (IPC) handling
   - Security enforcement (prevents new window creation)

2. **Preload Script** (`src/preload/index.js`)
   - Secure bridge between main and renderer processes
   - Exposes limited, safe API via `contextBridge`
   - Implements cleanup functions for event listeners
   - Removes global Node.js APIs for security

3. **Renderer Process** (`src/renderer/`)
   - UI implementation using vanilla HTML/CSS/JavaScript
   - Calculator logic implementation in `src/renderer/utils/renderer.js`
   - No direct Node.js access (sandboxed)

### Key Implementation Details

**Calculator Class** (`src/renderer/utils/renderer.js`):
- Implements complete calculator functionality including memory operations
- Handles keyboard input with comprehensive key mapping
- Provides visual feedback with button animations
- Supports both mouse and keyboard interaction
- Maintains calculation state (current/previous values, operators)

**Security Architecture**:
- Context isolation enabled
- Node integration disabled in renderer
- Preload script provides controlled API exposure
- Prevents new window creation
- Removes global Node.js APIs from renderer scope

**Menu Integration**:
- Custom application menu with calculator-specific functions
- Cross-platform accelerator support (Cmd/Ctrl variants)
- IPC communication for menu actions (clear operations)

### Build Configuration

The project uses electron-builder with comprehensive platform support:

**Primary Configuration** (`package.json` build section):
- Multi-target builds for each platform
- Architecture support (x64, arm64, ia32 where applicable)
- Platform-specific optimizations and entitlements
- Maximum compression setting

**Secondary Configuration** (`config/build.json`):
- Additional build settings and validation hooks
- Pre/post build script integration
- Publishing configuration for GitHub releases

## File Organization Patterns

**Source Code Structure**:
- `src/main/` - Main process code
- `src/preload/` - Preload scripts for secure IPC
- `src/renderer/` - Frontend UI and logic
  - `renderer/utils/` - Application logic
  - `renderer/styles/` - CSS styling
  - `renderer/index.html` - Main HTML structure

**Build Assets**:
- `build_resources/` - Icons, entitlements, and build-specific files
- `config/` - Build and application configuration
- `scripts/` - Build automation and utility scripts

## Development Practices

When working with this codebase:

1. **Security First**: Always maintain process isolation and never expose Node.js APIs directly to renderer
2. **Cross-Platform**: Test on multiple platforms when making UI/OS-specific changes
3. **Performance**: Monitor bundle size with `npm run bloat-check`
4. **Testing**: Write tests for new calculator features
5. **Documentation**: Update relevant documentation when adding features

## Testing

Tests are configured with Jest and jsdom for DOM testing. The test setup supports:
- Unit tests for calculator logic
- Integration tests for UI interactions
- Coverage reporting
- Watch mode for development

## Build Validation

The project includes comprehensive build validation:
- Pre-build linting and testing requirements
- Post-build artifact validation
- Bloat checking for package size management
- Multi-platform build verification