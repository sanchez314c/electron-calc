const { describe, test, expect, beforeEach, afterEach } = require('@jest/globals');

// Mock DOM environment for testing
const { JSDOM } = require('jsdom');

describe('Calculator Logic Tests', () => {
    let dom;
    let window;
    let document;
    let ModernCalculator;
    let calculator;

    beforeEach(() => {
        // Set up DOM environment
        dom = new JSDOM(`
            <!DOCTYPE html>
            <html>
            <body>
                <div id="display">0</div>
                <div id="expression">0</div>
                <div id="memory-indicator" style="display: none;">M</div>
                <div id="aboutModal" style="display: none;">
                    <div id="app-version">1.0.0</div>
                    <div id="app-platform">test</div>
                </div>
            </body>
            </html>
        `);

        window = dom.window;
        document = window.document;
        global.window = window;
        global.document = document;

        // Mock electron API
        global.window.electronAPI = {
            getAppVersion: () => Promise.resolve('1.0.0'),
            getPlatform: () => Promise.resolve('test'),
            showErrorDialog: jest.fn(),
            onMenuClear: jest.fn(),
            onMenuClearEntry: jest.fn(),
            onShowAbout: jest.fn(),
            removeAllListeners: jest.fn()
        };

        // Load calculator class
        const fs = require('fs');
        const path = require('path');
        const calculatorCode = fs.readFileSync(
            path.join(__dirname, '..', 'src', 'calculator.js'),
            'utf8'
        );
        
        // Remove DOMContentLoaded listener and export class for testing
        const testableCode = calculatorCode
            .replace(/document\.addEventListener\('DOMContentLoaded'.*?\}\);/s, '')
            .replace(/window\.addEventListener\('beforeunload'.*?\}\);/s, '')
            + '\nif (typeof module !== "undefined" && module.exports) module.exports = ModernCalculator;';
        
        eval(testableCode);
        ModernCalculator = eval('ModernCalculator');
        
        calculator = new ModernCalculator();
    });

    afterEach(() => {
        if (calculator && calculator.electronAPI && calculator.electronAPI.removeAllListeners) {
            calculator.electronAPI.removeAllListeners();
        }
        dom?.window?.close();
    });

    describe('Basic Arithmetic Operations', () => {
        test('should add two numbers correctly', () => {
            calculator.inputNumber('5');
            calculator.setOperator('add');
            calculator.inputNumber('3');
            calculator.calculate();
            expect(calculator.currentValue).toBe('8');
        });

        test('should subtract two numbers correctly', () => {
            calculator.inputNumber('10');
            calculator.setOperator('subtract');
            calculator.inputNumber('4');
            calculator.calculate();
            expect(calculator.currentValue).toBe('6');
        });

        test('should multiply two numbers correctly', () => {
            calculator.inputNumber('6');
            calculator.setOperator('multiply');
            calculator.inputNumber('7');
            calculator.calculate();
            expect(calculator.currentValue).toBe('42');
        });

        test('should divide two numbers correctly', () => {
            calculator.inputNumber('15');
            calculator.setOperator('divide');
            calculator.inputNumber('3');
            calculator.calculate();
            expect(calculator.currentValue).toBe('5');
        });

        test('should handle division by zero', () => {
            calculator.inputNumber('10');
            calculator.setOperator('divide');
            calculator.inputNumber('0');
            calculator.calculate();
            expect(calculator.currentValue).toBe('Cannot divide by zero');
            expect(calculator.isError).toBe(true);
        });
    });

    describe('Decimal Operations', () => {
        test('should handle decimal input', () => {
            calculator.inputNumber('3');
            calculator.inputDecimal();
            calculator.inputNumber('14');
            expect(calculator.currentValue).toBe('3.14');
        });

        test('should prevent multiple decimal points', () => {
            calculator.inputNumber('3');
            calculator.inputDecimal();
            calculator.inputNumber('14');
            calculator.inputDecimal(); // This should be ignored
            calculator.inputNumber('159');
            expect(calculator.currentValue).toBe('3.14159');
        });

        test('should handle decimal arithmetic', () => {
            calculator.inputNumber('1');
            calculator.inputDecimal();
            calculator.inputNumber('5');
            calculator.setOperator('add');
            calculator.inputNumber('2');
            calculator.inputDecimal();
            calculator.inputNumber('3');
            calculator.calculate();
            expect(parseFloat(calculator.currentValue)).toBeCloseTo(3.8);
        });
    });

    describe('Memory Functions', () => {
        test('should store value in memory', () => {
            calculator.inputNumber('42');
            calculator.memoryAdd();
            expect(calculator.memory).toBe(42);
        });

        test('should recall value from memory', () => {
            calculator.memory = 25;
            calculator.memoryRecall();
            expect(calculator.currentValue).toBe('25');
        });

        test('should clear memory', () => {
            calculator.memory = 100;
            calculator.memoryClear();
            expect(calculator.memory).toBe(0);
        });

        test('should subtract from memory', () => {
            calculator.memory = 50;
            calculator.inputNumber('15');
            calculator.memorySubtract();
            expect(calculator.memory).toBe(35);
        });
    });

    describe('Scientific Functions', () => {
        test('should calculate square root', () => {
            calculator.inputNumber('16');
            calculator.sqrt();
            expect(calculator.currentValue).toBe('4');
        });

        test('should handle square root of negative number', () => {
            calculator.inputNumber('16');
            calculator.negate();
            calculator.sqrt();
            expect(calculator.currentValue).toBe('Invalid Input');
            expect(calculator.isError).toBe(true);
        });

        test('should calculate square', () => {
            calculator.inputNumber('5');
            calculator.square();
            expect(calculator.currentValue).toBe('25');
        });

        test('should calculate reciprocal', () => {
            calculator.inputNumber('4');
            calculator.reciprocal();
            expect(calculator.currentValue).toBe('0.25');
        });

        test('should handle reciprocal of zero', () => {
            calculator.inputNumber('0');
            calculator.reciprocal();
            expect(calculator.currentValue).toBe('Cannot divide by zero');
            expect(calculator.isError).toBe(true);
        });

        test('should calculate percentage', () => {
            calculator.inputNumber('25');
            calculator.percent();
            expect(calculator.currentValue).toBe('0.25');
        });
    });

    describe('Clear and Backspace Functions', () => {
        test('should clear all values', () => {
            calculator.inputNumber('123');
            calculator.setOperator('add');
            calculator.inputNumber('456');
            calculator.clear();
            
            expect(calculator.currentValue).toBe('0');
            expect(calculator.previousValue).toBe(null);
            expect(calculator.operator).toBe(null);
            expect(calculator.expression).toBe('');
        });

        test('should clear entry only', () => {
            calculator.inputNumber('123');
            calculator.setOperator('add');
            calculator.inputNumber('456');
            calculator.clearEntry();
            
            expect(calculator.currentValue).toBe('0');
            expect(calculator.previousValue).toBe(123);
            expect(calculator.operator).toBe('add');
        });

        test('should handle backspace', () => {
            calculator.inputNumber('123');
            calculator.backspace();
            expect(calculator.currentValue).toBe('12');
            
            calculator.backspace();
            expect(calculator.currentValue).toBe('1');
            
            calculator.backspace();
            expect(calculator.currentValue).toBe('0');
        });
    });

    describe('Number Negation', () => {
        test('should negate positive number', () => {
            calculator.inputNumber('42');
            calculator.negate();
            expect(calculator.currentValue).toBe('-42');
        });

        test('should negate negative number', () => {
            calculator.inputNumber('42');
            calculator.negate();
            calculator.negate();
            expect(calculator.currentValue).toBe('42');
        });

        test('should not negate zero', () => {
            calculator.negate();
            expect(calculator.currentValue).toBe('0');
        });
    });

    describe('Edge Cases and Error Handling', () => {
        test('should handle very large numbers', () => {
            calculator.inputNumber('999999999999999');
            calculator.setOperator('multiply');
            calculator.inputNumber('999999999999999');
            calculator.calculate();
            expect(calculator.currentValue).toContain('e'); // Scientific notation
        });

        test('should handle very small numbers', () => {
            calculator.inputNumber('1');
            calculator.setOperator('divide');
            calculator.inputNumber('999999999999999');
            calculator.calculate();
            expect(parseFloat(calculator.currentValue)).toBeCloseTo(0, 10);
        });

        test('should limit display length', () => {
            const longNumber = '123456789012345678901234567890';
            for (let digit of longNumber) {
                calculator.inputNumber(digit);
            }
            expect(calculator.currentValue.length).toBeLessThanOrEqual(calculator.maxDisplayLength);
        });

        test('should reset display after error', () => {
            calculator.showError('Test Error');
            expect(calculator.isError).toBe(true);
            
            calculator.inputNumber('5');
            expect(calculator.isError).toBe(false);
            expect(calculator.currentValue).toBe('5');
        });
    });

    describe('Continuous Calculations', () => {
        test('should handle chained operations', () => {
            calculator.inputNumber('10');
            calculator.setOperator('add');
            calculator.inputNumber('5');
            calculator.setOperator('multiply'); // Should calculate 10+5=15 first
            calculator.inputNumber('2');
            calculator.calculate(); // Should calculate 15*2=30
            expect(calculator.currentValue).toBe('30');
        });

        test('should handle equals followed by operator', () => {
            calculator.inputNumber('10');
            calculator.setOperator('add');
            calculator.inputNumber('5');
            calculator.calculate(); // Result: 15
            calculator.setOperator('multiply');
            calculator.inputNumber('2');
            calculator.calculate(); // Should be 15*2=30
            expect(calculator.currentValue).toBe('30');
        });
    });

    describe('Display Formatting', () => {
        test('should format results properly', () => {
            const testCases = [
                { input: 1000000, expected: '1000000' },
                { input: 0.00001, expected: '0.00001' },
                { input: 1.23456789123456, expectToContain: '1.234' }
            ];

            testCases.forEach(({ input, expected, expectToContain }) => {
                const result = calculator.formatResult(input);
                if (expected) {
                    expect(result).toBe(expected);
                } else if (expectToContain) {
                    expect(result).toContain(expectToContain);
                }
            });
        });

        test('should handle overflow', () => {
            const result = calculator.formatResult(Infinity);
            expect(result).toBe('Error');
        });

        test('should handle very small numbers close to zero', () => {
            const result = calculator.formatResult(1e-15);
            expect(result).toBe('0');
        });
    });
});