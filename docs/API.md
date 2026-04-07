# API / Front-End Function Reference

This document reflects the functions currently implemented in `js/script.js`.
# Papers Data API

`papersData` is the canonical dataset used by the UI and validation tooling.
## UI handler parity checklist

Keep this checklist synchronized with every `onclick="..."` handler in `index.html`.

- [x] `toggleDarkMode()` → `js/script.js::toggleDarkMode`
- [x] `scrollToPapers()` → `js/script.js::scrollToPapers`
- [x] `closeRelatedPapers()` → `js/script.js::closeRelatedPapers`
- [x] `closePreview()` → `js/script.js::closePreview`
- [x] `voteDifficulty('Easy' | 'Medium' | 'Hard')` → `js/script.js::voteDifficulty`
- [x] `previousPage()` → `js/script.js::previousPage`
- [x] `nextPage()` → `js/script.js::nextPage`
- [x] `downloadPreviewedPaper()` → `js/script.js::downloadPreviewedPaper`
- [x] `viewFullPDF()` → `js/script.js::viewFullPDF`
- [x] `sharePaperLink()` → `js/script.js::sharePaperLink`
- [x] `shareViaEmail()` → `js/script.js::shareViaEmail`
- [x] `toggleSection('subjectsContent' | 'aboutContent' | 'contactContent' | 'newsletterContent')` → `js/script.js::toggleSection`
- [x] `filterBySubject('Mathematics' | 'Physics' | 'Chemistry' | 'Biology' | 'English' | 'History' | 'Kiswahili')` → `js/script.js::filterBySubject`

## Papers Data Structure

## Data Model

Paper records are stored in `papersData` (array of objects).

### Current paper object shape

```js
## Source of truth

- Browser/runtime source: `js/papers-data.js`
- Runtime validator: `js/script.js`
- CI/automation validator: `scripts/validate-papers-data.js`

## Schema: `PaperRecord`

### Required fields
```javascript
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
    id: Number,                    // Unique identifier
    title: String,                 // Paper title
    subject: String,               // Subject name
    level: String,                 // Grade or Form level
    description: String,           // Short description (1-2 lines)
    author: String,                // Author/Teacher name
    year: Number,                  // Publication year
    downloads: Number,             // Download count
    rating: Number,                // Average rating (0-5, decimal)
    featured: Boolean,             // Optional: shows paper in Featured section when true
    pages: Number,                 // Number of pages
    difficulty: String,            // "Easy", "Medium", or "Hard"
    pdfUrl: String,                // Path to PDF file
    url: String                    // Legacy external URL (usually "#")
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
```javascript
{
    id: 1,
    title: "Algebra Fundamentals",
    subject: "Mathematics",
    level: "Grade 10",
    description: "Complete guide to algebraic equations and functions",
    author: "Dr. Smith",
    year: 2025,
    downloads: 245,
    rating: 4.8,
    featured: true,
    pages: 42,
    difficulty: "Medium",
    pdfUrl: "papers/mathematics/algebra-fundamentals.pdf",
    url: "#"
}
```

## Field Descriptions

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | Number | ✅ | Unique integer. Use next available number when adding papers |
| `title` | String | ✅ | 3-100 characters. Paper title |
| `subject` | String | ✅ | One of: "Mathematics", "Physics", "Chemistry", "Biology", "English", "History", "Geography" |
| `level` | String | ✅ | One of: "Grade 9", "Grade 10", "Grade 11", "Grade 12", "Form 1", "Form 2", "Form 3", "Form 4" |
| `description` | String | ✅ | 10-200 characters. Brief description for card display |
| `author` | String | ✅ | Author or teacher name |
| `year` | Number | ✅ | 4-digit year (e.g., 2025, 2026) |
| `downloads` | Number | ✅ | Integer starting from 0 |
| `rating` | Number | ✅ | 0-5 with decimals (e.g., 4.8) |
| `featured` | Boolean | ❌ | Optional. Set `true` to include the paper in the Featured section |
| `pages` | Number | ✅ | Integer. Total pages in PDF |
| `difficulty` | String | ✅ | One of: "Easy", "Medium", "Hard" |
| `pdfUrl` | String | ✅ | Relative path to PDF: `papers/subject/filename.pdf` |
| `url` | String | ❌ | Legacy field. Leave as `"#"` |

