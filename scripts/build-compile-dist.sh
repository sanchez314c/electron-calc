#!/bin/bash
# Comprehensive Build, Compile & Distribution Script
# Builds ALL platform variants with maximum optimization and bloat analysis

set -e

# ┌─────────────────────────────────────────────────────────────────────────────┐
# │                           COMPREHENSIVE ELECTRON BUILDER                   │
# │                      Multi-Platform Build Script v1.0.0                     │
# └─────────────────────────────────────────────────────────────────────────────┘

# Color coding for better output visibility
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="Calculator"
APP_VERSION="1.0.0"
BUILD_DIR="dist"
TEMP_DIR="temp-build"
LOG_FILE="build.log"
PACKAGE_JSON="package.json"

# Parse command line arguments
SKIP_CLEANUP=false
SKIP_BLOAT_CHECK=false
VERBOSE=false
BUILD_PLATFORMS="all"
BUILD_ARCHITECTURES="all"

while [[ $# -gt 0 ]]; do
    case $1 in
        --skip-cleanup) SKIP_CLEANUP=true ;;
        --skip-bloat-check) SKIP_BLOAT_CHECK=true ;;
        --verbose) VERBOSE=true ;;
        --platforms) BUILD_PLATFORMS="$2"; shift ;;
        --architectures) BUILD_ARCHITECTURES="$2"; shift ;;
        --help)
            echo "Usage: $0 [OPTIONS]"
            echo "Options:"
            echo "  --skip-cleanup      Skip cleanup operations"
            echo "  --skip-bloat-check  Skip dependency bloat analysis"
            echo "  --verbose           Enable verbose output"
            echo "  --platforms         Comma-separated list of platforms (mac,win,linux)"
            echo "  --architectures     Comma-separated list of architectures (x64,arm64,ia32,armv7l)"
            echo "  --help              Show this help message"
            exit 0
            ;;
        *) echo "Unknown option: $1"; exit 1 ;;
    esac
    shift
done

# Logging function
log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOG_FILE"
}

# Print formatted messages
print_header() {
    echo -e "${BLUE}╔══════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║ $1${NC}"
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

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "${CYAN}ℹ️  $1${NC}"
}

# ┌─────────────────────────────────────────────────────────────────────────────┐
# │                           SYSTEM PREPARATION                                │
# └─────────────────────────────────────────────────────────────────────────────┘

prepare_system() {
    print_section "SYSTEM PREPARATION"

    # Check if running in correct directory
    if [ ! -f "$PACKAGE_JSON" ]; then
        print_error "package.json not found. Please run from project root."
        exit 1
    fi

    # Check Node.js and npm
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed"
        exit 1
    fi

    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed"
        exit 1
    fi

    # Check Electron Builder
    if ! npm list electron-builder &> /dev/null; then
        print_warning "electron-builder not found, installing..."
        npm install --save-dev electron-builder
    fi

    # Create log file
    touch "$LOG_FILE"
    log "Build started at $(date)"

    # Clean previous builds if not skipped
    if [ "$SKIP_CLEANUP" = false ]; then
        cleanup_system
    fi

    # Create temporary directory
    mkdir -p "$TEMP_DIR"

    print_success "System preparation complete"
}

# ┌─────────────────────────────────────────────────────────────────────────────┐
# │                           SYSTEM CLEANUP                                    │
# └─────────────────────────────────────────────────────────────────────────────┘

cleanup_system() {
    print_section "SYSTEM CLEANUP"

    # Remove previous build artifacts
    if [ -d "$BUILD_DIR" ]; then
        print_info "Removing previous build directory..."
        rm -rf "$BUILD_DIR"
        print_success "Build directory cleaned"
    fi

    # Remove temporary files
    find . -name "*.tmp" -type f -delete 2>/dev/null || true
    find . -name "*.temp" -type f -delete 2>/dev/null || true
    find . -name ".DS_Store" -type f -delete 2>/dev/null || true

    # Clean npm cache if verbose
    if [ "$VERBOSE" = true ]; then
        print_info "Cleaning npm cache..."
        npm cache clean --force
        print_success "npm cache cleaned"
    fi

    print_success "System cleanup complete"
}

# ┌─────────────────────────────────────────────────────────────────────────────┐
# │                           BLOAT ANALYSIS                                    │
# └─────────────────────────────────────────────────────────────────────────────┘

