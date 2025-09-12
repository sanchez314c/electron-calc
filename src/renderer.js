// Calculator Renderer Process
// Handles calculator logic and UI interactions

class Calculator {
    constructor() {
        this.currentValue = '0';
        this.previousValue = '';
        this.operator = null;
        this.waitingForOperand = false;
        this.shouldResetDisplay = false;
        
        // Memory functionality
        this.memory = 0;
        
        // Display elements
        this.currentDisplay = null;
        this.previousDisplay = null;
        
        this.init();
    }

    async init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupCalculator());
        } else {
            this.setupCalculator();
        }
    }

    setupCalculator() {
        try {
            // Get display elements
            this.currentDisplay = document.getElementById('current-display');
            this.previousDisplay = document.getElementById('previous-display');
            
            // Setup event listeners
            this.setupEventListeners();
            this.setupKeyboardListeners();
            this.setupMenuListeners();
            
            // Initialize display
            this.updateDisplay();
            
            console.log('Calculator initialized successfully');
            
        } catch (error) {
            console.error('Failed to initialize calculator:', error);
        }
    }

    setupEventListeners() {
        // Number buttons
        document.querySelectorAll('[data-number]').forEach(button => {
            button.addEventListener('click', () => {
                this.inputNumber(button.dataset.number);
                this.animateButton(button);
            });
        });

        // Operator buttons
        document.querySelectorAll('[data-operator]').forEach(button => {
            button.addEventListener('click', () => {
                this.inputOperator(button.dataset.operator);
                this.animateButton(button);
                this.highlightOperator(button);
            });
        });

        // Function buttons
        document.querySelectorAll('[data-action]').forEach(button => {
            button.addEventListener('click', () => {
                this.handleAction(button.dataset.action);
                this.animateButton(button);
            });
        });

        // Memory buttons
        document.querySelectorAll('[data-memory]').forEach(button => {
            button.addEventListener('click', () => {
                this.handleMemory(button.dataset.memory);
                this.animateButton(button);
            });
        });
    }

    setupMenuListeners() {
        // Listen for menu events from main process
        if (window.electronAPI?.onMenuClear) {
            window.electronAPI.onMenuClear(() => {
                this.clear();
            });
        }

        if (window.electronAPI?.onMenuClearEntry) {
            window.electronAPI.onMenuClearEntry(() => {
                this.clearEntry();
            });
        }
    }

    setupKeyboardListeners() {
        document.addEventListener('keydown', (e) => {
            // Prevent default for calculator keys
            if (this.isCalculatorKey(e.key)) {
                e.preventDefault();
            }
            
            // Handle keyboard input
            this.handleKeyboard(e);
        });
    }

    isCalculatorKey(key) {
        const calculatorKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 
                              '+', '-', '*', '/', '=', 'Enter', '.', 'Backspace', 
                              'Delete', 'Escape', 'c', 'C'];
        return calculatorKeys.includes(key);
    }

    handleKeyboard(e) {
        const key = e.key;
        
        // Numbers
        if (/[0-9]/.test(key)) {
            this.inputNumber(key);
        }
        // Operators
        else if (['+', '-', '*', '/'].includes(key)) {
            this.inputOperator(key);
        }
        // Equals
        else if (key === '=' || key === 'Enter') {
            this.calculate();
        }
        // Decimal
        else if (key === '.') {
            this.inputDecimal();
        }
        // Clear entry
        else if (key === 'Backspace') {
            this.backspace();
        }
        // Clear all
        else if (key === 'Delete' || key === 'Escape' || key.toLowerCase() === 'c') {
            this.clear();
        }
    }

    // Calculator Core Methods
    inputNumber(number) {
        if (this.waitingForOperand) {
            this.currentValue = number;
            this.waitingForOperand = false;
        } else {
            this.currentValue = this.currentValue === '0' ? number : this.currentValue + number;
        }
        
        this.shouldResetDisplay = false;
        this.updateDisplay();
    }

    inputOperator(nextOperator) {
        const inputValue = parseFloat(this.currentValue);

        if (this.previousValue === '') {
            this.previousValue = inputValue;
        } else if (this.operator) {
            const currentValue = this.previousValue || 0;
            const newValue = this.performCalculation();

            this.currentValue = String(newValue);
            this.previousValue = newValue;
        }

        this.waitingForOperand = true;
        this.operator = nextOperator;
        this.updateDisplay();
        this.clearOperatorHighlight();
    }

    calculate() {
        if (this.operator && this.previousValue !== '' && !this.waitingForOperand) {
            const newValue = this.performCalculation();
            this.currentValue = String(newValue);
            this.previousValue = '';
            this.operator = null;
            this.waitingForOperand = true;
            this.shouldResetDisplay = true;
        }
        
        this.updateDisplay();
        this.clearOperatorHighlight();
    }

    performCalculation() {
        const prev = parseFloat(this.previousValue);
        const current = parseFloat(this.currentValue);

        if (isNaN(prev) || isNaN(current)) return 0;

        switch (this.operator) {
            case '+':
                return prev + current;
            case '-':
                return prev - current;
            case '*':
                return prev * current;
            case '/':
                return current !== 0 ? prev / current : 0;
            default:
                return current;
        }
    }

    handleAction(action) {
        switch (action) {
            case 'clear':
                this.clear();
                break;
            case 'clear-entry':
                this.clearEntry();
                break;
            case 'backspace':
                this.backspace();
                break;
            case 'decimal':
                this.inputDecimal();
                break;
            case 'sign':
                this.toggleSign();
                break;
            case 'equals':
                this.calculate();
                break;
        }
    }

    clear() {
        this.currentValue = '0';
        this.previousValue = '';
        this.operator = null;
        this.waitingForOperand = false;
        this.shouldResetDisplay = false;
        this.updateDisplay();
        this.clearOperatorHighlight();
    }

    clearEntry() {
        this.currentValue = '0';
        this.updateDisplay();
    }

    backspace() {
        if (this.currentValue.length > 1) {
            this.currentValue = this.currentValue.slice(0, -1);
        } else {
            this.currentValue = '0';
        }
        this.updateDisplay();
    }

    inputDecimal() {
        if (this.waitingForOperand) {
            this.currentValue = '0.';
            this.waitingForOperand = false;
        } else if (this.currentValue.indexOf('.') === -1) {
            this.currentValue += '.';
        }
        this.updateDisplay();
    }

    toggleSign() {
        if (this.currentValue !== '0') {
            this.currentValue = this.currentValue.startsWith('-') 
                ? this.currentValue.slice(1) 
                : '-' + this.currentValue;
        }
        this.updateDisplay();
    }

    // Memory Operations
    handleMemory(operation) {
        const current = parseFloat(this.currentValue);
        
        switch (operation) {
            case 'clear':
                this.memory = 0;
                break;
            case 'recall':
                this.currentValue = String(this.memory);
                this.shouldResetDisplay = true;
                break;
            case 'add':
                this.memory += current;
                break;
            case 'subtract':
                this.memory -= current;
                break;
            case 'store':
                this.memory = current;
                break;
        }
        
        this.updateDisplay();
    }

    // Display Methods
    updateDisplay() {
        if (this.currentDisplay) {
            this.currentDisplay.textContent = this.formatNumber(this.currentValue);
        }
        
        if (this.previousDisplay) {
            if (this.operator && this.previousValue !== '') {
                const operatorSymbol = this.getOperatorSymbol(this.operator);
                this.previousDisplay.textContent = `${this.formatNumber(this.previousValue)} ${operatorSymbol}`;
            } else {
                this.previousDisplay.textContent = '';
            }
        }
    }

    formatNumber(num) {
        // Handle very long numbers
        const str = String(num);
        if (str.length > 10) {
            const numFloat = parseFloat(num);
            if (Math.abs(numFloat) >= 1e10 || (Math.abs(numFloat) < 1e-6 && numFloat !== 0)) {
                return numFloat.toExponential(6);
            }
            return numFloat.toPrecision(10);
        }
        return str;
    }

    getOperatorSymbol(operator) {
        const symbols = {
            '+': '+',
            '-': '-',
            '*': '×',
            '/': '÷'
        };
        return symbols[operator] || operator;
    }

    // UI Helper Methods
    animateButton(button) {
        button.classList.add('pressed');
        setTimeout(() => {
            button.classList.remove('pressed');
        }, 100);
    }

    highlightOperator(button) {
        this.clearOperatorHighlight();
        button.classList.add('selected');
    }

    clearOperatorHighlight() {
        document.querySelectorAll('.btn-operator').forEach(button => {
            button.classList.remove('selected');
        });
    }
}

// Initialize the calculator when DOM is ready
new Calculator();