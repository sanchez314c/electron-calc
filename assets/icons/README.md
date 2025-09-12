# Icon Generation Instructions

## Overview
This project uses placeholder icon files. For production deployment, you need to generate actual icon files in the required formats.

## Quick Setup (Recommended)
1. Install electron-icon-builder:
   ```bash
   npm install -g electron-icon-builder
   ```

2. Generate all platform icons from SVG:
   ```bash
   electron-icon-builder --input=assets/icons/icon.svg --output=assets/icons/ --flatten
   ```

## Manual Setup
If you prefer manual conversion:

### Windows (ICO)
- Use online converters or tools like ImageMagick
- Include sizes: 16x16, 24x24, 32x32, 48x48, 256x256
- Save as `icon.ico`

### macOS (ICNS)
- Use tools like `iconutil` or online converters
- Include retina versions
- Save as `icon.icns`

### Linux (PNG)
- Use 512x512 or 1024x1024 PNG
- Save as `icon.png`

## Icon Requirements
- **Base Resolution**: 1024x1024 minimum
- **Format**: SVG source (provided) + platform-specific outputs
- **Style**: Modern, clean, recognizable at small sizes
- **Colors**: Match app theme (gradient blue/purple)

## Verification
After generating icons, verify they appear correctly:
1. `npm run build:mac` - Check DMG icon
2. `npm run build:win` - Check EXE icon  
3. `npm run build:linux` - Check desktop icon

## Troubleshooting
- Icons not showing: Check file paths in package.json build config
- Blurry icons: Ensure high-resolution sources and proper scaling
- Wrong colors: Verify SVG renders correctly before conversion
