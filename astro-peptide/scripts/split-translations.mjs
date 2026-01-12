#!/usr/bin/env node
/**
 * Script to split the monolithic translations.ts into separate language files
 * 
 * This script extracts each language's translations from the main file
 * and creates individual en.ts, nl.ts, de.ts, fr.ts, es.ts, it.ts files
 * 
 * Run with: node scripts/split-translations.mjs
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const i18nDir = join(rootDir, 'src', 'i18n');
const translationsDir = join(i18nDir, 'translations');
const sourceFile = join(i18nDir, 'translations.ts');

// Ensure translations directory exists
if (!existsSync(translationsDir)) {
  mkdirSync(translationsDir, { recursive: true });
}

// Read the source file
const source = readFileSync(sourceFile, 'utf8');

// Languages to extract
const languages = ['en', 'nl', 'de', 'fr', 'es', 'it'];

// Find the translations object
const translationsMatch = source.match(/export const translations: Record<SupportedLanguage, Translations> = \{([\s\S]*?)\n\};?\n\n/);

if (!translationsMatch) {
  console.error('Could not find translations object in source file');
  process.exit(1);
}

const translationsContent = translationsMatch[1];

// Extract each language
languages.forEach((lang, index) => {
  console.log(`Extracting ${lang}...`);
  
  // Find the start of this language's translations
  const langStart = new RegExp(`^\\s+${lang}:\\s*\\{`, 'm');
  const startMatch = translationsContent.match(langStart);
  
  if (!startMatch) {
    console.error(`Could not find ${lang} translations`);
    return;
  }
  
  const startIndex = translationsContent.indexOf(startMatch[0]);
  
  // Find the end - either the next language or the end
  let endIndex;
  if (index < languages.length - 1) {
    const nextLang = languages[index + 1];
    const nextLangPattern = new RegExp(`\\n\\s+${nextLang}:\\s*\\{`, 'm');
    const nextMatch = translationsContent.substring(startIndex + 1).match(nextLangPattern);
    if (nextMatch) {
      endIndex = startIndex + 1 + translationsContent.substring(startIndex + 1).indexOf(nextMatch[0]);
    }
  }
  
  if (!endIndex) {
    // Last language - go to the end
    endIndex = translationsContent.length;
  }
  
  // Extract the language content
  let langContent = translationsContent.substring(startIndex, endIndex);
  
  // Remove trailing comma and the language key
  langContent = langContent.replace(new RegExp(`^\\s+${lang}:\\s*`), '');
  langContent = langContent.replace(/,\s*$/, '');
  
  // Create the file content
  const fileContent = `// ${lang.toUpperCase()} translations
import type { Translations } from './types';

export const ${lang}: Translations = ${langContent};
`;

  // Write the file
  const outFile = join(translationsDir, `${lang}.ts`);
  writeFileSync(outFile, fileContent);
  console.log(`  Created ${outFile}`);
});

// Create the index file
const indexContent = `// Translation module index
// Individual language translation files for better maintainability

// Re-export types and constants
export * from './types';

// Import all language translations
import { en } from './en';
import { nl } from './nl';
import { de } from './de';
import { fr } from './fr';
import { es } from './es';
import { it } from './it';

// Export individual languages
export { en, nl, de, fr, es, it };

// Combined translations object
import type { SupportedLanguage, Translations } from './types';

export const translations: Record<SupportedLanguage, Translations> = {
  en,
  nl,
  de,
  fr,
  es,
  it,
};
`;

writeFileSync(join(translationsDir, 'index.ts'), indexContent);
console.log('Created index.ts');

console.log('\\nDone! Translation files have been extracted.');
console.log('\\nNext steps:');
console.log('1. Update imports in translations.ts to use ./translations/index');
console.log('2. Move helper functions to a separate utils file');
console.log('3. Remove the inline translations object from translations.ts');
