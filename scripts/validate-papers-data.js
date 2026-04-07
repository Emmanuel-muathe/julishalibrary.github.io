#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const repoRoot = path.resolve(__dirname, '..');
const dataFile = path.join(repoRoot, 'js', 'papers-data.js');

const REQUIRED_FIELDS = [
  'id',
  'title',
  'subject',
  'level',
  'description',
  'author',
  'year',
  'downloads',
  'rating',
  'pages',
  'difficulty',
  'pdfUrl'
];

function loadPapersData() {
  const code = fs.readFileSync(dataFile, 'utf8');
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { filename: dataFile });

  if (!Array.isArray(sandbox.window.papersData)) {
    throw new Error('window.papersData must be an array in js/papers-data.js');
  }

  return { papersData: sandbox.window.papersData, sourceCode: code };
}

function checkDuplicateKeys(sourceCode) {
  const objectBlocks = sourceCode.match(/\{[\s\S]*?\}/g) || [];
  const errors = [];

  objectBlocks.forEach((block, blockIndex) => {
    const keyMatches = [...block.matchAll(/\n\s*([A-Za-z_$][\w$]*)\s*:/g)];
    const seen = new Set();
    keyMatches.forEach((match) => {
      const key = match[1];
      if (seen.has(key)) {
        errors.push(`Duplicate key "${key}" found in object #${blockIndex + 1}`);
      }
      seen.add(key);
    });
  });

  return errors;
}

function validate() {
  const { papersData, sourceCode } = loadPapersData();
  const errors = [];
  const ids = new Set();

  papersData.forEach((paper, index) => {
    for (const field of REQUIRED_FIELDS) {
      if (!(field in paper)) {
        errors.push(`Entry at index ${index} (id=${paper.id ?? 'unknown'}) is missing required key: ${field}`);
      }
    }

    if (ids.has(paper.id)) {
      errors.push(`Duplicate id detected: ${paper.id}`);
    }
    ids.add(paper.id);

    if (paper.pdfUrl) {
      const pdfPath = path.join(repoRoot, paper.pdfUrl);
      if (!fs.existsSync(pdfPath)) {
        errors.push(`Missing PDF for id=${paper.id}: ${paper.pdfUrl}`);
      }
    }
  });

  errors.push(...checkDuplicateKeys(sourceCode));

  if (errors.length > 0) {
    console.error('papersData validation failed:');
    errors.forEach((error) => console.error(` - ${error}`));
    process.exit(1);
  }

  console.log(`papersData validation passed (${papersData.length} records checked).`);
}

validate();
