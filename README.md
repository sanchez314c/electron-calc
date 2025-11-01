# Electron Calculator

[![CI/CD Pipeline](https://github.com/superclaude/electron-calculator/workflows/CI%2FCD%20Pipeline/badge.svg)](https://github.com/superclaude/electron-calculator/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/electron-calculator.svg)](https://badge.fury.io/js/electron-calculator)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=superclaude_electron-calculator&metric=alert_status)](https://sonarcloud.io/dashboard?id=superclaude_electron-calculator)

A simple, clean, modern dark-mode Electron-based Calculator application for macOS, Windows, and Linux.

## 🚀 Features

- **Cross-platform**: Works on macOS, Windows, and Linux
- **Modern Dark Mode**: Easy on the eyes with a sleek dark theme
- **Clean Interface**: Minimalist design focused on functionality
- **Keyboard Support**: Full keyboard navigation and shortcuts
- **Lightweight**: Fast startup and minimal resource usage

## 📦 Installation

### Download Pre-built Binaries

1. Go to the [Releases](https://github.com/superclaude/electron-calculator/releases) page
2. Download the appropriate package for your platform:
   - **macOS**: `.dmg` file
   - **Windows**: `.exe` installer or portable version
   - **Linux**: `.AppImage`, `.deb`, or `.rpm` package

### Install from Source

```bash
# Clone the repository
git clone https://github.com/superclaude/electron-calculator.git
cd electron-calculator

# Install dependencies
npm install

# Run the application
npm start
```

## 🛠️ Development

### Prerequisites

- Node.js 16+ 
- npm 7+

### Development Setup

```bash
# Clone the repository
git clone https://github.com/superclaude/electron-calculator.git
cd electron-calculator

# Install dependencies
npm install

# Start development mode with hot reload
npm run dev

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Lint code
npm run lint

# Format code
npm run format
```

### Building

```bash
# Build for current platform
npm run build

# Build for all platforms
npm run build:all

# Build with maximum optimization
npm run build:maximum

# Validate build artifacts
npm run validate:build
```

## 📁 Project Structure

```
electron-calc/
├── src/
│   ├── main/           # Main Electron process
│   │   ├── index.js
│   │   ├── services/
│   │   ├── utils/
│   │   └── windows/
│   ├── preload/        # Preload scripts
│   │   └── index.js
│   ├── renderer/       # Renderer process (UI)
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   ├── styles/
│   │   ├── utils/
│   │   └── index.html
│   └── shared/         # Shared utilities
│       ├── constants/
│       ├── utils/
│       └── types/
├── scripts/           # Build and utility scripts
├── config/            # Configuration files
├── tests/             # Test files
├── docs/              # Documentation
├── build-resources/    # Build assets and icons
└── dist/              # Build output (generated)
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

## 📦 Build Configuration

The application uses [electron-builder](https://electron.build/) for packaging. Build configuration is in:

- `package.json` - Primary build configuration
- `config/build.json` - Detailed build settings

### Build Targets

- **macOS**: DMG, ZIP, PKG
- **Windows**: NSIS installer, MSI, Portable
- **Linux**: AppImage, DEB, RPM, SNAP, TAR.GZ

## 🔧 Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start the application |
| `npm run dev` | Start in development mode |
| `npm run build` | Build for current platform |
| `npm run build:all` | Build for all platforms |
| `npm run build:maximum` | Build with maximum optimization |
| `npm test` | Run tests |
| `npm run lint` | Lint source code |
| `npm run format` | Format source code |
| `npm run clean` | Clean build artifacts |
| `npm run validate:build` | Validate build artifacts |

## 🎨 Design

### UI Components

- **Display**: Large, clear number display
- **Buttons**: Responsive button grid with hover effects
- **Theme**: Dark mode with high contrast
- **Layout**: Standard calculator layout

### Keyboard Shortcuts

- `0-9`: Number input
- `+`, `-`, `*`, `/`: Basic operations
- `Enter` or `=`: Calculate result
- `Escape`: Clear all
- `Backspace`: Clear last entry

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Keep the UI clean and consistent

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Electron](https://electronjs.org/) - Cross-platform desktop framework
- [electron-builder](https://electron.build/) - Build and packaging tool
- [Jest](https://jestjs.io/) - Testing framework

## 📞 Support

- 📧 Email: support@superclaude.ai
- 🐛 Issues: [GitHub Issues](https://github.com/superclaude/electron-calculator/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/superclaude/electron-calculator/discussions)

---

**Made with ❤️ by [SuperClaude](https://superclaude.ai)**