# Installation Guide

Detailed installation instructions for Electron Calculator on all supported platforms.

## 📋 System Requirements

### Minimum Requirements
- **Operating System**: 
  - macOS 10.14 (Mojave) or later
  - Windows 10 or later
  - Linux (Ubuntu 18.04+, Fedora 28+, Debian 10+, or equivalent)
- **Memory**: 512 MB RAM
- **Storage**: 100 MB free disk space
- **Display**: 1024x768 resolution

### Recommended Requirements
- **Operating System**: Latest version of your OS
- **Memory**: 2 GB RAM
- **Storage**: 500 MB free disk space
- **Display**: 1920x1080 resolution or higher

## 🍎 macOS Installation

### Method 1: DMG Installer (Recommended)

1. **Download** the latest `.dmg` file from [Releases](https://github.com/superclaude/electron-calculator/releases)
2. **Open** the downloaded file (double-click)
3. **Drag** Calculator to your Applications folder
4. **Launch** from:
   - Applications folder
   - Spotlight search (Cmd + Space, type "Calculator")
   - Launchpad (if enabled)

### Method 2: Homebrew Cask

```bash
# Install via Homebrew
brew install --cask electron-calculator

# Or if you have the tap
brew install superclaude/tap/electron-calculator
```

### Method 3: Manual Installation

1. Download the `.zip` file from Releases
2. Extract the archive
3. Move `Calculator.app` to `/Applications/`
4. Run: `sudo xattr -rd /Applications/Calculator.app` (to remove quarantine)

### Gatekeeper Issues

If you see "unidentified developer" error:

```bash
# Allow the app to run
sudo xattr -rd /Applications/Calculator.app
```

Or right-click the app and select "Open" from the context menu.

## 🪟 Windows Installation

### Method 1: NSIS Installer (Recommended)

1. **Download** the latest `.exe` installer from [Releases](https://github.com/superclaude/electron-calculator/releases)
2. **Run** the installer (right-click, "Run as administrator" if needed)
3. **Follow** the installation wizard:
   - Accept the license agreement
   - Choose installation directory (default: `C:\Program Files\Calculator`)
   - Select start menu folder
   - Choose desktop shortcut creation
4. **Launch** from:
   - Start Menu
   - Desktop shortcut
   - Installation directory

### Method 2: Portable Version

1. Download the `.zip` portable version
2. Extract to a folder of your choice
3. Run `Calculator.exe` directly
4. No installation required!

### Method 3: Microsoft Store

If available in your region:

1. Open Microsoft Store
2. Search for "Electron Calculator"
3. Click "Get" or "Install"
4. Launch from Start Menu

### Windows Defender/SmarScreen

If Windows blocks the installation:

1. Click "More info" on the warning screen
2. Click "Run anyway"
3. The application is safe - this is a false positive

### Method 4: Chocolatey

```powershell
# Install via Chocolatey
choco install electron-calculator
```

## 🐧 Linux Installation

### Ubuntu/Debian (.deb)

```bash
# Download and install
wget https://github.com/superclaude/electron-calculator/releases/latest/download/calculator.deb
sudo dpkg -i calculator.deb

# If dependencies are missing
sudo apt-get install -f
```

### Fedora/CentOS/RHEL (.rpm)

```bash
# Download and install
wget https://github.com/superclaude/electron-calculator/releases/latest/download/calculator.rpm
sudo rpm -i calculator.rpm

# Or use dnf (newer Fedora)
sudo dnf install calculator.rpm
```

### AppImage (Universal)

```bash
# Download
wget https://github.com/superclaude/electron-calculator/releases/latest/download/calculator.AppImage

# Make executable
chmod +x calculator.AppImage

# Run
./calculator.AppImage
```

### Snap

```bash
# Install from Snap Store
sudo snap install electron-calculator

# Or download and install
wget https://github.com/superclaude/electron-calculator/releases/latest/download/calculator.snap
sudo snap install calculator.snap --dangerous
```

### AUR (Arch Linux)

```bash
# Using yay
yay -S electron-calculator

# Or manually
git clone https://aur.archlinux.org/electron-calculator.git
cd electron-calculator
makepkg -si
```

### Flatpak

```bash
# Install from Flathub
flatpak install flathub com.superclaude.calculator

# Run
flatpak run com.superclaude.calculator
```

## 🔧 Development Installation

### From Source

1. **Prerequisites**:
   ```bash
   # Ubuntu/Debian
   sudo apt-get install nodejs npm
   
   # Fedora/CentOS
   sudo dnf install nodejs npm
   
   # macOS (using Homebrew)
   brew install node
   ```

2. **Clone and Install**:
   ```bash
   git clone https://github.com/superclaude/electron-calculator.git
   cd electron-calculator
   npm install
   npm start
   ```

### Docker (Experimental)

```bash
# Build Docker image
docker build -t electron-calculator .

# Run with X11 forwarding (Linux)
docker run -it --rm \
  -e DISPLAY=$DISPLAY \
  -v /tmp/.X11-unix:/tmp/.X11-unix \
  electron-calculator
```

## 🔄 Updates

### Automatic Updates
- Windows: Auto-update is enabled by default
- macOS: Check for updates in the app menu
- Linux: Updates through package manager

### Manual Updates
1. Download the latest version from [Releases](https://github.com/superclaude/electron-calculator/releases)
2. Install over the existing version
3. Your settings will be preserved

## 🗑️ Uninstallation

### macOS
```bash
# Remove app
sudo rm -rf /Applications/Calculator.app

# Remove preferences
rm ~/Library/Preferences/com.electron.calculator.plist
rm -rf ~/Library/Application\ Support/Calculator
```

### Windows
1. Use "Add or Remove Programs" in Control Panel
2. Or run the uninstaller from the installation directory
3. Delete user data: `%APPDATA%\Calculator`

### Linux
```bash
# Debian/Ubuntu
sudo apt-get remove electron-calculator

# Fedora/CentOS
sudo rpm -e electron-calculator

# AppImage
rm calculator.AppImage

# Snap
sudo snap remove electron-calculator
```

## 🐛 Troubleshooting

### Common Issues

1. **App won't start**:
   - Check system requirements
   - Update graphics drivers
   - Run from terminal to see errors

2. **Permission denied**:
   - macOS: `sudo xattr -rd /Applications/Calculator.app`
   - Linux: `chmod +x calculator.AppImage`

3. **Missing dependencies** (Linux):
   ```bash
   # Ubuntu/Debian
   sudo apt-get install libgtk-3-0 libnotify4 libnss3 libxss1 libxtst6 xdg-utils
   
   # Fedora
   sudo dnf install gtk3 libnotify nss libXScrnSaver libXtst xdg-utils
   ```

### Getting Help

- 📖 [Troubleshooting Guide](TROUBLESHOOTING.md)
- 🐛 [Report an Issue](https://github.com/superclaude/electron-calculator/issues)
- 💬 [GitHub Discussions](https://github.com/superclaude/electron-calculator/discussions)

---

**Need more help? Contact us at support@superclaude.ai**