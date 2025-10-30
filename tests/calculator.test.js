/**
 * Calculator Logic Tests
 * Tests the core calculator functionality
 */

// Simple calculator functions for testing
function calculate(expression) {
    // Basic calculator implementation
    try {
        // Remove whitespace
        expression = expression.replace(/\s/g, '');

        // Handle empty input
        if (!expression) return '0';

        // Basic validation
        if (!/^[\d+\-*/.() ]*$/.test(expression)) {
            throw new Error('Invalid characters in expression');
        }

        // Handle division by zero
        if (expression.includes('/0')) {
            throw new Error('Division by zero');
        }

        // Use Function constructor for safe evaluation
        const result = Function('"use strict"; return (' + expression + ')')();

        // Handle invalid results
        if (isNaN(result) || !isFinite(result)) {
            throw new Error('Invalid result');
        }

        return String(result);
    } catch (error) {
        throw error;
    }
}

function formatDisplay(value) {
    if (value === '0') return '0';

    const num = parseFloat(value);

    // Handle very large numbers
    if (Math.abs(num) > 999999999) {
        return num.toExponential(6);
    }

    // Handle very small numbers
    if (Math.abs(num) < 0.000001 && num !== 0) {
        return num.toExponential(6);
    }

    // Regular formatting
    return String(num);
}

describe('Calculator Logic Tests', () => {

    describe('Basic Operations', () => {
        test('should add two positive numbers', () => {
            expect(calculate('2 + 3')).toBe('5');
        });

        test('should subtract two positive numbers', () => {
            expect(calculate('10 - 4')).toBe('6');
        });

        test('should multiply two positive numbers', () => {
            expect(calculate('7 * 6')).toBe('42');
        });

        test('should divide two positive numbers', () => {
            expect(calculate('15 / 3')).toBe('5');
        });

        test('should handle decimal numbers', () => {
            expect(calculate('2.5 + 3.5')).toBe('6');
        });

        test('should handle negative numbers', () => {
            expect(calculate('-5 + 10')).toBe('5');
        });
    });

    describe('Edge Cases', () => {
        test('should return 0 for empty input', () => {
            expect(calculate('')).toBe('0');
        });

        test('should handle single number', () => {
            expect(calculate('42')).toBe('42');
        });

        test('should handle zero', () => {
            expect(calculate('0 + 0')).toBe('0');
        });

        test('should throw error for division by zero', () => {
            expect(() => calculate('5 / 0')).toThrow('Division by zero');
        });

        test('should throw error for invalid characters', () => {
            expect(() => calculate('5 + abc')).toThrow('Invalid characters');
        });

        test('should throw error for malformed expression', () => {
            expect(() => calculate('5 + ')).toThrow();
        });
    });

    describe('Complex Operations', () => {
        test('should handle order of operations', () => {
            expect(calculate('2 + 3 * 4')).toBe('14');
        });

        test('should handle parentheses', () => {
            expect(calculate('(2 + 3) * 4')).toBe('20');
        });

        test('should handle multiple operations', () => {
            expect(calculate('10 + 5 - 3 * 2 / 4')).toBe('13.5');
        });

        test('should handle nested parentheses', () => {
            expect(calculate('2 * (3 + (4 * 5))')).toBe('46');
        });
    });

    describe('Display Formatting', () => {
        test('should format simple numbers', () => {
            expect(formatDisplay('42')).toBe('42');
        });

        test('should format decimal numbers', () => {
            expect(formatDisplay('3.14159')).toBe('3.14159');
        });

        test('should format zero', () => {
            expect(formatDisplay('0')).toBe('0');
        });

        test('should format very large numbers', () => {
            const result = formatDisplay('10000000000');
            expect(result).toMatch(/1.*e\+10/);
        });

        test('should format very small numbers', () => {
            const result = formatDisplay('0.0000001');
            expect(result).toMatch(/1.*e-7/);
        });
    });

    describe('Input Validation', () => {
        test('should reject alphabetic characters', () => {
            expect(() => calculate('hello')).toThrow();
        });

        test('should reject special characters except operators', () => {
            expect(() => calculate('5 @ 3')).toThrow();
        });

        test('should accept valid mathematical symbols', () => {
            expect(() => calculate('5 + 3 * 2 - 4 / 2')).not.toThrow();
        });
    });
});