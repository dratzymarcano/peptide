#!/usr/bin/env node
/**
 * Translation Key Checker
 * Scans the codebase for translation keys and verifies they exist in all languages
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

const languages = ['en', 'nl', 'de', 'fr', 'es', 'it'];

// Read the translations file
const translationsPath = path.join(rootDir, 'src/i18n/translations.ts');
const translationsContent = fs.readFileSync(translationsPath, 'utf8');

// Find all used translation keys from the saved file
const usedKeysFile = '/tmp/used_keys.txt';
const usedKeys = fs.readFileSync(usedKeysFile, 'utf8').trim().split('\n').filter(k => k);

console.log(`\n📊 Translation Coverage Analysis`);
console.log(`================================\n`);
console.log(`Found ${usedKeys.length} unique translation keys used in the codebase.\n`);

// Function to check if a key exists in a language's translations
function checkKeyInLanguage(key, lang) {
  // Build the nested property access pattern
  const parts = key.split('.');
  
  // For the translations object, we need to find the language block first
  // Then check if the nested key exists
  
  // Pattern to find in the translations: lang: { ... keyPath: value }
  // This is a simplified check - we look for the key pattern in the lang block
  
  // First, find the language block
  const langBlockRegex = new RegExp(`^\\s*${lang}:\\s*\\{`, 'm');
  const langMatch = translationsContent.match(langBlockRegex);
  
  if (!langMatch) {
    return false;
  }
  
  // Find the position of this language block
  const langStart = langMatch.index;
  
  // Find the end of this language block (next language block or end of translations)
  let langEnd = translationsContent.length;
  for (const otherLang of languages) {
    if (otherLang !== lang) {
      const otherLangRegex = new RegExp(`^\\s*${otherLang}:\\s*\\{`, 'm');
      const otherMatch = translationsContent.slice(langStart + 10).match(otherLangRegex);
      if (otherMatch) {
        const pos = langStart + 10 + otherMatch.index;
        if (pos > langStart && pos < langEnd) {
          langEnd = pos;
        }
      }
    }
  }
  
  const langBlock = translationsContent.slice(langStart, langEnd);
  
  // Now check if the key exists in this block
  // Key format: 'aboutPage.content.mission' becomes checking for 'mission:' within the right nesting
  const lastPart = parts[parts.length - 1];
  
  // Check if the full key path structure exists
  // We'll check if all parent objects exist and the final key exists
  let searchBlock = langBlock;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    const partRegex = new RegExp(`${part}:\\s*\\{`, 'i');
    if (!partRegex.test(searchBlock)) {
      return false;
    }
    // Narrow down the search block
    const partMatch = searchBlock.match(partRegex);
    if (partMatch) {
      const startIdx = partMatch.index + partMatch[0].length;
      searchBlock = searchBlock.slice(startIdx);
    }
  }
  
  // Now check for the final key
  const finalKeyRegex = new RegExp(`${lastPart}:\\s*['"\`]`, 'i');
  return finalKeyRegex.test(searchBlock);
}

// Track missing translations per language
const missingByLang = {};
const missingByKey = {};

for (const lang of languages) {
  missingByLang[lang] = [];
}

for (const key of usedKeys) {
  const missingLangs = [];
  for (const lang of languages) {
    const exists = checkKeyInLanguage(key, lang);
    if (!exists) {
      missingByLang[lang].push(key);
      missingLangs.push(lang);
    }
  }
  if (missingLangs.length > 0) {
    missingByKey[key] = missingLangs;
  }
}

// Report findings
console.log(`\n📋 Missing Translations by Language:`);
console.log(`------------------------------------`);

for (const lang of languages) {
  const count = missingByLang[lang].length;
  const emoji = count === 0 ? '✅' : '⚠️';
  console.log(`${emoji} ${lang.toUpperCase()}: ${count} missing keys`);
  
  if (count > 0 && count <= 20) {
    for (const key of missingByLang[lang]) {
      console.log(`   - ${key}`);
    }
  } else if (count > 20) {
    for (const key of missingByLang[lang].slice(0, 10)) {
      console.log(`   - ${key}`);
    }
    console.log(`   ... and ${count - 10} more`);
  }
}

// Summary
console.log(`\n📊 Summary:`);
console.log(`----------`);
const totalMissing = Object.keys(missingByKey).length;
if (totalMissing === 0) {
  console.log(`✅ All ${usedKeys.length} translation keys exist in all ${languages.length} languages!`);
} else {
  console.log(`⚠️  ${totalMissing} keys have missing translations in at least one language.`);
  console.log(`\nKeys with missing translations:`);
  for (const [key, langs] of Object.entries(missingByKey).slice(0, 30)) {
    console.log(`  - ${key}: missing in [${langs.join(', ')}]`);
  }
  if (Object.keys(missingByKey).length > 30) {
    console.log(`  ... and ${Object.keys(missingByKey).length - 30} more keys`);
  }
}

console.log('\n');
