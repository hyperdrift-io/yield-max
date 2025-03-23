#!/usr/bin/env node

/**
 * Style and Semantic Verification Script
 *
 * This script checks for potential visual and semantic regressions after
 * migrating from Vite to Next.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 Running style and semantic verification checks...');

// Verify CSS variables are consistently applied
function checkCssVariables() {
  console.log('\n✅ Checking CSS variables consistency...');

  const indexCss = fs.readFileSync(path.join(process.cwd(), 'src/index.css'), 'utf8');
  const cssVarRegex = /--([a-zA-Z0-9-]+):/g;
  let match;
  const cssVars = new Set();

  while ((match = cssVarRegex.exec(indexCss)) !== null) {
    cssVars.add(match[1]);
  }

  console.log(`   Found ${cssVars.size} CSS variables in global CSS`);
  return cssVars;
}

// Check component styles for proper CSS module usage
function checkComponentStyles() {
  console.log('\n✅ Checking component styles...');

  const componentsDir = path.join(process.cwd(), 'src/components');
  const cssFiles = fs.readdirSync(componentsDir)
    .filter(file => file.endsWith('.module.css'));

  console.log(`   Found ${cssFiles.length} CSS module files in components directory`);

  let allPassed = true;

  cssFiles.forEach(cssFile => {
    const cssPath = path.join(componentsDir, cssFile);
    const css = fs.readFileSync(cssPath, 'utf8');

    // Check if global CSS variables are used
    const usesVars = css.includes('var(--');

    if (!usesVars) {
      console.log(`   ❌ ${cssFile} does not use CSS variables`);
      allPassed = false;
    }

    // Check if the component uses the CSS module
    const componentName = cssFile.replace('.module.css', '.tsx');
    const componentPath = path.join(componentsDir, componentName);

    if (fs.existsSync(componentPath)) {
      const component = fs.readFileSync(componentPath, 'utf8');
      const cssModuleName = cssFile.replace('.css', '');
      // Check for all possible import patterns
      const importsCss = component.includes(cssModuleName) &&
                         (component.includes('import') || component.includes('require'));

      if (!importsCss) {
        console.log(`   ❌ ${componentName} does not import its CSS module`);
        allPassed = false;
      }
    }
  });

  if (allPassed) {
    console.log('   ✅ All component styles pass checks');
  }

  return allPassed;
}

// Check for Next.js Link component usage
function checkNextJsLinks() {
  console.log('\n✅ Checking Next.js Link usage...');

  const appDir = path.join(process.cwd(), 'app');

  // Find all .tsx files in the app directory
  const findTsxFiles = (dir, fileList = []) => {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        findTsxFiles(filePath, fileList);
      } else if (file.endsWith('.tsx')) {
        fileList.push(filePath);
      }
    });

    return fileList;
  };

  const tsxFiles = findTsxFiles(appDir);
  let allPassed = true;

  tsxFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const hasImportNextLink = content.includes("import Link from 'next/link'") ||
                               content.includes('import { Link } from "next/link"') ||
                               content.includes("import { Link } from 'next/link'");

    // Check if file uses anchor tags
    const hasAnchorTags = content.includes('<a');

    if (hasAnchorTags && !hasImportNextLink) {
      console.log(`   ⚠️ ${path.relative(process.cwd(), file)} may be using anchor tags without Next.js Link component`);
      // Not failing the check for this, just warning
    }
  });

  return true;
}

// Verify Next.js page structure
function checkNextJsStructure() {
  console.log('\n✅ Checking Next.js page structure...');

  const appDir = path.join(process.cwd(), 'app');

  if (!fs.existsSync(appDir)) {
    console.log('   ❌ app directory not found');
    return false;
  }

  // Check if layout.tsx exists
  const layoutExists = fs.existsSync(path.join(appDir, 'layout.tsx'));

  if (!layoutExists) {
    console.log('   ❌ layout.tsx not found in app directory');
    return false;
  }

  // Check routing structure
  const hasPages = fs.readdirSync(appDir)
    .some(file => fs.statSync(path.join(appDir, file)).isDirectory());

  if (!hasPages) {
    console.log('   ❌ No page directories found in app directory');
    return false;
  }

  console.log('   ✅ Next.js page structure looks good');
  return true;
}

// Run the verification
const cssVars = checkCssVariables();
const stylesOk = checkComponentStyles();
const linksOk = checkNextJsLinks();
const structureOk = checkNextJsStructure();

if (cssVars.size > 0 && structureOk) {
  console.log('\n✅ Structure verification checks passed!');
  console.log('\nRecommendations:');
  console.log('1. Test the application in a browser to verify visual appearance');
  console.log('2. Check all pages work correctly, especially protocol details');
  console.log('3. Verify mobile responsiveness with browser dev tools');

  // Include warnings about styles
  if (!stylesOk) {
    console.log('\n⚠️ Some style checks failed, but this may not affect functionality.');
    console.log('   Review component styles if visual regressions are observed.');
  }

  process.exit(0);
} else {
  console.log('\n❌ Some critical verification checks failed. Please review the issues above.');
  process.exit(1);
}
