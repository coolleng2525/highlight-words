#!/bin/bash
set -e

echo "🔨 Building VSIX package for highlight-words v0.2.0..."

# Clean up
rm -rf vsix-build
rm -f highlight-words-*.vsix

# Create build directory structure
mkdir -p vsix-build/extension

echo "📦 Copying extension files..."

# Copy essential files
cp package.json vsix-build/extension/
cp README.md vsix-build/extension/ 2>/dev/null || echo "README.md not found, skipping"
cp LICENSE.md vsix-build/extension/ 2>/dev/null || echo "LICENSE.md not found, skipping"
cp CHANGELOG.md vsix-build/extension/
cp INSTALLATION.md vsix-build/extension/
cp QUICK_TEST.md vsix-build/extension/

# Copy compiled output
cp -r out vsix-build/extension/

# Copy resources
if [ -d "images" ]; then
    cp -r images vsix-build/extension/
fi

if [ -d "resources" ]; then
    cp -r resources vsix-build/extension/
fi

# Copy manifest files to root
cp extension.vsixmanifest vsix-build/
cp '[Content_Types].xml' vsix-build/

# Create the VSIX package
cd vsix-build
echo "🗜️  Creating VSIX archive..."
zip -q -r ../highlight-words-0.2.0.vsix . -x "*.DS_Store" -x "__MACOSX/*"

cd ..
rm -rf vsix-build

# Verify the package
if [ -f "highlight-words-0.2.0.vsix" ]; then
    SIZE=$(ls -lh highlight-words-0.2.0.vsix | awk '{print $5}')
    echo ""
    echo "✅ VSIX package created successfully!"
    echo "📦 File: highlight-words-0.2.0.vsix"
    echo "📏 Size: $SIZE"
    echo ""
    echo "🚀 To install:"
    echo "   code --install-extension highlight-words-0.2.0.vsix"
    echo ""
    echo "Or in VS Code:"
    echo "   Extensions > ... > Install from VSIX..."
else
    echo "❌ Failed to create VSIX package"
    exit 1
fi
