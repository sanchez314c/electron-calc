#!/bin/bash
# Temporary File Cleanup Script
# Cleans up temporary files and build artifacts

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
    echo -e "${BLUE}║                    TEMPORARY FILE CLEANUP                       ${NC}"
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

# Cleanup functions
cleanup_temp_files() {
    print_section "TEMPORARY FILE CLEANUP"

    local removed_files=0
    local removed_size=0

    # Remove common temporary files
    for pattern in "*.tmp" "*.temp" "*.bak" "*.backup" "*.log" "*.pid" "*.seed" "*.lock-wscript"; do
        local files_found=$(find . -name "$pattern" -type f 2>/dev/null | wc -l)
        if [ "$files_found" -gt 0 ]; then
            local size=$(find . -name "$pattern" -type f -exec du -ch {} + 2>/dev/null | tail -1 | cut -f1)
            print_info "Removing $files_found $pattern files ($size)"
            find . -name "$pattern" -type f -delete 2>/dev/null
            removed_files=$((removed_files + files_found))
            if [ "$size" != "0" ]; then
                removed_size="$size"
            fi
        fi
    done

    # Remove OS-specific temp files
    for pattern in ".DS_Store" "Thumbs.db" "Desktop.ini" "ehthumbs.db"; do
        local files_found=$(find . -name "$pattern" -type f 2>/dev/null | wc -l)
        if [ "$files_found" -gt 0 ]; then
            print_info "Removing $files_found OS temp files"
            find . -name "$pattern" -type f -delete 2>/dev/null
            removed_files=$((removed_files + files_found))
        fi
    done

    # Clean editor backup files
    for pattern in "*~" "*.swp" "*.swo" "*.suc"; do
        local files_found=$(find . -name "$pattern" -type f 2>/dev/null | wc -l)
        if [ "$files_found" -gt 0 ]; then
            print_info "Removing $files_found editor backup files"
            find . -name "$pattern" -type f -delete 2>/dev/null
            removed_files=$((removed_files + files_found))
        fi
    done

    if [ "$removed_files" -gt 0 ]; then
        print_success "Removed $removed_files temporary files"
        if [ "$removed_size" != "0" ]; then
            print_success "Freed up $removed_size of disk space"
        fi
    else
        print_success "No temporary files found to remove"
    fi
}

cleanup_build_artifacts() {
    print_section "BUILD ARTIFACT CLEANUP"

    local cleaned_dirs=0

    # Remove build directories
    for dir in "dist" "build" "out" "release" "temp" "tmp"; do
        if [ -d "$dir" ]; then
            local size=$(du -sh "$dir" 2>/dev/null | cut -f1)
            print_info "Removing $dir directory ($size)"
            rm -rf "$dir"
            cleaned_dirs=$((cleaned_dirs + 1))
        fi
    done

    # Remove npm cache files
    if [ -d ".npm" ]; then
        print_info "Removing .npm cache directory"
        rm -rf ".npm"
        cleaned_dirs=$((cleaned_dirs + 1))
    fi

    # Remove test coverage
    if [ -d "coverage" ]; then
        print_info "Removing test coverage directory"
        rm -rf "coverage"
        cleaned_dirs=$((cleaned_dirs + 1))
    fi

    if [ "$cleaned_dirs" -gt 0 ]; then
        print_success "Cleaned $cleaned_dirs build directories"
    else
        print_success "No build artifacts found to clean"
    fi
}

cleanup_node_modules() {
    print_section "NODE MODULES OPTIMIZATION"

    if [ ! -d "node_modules" ]; then
        print_info "node_modules directory not found"
        return
    fi

    # Calculate current size
    local current_size=$(du -sh node_modules 2>/dev/null | cut -f1)
    print_info "Current node_modules size: $current_size"

    # Remove unnecessary files
    local cleaned_files=0

    # Remove test files from production packages
    find node_modules -name "test" -type d -exec rm -rf {} + 2>/dev/null || true
    find node_modules -name "tests" -type d -exec rm -rf {} + 2>/dev/null || true

    # Remove documentation files
    find node_modules -name "*.md" -type f -delete 2>/dev/null || true

    # Remove example files
    find node_modules -name "example*" -type f -delete 2>/dev/null || true
    find node_modules -name "examples" -type d -exec rm -rf {} + 2>/dev/null || true

    # Remove .git directories
    find node_modules -name ".git" -type d -exec rm -rf {} + 2>/dev/null || true

    # Remove TypeScript source files (keeping JS)
    find node_modules -name "*.ts" -type f ! -name "*.d.ts" -delete 2>/dev/null || true

    # Calculate new size
    local new_size=$(du -sh node_modules 2>/dev/null | cut -f1)
    print_info "Optimized node_modules size: $new_size"

    print_success "node_modules optimization complete"
}

