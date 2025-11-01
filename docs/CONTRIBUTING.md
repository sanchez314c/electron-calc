# Contributing to Electron Calculator

Thank you for your interest in contributing to the Electron Calculator project! We welcome contributions from developers of all skill levels.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Development Workflow](#development-workflow)
- [Testing](#testing)
- [Code Style](#code-style)
- [Submitting Changes](#submitting-changes)
- [Reporting Issues](#reporting-issues)

## 🤝 Code of Conduct

This project follows a code of conduct to ensure a welcoming environment for all contributors. By participating, you agree to:

- Be respectful and inclusive
- Focus on constructive feedback
- Accept responsibility for mistakes
- Show empathy towards other contributors
- Help create a positive community

## 🚀 Getting Started

### Prerequisites
- **Node.js**: Version 18 or higher (LTS recommended)
- **npm**: Comes with Node.js
- **Git**: For version control
- **Code Editor**: VS Code recommended with Electron extensions

### Quick Setup
```bash
# Fork and clone the repository
git clone https://github.com/your-username/electron-calculator.git
cd electron-calculator

# Install dependencies
npm install

# Run in development mode
npm run dev

# Run tests
npm test
```

## 🛠️ Development Setup

### Environment Setup
1. **Install Node.js** from [nodejs.org](https://nodejs.org/)
2. **Clone the repository** and navigate to the project directory
3. **Install dependencies** using `npm install`
4. **Verify installation** by running `npm start`

### Recommended VS Code Extensions
- **Electron Extensions**: Enhanced Electron development experience
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **Jest**: Testing support
- **GitLens**: Enhanced Git capabilities

### Development Scripts
```bash
# Development
npm run dev          # Run with DevTools and hot reload
npm start           # Run in production mode

# Testing
npm test            # Run test suite
npm run test:watch  # Run tests in watch mode

# Building
npm run build       # Build for current platform
npm run build:all   # Build for all platforms
npm run pack        # Package for testing
```

## 💡 How to Contribute

### Types of Contributions
- **🐛 Bug Fixes**: Fix existing issues
- **✨ Features**: Add new functionality
- **📚 Documentation**: Improve documentation
- **🧪 Tests**: Add or improve tests
- **🔧 Tools**: Development tools and scripts
- **🎨 UI/UX**: Interface and user experience improvements

### Finding Issues to Work On
1. Check the [Issues](https://github.com/superclaude/electron-calculator/issues) tab
2. Look for issues labeled `good first issue` or `help wanted`
3. Check the [TODO.md](docs/TODO.md) file for planned features
4. Review the [LEARNINGS.md](docs/LEARNINGS.md) for known areas for improvement

## 🔄 Development Workflow

### 1. Choose an Issue
- Select an issue from the issue tracker
- Comment on the issue to indicate you're working on it
- Wait for maintainer approval if required

### 2. Create a Branch
```bash
# Create and switch to a new branch
git checkout -b feature/your-feature-name
# or
git checkout -b bugfix/issue-number-description
```

### 3. Make Changes
- Write clear, focused commits
- Test your changes thoroughly
- Follow the code style guidelines
- Update documentation if needed

### 4. Test Your Changes
```bash
# Run the full test suite
npm test

# Test specific functionality
npm run dev

# Build and test packaging
npm run pack
```

### 5. Submit a Pull Request
- Push your branch to your fork
- Create a pull request with a clear description
- Reference the issue number in the PR description
- Wait for review and address feedback

## 🧪 Testing

### Testing Requirements
- All new features must include tests
- Existing tests must continue to pass
- Test coverage should be maintained above 85%
- Cross-platform testing encouraged

### Running Tests
```bash
# Run all tests
npm test

# Run with coverage report
npm run test:coverage

# Run specific test file
npm test -- tests/calculator.test.js

# Run tests in watch mode during development
npm run test:watch
```

### Writing Tests
- Use descriptive test names
- Test both positive and negative cases
- Include edge cases and error conditions
- Follow the existing test patterns

## 💅 Code Style

### JavaScript/ES6+ Standards
- Use `const` and `let` instead of `var`
- Use arrow functions for anonymous functions
- Use template literals for string interpolation
- Use destructuring for object/array access
- Use async/await for asynchronous code

### Code Structure
```javascript
// Good: Clear structure and naming
class Calculator {
  constructor() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  calculate() {
    // Implementation
  }
}

// Avoid: Poor structure and naming
function calc() {
  // Implementation
}
```

### Naming Conventions
- **Variables/Functions**: camelCase (`calculateResult`)
- **Classes**: PascalCase (`CalculatorEngine`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_PRECISION`)
- **Files**: kebab-case (`calculator-engine.js`)

### Comments and Documentation
```javascript
/**
 * Calculates the result of the current operation
 * @param {string} operation - The operation to perform
 * @param {number} a - First operand
 * @param {number} b - Second operand
 * @returns {number} The calculation result
 */
function calculate(operation, a, b) {
  // Implementation with inline comments for complex logic
}
```

## 📝 Submitting Changes

### Pull Request Guidelines
- **Title**: Clear, descriptive title (`feat: add scientific notation support`)
- **Description**: Detailed explanation of changes
- **References**: Link to related issues (`Closes #123`)
- **Testing**: Describe how changes were tested
- **Screenshots**: Include screenshots for UI changes

### PR Template
```markdown
## Description
Brief description of the changes made.

## Type of Change
- [ ] Bug fix (non-breaking change)
- [ ] New feature (non-breaking change)
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] Added new tests

## Screenshots (if applicable)
[Add screenshots here]

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes
```

## 🐛 Reporting Issues

### Bug Reports
When reporting bugs, please include:
- **Clear title** describing the issue
- **Steps to reproduce** the problem
- **Expected behavior** vs actual behavior
- **Environment details** (OS, Node version, etc.)
- **Screenshots** if applicable
- **Error messages** or console output

### Feature Requests
For feature requests, please include:
- **Clear description** of the proposed feature
- **Use case** and why it's needed
- **Implementation ideas** if you have them
- **Mockups or examples** if applicable

## 📞 Getting Help

### Communication Channels
- **Issues**: For bugs and feature requests
- **Discussions**: For questions and general discussion
- **Pull Requests**: For code contributions

### Response Times
- **Issues**: Typically responded to within 24-48 hours
- **PR Reviews**: Reviewed within 3-5 business days
- **Critical Bugs**: Addressed as soon as possible

## 🎉 Recognition

Contributors will be:
- Listed in CHANGELOG.md for significant contributions
- Mentioned in release notes
- Added to a future contributors file
- Recognized in project documentation

Thank you for contributing to Electron Calculator! 🚀