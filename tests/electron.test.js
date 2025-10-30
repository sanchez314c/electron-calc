/**
 * Electron Application Tests
 * Tests the Electron application setup and basic functionality
 */

const { describe, test, expect, beforeEach, afterEach } = require('@jest/globals');
const path = require('path');

describe('Electron Application Tests', () => {

    describe('Project Structure', () => {
        test('should have required source files', () => {
            const fs = require('fs');

            // Check main source files exist
            expect(fs.existsSync(path.join(__dirname, '..', 'src', 'main.js'))).toBe(true);
            expect(fs.existsSync(path.join(__dirname, '..', 'src', 'preload.js'))).toBe(true);
            expect(fs.existsSync(path.join(__dirname, '..', 'src', 'index.html'))).toBe(true);
            expect(fs.existsSync(path.join(__dirname, '..', 'src', 'renderer.js'))).toBe(true);
            expect(fs.existsSync(path.join(__dirname, '..', 'src', 'style.css'))).toBe(true);
        });

        test('should have package.json with correct configuration', () => {
            const fs = require('fs');
            const packagePath = path.join(__dirname, '..', 'package.json');

            expect(fs.existsSync(packagePath)).toBe(true);

            const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

            expect(packageJson.name).toBe('electron-calculator');
            expect(packageJson.version).toBe('1.0.0');
            expect(packageJson.main).toBe('src/main.js');
            expect(packageJson.scripts).toBeDefined();
            expect(packageJson.build).toBeDefined();
        });

        test('should have required assets', () => {
            const fs = require('fs');

            // Check for icon files
            expect(fs.existsSync(path.join(__dirname, '..', 'assets', 'icons', 'icon.png'))).toBe(true);
            expect(fs.existsSync(path.join(__dirname, '..', 'resources', 'icons', 'icon.icns'))).toBe(true);
        });
    });

    describe('Build Configuration', () => {
        test('should have electron-builder configuration', () => {
            const fs = require('fs');
            const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));

            expect(packageJson.build).toBeDefined();
            expect(packageJson.build.appId).toBe('com.claude.calculator');
            expect(packageJson.build.productName).toBe('Calculator');
            expect(packageJson.build.directories.output).toBe('dist');
        });

        test('should have multi-platform build targets', () => {
            const fs = require('fs');
            const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));

            // Check macOS configuration
            expect(packageJson.build.mac).toBeDefined();
            expect(packageJson.build.mac.category).toBe('public.app-category.utilities');
            expect(packageJson.build.mac.target).toBeDefined();

            // Check Windows configuration
            expect(packageJson.build.win).toBeDefined();
            expect(packageJson.build.win.target).toBeDefined();

            // Check Linux configuration
            expect(packageJson.build.linux).toBeDefined();
            expect(packageJson.build.linux.category).toBe('Utility');
            expect(packageJson.build.linux.target).toBeDefined();
        });

        test('should have comprehensive npm scripts', () => {
            const fs = require('fs');
            const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));

            const requiredScripts = [
                'start',
                'dev',
                'build',
                'build:all',
                'build:maximum',
                'test',
                'bloat-check',
                'clean'
            ];

            requiredScripts.forEach(script => {
                expect(packageJson.scripts[script]).toBeDefined();
            });
        });
    });

    describe('Security Configuration', () => {
        test('should have proper .gitignore file', () => {
            const fs = require('fs');
            const gitignorePath = path.join(__dirname, '..', '.gitignore');

            expect(fs.existsSync(gitignorePath)).toBe(true);

            const gitignore = fs.readFileSync(gitignorePath, 'utf8');

            // Should ignore common files and directories
            expect(gitignore).toContain('node_modules/');
            expect(gitignore).toContain('dist/');
            expect(gitignore).toContain('.DS_Store');
            expect(gitignore).toContain('*.log');
        });

        test('should have package-lock.json for dependency management', () => {
            const fs = require('fs');
            const lockPath = path.join(__dirname, '..', 'package-lock.json');

            expect(fs.existsSync(lockPath)).toBe(true);
        });
    });

    describe('Documentation', () => {
        test('should have comprehensive documentation', () => {
            const fs = require('fs');

            // Check main documentation files
            expect(fs.existsSync(path.join(__dirname, '..', 'README.md'))).toBe(true);
            expect(fs.existsSync(path.join(__dirname, '..', 'CHANGELOG.md'))).toBe(true);
            expect(fs.existsSync(path.join(__dirname, '..', 'CONTRIBUTING.md'))).toBe(true);
            expect(fs.existsSync(path.join(__dirname, '..', 'LICENSE'))).toBe(true);
            expect(fs.existsSync(path.join(__dirname, '..', 'CLAUDE.md'))).toBe(true);

            // Check docs directory
            expect(fs.existsSync(path.join(__dirname, '..', 'docs', 'DEVELOPMENT.md'))).toBe(true);
            expect(fs.existsSync(path.join(__dirname, '..', 'docs', 'DOCUMENTATION_INDEX.md'))).toBe(true);
        });
    });

    describe('Build Scripts', () => {
        test('should have build automation scripts', () => {
            const fs = require('fs');

            // Check main build script
            expect(fs.existsSync(path.join(__dirname, '..', 'scripts', 'build-compile-dist.sh'))).toBe(true);

            // Check utility scripts
            expect(fs.existsSync(path.join(__dirname, '..', 'scripts', 'bloat-check.sh'))).toBe(true);
            expect(fs.existsSync(path.join(__dirname, '..', 'scripts', 'temp-cleanup.sh'))).toBe(true);

            // Verify scripts are executable
            const buildScript = path.join(__dirname, '..', 'scripts', 'build-compile-dist.sh');
            const stats = fs.statSync(buildScript);
            // Check if executable bit is set (for Unix-like systems)
            expect(stats.mode & parseInt('111', 8)).toBeTruthy();
        });
    });

    describe('Dependencies', () => {
        test('should have required development dependencies', () => {
            const fs = require('fs');
            const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));

            expect(packageJson.devDependencies).toBeDefined();
            expect(packageJson.devDependencies.electron).toBeDefined();
            expect(packageJson.devDependencies['electron-builder']).toBeDefined();
            expect(packageJson.devDependencies.jest).toBeDefined();
        });

        test('should have reasonable dependency count', () => {
            const fs = require('fs');
            const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));

            // Should not have excessive production dependencies (since this is a simple calculator)
            const prodDeps = Object.keys(packageJson.dependencies || {});
            expect(prodDeps.length).toBeLessThanOrEqual(5);

            // Should have reasonable number of dev dependencies
            const devDeps = Object.keys(packageJson.devDependencies || {});
            expect(devDeps.length).toBeLessThan(20);
        });
    });

    describe('Code Quality', () => {
        test('should have no obvious syntax errors in main files', () => {
            const fs = require('fs');

            // Try to parse main JavaScript files
            const mainJs = fs.readFileSync(path.join(__dirname, '..', 'src', 'main.js'), 'utf8');
            expect(() => new Function(mainJs)).not.toThrow();

            const rendererJs = fs.readFileSync(path.join(__dirname, '..', 'src', 'renderer.js'), 'utf8');
            expect(() => new Function(rendererJs)).not.toThrow();

            const preloadJs = fs.readFileSync(path.join(__dirname, '..', 'src', 'preload.js'), 'utf8');
            expect(() => new Function(preloadJs)).not.toThrow();
        });

        test('should have proper HTML structure', () => {
            const fs = require('fs');
            const html = fs.readFileSync(path.join(__dirname, '..', 'src', 'index.html'), 'utf8');

            // Should have basic HTML structure
            expect(html).toContain('<!DOCTYPE html>');
            expect(html).toContain('<html');
            expect(html).toContain('<head>');
            expect(html).toContain('<body>');
            expect(html).toContain('</html>');
        });

        test('should have CSS styles', () => {
            const fs = require('fs');
            const css = fs.readFileSync(path.join(__dirname, '..', 'src', 'style.css'), 'utf8');

            // Should have some CSS rules
            expect(css.length).toBeGreaterThan(100);
            expect(css).toContain('{');
            expect(css).toContain('}');
        });
    });
});