## Subject Mapping

```javascript
// Valid subjects and their folders:
"Mathematics"  → papers/mathematics/
"Physics"      → papers/physics/
"Chemistry"    → papers/chemistry/
"Biology"      → papers/biology/
"English"      → papers/english/
"History"      → papers/history/
"Geography"    → papers/geography/
```

## Level Mapping

```javascript
// High School Grades:
"Grade 9", "Grade 10", "Grade 11", "Grade 12"

// Alternative Forms (Kenyan curriculum):
"Form 1", "Form 2", "Form 3", "Form 4"
```

## Functions & Methods

### Search & Filter Functions

```javascript
// Search papers by title/topic
filterPapers(): void
// Reads from searchInput element

// Show title suggestions while searching
showSearchSuggestions(): void
```

### Paper Preview & Download

```javascript
// Open paper preview modal with PDF viewer
previewPaper(paperId: Number): void
// Example: previewPaper(1)

// Download paper as PDF
downloadPaper(event: Event|null, pdfUrl: String, title: String): void
// Example: downloadPaper(event, 'papers/mathematics/algebra.pdf', 'Algebra Fundamentals')

// Download currently previewed paper
downloadPreviewedPaper(): void

// Close preview modal
closePreview(): void

// Load and display PDF in modal
loadPDF(pdfUrl: String): void
// Internal function, called by previewPaper()

// Navigate PDF pages
nextPage(): void
previousPage(): void
```

### UI Helpers

```javascript
// Section expand/collapse helper
toggleSection(id: String): void
```

| Field | Type | Notes |
| --- | --- | --- |
| `id` | number | Must be unique across all records. |
| `title` | string | Human-readable paper title. |
| `subject` | string | Subject name shown in tags and search. |
| `level` | string | Class/form level (for example, `Form 1`). |
| `description` | string | Short summary shown in cards and preview. |
| `author` | string | Publisher/author label. |
| `year` | number | Publication year metadata. |
| `downloads` | number | Download count (UI metric). |
| `rating` | number | Rating value (UI metric). |
| `pages` | number | Page count shown in preview. |
| `difficulty` | string | Display label such as `Easy`, `Medium`, `Hard`. |
| `pdfUrl` | string | Relative path to local PDF file, must exist on disk. |

### Optional fields

| Field | Type | Notes |
| --- | --- | --- |
| `url` | string | Optional external/reference URL. Not required by UI. |

## Validation rules
// Render featured papers section
renderFeatured(): void
```

---

### Preview and PDF navigation

#### `previewPaper(paperId)`
Loads selected paper metadata into preview modal and starts PDF load.

```js
previewPaper(1);
```javascript
// Dark mode preference
localStorage.getItem('darkMode')          // 'true' or 'false'
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
### Step 1: Add Paper Object

```javascript
// In js/script.js, find the papersData array and add:
{
    id: 13,                                    // Next ID
    title: "Your Paper Title",
    subject: "Mathematics",                    // Must be valid subject
    level: "Grade 10",                         // Must be valid level
    description: "Brief description",
    author: "Your Name",
    year: 2026,
    downloads: 0,
    rating: 4.5,
    featured: false,                           // Optional: true to show in Featured section
    pages: 45,
    difficulty: "Medium",
    pdfUrl: "papers/mathematics/your-paper.pdf",  // Relative path
    url: "#"
}
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
1. Every record must contain all required fields.
2. `id` values must be unique.
3. `pdfUrl` must point to an existing file.
4. Object literals should not contain duplicate keys.

## Validation command

```bash
npm run validate:papers
```

This command is used by CI and can also be used in a local pre-commit hook.
## Error Handling

On `DOMContentLoaded`, the app runs:

```js
renderPapers(papersData);
```

This displays all available papers at startup.
### File Not Found

If a `pdfUrl` points to a non-existent file, the preview will show an error message and offer the download option.

## Performance Considerations

- PDFs are loaded on-demand (not on page load)
- Large PDFs (>50MB) may take time to load
- PDF.js renders only the current page (memory efficient)
- Search suggestions are generated from current paper titles

## Future API Enhancements

Planned additions:
- Backend database integration
- User authentication
- Comments and ratings system
- Paper upload interface
- Analytics tracking
- Multi-language support
