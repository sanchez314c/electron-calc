# Electron Calculator 🧮

> Modern Dark-Mode Calculator with Professional Interface

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Electron](https://img.shields.io/badge/Electron-39.0.0-47848F?logo=electron)](https://www.electronjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js)](https://nodejs.org/)
[![Platform](https://img.shields.io/badge/Platform-macOS%20|%20Windows%20|%20Linux-lightgrey)](https://github.com/superclaude/electron-calculator/releases)

## 📸 Main Interface

![Electron Calculator Screenshot](build_resources/screenshots/electron-calc-interface.jpg)

> A simple, clean, modern dark-mode Electron-based Calculator with professional interface

Electron Calculator is a sleek desktop application that provides a beautiful dark UI for mathematical calculations. Built with Electron, it offers a responsive interface with comprehensive keyboard support and cross-platform compatibility.

## ✨ Features

- 🧮 **Complete Calculator** - Full arithmetic operations (addition, subtraction, multiplication, division)
- 🌙 **Dark Mode UI** - Clean, modern dark theme optimized for comfortable viewing
- 🖥️ **Cross-Platform** - Works seamlessly on Windows, macOS, and Linux
- ⌨️ **Keyboard Support** - Full keyboard navigation and number input
- 🔒 **Secure Architecture** - Follows Electron security best practices with context isolation
- 🎯 **Error Handling** - Intelligent error handling including division by zero protection
- 💫 **Smooth Animations** - Elegant button interactions and visual feedback
- 📱 **Responsive Design** - Adapts to different window sizes and screen resolutions

## 🚀 Quick Start - One-Command Build & Run

### Option 1: One-Command Solution (Recommended)

```bash
# Clone and build
git clone https://github.com/superclaude/electron-calculator.git
cd electron-calculator

# Build and run with a single command!
./build-release-run.sh
```

### Option 2: Development Mode

```bash
# Run in development mode with hot reload
./build-release-run.sh --dev
```

### Build Options

```bash
# Build only (don't launch)
./build-release-run.sh --build-only

# Clean build
./build-release-run.sh --clean

# Build for specific platform
./build-release-run.sh --platform mac
./build-release-run.sh --platform win
./build-release-run.sh --platform linux

# Build for all platforms
./build-release-run.sh --platform all
```

## 📋 Prerequisites

For running from source:
- **Node.js** 16+ and npm
- **Git** (for cloning)

The application includes all necessary dependencies.

## 🛠️ Installation

### Detailed Installation

```bash
# Clone the repository
git clone https://github.com/superclaude/electron-calculator.git
cd electron-calculator

# Option 1: Use the install script (if needed)
cd dev && ./install.sh && cd ..

# Option 2: Manual installation
npm install

# Start the application
./build-release-run.sh
```

### Building from Source

```bash
# One-command build for current platform
./build-release-run.sh --build-only

# Build for all platforms
./build-release-run.sh --platform all --build-only

# Build for specific platforms
./build-release-run.sh --platform win --build-only
./build-release-run.sh --platform mac --build-only
./build-release-run.sh --platform linux --build-only
```

### Build Output Locations

After building, find your executables in:
- **macOS**: `dist/Calculator-*.dmg` and `dist/mac*/Calculator.app`
- **Windows**: `dist/Calculator Setup *.exe`
- **Linux**: `dist/Calculator-*.AppImage` and `dist/*.deb`

## 📖 Usage

### 1. Starting the Application

- **Pre-built Binary**: Just double-click the application
- **From Source**: Run `./build-release-run.sh`

### 2. Basic Calculations

Use either the on-screen buttons or keyboard:

- **Numbers**: `0-9`
- **Operations**: `+`, `-`, `*`, `/`
- **Equals**: `Enter` or `=`
- **Clear**: `Escape` or `C`
- **Decimal**: `.`

### 3. Keyboard Shortcuts

Full keyboard support for efficient calculations:
- `0-9`: Number input
- `+`, `-`, `*`, `/`: Basic operations
- `Enter` or `=`: Calculate result
- `Escape`: Clear all
- `Backspace`: Clear last entry
- `.`: Decimal point

## 🔧 Configuration

### Directory Structure

```
electron-calc/
├── src/                  # Source code
│   ├── main.js          # Electron main process
│   ├── preload.js       # Preload script
│   ├── index.html       # Application UI
│   ├── style.css        # Dark theme styles
│   └── renderer.js      # UI logic and interactions
├── build_resources/      # Build resources and assets
│   ├── icons/          # Platform-specific icons
│   └── screenshots/    # Application screenshots
├── scripts/             # Utility scripts
└── dist/                # Build outputs (generated)
```

### Environment Variables

```bash
# Set custom configuration directory
export ELECTRON_CALC_CONFIG=/path/to/config

# Enable debug mode
export ELECTRON_CALC_DEBUG=1
```

## 🐛 Troubleshooting

### Common Issues

<details>
<summary>Application won't start</summary>

- **macOS**: Allow app in Security & Privacy settings
- **Windows**: Run as administrator or check antivirus
- **Linux**: Check dependencies and permissions
</details>

<details>
<summary>Build failures</summary>

- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (requires 16.0+)
- Check disk space: Minimum 1GB free for builds
</details>

<details>
<summary>Performance issues</summary>

- Restart application
- Check system resources
- Update to latest version
</details>

## 📁 Project Structure

```
electron-calc/
├── package.json          # Node.js configuration and dependencies
├── package-lock.json     # Dependency lock file
├── tsconfig.json         # TypeScript configuration
├── .eslintrc.json        # ESLint configuration
├── src/                  # Source code
│   ├── main/            # Electron main process
│   │   ├── index.js
│   │   ├── services/
│   │   ├── utils/
│   │   └── windows/
│   ├── preload/         # Preload scripts
│   │   └── index.js
│   ├── renderer/        # Renderer process (UI)
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   ├── styles/
│   │   ├── utils/
│   │   └── index.html
│   └── shared/          # Shared utilities
│       ├── constants/
│       ├── utils/
│       └── types/
├── build_resources/      # Build resources and assets
│   ├── icons/           # Platform-specific icons
│   └── screenshots/     # Application screenshots
├── scripts/             # Utility scripts
│   ├── build-compile-dist.sh # Universal build script
├── tests/               # Test files
├── docs/                # Documentation
├── archive/             # Archived/backup files
└── dist/                # Build outputs (generated)
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or create issues for bug reports and feature requests.

### Development Setup

```bash
# Clone the repo
git clone https://github.com/superclaude/electron-calculator.git
cd electron-calculator

# Install dependencies
npm install

# Run in development mode
./build-release-run.sh --dev

# Run tests
npm test

# Lint code
npm run lint
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Electron](https://www.electronjs.org/) - For making cross-platform development possible
- [electron-builder](https://electron.build/) - Build and packaging tool
- The open-source community for inspiration and tools

## 🔗 Links

- [Report Issues](https://github.com/superclaude/electron-calculator/issues)
- [Request Features](https://github.com/superclaude/electron-calculator/issues/new?labels=enhancement)
- [Discussions](https://github.com/superclaude/electron-calculator/discussions)

---

**Electron Calculator v1.0** - Modern Dark-Mode Calculator
Built with AI!