cleanup_logs() {
    print_section "LOG CLEANUP"

    local removed_logs=0

    # Remove large log files
    find . -name "*.log" -type f -size +10M -delete 2>/dev/null || true
    removed_logs=$((removed_logs + $(find . -name "*.log" -type f -size +10M 2>/dev/null | wc -l)))

    # Clear npm debug logs
    if command -v npm &> /dev/null; then
        npm cache clean --force 2>/dev/null || true
        print_success "npm cache cleaned"
    fi

    # Remove debug logs
    find . -name "debug.log" -type f -delete 2>/dev/null || true
    find . -name "npm-debug.log*" -type f -delete 2>/dev/null || true
    find . -name "yarn-debug.log*" -type f -delete 2>/dev/null || true

    if [ "$removed_logs" -gt 0 ]; then
        print_success "Removed $removed_logs log files"
    else
        print_success "No large log files found"
    fi
}

optimize_git() {
    print_section "GIT OPTIMIZATION"

    if [ ! -d ".git" ]; then
        print_info "Not a git repository"
        return
    fi

    # Clean up unreachable objects
    print_info "Cleaning up git objects..."
    git gc --aggressive --prune=now 2>/dev/null || true

    # Remove stale refs
    git remote prune origin 2>/dev/null || true

    print_success "Git optimization complete"
}

generate_cleanup_report() {
    print_section "CLEANUP REPORT"

    local total_size=0
    local temp_size=0
    local nm_size=0

    # Calculate total project size
    if [ -d "." ]; then
        total_size=$(du -sh . 2>/dev/null | cut -f1)
    fi

    # Calculate temporary files size
    temp_size=$(find . -name "*.tmp" -o -name "*.temp" -o -name "*.bak" -o -name "*.log" 2>/dev/null | xargs du -ch 2>/dev/null | tail -1 | cut -f1 2>/dev/null || echo "0B")

    # Calculate node_modules size
    if [ -d "node_modules" ]; then
        nm_size=$(du -sh node_modules 2>/dev/null | cut -f1)
    fi

    echo -e "${WHITE}Cleanup Summary:${NC}"
    echo -e "  Total project size: $total_size"
    echo -e "  node_modules size: $nm_size"
    echo -e "  Temporary files: $temp_size"
    echo -e ""
    echo -e "${WHITE}Recommendations:${NC}"

    if [[ "$temp_size" != "0B" ]]; then
        echo -e "  ${YELLOW}⚠️  Temporary files still present - consider running cleanup again${NC}"
    else
        echo -e "  ${GREEN}✅ No temporary files detected${NC}"
    fi

    if command -v python3 &> /dev/null; then
        python3 -c "
import os
import subprocess

def get_dir_size(path):
    try:
        result = subprocess.run(['du', '-sb', path], capture_output=True, text=True)
        return int(result.stdout.split()[0]) if result.returncode == 0 else 0
    except:
        return 0

total_bytes = get_dir_size('.')
nm_bytes = get_dir_size('node_modules') if os.path.exists('node_modules') else 0

print('  Project size analysis:')
if total_bytes > 500 * 1024 * 1024:  # > 500MB
    print('    ⚠️  Large project size (>500MB) - consider archiving old builds')
elif total_bytes > 200 * 1024 * 1024:  # > 200MB
    print('    ℹ️  Moderate project size (>200MB)')
else:
    print('    ✅ Acceptable project size')

if nm_bytes > 200 * 1024 * 1024:  # > 200MB
    print('    ⚠️  Large node_modules - consider npm-check-updates for optimization')
"
    fi

    print_success "Cleanup process completed successfully"
}

main() {
    print_header

    # Parse command line arguments
    local aggressive=false
    local skip_node_modules=false

    while [[ $# -gt 0 ]]; do
        case $1 in
            --aggressive) aggressive=true ;;
            --skip-node-modules) skip_node_modules=true ;;
            --help)
                echo "Usage: $0 [OPTIONS]"
                echo "Options:"
                echo "  --aggressive        More aggressive cleanup (removes more files)"
                echo "  --skip-node-modules Skip node_modules optimization"
                echo "  --help              Show this help message"
                exit 0
                ;;
        esac
        shift
    done

    # Execute cleanup phases
    cleanup_temp_files
    cleanup_build_artifacts
    cleanup_logs

    if [ "$skip_node_modules" = false ]; then
        if [ "$aggressive" = true ]; then
            cleanup_node_modules
        else
            print_info "Skipping node_modules optimization (use --aggressive to enable)"
        fi
    fi

    optimize_git
    generate_cleanup_report

    print_success "All cleanup operations completed"
}

main "$@"