#!/usr/bin/env node
/**
 * Translation Completeness Checker
 * Validates that all translation keys exist in all 6 languages
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Read the used keys from temporary file
const usedKeysFile = '/tmp/used_keys.txt';
const usedKeys = fs.readFileSync(usedKeysFile, 'utf8').trim().split('\n').filter(k => k);

console.log(`\n📊 Translation Completeness Check`);
console.log(`==================================\n`);
console.log(`Checking ${usedKeys.length} translation keys across all languages...\n`);

// Dynamically import the translations
const translationsPath = path.join(__dirname, '../src/i18n/translations.ts');

async function runCheck() {
  // We need to compile TypeScript or use a workaround
  // Let's read and extract the translations object using regex/parsing
  
  const content = fs.readFileSync(translationsPath, 'utf8');
  
  const languages = ['en', 'nl', 'de', 'fr', 'es', 'it'];
  
  // Find where each language section starts and ends in the translations object
  const translationsStart = content.indexOf('export const translations:');
  if (translationsStart === -1) {
    console.error('Could not find translations export');
    return;
  }
  
  const translationsPart = content.slice(translationsStart);
  
  // For each language, check if the nested key structure exists
  function findLanguageBlock(lang) {
    // Find "  en: {" or similar (with proper indentation for main language blocks)
    const regex = new RegExp(`^  ${lang}: \\{`, 'm');
    const match = translationsPart.match(regex);
    if (!match) return null;
    
    const startIdx = match.index + match[0].length;
    
    // Find the end of this language block (next language or end)
    let braceCount = 1;
    let endIdx = startIdx;
    
    while (braceCount > 0 && endIdx < translationsPart.length) {
      const char = translationsPart[endIdx];
      if (char === '{') braceCount++;
      if (char === '}') braceCount--;
      endIdx++;
    }
    
    return translationsPart.slice(startIdx, endIdx - 1);
  }
  
  // Get a value from a nested path in a string block
  function hasKeyInBlock(block, keyPath) {
    const parts = keyPath.split('.');
    let currentBlock = block;
    
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isLast = i === parts.length - 1;
      
      if (isLast) {
        // Look for "key: 'value'" or "key: `value`" or "key: \"value\""
        const valueRegex = new RegExp(`\\b${part}:\\s*['"\`]`);
        return valueRegex.test(currentBlock);
      } else {
        // Look for "key: {" and extract that sub-block
        const objRegex = new RegExp(`\\b${part}:\\s*\\{`);
        const match = currentBlock.match(objRegex);
        if (!match) return false;
        
        const subStart = match.index + match[0].length;
        
        // Find matching closing brace
        let braceCount = 1;
        let subEnd = subStart;
        while (braceCount > 0 && subEnd < currentBlock.length) {
          if (currentBlock[subEnd] === '{') braceCount++;
          if (currentBlock[subEnd] === '}') braceCount--;
          subEnd++;
        }
        
        currentBlock = currentBlock.slice(subStart, subEnd - 1);
      }
    }
    return false;
  }
  
  // Check each key in each language
  const missingByLang = {};
  const missingByKey = {};
  
  for (const lang of languages) {
    missingByLang[lang] = [];
    const block = findLanguageBlock(lang);
    
    if (!block) {
      console.error(`Could not find language block for: ${lang}`);
      continue;
    }
    
    for (const key of usedKeys) {
      if (!hasKeyInBlock(block, key)) {
        missingByLang[lang].push(key);
        if (!missingByKey[key]) missingByKey[key] = [];
        missingByKey[key].push(lang);
      }
    }
  }
  
  // Report
  console.log(`📋 Results by Language:`);
  console.log(`------------------------`);
  
  for (const lang of languages) {
    const missing = missingByLang[lang];
    const found = usedKeys.length - missing.length;
    const pct = ((found / usedKeys.length) * 100).toFixed(1);
    const emoji = missing.length === 0 ? '✅' : (missing.length < 10 ? '⚠️' : '❌');
    
    console.log(`${emoji} ${lang.toUpperCase()}: ${found}/${usedKeys.length} (${pct}%) - ${missing.length} missing`);
    
    if (missing.length > 0 && missing.length <= 15) {
      for (const key of missing) {
        console.log(`     ↳ ${key}`);
      }
    } else if (missing.length > 15) {
      for (const key of missing.slice(0, 8)) {
        console.log(`     ↳ ${key}`);
      }
      console.log(`     ↳ ... and ${missing.length - 8} more`);
    }
  }
  
  // Summary
  console.log(`\n📊 Summary:`);
  console.log(`-----------`);
  
  const totalMissing = Object.keys(missingByKey).length;
  
  if (totalMissing === 0) {
    console.log(`✅ All ${usedKeys.length} translation keys are present in all ${languages.length} languages!`);
  } else {
    console.log(`❌ ${totalMissing} keys are missing translations in at least one language.\n`);
    
    // Group by how many languages are missing
    const missingInAll = Object.entries(missingByKey).filter(([k, langs]) => langs.length === languages.length);
    const missingInSome = Object.entries(missingByKey).filter(([k, langs]) => langs.length < languages.length);
    
    if (missingInAll.length > 0) {
      console.log(`🚨 Missing in ALL languages (${missingInAll.length} keys):`);
      for (const [key] of missingInAll.slice(0, 10)) {
        console.log(`   - ${key}`);
      }
      if (missingInAll.length > 10) {
        console.log(`   ... and ${missingInAll.length - 10} more\n`);
      }
    }
    
    if (missingInSome.length > 0) {
      console.log(`\n⚠️  Missing in SOME languages (${missingInSome.length} keys):`);
      for (const [key, langs] of missingInSome.slice(0, 20)) {
        console.log(`   - ${key} → missing in: ${langs.join(', ')}`);
      }
      if (missingInSome.length > 20) {
        console.log(`   ... and ${missingInSome.length - 20} more\n`);
      }
    }
  }
  
  console.log('\n');
}

runCheck().catch(console.error);
