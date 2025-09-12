# Electron Calculator

![Status](https://img.shields.io/badge/Status-Active-green)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Electron](https://img.shields.io/badge/Electron-27.0.0-47848F)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933)
![Platforms](https://img.shields.io/badge/Platforms-Windows%20%7C%20macOS%20%7C%20Linux-007ACC)

A modern, cross-platform calculator application built with Electron featuring a clean dark mode interface and professional architecture.

## 📋 Overview

This Electron-based calculator provides a clean, modern interface for performing mathematical calculations across Windows, macOS, and Linux platforms. Built with security best practices and featuring a responsive dark mode design.

## ✨ Features

- 🧮 **Complete Calculator** - Full arithmetic operations (addition, subtraction, multiplication, division)
- 🌙 **Dark Mode UI** - Clean, modern dark theme optimized for comfortable viewing
- 🖥️ **Cross-Platform** - Works seamlessly on Windows, macOS, and Linux
- ⌨️ **Keyboard Support** - Full keyboard navigation and number input
- 🔒 **Secure Architecture** - Follows Electron security best practices with context isolation
- 🎯 **Error Handling** - Intelligent error handling including division by zero protection
- 💫 **Smooth Animations** - Elegant button interactions and visual feedback
- 📱 **Responsive Design** - Adapts to different window sizes and screen resolutions

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (LTS version recommended)
- npm (comes with Node.js)

### Installation
```bash
# Clone repository
git clone [repository-url]
cd electron-calculator

# Install dependencies
npm install

# Run application
npm start
```

### Development
```bash
# Development mode with DevTools
npm run dev

# Run tests
npm test

# Build for distribution
npm run build
```

## 🗂️ Project Structure

See [TECH-STACK.md](TECH-STACK.md) for technology details.

```
├── src/                    # Source code
│   ├── main.js            # Electron main process
│   ├── preload.js         # Secure IPC bridge
│   ├── index.html         # Application UI
│   ├── style.css          # Dark theme styles
│   └── renderer.js        # UI logic and interactions
├── tests/                 # Test files
│   ├── calculator.test.js # Feature tests
│   ├── electron.test.js   # Electron integration tests
│   └── jest.config.js     # Testing configuration
├── assets/                # Static assets
│   └── icons/            # Application icons
├── docs/                  # Documentation
├── scripts/               # Build and utility scripts
└── config/               # Configuration files
```

## 📚 Documentation

- [Product Requirements](dev/PRDs/PRD.md)
- [Technical Stack](TECH-STACK.md)
- [Learning Journey](LEARNINGS.md)
- [Roadmap](TODO.md)
- [Claude Instructions](CLAUDE.md)
- [Setup Guide](docs/guides/setup.md)
- [API Documentation](docs/technical/api/README.md)

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## 📄 License

[MIT](LICENSE) - see the LICENSE file for details.

---

**Built with ❤️ using Electron and modern web technologies.**