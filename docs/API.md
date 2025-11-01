# API Reference

## Overview

The Electron Calculator API provides a simple interface for performing mathematical calculations. The API is designed to be secure, performant, and easy to use.

## Core API

### Calculation Engine

#### `calculate(expression)`
Performs mathematical calculation on the given expression.

**Parameters:**
- `expression` (string): Mathematical expression to evaluate (e.g., "2 + 3 * 4")

**Returns:**
- `string`: Result of the calculation as string

**Example:**
```javascript
const result = calculate("2 + 3 * 4"); // Returns "14"
```

#### `validateInput(input)`
Validates user input for mathematical expressions.

**Parameters:**
- `input` (string): Input string to validate

**Returns:**
- `boolean`: True if input is valid, false otherwise

**Example:**
```javascript
const isValid = validateInput("2 + 3"); // Returns true
const isInvalid = validateInput("2 + abc"); // Returns false
```

### Memory Functions

#### `memoryStore(value)`
Stores the current value in memory.

**Parameters:**
- `value` (number): Value to store in memory

**Returns:**
- `void`

#### `memoryRecall()`
Retrieves the value from memory.

**Returns:**
- `number`: Stored memory value or 0 if empty

#### `memoryClear()`
Clears the memory.

**Returns:**
- `void`

#### `memoryAdd(value)`
Adds the given value to the stored memory value.

**Parameters:**
- `value` (number): Value to add to memory

**Returns:**
- `void`

## IPC API (Preload Script)

The preload script exposes a secure API to the renderer process.

### Window Controls

#### `minimizeWindow()`
Minimizes the application window.

**Returns:**
- `Promise<void>`

#### `closeWindow()`
Closes the application window.

**Returns:**
- `Promise<void>`

#### `toggleDevTools()`
Toggles developer tools visibility.

**Returns:**
- `Promise<void>`

### System Integration

#### `getAppVersion()`
Retrieves the application version.

**Returns:**
- `Promise<string>`

#### `getPlatform()`
Retrieves the current platform.

**Returns:**
- `Promise<string>` (one of 'win32', 'darwin', 'linux')

## Security Considerations

### Input Validation
All API functions validate inputs to prevent injection attacks and invalid operations.

### IPC Security
- All IPC communication goes through the preload script
- Context isolation is enabled
- Node integration is disabled in renderer
- Only necessary APIs are exposed

### Error Handling
- All functions return promises that reject with descriptive errors
- Invalid inputs trigger validation errors
- Network or system errors are handled gracefully

## Usage Examples

### Basic Calculation
```javascript
// In renderer process
try {
  const result = await window.electronAPI.calculate("15 / 3");
  console.log(result); // "5"
} catch (error) {
  console.error('Calculation error:', error.message);
}
```

### Memory Operations
```javascript
// Store value
await window.electronAPI.memoryStore(42);

// Recall value
const memoryValue = await window.electronAPI.memoryRecall();
console.log(memoryValue); // 42

// Clear memory
await window.electronAPI.memoryClear();
```

### Window Management
```javascript
// Minimize window
await window.electronAPI.minimizeWindow();

// Close window
await window.electronAPI.closeWindow();
```

## Error Codes

### Validation Errors
- `INVALID_INPUT`: Input contains invalid characters
- `DIVISION_BY_ZERO`: Attempt to divide by zero
- `SYNTAX_ERROR`: Invalid mathematical expression

### System Errors
- `IPC_ERROR`: Communication between processes failed
- `MEMORY_ERROR`: Memory operations failed
- `PLATFORM_ERROR`: Platform-specific operation failed

## TypeScript Definitions

```typescript
// api.d.ts
declare global {
  interface Window {
    electronAPI: {
      // Calculation methods
      calculate(expression: string): Promise<string>;
      validateInput(input: string): Promise<boolean>;
      
      // Memory methods
      memoryStore(value: number): Promise<void>;
      memoryRecall(): Promise<number>;
      memoryClear(): Promise<void>;
      memoryAdd(value: number): Promise<void>;
      
      // Window methods
      minimizeWindow(): Promise<void>;
      closeWindow(): Promise<void>;
      toggleDevTools(): Promise<void>;
      
      // System methods
      getAppVersion(): Promise<string>;
      getPlatform(): Promise<string>;
    };
  }
}

export {};
```

---

**Last Updated**: 2025-01-12  
**Version**: 1.0.0