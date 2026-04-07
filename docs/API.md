# API Documentation 🔧

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

### Overview

All papers are stored in a JavaScript array called `papersData` located in `js/script.js`. Each paper object contains metadata used by the application.

### Paper Object Schema

```javascript
{
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

### Complete Example

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

### Rendering

```javascript
// Render paper cards to the grid
renderPapers(papers: Array): void
// Example: renderPapers(papersData)

// Render featured papers section
renderFeatured(): void
```

### Theme

```javascript
// Toggle dark/light mode
toggleDarkMode(): void

// Preference is saved to localStorage
```

## Local Storage Keys

```javascript
// Dark mode preference
localStorage.getItem('darkMode')          // 'true' or 'false'
```

## PDF.js Integration

The application uses PDF.js (v3.11.174) via CDN for PDF preview functionality.

### PDF Viewer Variables

```javascript
let pdfDoc = null;                    // Current PDF document
let pageNum = 1;                      // Current page number
let pageRendering = false;            // Rendering in progress flag
let pageNumPending = null;            // Pending page to render
```

### PDF Rendering Functions

```javascript
// Render specific page to canvas
renderPage(num: Number): void

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = '...'
```

## Adding New Papers (Programmatic)

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

### Step 2: Upload PDF

Place the PDF file at the specified `pdfUrl` path:
```
papers/mathematics/your-paper.pdf
```

### Step 3: Commit & Push

```bash
git add papers/ js/script.js
git commit -m "Add: Your Paper Title"
git push
```

## Error Handling

### PDF Loading Errors

```javascript
pdfjsLib.getDocument(pdfUrl).promise
    .then(pdf => { /* success */ })
    .catch(error => {
        console.error('PDF Error:', error);
        alert('Could not load PDF preview...');
    });
```

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