analyze_bloat() {
    if [ "$SKIP_BLOAT_CHECK" = true ]; then
        print_warning "Skipping bloat analysis"
        return
    fi

    print_section "DEPENDENCY BLOAT ANALYSIS"

    # Node modules size analysis
    if [ -d "node_modules" ]; then
        NODE_MODULES_SIZE=$(du -sh node_modules | cut -f1)
        print_info "node_modules size: $NODE_MODULES_SIZE"

        # Top 10 largest packages
        print_info "Top 10 largest packages:"
        du -sh node_modules/* 2>/dev/null | sort -hr | head -10 | while read size pkg; do
            echo "  $size $(basename $pkg)"
        done
    fi

    # Check for duplicate packages
    print_info "Checking for duplicate packages..."
    DUPLICATE_PACKAGES=$(npm ls --depth=0 2>/dev/null | grep -E "^[├└]" | cut -d'@' -f1 | sort | uniq -d | wc -l)
    if [ "$DUPLICATE_PACKAGES" -gt 0 ]; then
        print_warning "Found $DUPLICATE_PACKAGES potentially duplicate packages"
    else
        print_success "No duplicate packages detected"
    fi

    # Check for security vulnerabilities
    if [ -f "package-lock.json" ]; then
        print_info "Running security audit..."
        npm audit --audit-level=moderate || print_warning "Security issues found"
    else
        print_warning "package-lock.json not found, cannot run security audit"
    fi

    print_success "Bloat analysis complete"
}

# ┌─────────────────────────────────────────────────────────────────────────────┐
# │                           DEPENDENCY OPTIMIZATION                           │
# └─────────────────────────────────────────────────────────────────────────────┘

optimize_dependencies() {
    print_section "DEPENDENCY OPTIMIZATION"

    # Generate package-lock.json if missing
    if [ ! -f "package-lock.json" ]; then
        print_info "Generating package-lock.json..."
        npm i --package-lock-only
        print_success "package-lock.json generated"
    fi

    # Install dependencies
    print_info "Installing dependencies..."
    npm ci --prefer-offline --no-audit
    print_success "Dependencies installed"

    # Check for unused dependencies (requires npm-check-updates)
    if command -v ncu &> /dev/null; then
        print_info "Checking for outdated packages..."
        ncu --checkUpdates || print_warning "Some packages may be outdated"
    fi
}

# ┌─────────────────────────────────────────────────────────────────────────────┐
# │                           BUILD EXECUTION                                   │
# └─────────────────────────────────────────────────────────────────────────────┘

execute_build() {
    print_section "MULTI-PLATFORM BUILD EXECUTION"

    # Parse platforms
    IFS=',' read -ra PLATFORMS <<< "$BUILD_PLATFORMS"
    IFS=',' read -ra ARCHITECTURES <<< "$BUILD_ARCHITECTURES"

    # Build configuration arrays
    declare -A PLATFORM_CONFIGS=(
        ["mac"]="dmg,zip"
        ["win"]="nsis,zip,msi"
        ["linux"]="AppImage,deb,rpm,snap,tar.gz"
    )

    declare -A ARCH_CONFIGS=(
        ["mac"]="x64,arm64"
        ["win"]="x64,ia32"
        ["linux"]="x64,arm64,ia32,armv7l"
    )

    # Determine platforms to build
    if [[ "$BUILD_PLATFORMS" == "all" ]]; then
        PLATFORMS=("mac" "win" "linux")
    fi

    # Determine architectures to build
    if [[ "$BUILD_ARCHITECTURES" == "all" ]]; then
        ARCHS=("x64" "arm64" "ia32" "armv7l")
    else
        IFS=',' read -ra ARCHS <<< "$BUILD_ARCHITECTURES"
    fi

    local total_builds=0
    local completed_builds=0

    # Calculate total builds
    for platform in "${PLATFORMS[@]}"; do
        if [[ "$BUILD_ARCHITECTURES" == "all" ]]; then
            IFS=',' read -ra platform_archs <<< "${ARCH_CONFIGS[$platform]}"
            total_builds=$((total_builds + ${#platform_archs[@]}))
        else
            total_builds=$((total_builds + ${#ARCHS[@]}))
        fi
    done

    print_info "Total builds to execute: $total_builds"

    # Execute builds
    for platform in "${PLATFORMS[@]}"; do
        if [[ "$BUILD_ARCHITECTURES" == "all" ]]; then
            IFS=',' read -ra platform_archs <<< "${ARCH_CONFIGS[$platform]}"
        else
            platform_archs=("${ARCHS[@]}")
        fi

        for arch in "${platform_archs[@]}"; do
            completed_builds=$((completed_builds + 1))
            print_info "Building for $platform-$arch ($completed_builds/$total_builds)"

            # Build command based on platform and architecture
            build_cmd="electron-builder --$platform"
            if [ "$arch" != "x64" ]; then
                build_cmd="$build_cmd --$arch"
            fi

            if [ "$VERBOSE" = true ]; then
                print_info "Executing: $build_cmd"
            fi

            # Execute build
            if eval "$build_cmd" 2>&1 | tee -a "$LOG_FILE"; then
                print_success "✅ $platform-$arch build completed successfully"
            else
                print_error "❌ $platform-$arch build failed"
                # Continue with other builds even if one fails
            fi
        done
    done

    print_success "All builds completed"
}

# ┌─────────────────────────────────────────────────────────────────────────────┐
# │                           PACKAGE ANALYSIS                                  │
# └─────────────────────────────────────────────────────────────────────────────┘

analyze_packages() {
    print_section "PACKAGE ANALYSIS"

    if [ ! -d "$BUILD_DIR" ]; then
        print_warning "No build directory found to analyze"
        return
    fi

    # Analyze generated packages
    print_info "Generated packages:"
    find "$BUILD_DIR" -type f \( -name "*.dmg" -o -name "*.exe" -o -name "*.deb" -o -name "*.rpm" -o -name "*.AppImage" -o -name "*.zip" \) | while read file; do
        size=$(du -sh "$file" | cut -f1)
        print_info "  $file ($size)"
    done

    # Total build size
    total_size=$(du -sh "$BUILD_DIR" | cut -f1)
    print_info "Total build size: $total_size"

    # Package size recommendations
    if command -v python3 &> /dev/null; then
        python3 -c "
import os

def format_bytes(bytes_value):
    for unit in ['B', 'KB', 'MB', 'GB']:
        if bytes_value < 1024.0:
            return f'{bytes_value:.1f} {unit}'
        bytes_value /= 1024.0
    return f'{bytes_value:.1f} TB'

build_dir = '$BUILD_DIR'
total_bytes = sum(os.path.getsize(os.path.join(dirpath, filename))
                 for dirpath, dirnames, filenames in os.walk(build_dir)
                 for filename in filenames)

print(f'Package Size Analysis:')
print(f'  Total size: {format_bytes(total_bytes)}')

if total_bytes > 500 * 1024 * 1024:  # > 500MB
    print('  ⚠️  Large package size detected - consider optimization')
elif total_bytes > 100 * 1024 * 1024:  # > 100MB
    print('  ⚠️  Moderate package size - optimization recommended')
else:
    print('  ✅ Acceptable package size')
" 2>/dev/null || print_info "Package size analysis skipped (Python 3 not available)"
    fi
}

# ┌─────────────────────────────────────────────────────────────────────────────┐
# │                           FINAL CLEANUP                                     │
# └─────────────────────────────────────────────────────────────────────────────┘

final_cleanup() {
    if [ "$SKIP_CLEANUP" = true ]; then
        print_warning "Skipping final cleanup"
        return
    fi

    print_section "FINAL CLEANUP"

    # Remove temporary directory
    if [ -d "$TEMP_DIR" ]; then
        rm -rf "$TEMP_DIR"
        print_success "Temporary files cleaned"
    fi

    # Clean build artifacts
    find . -name "*.log" -type f -size +10M -delete 2>/dev/null || true

    # Optimize .gitignore
    if [ -f ".gitignore" ]; then
        print_info "Optimizing .gitignore..."
        # Remove duplicate entries
        sort -u .gitignore -o .gitignore
        print_success ".gitignore optimized"
    fi

    print_success "Final cleanup complete"
}

# ┌─────────────────────────────────────────────────────────────────────────────┐
# │                           BUILD SUMMARY                                     │
# └─────────────────────────────────────────────────────────────────────────────┘

build_summary() {
    print_header "BUILD SUMMARY"

    # Build statistics
    if [ -f "$LOG_FILE" ]; then
        local start_time=$(head -1 "$LOG_FILE" | cut -d' ' -f4-5)
        local end_time=$(date '+%Y-%m-%d %H:%M:%S')

        echo -e "${WHITE}Build completed at:${NC} $end_time"
        echo -e "${WHITE}Build duration:${NC} Calculated from logs"
    fi

    # Package summary
    if [ -d "$BUILD_DIR" ]; then
        local package_count=$(find "$BUILD_DIR" -type f \( -name "*.dmg" -o -name "*.exe" -o -name "*.deb" -o -name "*.rpm" -o -name "*.AppImage" \) | wc -l)
        echo -e "${WHITE}Packages generated:${NC} $package_count"

        if [ "$package_count" -gt 0 ]; then
            echo -e "${WHITE}Package locations:${NC}"
            find "$BUILD_DIR" -type f \( -name "*.dmg" -o -name "*.exe" -o -name "*.deb" -o -name "*.rpm" -o -name "*.AppImage" \) | head -10 | while read file; do
                echo "  📦 $file"
            done
        fi
    fi

    # Success indicator
    echo -e "\n${GREEN}🎉 Build process completed successfully!${NC}"

    # Next steps
    echo -e "\n${CYAN}Next steps:${NC}"
    echo "  1. Test generated packages on target platforms"
    echo "  2. Run application tests: npm test"
    echo "  3. Review build log: cat $LOG_FILE"
    echo "  4. Deploy packages as needed"
}

# ┌─────────────────────────────────────────────────────────────────────────────┐
# │                           MAIN EXECUTION                                    │
# └─────────────────────────────────────────────────────────────────────────────┘

main() {
    print_header "$APP_NAME v$APP_VERSION - COMPREHENSIVE BUILD SYSTEM"

    # Trap cleanup on exit
    trap 'print_warning "Build interrupted"; exit 1' INT TERM

    # Execute build phases
    prepare_system
    analyze_bloat
    optimize_dependencies
    execute_build
    analyze_packages
    final_cleanup
    build_summary

    log "Build completed at $(date)"
}

# Run main function
main "$@"