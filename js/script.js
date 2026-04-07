// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Load saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Runtime schema for paper records
const PAPER_REQUIRED_FIELDS = [
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

const PAPER_OPTIONAL_FIELDS = ['url'];

/**
 * Validate papers data loaded from js/papers-data.js
 */
function validatePapersDataRuntime(data) {
    if (!Array.isArray(data)) {
        console.error('papersData must be an array.');
        return false;
    }

    const allowed = new Set([...PAPER_REQUIRED_FIELDS, ...PAPER_OPTIONAL_FIELDS]);
    const ids = new Set();
    let isValid = true;

    data.forEach((paper, index) => {
        PAPER_REQUIRED_FIELDS.forEach((field) => {
            if (!(field in paper)) {
                console.error(`papersData[${index}] is missing required field: ${field}`);
                isValid = false;
            }
        });

        Object.keys(paper).forEach((key) => {
            if (!allowed.has(key)) {
                console.warn(`papersData[${index}] has unknown field: ${key}`);
            }
        });

        if (ids.has(paper.id)) {
            console.error(`Duplicate paper id detected: ${paper.id}`);
            isValid = false;
        }
        ids.add(paper.id);
    });

    return isValid;
}

const papersData = Array.isArray(window.papersData) ? window.papersData : [];
validatePapersDataRuntime(papersData);

let currentPreviewedPaper = null;
let pdfDoc = null;
let pageNum = 1;
let pageRendering = false;
let pageNumPending = null;

// Add PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    renderPapers(papersData);
});

/**
 * Render all papers
 */
function renderPapers(papers) {
    const papersGrid = document.getElementById('papersGrid');

    if (papers.length === 0) {
        papersGrid.innerHTML = '<div class="empty-state"><p>No papers found.</p></div>';
        return;
    }

    papersGrid.innerHTML = papers.map(paper => `
        <div class="paper-card" onclick="previewPaper(${paper.id})">
            <div class="paper-header">
                <div class="paper-tags">
                    <span class="paper-subject">${paper.subject}</span>
                    <span class="paper-level">${paper.level}</span>
                </div>
                <h3>${paper.title}</h3>
            </div>
            <div class="paper-body">
                <p class="paper-description">${paper.description}</p>
                <div class="paper-meta">
                    <span class="rating">⭐ ${paper.rating}</span>
                    <span class="downloads">📥 ${paper.downloads}</span>
                </div>
                <button class="download-btn" onclick="downloadPaper(event, '${paper.pdfUrl}', '${paper.title}')">
                    📥 Download
                </button>
            </div>
        </div>
    `).join('');
}

/**
 * Filter papers by search term (live)
 */
function filterPapers() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filtered = papersData.filter(paper => 
        paper.title.toLowerCase().includes(searchTerm) ||
        paper.description.toLowerCase().includes(searchTerm) ||
        paper.subject.toLowerCase().includes(searchTerm)
    );
    renderPapers(filtered);
}

/**
 * Preview paper
 */
function previewPaper(paperId) {
    const paper = papersData.find(p => p.id === paperId);
    if (!paper) return;

    currentPreviewedPaper = paper;

    document.getElementById('previewTitle').textContent = paper.title;
    document.getElementById('previewAuthor').textContent = `By: ${paper.author}`;
    document.getElementById('previewYear').textContent = paper.year ? `Year: ${paper.year}` : '';
    document.getElementById('previewPages').textContent = `${paper.pages} pages`;
    document.getElementById('previewDescription').textContent = paper.description;

    document.getElementById('previewModal').style.display = 'flex';

    // Load PDF preview
    loadPDF(paper.pdfUrl);
}

/**
 * Close preview
 */
function closePreview() {
    document.getElementById('previewModal').style.display = 'none';
    pdfDoc = null;
    pageNum = 1;
}

/**
 * Load PDF
 */
function loadPDF(url) {
    const pdfViewerSection = document.getElementById('pdfViewerSection');

    pdfjsLib.getDocument(url).promise.then(function (pdf) {
        pdfDoc = pdf;
        document.getElementById('totalPages').textContent = pdf.numPages;
        pdfViewerSection.style.display = 'block';
        renderPage(pageNum);
    }).catch(function (error) {
        console.error('Error loading PDF:', error);
        pdfViewerSection.innerHTML = '<p>Unable to load PDF preview. Download to view.</p>';
    });
}

/**
 * Render PDF page
 */
function renderPage(num) {
    if (!pdfDoc) return;

    pageRendering = true;
    pdfDoc.getPage(num).then(function (page) {
        const canvas = document.getElementById('pdfCanvas');
        const ctx = canvas.getContext('2d');
        const viewport = page.getViewport({ scale: 1.5 });

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
            canvasContext: ctx,
            viewport: viewport
        };

        page.render(renderContext).promise.then(function () {
            pageRendering = false;
            if (pageNumPending !== null) {
                renderPage(pageNumPending);
                pageNumPending = null;
            }
        });
    });

    document.getElementById('currentPage').textContent = num;
}

/**
 * Next page
 */
function nextPage() {
    if (pageNum >= pdfDoc.numPages) return;
    pageNumPending = pageNum + 1;
    if (!pageRendering) {
        renderPage(pageNumPending);
        pageNumPending = null;
    }
    pageNum++;
}

/**
 * Previous page
 */
function previousPage() {
    if (pageNum <= 1) return;
    pageNumPending = pageNum - 1;
    if (!pageRendering) {
        renderPage(pageNumPending);
        pageNumPending = null;
    }
    pageNum--;
}

/**
 * Download paper
 */
function downloadPaper(event, pdfUrl, title) {
    if (event) {
        event.stopPropagation();
    }

    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = title.replace(/\s+/g, '-').toLowerCase() + '.pdf';
    link.click();
}

/**
 * Download from preview
 */
function downloadPreviewedPaper() {
    if (currentPreviewedPaper) {
        downloadPaper(null, currentPreviewedPaper.pdfUrl, currentPreviewedPaper.title);
    }
}

/**
 * Show search suggestions
 */
function showSearchSuggestions() {
    const input = document.getElementById('searchInput');
    const datalist = document.getElementById('searchSuggestions');
    if (!input || !datalist) return;
    const term = input.value.toLowerCase();
    const suggestions = papersData
        .filter(p => p.title.toLowerCase().includes(term))
        .map(p => p.title);
    const unique = [...new Set(suggestions)];
    datalist.innerHTML = unique.map(s => `<option value="${s}">`).join('');
}

/**
 * Toggle section visibility
 */
function toggleSection(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.display = el.style.display === 'none' || el.style.display === '' ? 'block' : 'none';
}
