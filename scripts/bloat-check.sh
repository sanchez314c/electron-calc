#!/bin/bash
# Dependency Bloat Analysis Script
# Analyzes and provides recommendations for dependency optimization

set -e

# Color coding
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
NC='\033[0m'

print_header() {
    echo -e "${BLUE}╔══════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║               DEPENDENCY BLOAT ANALYSIS TOOL                   ${NC}"
    echo -e "${BLUE}╚══════════════════════════════════════════════════════════════╝${NC}"
}

print_section() {
    echo -e "\n${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${WHITE}$1${NC}"
    echo -e "${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${CYAN}ℹ️  $1${NC}"
}

main() {
    print_header

    print_section "NODE MODULES ANALYSIS"

    if [ ! -d "node_modules" ]; then
        print_warning "node_modules directory not found. Run 'npm install' first."
        exit 1
    fi

    # Total size analysis
    total_size=$(du -sh node_modules | cut -f1)
    print_info "Total node_modules size: $total_size"

    # Top 20 largest packages
    print_info "Top 20 largest packages:"
    du -sh node_modules/* 2>/dev/null | sort -hr | head -20 | nl | while read line; do
        echo "  $line"
    done

    print_section "DEPENDENCY ANALYSIS"

    # Count dependencies
    if [ -f "package.json" ]; then
        deps_count=$(jq -r '.dependencies | keys | length' package.json 2>/dev/null || echo "N/A")
        dev_deps_count=$(jq -r '.devDependencies | keys | length' package.json 2>/dev/null || echo "N/A")
        print_info "Production dependencies: $deps_count"
        print_info "Development dependencies: $dev_deps_count"
    fi

    # Check for duplicates
    print_info "Checking for duplicate packages..."
    duplicate_count=$(npm ls --depth=0 2>/dev/null | grep -E "^[├└]" | cut -d'@' -f1 | sort | uniq -d | wc -l | tr -d ' ')
    if [ "$duplicate_count" -gt 0 ]; then
        print_warning "Found $duplicate_count potentially duplicate packages"
    else
        print_success "No duplicate packages detected"
    fi

    print_section "SECURITY ANALYSIS"

    if [ -f "package-lock.json" ]; then
        print_info "Running security audit..."
        npm audit --audit-level=moderate --json > /tmp/audit.json 2>/dev/null || true

        if [ -f "/tmp/audit.json" ]; then
            vulnerabilities=$(jq -r '.metadata.vulnerabilities.total // 0' /tmp/audit.json 2>/dev/null || echo "N/A")
            if [ "$vulnerabilities" -gt 0 ]; then
                print_warning "Found $vulnerabilities security vulnerabilities"
                print_info "Run 'npm audit fix' to resolve automatically fixable issues"
            else
                print_success "No security vulnerabilities found"
            fi
            rm -f /tmp/audit.json
        fi
    else
        print_warning "package-lock.json not found, cannot perform security audit"
    fi

    print_section "OPTIMIZATION RECOMMENDATIONS"

    # Check for large packages that might be alternatives
    print_info "Checking for optimization opportunities..."

    # Common large packages and alternatives
    large_packages=("moment" "lodash" "axios")
    for pkg in "${large_packages[@]}"; do
        if [ -d "node_modules/$pkg" ]; then
            size=$(du -sh "node_modules/$pkg" 2>/dev/null | cut -f1)
            case $pkg in
                "moment")
                    print_warning "$pkg package detected ($size) - consider using date-fns or dayjs for smaller footprint"
                    ;;
                "lodash")
                    print_warning "$pkg package detected ($size) - consider using lodash-es for tree-shaking or individual lodash methods"
                    ;;
                "axios")
                    print_warning "$pkg package detected ($size) - consider using native fetch API for modern browsers"
                    ;;
            esac
        fi
    done

    # Bundle size recommendations
    if command -v python3 &> /dev/null; then
        python3 -c "
import os

nm_size = 0
if os.path.exists('node_modules'):
    for dirpath, dirnames, filenames in os.walk('node_modules'):
        for filename in filenames:
            nm_size += os.path.getsize(os.path.join(dirpath, filename))

size_mb = nm_size / (1024 * 1024)

print('Size Recommendations:')
if size_mb > 500:
    print('  ⚠️  Very large node_modules (>500MB) - aggressive optimization recommended')
elif size_mb > 200:
    print('  ⚠️  Large node_modules (>200MB) - optimization recommended')
elif size_mb > 100:
    print('  ℹ️  Moderate node_modules (>100MB) - consider optimization')
else:
    print('  ✅ Acceptable node_modules size')
"
    fi

    print_success "Bloat analysis complete"
}

main "$@"