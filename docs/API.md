# API / Front-End Function Reference

This document reflects the functions currently implemented in `js/script.js`.

## Data Model

Paper records are stored in `papersData` (array of objects).

### Current paper object shape

```js
{
  id: 1,
  title: "KLB Biology Form 4",
  subject: "Biology",
  level: "Form 4",
  description: "Complete KLB Biology Form 4 study guide",
  author: "KLB Publishers",
  year: 2026,
  downloads: 0,
  rating: 0,
  pages: 0,
  difficulty: "Hard",
  pdfUrl: "papers/biology/klb-biology-form-4.pdf",
  url: "#" // optional; present on some records
}
```

## Global state and integrations

- `window.papersData` is exposed for debugging.
- PDF.js is used for preview rendering.
- Local storage key: `darkMode`.

## Implemented functions

### Theme

#### `toggleDarkMode()`
Toggles `dark-mode` class on `<body>` and persists preference to `localStorage`.

```js
toggleDarkMode();
```

---

### Rendering and filtering

#### `renderPapers(papers)`
Renders a paper card grid into `#papersGrid`.

```js
renderPapers(papersData);
```

#### `filterPapers()`
Reads `#searchInput`, filters by `title`, `description`, and `subject`, then re-renders.

```js
filterPapers();
```

#### `showSearchSuggestions()`
Builds `<datalist>` options in `#searchSuggestions` from title matches.

```js
showSearchSuggestions();
```

#### `toggleSection(id)`
Shows/hides an element by id using `style.display`.

```js
toggleSection('aboutSection');
```

---

### Preview and PDF navigation

#### `previewPaper(paperId)`
Loads selected paper metadata into preview modal and starts PDF load.

```js
previewPaper(1);
```

#### `closePreview()`
Closes preview modal and resets PDF state.

```js
closePreview();
```

#### `loadPDF(url)`
Loads PDF document with PDF.js and renders first page.

```js
loadPDF('papers/biology/klb-biology-form-4.pdf');
```

#### `renderPage(num)`
Renders a specific page number onto `#pdfCanvas`.

```js
renderPage(2);
```

#### `nextPage()`
Advances preview to the next page if available.

```js
nextPage();
```

#### `previousPage()`
Moves preview to the previous page if available.

```js
previousPage();
```

---

### Download

#### `downloadPaper(event, pdfUrl, title)`
Triggers file download using an `<a>` element.

```js
downloadPaper(null, 'papers/physics/physics-form-1-questions.pdf', 'Physics Form 1 Questions');
```

#### `downloadPreviewedPaper()`
Downloads the currently previewed paper.

```js
downloadPreviewedPaper();
```

## Initialization flow

On `DOMContentLoaded`, the app runs:

```js
renderPapers(papersData);
```

This displays all available papers at startup.
