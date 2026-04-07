# Deployment Guide

This project is a static site (`index.html`, `css/`, `js/`, `papers/`) with an optional local Node server (`server.js`).

## 1) Deploy with GitHub Pages

### Recommended repository layout
Keep these paths at repository root:

- `index.html`
- `css/style.css`
- `js/script.js`
- `papers/...`

### Steps

1. Push your repository to GitHub.
2. In GitHub: **Settings → Pages**.
3. Under **Build and deployment** choose:
   - **Source**: Deploy from a branch
   - **Branch**: `main` (or your default)
   - **Folder**: `/ (root)`
4. Save and wait for deployment.

Your site URL will look like:

- `https://<username>.github.io/<repo>/` (project repo), or
- `https://<username>.github.io/` (user/org pages repo).

## 2) Run locally for verification

```bash
npm install
npm start
```

Default local URL: `http://localhost:3000`.

## 3) Verify after deployment

- Home page loads from `index.html`
- CSS is loaded from `css/style.css`
- JavaScript is loaded from `js/script.js`
- PDFs open from `papers/` links
- Search/filter and preview functions work

## Troubleshooting

### Blank or unstyled page
- Confirm `index.html` references `css/style.css` and `js/script.js` with correct relative paths.
- Confirm GitHub Pages is publishing from repository root.

### 404 for PDFs
- Verify files exist under `papers/`.
- Check `pdfUrl` values in `js/script.js` match actual filenames exactly.

### Local server not starting
- Confirm Node.js is installed.
- Run `npm install` before `npm start`.

## Related docs

- [Main README](../README.md)
- [Project structure](./STRUCTURE.md)
- [API reference](./API.md)
