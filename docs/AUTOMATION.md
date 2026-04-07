# Automation Guide

This project uses lightweight automation for quality checks and data consistency.

## Current automation

- GitHub Actions workflow: `.github/workflows/quality-checks.yml`
- Linting: `npm run lint`
- Markdown link checks: `npm run check:docs`
- Data integrity checks: `npm run check:data`

## Local usage

```bash
npm install
npm run lint
npm run check:docs
npm run check:data
```
