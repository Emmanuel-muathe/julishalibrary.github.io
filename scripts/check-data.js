#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const repoRoot = path.resolve(__dirname, '..');
const scriptPath = path.join(repoRoot, 'js', 'script.js');
const jsonPath = path.join(repoRoot, 'papers.json');

function fail(message) {
  console.error(`❌ ${message}`);
  process.exit(1);
}

function extractPapersData(jsSource) {
  const match = jsSource.match(/const\s+papersData\s*=\s*(\[[\s\S]*?\]);/);
  if (!match) {
    fail('Could not find `papersData` array in js/script.js.');
  }

  const sandbox = {};
  vm.createContext(sandbox);
  try {
    return vm.runInContext(`(${match[1]})`, sandbox, { timeout: 1000 });
  } catch (error) {
    fail(`Failed to parse papersData from js/script.js: ${error.message}`);
  }
}

function normalizePapers(papers) {
  return papers
    .map((paper) => {
      const normalized = { ...paper };
      const entries = Object.entries(normalized).sort(([a], [b]) => a.localeCompare(b));
      return Object.fromEntries(entries);
    })
    .sort((a, b) => a.id - b.id);
}

function assertUniqueIds(papers) {
  const ids = new Set();
  for (const paper of papers) {
    if (ids.has(paper.id)) {
      fail(`Duplicate paper id found: ${paper.id}`);
    }
    ids.add(paper.id);
  }
}

function assertRequiredFields(papers) {
  const requiredFields = ['id', 'title', 'subject', 'level', 'description', 'author', 'year', 'downloads', 'rating', 'pdfUrl'];
  for (const paper of papers) {
    for (const field of requiredFields) {
      if (!(field in paper)) {
        fail(`Paper id ${paper.id} is missing required field: ${field}`);
      }
    }
  }
}

function assertPdfFilesExist(papers) {
  for (const paper of papers) {
    const pdfPath = path.join(repoRoot, paper.pdfUrl);
    if (!fs.existsSync(pdfPath)) {
      fail(`Paper id ${paper.id} points to missing file: ${paper.pdfUrl}`);
    }
  }
}

function main() {
  if (!fs.existsSync(scriptPath)) {
    fail('Missing js/script.js.');
  }

  if (!fs.existsSync(jsonPath)) {
    fail('Missing papers.json.');
  }

  const scriptSource = fs.readFileSync(scriptPath, 'utf8');
  const papersFromScript = extractPapersData(scriptSource);

  let papersFromJson;
  try {
    papersFromJson = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  } catch (error) {
    fail(`Failed to parse papers.json: ${error.message}`);
  }

  if (!Array.isArray(papersFromScript)) {
    fail('papersData in js/script.js is not an array.');
  }

  if (!Array.isArray(papersFromJson)) {
    fail('papers.json root value must be an array.');
  }

  assertUniqueIds(papersFromScript);
  assertRequiredFields(papersFromScript);
  assertPdfFilesExist(papersFromScript);

  const normalizedScript = normalizePapers(papersFromScript);
  const normalizedJson = normalizePapers(papersFromJson);

  if (JSON.stringify(normalizedScript) !== JSON.stringify(normalizedJson)) {
    fail('papersData and papers.json are out of sync.');
  }

  console.log(`✅ Data integrity checks passed for ${papersFromScript.length} papers.`);
}

main();
