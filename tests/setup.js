// Jest setup file for calculator tests

// Mock Electron APIs for testing
const mockElectronAPI = {
    getAppVersion: jest.fn(() => Promise.resolve('1.0.0')),
    getPlatform: jest.fn(() => Promise.resolve('test')),
    showErrorDialog: jest.fn(() => Promise.resolve()),
    onMenuClear: jest.fn(),
    onMenuClearEntry: jest.fn(),
    onShowAbout: jest.fn(),
    removeAllListeners: jest.fn()
};

// Global setup
beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Mock console to avoid noise in tests
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
    // Restore console
    console.log.mockRestore?.();
    console.warn.mockRestore?.();
    console.error.mockRestore?.();
});

// Make mockElectronAPI available globally
global.mockElectronAPI = mockElectronAPI;

// Mock DOM methods that might be missing in Node environment
if (typeof document === 'undefined') {
    global.document = {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        getElementById: jest.fn(() => ({
            textContent: '',
            style: { display: 'none' },
            classList: {
                toggle: jest.fn(),
                add: jest.fn(),
                remove: jest.fn()
            }
        })),
        querySelectorAll: jest.fn(() => []),
        createElement: jest.fn(() => ({
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            click: jest.fn(),
            focus: jest.fn(),
            blur: jest.fn()
        }))
    };
}

if (typeof window === 'undefined') {
    global.window = {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        electronAPI: mockElectronAPI,
        calculatorAPI: {
            version: '1.0.0',
            platform: 'test'
        }
    };
}

// Timeout for async tests
jest.setTimeout(10000);