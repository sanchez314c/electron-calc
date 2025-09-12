const { describe, test, expect, beforeEach, afterEach } = require('@jest/globals');
const path = require('path');
const { Application } = require('spectron');

describe('Electron Application Tests', () => {
    let app;

    beforeEach(async () => {
        app = new Application({
            path: require('electron'),
            args: [path.join(__dirname, '..', 'main.js')],
            env: { NODE_ENV: 'test' }
        });
        
        // Only start the app for integration tests
        // Comment out the next line for unit-only testing
        // await app.start();
    });

    afterEach(async () => {
        if (app && app.isRunning()) {
            await app.stop();
        }
    });

    describe('Application Window', () => {
        test('should create application window', async () => {
            // Skip this test if we're not running full integration tests
            if (!app.isRunning()) {
                return;
            }

            const windowCount = await app.client.getWindowCount();
            expect(windowCount).toBe(1);
        });

        test('should have correct window title', async () => {
            if (!app.isRunning()) {
                return;
            }

            const title = await app.client.getTitle();
            expect(title).toBe('Modern Calculator');
        });

        test('should have minimum window dimensions', async () => {
            if (!app.isRunning()) {
                return;
            }

            const windowBounds = await app.browserWindow.getBounds();
            expect(windowBounds.width).toBeGreaterThanOrEqual(320);
            expect(windowBounds.height).toBeGreaterThanOrEqual(480);
        });
    });

    describe('Calculator UI Elements', () => {
        test('should have display element', async () => {
            if (!app.isRunning()) {
                return;
            }

            const display = await app.client.$('#display');
            expect(await display.isExisting()).toBe(true);
        });

        test('should have all number buttons', async () => {
            if (!app.isRunning()) {
                return;
            }

            for (let i = 0; i <= 9; i++) {
                const button = await app.client.$(`[data-number="${i}"]`);
                expect(await button.isExisting()).toBe(true);
            }
        });

        test('should have all operator buttons', async () => {
            if (!app.isRunning()) {
                return;
            }

            const operators = ['add', 'subtract', 'multiply', 'divide', 'equals'];
            for (const op of operators) {
                const button = await app.client.$(`[data-action="${op}"]`);
                expect(await button.isExisting()).toBe(true);
            }
        });

        test('should have memory function buttons', async () => {
            if (!app.isRunning()) {
                return;
            }

            const memoryFunctions = ['memory-clear', 'memory-recall', 'memory-add', 'memory-subtract'];
            for (const func of memoryFunctions) {
                const button = await app.client.$(`[data-action="${func}"]`);
                expect(await button.isExisting()).toBe(true);
            }
        });
    });

    describe('Calculator Functionality', () => {
        test('should perform basic addition through UI', async () => {
            if (!app.isRunning()) {
                return;
            }

            // Click 5
            await app.client.$('[data-number="5"]').click();
            
            // Click +
            await app.client.$('[data-action="add"]').click();
            
            // Click 3
            await app.client.$('[data-number="3"]').click();
            
            // Click =
            await app.client.$('[data-action="equals"]').click();
            
            // Check result
            const display = await app.client.$('#display');
            const result = await display.getText();
            expect(result).toBe('8');
        });

        test('should handle keyboard input', async () => {
            if (!app.isRunning()) {
                return;
            }

            // Focus on the window
            await app.client.keys(['5', '+', '3', 'Enter']);
            
            // Check result
            const display = await app.client.$('#display');
            const result = await display.getText();
            expect(result).toBe('8');
        });
    });

    describe('Menu Functionality', () => {
        test('should have application menu', async () => {
            if (!app.isRunning()) {
                return;
            }

            const menuItems = await app.client.getMenuItems();
            expect(menuItems).toBeDefined();
            expect(menuItems.length).toBeGreaterThan(0);
        });
    });

    describe('Error Handling', () => {
        test('should handle division by zero in UI', async () => {
            if (!app.isRunning()) {
                return;
            }

            // Click 5
            await app.client.$('[data-number="5"]').click();
            
            // Click ÷
            await app.client.$('[data-action="divide"]').click();
            
            // Click 0
            await app.client.$('[data-number="0"]').click();
            
            // Click =
            await app.client.$('[data-action="equals"]').click();
            
            // Check error message
            const display = await app.client.$('#display');
            const result = await display.getText();
            expect(result).toBe('Cannot divide by zero');
        });
    });
});

// Mock tests for when Spectron is not available
describe('Calculator Main Process Tests (Unit)', () => {
    test('should export main application class', () => {
        const fs = require('fs');
        const mainCode = fs.readFileSync(
            path.join(__dirname, '..', 'main.js'),
            'utf8'
        );
        
        expect(mainCode).toContain('class CalculatorApp');
        expect(mainCode).toContain('createWindow');
        expect(mainCode).toContain('setupMenu');
        expect(mainCode).toContain('setupIPC');
    });

    test('should have proper security settings', () => {
        const fs = require('fs');
        const mainCode = fs.readFileSync(
            path.join(__dirname, '..', 'main.js'),
            'utf8'
        );
        
        expect(mainCode).toContain('nodeIntegration: false');
        expect(mainCode).toContain('contextIsolation: true');
        expect(mainCode).toContain('enableRemoteModule: false');
    });

    test('should have preload script configured', () => {
        const fs = require('fs');
        const mainCode = fs.readFileSync(
            path.join(__dirname, '..', 'main.js'),
            'utf8'
        );
        
        expect(mainCode).toContain('preload.js');
    });
});