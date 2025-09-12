#!/bin/bash

# Electron Calculator - Standards Validation Script
# This script validates that the project meets professional standards

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Scoring variables
SCORE=0
MAX_SCORE=10
PASSED_CHECKS=0
TOTAL_CHECKS=0

echo "🔍 Electron Calculator - Standards Validation"
echo "=============================================="
echo ""

# Function to check file existence
check_file() {
    local file="$1"
    local description="$2"
    local points="$3"

    ((TOTAL_CHECKS++))
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅ PASS${NC} - $description"
        ((SCORE += points))
        ((PASSED_CHECKS++))
        return 0
    else
        echo -e "${RED}❌ FAIL${NC} - $description"
        return 1
    fi
}

# Function to check directory existence
check_directory() {
    local dir="$1"
    local description="$2"
    local points="$3"

    ((TOTAL_CHECKS++))
    if [ -d "$dir" ]; then
        echo -e "${GREEN}✅ PASS${NC} - $description"
        ((SCORE += points))
        ((PASSED_CHECKS++))
        return 0
    else
        echo -e "${RED}❌ FAIL${NC} - $description"
        return 1
    fi
}

# Function to check file content
check_file_content() {
    local file="$1"
    local pattern="$2"
    local description="$3"
    local points="$4"

    ((TOTAL_CHECKS++))
    if [ -f "$file" ] && grep -q "$pattern" "$file"; then
        echo -e "${GREEN}✅ PASS${NC} - $description"
        ((SCORE += points))
        ((PASSED_CHECKS++))
        return 0
    else
        echo -e "${RED}❌ FAIL${NC} - $description"
        return 1
    fi
}

echo "📁 Project Structure Validation"
echo "-------------------------------"

# Core structure checks
check_directory "src" "Source code directory exists" 1
check_directory "tests" "Tests directory exists" 1
check_directory "docs" "Documentation directory exists" 1
check_directory "assets" "Assets directory exists" 1
check_directory "config" "Configuration directory exists" 1
check_directory "scripts" "Scripts directory exists" 1

echo ""
echo "📄 Documentation Validation"
echo "---------------------------"

# Documentation checks
check_file "README.md" "README.md exists" 1
check_file "TECH-STACK.md" "Technology stack documentation exists" 1
check_file "LICENSE" "License file exists" 1
check_file "CHANGELOG.md" "Changelog exists" 1
check_file "CONTRIBUTING.md" "Contributing guidelines exist" 1
check_file "SECURITY.md" "Security policy exists" 1
check_file "CODE_OF_CONDUCT.md" "Code of conduct exists" 1

echo ""
echo "⚙️ Configuration Validation"
echo "---------------------------"

# Configuration checks
check_file ".gitignore" ".gitignore exists" 1
check_file ".env.example" "Environment variables template exists" 1
check_file "package.json" "Package configuration exists" 1

echo ""
echo "🔧 GitHub Integration Validation"
echo "--------------------------------"

# GitHub integration checks
check_directory ".github" "GitHub integration directory exists" 1
check_file ".github/workflows/ci.yml" "CI/CD workflow exists" 1
check_directory ".github/ISSUE_TEMPLATE" "Issue templates directory exists" 1
check_file ".github/PULL_REQUEST_TEMPLATE.md" "Pull request template exists" 1

echo ""
echo "📊 Content Quality Validation"
echo "-----------------------------"

# Content quality checks
check_file_content "README.md" "Electron Calculator" "README has project title" 1
check_file_content "README.md" "badge" "README has status badges" 1
check_file_content "package.json" "electron" "Package.json has Electron dependency" 1
check_file_content "TECH-STACK.md" "Electron" "Tech stack documentation mentions Electron" 1

echo ""
echo "📈 Validation Summary"
echo "====================="

PERCENTAGE=$((SCORE * 100 / MAX_SCORE))
SUCCESS_RATE=$((PASSED_CHECKS * 100 / TOTAL_CHECKS))

echo "Score: $SCORE/$MAX_SCORE ($PERCENTAGE%)"
echo "Checks Passed: $PASSED_CHECKS/$TOTAL_CHECKS ($SUCCESS_RATE%)"
echo ""

if [ $SCORE -ge 8 ]; then
    echo -e "${GREEN}🎉 SUCCESS!${NC} Project meets professional standards"
    echo "Your Electron Calculator project is ready for collaboration and distribution."
elif [ $SCORE -ge 6 ]; then
    echo -e "${YELLOW}⚠️  NEEDS IMPROVEMENT${NC} Project is mostly standardized"
    echo "Address the failed checks to reach full compliance."
else
    echo -e "${RED}❌ REQUIRES WORK${NC} Project needs significant standardization"
    echo "Review the failed checks and implement missing components."
fi

echo ""
echo "📋 Next Steps:"
if [ $SCORE -lt 8 ]; then
    echo "1. Address all FAILED checks above"
    echo "2. Run this script again to verify"
    echo "3. Consider adding linting and formatting tools"
    echo "4. Set up automated testing if not already configured"
else
    echo "1. Initialize git repository: git init && git add ."
    echo "2. Create initial commit: git commit -m 'Initial commit: Professional Electron Calculator'"
    echo "3. Push to GitHub and set up repository"
    echo "4. Consider adding advanced features from TODO.md"
fi

echo ""
echo "🔗 Useful Commands:"
echo "• Run tests: npm test"
echo "• Development mode: npm run dev"
echo "• Build application: npm run build"
echo "• Validate again: ./scripts/validate-standards.sh"

exit 0