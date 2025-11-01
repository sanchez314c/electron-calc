# Architecture Documentation

## Overview

The Electron Calculator application follows a secure, multi-process architecture that leverages Electron's security features and modern JavaScript patterns.

## System Architecture

### Multi-Process Structure

The application implements Electron's recommended multi-process architecture:

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Main Process  │────│  Preload Script  │────│ Renderer Process│
│                 │    │                  │    │                 │
│ • App Lifecycle │    │ • Secure Bridge  │    │ • UI Logic     │
│ • Window Mgmt   │    │ • Context Bridge │    │ • Calculations  │
│ • System APIs   │    │ • API Exposure  │    │ • DOM Manip    │
│ • Security      │    │ • Validation     │    │ • User Input    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### Main Process (`src/main/index.js`)

**Responsibilities:**
- Application lifecycle management
- Browser window creation and management
- Native menu bar setup and configuration
- Inter-process communication (IPC) handling
- Security enforcement and policy implementation
- System integration (file system, notifications)

**Key Features:**
- Prevents new window creation for security
- Implements secure webPreferences
- Handles cross-platform accelerator key mappings
- Manages application state persistence

### Preload Script (`src/preload/index.js`)

**Responsibilities:**
- Secure bridge between main and renderer processes
- Controlled API exposure via `contextBridge`
- Event listener cleanup and memory management
- Input validation and sanitization
- Removal of global Node.js APIs from renderer scope

**Security Features:**
- Context isolation enforcement
- Selective API exposure
- Input validation before IPC communication
- Cleanup functions to prevent memory leaks

### Renderer Process (`src/renderer/`)

**Responsibilities:**
- User interface implementation using vanilla HTML/CSS/JavaScript
- Calculator logic and mathematical operations
- User input handling and validation
- Visual feedback and animations
- Keyboard navigation support

**Components:**
- `index.html` - Main application structure
- `styles/style.css` - Dark mode theme and responsive design
- `utils/renderer.js` - Calculator class and business logic

## Security Architecture

### Security-First Design

The application implements multiple layers of security:

```javascript
// Main process security configuration
const mainWindow = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false,        // Disable Node.js integration
    contextIsolation: true,        // Enable context isolation
    enableRemoteModule: false,     // Disable remote module
    preload: path.join(__dirname, '../preload/index.js'),
    webSecurity: true,            // Enable web security
    allowRunningInsecureContent: false,  // Block mixed content
    experimentalFeatures: false     // Disable experimental features
  }
});
```

### Security Measures

1. **Context Isolation**
   - Renderer process runs in isolated context
   - Prevents prototype pollution and code injection
   - Maintains secure separation between processes

2. **Node Integration Disabled**
   - No direct Node.js access in renderer
   - All system operations go through preload script
   - Prevents privilege escalation attacks

3. **Secure IPC Communication**
   - All communication through controlled preload API
   - Input validation on both ends
   - Error handling without information leakage

4. **Content Security Policy**
   - Strict CSP headers implemented
   - Only allows resources from same origin
   - Blocks inline scripts and unsafe eval

## Data Flow

### User Input Flow

```
User Input → Renderer Process → Validation → Preload Script → IPC → Main Process
                                    ↓
Calculation Result ← IPC Response ← Preload Script ← Renderer Process
```

### Memory Operations Flow

```
Memory Store → Renderer → Preload → IPC → Main Process → Storage
Memory Recall ← IPC Response ← Preload ← Renderer ← Storage Retrieval
```

## Component Relationships

### Calculator Class Architecture

```javascript
class Calculator {
  constructor() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
    this.shouldResetScreen = false;
  }

  // Input handling
  appendNumber(number)    // Adds digit to current operand
  appendOperation(op)      // Sets operation type
  clear()                // Resets calculator state
  
  // Calculations
  calculate()             // Performs mathematical operation
  updateDisplay()          // Updates UI display
  
  // Memory functions
  memoryStore()           // Stores value in memory
  memoryRecall()          // Retrieves from memory
  memoryClear()           // Clears memory
  memoryAdd()            // Adds to memory
}
```

### Event Handling Architecture

```javascript
// Button clicks
document.querySelectorAll('.button').forEach(button => {
  button.addEventListener('click', (e) => {
    const value = e.target.dataset.value;
    calculator.handleInput(value);
  });
});

// Keyboard support
document.addEventListener('keydown', (e) => {
  const key = calculator.mapKeyToValue(e.key);
  if (key) calculator.handleInput(key);
});
```

## Build Architecture

### Build System Structure

```
Source Code → electron-builder → Platform Packages → Distribution
     ↓               ↓                    ↓
  Validation      Multi-platform        GitHub Releases
  Testing         Compilation          Auto-updater
  Linting         Code Signing         CDN Distribution
```

### Platform-Specific Builds

**macOS:**
- DMG for distribution
- APP bundle for development
- Code signing with Developer ID
- Notarization for Gatekeeper

**Windows:**
- NSIS installer for user-friendly installation
- MSI for enterprise deployment
- Portable ZIP for standalone use
- Authenticode code signing

**Linux:**
- AppImage for universal distribution
- DEB for Debian/Ubuntu
- RPM for Fedora/CentOS
- SNAP for Snap Store

## Performance Architecture

### Optimization Strategies

1. **Bundle Size Optimization**
   - Tree shaking for unused code elimination
   - Asset compression and optimization
   - Dependency auditing and bloat checking

2. **Memory Management**
   - Event listener cleanup on window unload
   - Proper object disposal patterns
   - Memory leak prevention

3. **Startup Performance**
   - Lazy loading of non-critical features
   - Minimal initial bundle size
   - Optimized asset loading

## Testing Architecture

### Test Pyramid

```
    ┌─────────────────┐
    │   E2E Tests    │  ← User workflow testing
    └─────────────────┘
           ↑
    ┌─────────────────┐
    │Integration Tests│  ← Process communication
    └─────────────────┘
           ↑
    ┌─────────────────┐
    │  Unit Tests     │  ← Function-level testing
    └─────────────────┘
```

### Test Environment

- **Jest** for test framework
- **jsdom** for DOM simulation
- **Electron** for integration testing
- **Coverage reporting** with Istanbul

## Future Architecture Considerations

### Scalability Points

1. **Plugin Architecture**
   - Modular calculator functions
   - Theme system extensibility
   - Custom operation support

2. **Cloud Integration**
   - Settings synchronization
   - Calculation history
   - Cross-device continuity

3. **Advanced Features**
   - Scientific calculator mode
   - Graphing capabilities
   - Unit conversion support

---

**Last Updated**: 2025-01-12  
**Version**: 1.0.0