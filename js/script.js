// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Load saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Sample Papers Data
const papersData = [
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
        featured: true,
        pages: 0,
        difficulty: "Hard",
        pdfUrl: "papers/biology/klb-biology-form-4.pdf"
    },
    {
        id: 2,
        title: "Form 4 Additional Mathematics Revision",
        subject: "Mathematics",
        level: "Form 4",
        description: "Complete revision questions for Form 4 Additional Mathematics",
        author: "Mathematics Department",
        year: 2026,
        downloads: 0,
        rating: 0,
        featured: true,
        pages: 0,
        difficulty: "Hard",
        pdfUrl: "papers/mathematics/form-4-additional-mathematics.pdf"
    },
    {
        id: 3,
        title: "Physics Form 1 Questions",
        subject: "Physics",
        level: "Form 1",
        description: "Comprehensive practice questions for Form 1 Physics",
        author: "Education Materials",
        year: 2026,
        downloads: 0,
        rating: 0,
        featured: true,
        pages: 0,
        difficulty: "Medium",
        pdfUrl: "papers/physics/physics-form-1-questions.pdf",
        url: "#"
    },
    {
        id: 16,
        title: "Kiswahili Form 2 Question Paper",
        subject: "Kiswahili",
        level: "Form 2",
        description: "Zeraki Achievers 3.0 question paper",
        author: "Zeraki Achievers",
        year: 2026,
        downloads: 0,
        rating: 0,
        pages: 30,
        difficulty: "Medium",
        pdfUrl: "papers/kiswahili/Kiswahili - Kiswahili Form 2 - Zeraki Achievers 3.0 - Question Paper (3).pdf",
        url: "#"
    },
    {
        id: 17,
        title: "Kiswahili Form 2 Question Paper (alt)",
        subject: "Kiswahili",
        level: "Form 2",
        description: "Alternate Zeraki Achievers 3.0 question paper",
        author: "Zeraki Achievers",
        year: 2026,
        downloads: 0,
        rating: 0,
        pages: 28,
        difficulty: "Medium",
        pdfUrl: "papers/kiswahili/Kiswahili - Kiswahili Form 2 - Zeraki Achievers 3.0 - Question Paper (4).pdf",
        url: "#"
    },
    {
        id: 18,
        title: "Kiswahili Form 2 Marking Scheme",
        subject: "Kiswahili",
        level: "Form 2",
        description: "Marking scheme for Zeraki Achievers paper",
        author: "Zeraki Achievers",
        year: 2026,
        downloads: 0,
        rating: 0,
        pages: 15,
        difficulty: "Easy",
        pdfUrl: "papers/kiswahili/Kiswahili - Kiswahili Form 2 - Zeraki Achievers 3.0 - Marking Scheme.pdf",
        url: "#"
    },
    {
        id: 19,
        title: "English Form 1 Question Paper",
        subject: "English",
        level: "Form 1",
        description: "Zeraki Achievers 3.0 question paper",
        author: "Zeraki Achievers",
        year: 2026,
        downloads: 0,
        rating: 0,
        pages: 32,
        difficulty: "Medium",
        pdfUrl: "papers/english/English - English Form 1 - Zeraki Achievers 3.0 - Question Paper.pdf",
        url: "#"
    },
    {
        id: 20,
        title: "English Form 1 Marking Scheme",
        subject: "English",
        level: "Form 1",
        description: "Marking scheme for Form 1 paper",
        author: "Zeraki Achievers",
        year: 2026,
        downloads: 0,
        rating: 0,
        pages: 12,
        difficulty: "Easy",
        pdfUrl: "papers/english/English - English Form 1 - Zeraki Achievers 3.0 - Marking Scheme.pdf",
        url: "#"
    },
    {
        id: 21,
        title: "History Form 2 Question Paper",
        subject: "History",
        level: "Form 2",
        description: "Zeraki Achievers 3.0 question paper",
        author: "Zeraki Achievers",
        year: 2026,
        downloads: 0,
        rating: 0,
        pages: 28,
        difficulty: "Medium",
        pdfUrl: "papers/history/History - History Form 2 - Zeraki Achievers 3.0 - Question Paper.pdf",
        url: "#"
    },
    {
        id: 22,
        title: "History Form 2 Marking Scheme",
        subject: "History",
        level: "Form 2",
        description: "Answer scheme for Form 2 history",
        author: "Zeraki Achievers",
        year: 2026,
        downloads: 0,
        rating: 0,
        pages: 10,
        difficulty: "Easy",
        pdfUrl: "papers/history/History - History Form 2 - Zeraki Achievers 3.0 - Marking Scheme.pdf",
        url: "#"
    },
    {
        id: 23,
        title: "Chemistry Form 1 Question Paper",
        subject: "Chemistry",
        level: "Form 1",
        description: "Zeraki Achievers 3.0 question paper",
        author: "Zeraki Achievers",
        year: 2026,
        downloads: 0,
        rating: 0,
        pages: 30,
        difficulty: "Medium",
        pdfUrl: "papers/chemistry/Chemistry - Chemistry Form 1 - Zeraki Achievers 3.0 - Question Paper.pdf",
        url: "#"
    },
    {
        id: 24,
        title: "Chemistry Form 1 Marking Scheme",
        subject: "Chemistry",
        level: "Form 1",
        description: "Marking scheme document",
        author: "Zeraki Achievers",
        year: 2026,
        downloads: 0,
        rating: 0,
        pages: 8,
        difficulty: "Easy",
        pdfUrl: "papers/chemistry/Chemistry - Chemistry Form 1 - Zeraki Achievers 3.0 - Marking Scheme.pdf",
        url: "#"
    },
    {
        id: 25,
        title: "Physics Form 1 Zeraki Question Paper",
        subject: "Physics",
        level: "Form 1",
        description: "Zeraki Achievers 3.0 question paper",
        author: "Zeraki Achievers",
        year: 2026,
        downloads: 0,
        rating: 0,
        pages: 26,
        difficulty: "Medium",
        pdfUrl: "papers/physics/Physics - Physics Form 1 - Zeraki Achievers 3.0 - Question Paper.pdf",
        url: "#"
    },
    {
        id: 26,
        title: "Physics Form 1 Questions PR",
        subject: "Physics",
        level: "Form 1",
        description: "Practice questions (PR version)",
        author: "Education Materials",
        year: 2026,
        downloads: 0,
        rating: 0,
        pages: 25,
        difficulty: "Medium",
        pdfUrl: "papers/physics/physics-form-1-questions-pr_520d9ac7b7fa7a1d30494b7bd8d8beb1.pdf",
        url: "#"
    },
    {
        id: 27,
        title: "Mathematics Form 2 Question Paper",
        subject: "Mathematics",
        level: "Form 2",
        description: "Zeraki Achievers 3.0 question paper",
        author: "Zeraki Achievers",
        year: 2026,
        downloads: 0,
        rating: 0,
        pages: 34,
        difficulty: "Medium",
        pdfUrl: "papers/mathematics/Mathematics - Mathematics Form 2 - Zeraki Achievers 3.0 - Question Paper.pdf",
        url: "#"
    },
    {
        id: 28,
        title: "Biology Form 1 Question Paper",
        subject: "Biology",
        level: "Form 1",
        description: "Zeraki Achievers 3.0 question paper",
        author: "Zeraki Achievers",
        year: 2026,
        downloads: 0,
        rating: 0,
        pages: 22,
        difficulty: "Medium",
        pdfUrl: "papers/biology/Biology - Biology Form 1 - Zeraki Achievers 3.0 - Question Paper.pdf",
        url: "#"
    },
    {
        id: 29,
        title: "Geography Form 1 Question Paper",
        subject: "Geography",
        level: "Form 1",
        description: "Zeraki Achievers 3.0 question paper",
        author: "Zeraki Achievers",
        year: 2026,
        downloads: 0,
        rating: 0,
        pages: 28,
        difficulty: "Medium",
        pdfUrl: "papers/geography/Geography - Geography Form 1 - Zeraki Achievers 3.0 - Question Paper.pdf",
        url: "#"
    },
    {
        id: 30,
        title: "Geography Form 1 Marking Scheme",
        subject: "Geography",
        level: "Form 1",
        description: "Answer scheme document",
        author: "Zeraki Achievers",
        year: 2026,
        downloads: 0,
        rating: 0,
        pages: 12,
        difficulty: "Easy",
        pdfUrl: "papers/geography/Geography - Geography Form 1 - Zeraki Achievers 3.0 - Marking Scheme.pdf",
        url: "#"
    }
];

let currentPreviewedPaper = null;
let pdfDoc = null;
let pageNum = 1;
let pageRendering = false;
let pageNumPending = null;

// Add PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

// expose data for debugging
window.papersData = papersData;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    renderFeatured();
    renderPapers(papersData);
    renderFeatured();
});

/**
 * Smooth-scroll to papers section
 */
function scrollToPapers() {
    const papersSection = document.getElementById('papers');
    if (papersSection) {
        papersSection.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * Render all papers
 */
function renderPapers(papers) {
    const papersGrid = document.getElementById('papersGrid');
    papersGrid.replaceChildren();

    if (papers.length === 0) {
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        const message = document.createElement('p');
        message.textContent = 'No papers found.';
        emptyState.appendChild(message);
        papersGrid.appendChild(emptyState);
        return;
    }

    papers.forEach((paper) => {
        const paperCard = document.createElement('div');
        paperCard.className = 'paper-card';
        paperCard.addEventListener('click', () => previewPaper(paper.id));

        const paperHeader = document.createElement('div');
        paperHeader.className = 'paper-header';

        const paperTags = document.createElement('div');
        paperTags.className = 'paper-tags';

        const paperSubject = document.createElement('span');
        paperSubject.className = 'paper-subject';
        paperSubject.textContent = paper.subject;

        const paperLevel = document.createElement('span');
        paperLevel.className = 'paper-level';
        paperLevel.textContent = paper.level;

        paperTags.appendChild(paperSubject);
        paperTags.appendChild(paperLevel);

        const paperTitle = document.createElement('h3');
        paperTitle.textContent = paper.title;

        paperHeader.appendChild(paperTags);
        paperHeader.appendChild(paperTitle);

        const paperBody = document.createElement('div');
        paperBody.className = 'paper-body';

        const paperDescription = document.createElement('p');
        paperDescription.className = 'paper-description';
        paperDescription.textContent = paper.description;

        const paperMeta = document.createElement('div');
        paperMeta.className = 'paper-meta';

        const rating = document.createElement('span');
        rating.className = 'rating';
        rating.textContent = `⭐ ${paper.rating}`;

        const downloads = document.createElement('span');
        downloads.className = 'downloads';
        downloads.textContent = `📥 ${paper.downloads}`;

        paperMeta.appendChild(rating);
        paperMeta.appendChild(downloads);

        const downloadButton = document.createElement('button');
        downloadButton.className = 'download-btn';
        downloadButton.textContent = '📥 Download';
        downloadButton.addEventListener('click', (event) => {
            downloadPaper(event, paper.pdfUrl, paper.title);
        });

        paperBody.appendChild(paperDescription);
        paperBody.appendChild(paperMeta);
        paperBody.appendChild(downloadButton);

        paperCard.appendChild(paperHeader);
        paperCard.appendChild(paperBody);

        papersGrid.appendChild(paperCard);
    });
}

/**
 * Render featured papers
 */
function renderFeatured() {
    const featuredGrid = document.getElementById('featuredGrid');
    if (!featuredGrid) return;

    const featuredPapers = papersData.filter(paper => paper.featured === true);
    if (featuredPapers.length === 0) {
        featuredGrid.innerHTML = '<div class="empty-state"><p>No featured papers available yet.</p></div>';
        return;
    }

    featuredGrid.innerHTML = featuredPapers.map(paper => `
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
 * Render featured papers using deterministic ranking:
 * highest rating, then downloads, then newest year, then lowest id.
 */
function renderFeatured() {
    const featuredGrid = document.getElementById('featuredGrid');
    if (!featuredGrid) return;

    const featuredPapers = [...papersData]
        .sort((a, b) => {
            if (b.rating !== a.rating) return b.rating - a.rating;
            if (b.downloads !== a.downloads) return b.downloads - a.downloads;
            if (b.year !== a.year) return (b.year || 0) - (a.year || 0);
            return a.id - b.id;
        })
        .slice(0, 6);

    if (featuredPapers.length === 0) {
        featuredGrid.innerHTML = '<div class="empty-state"><p>No featured papers available right now.</p></div>';
        return;
    }

    featuredGrid.innerHTML = featuredPapers.map(paper => `
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
 * Filter papers by subject card selection
 */
function filterBySubject(subject) {
    const normalizedSubject = String(subject || '').toLowerCase();
    const filtered = papersData.filter(
        paper => paper.subject.toLowerCase() === normalizedSubject
    );

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = subject;
    }

    renderPapers(filtered);
    scrollToPapers();
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
    document.getElementById('previewRating').textContent = Number(paper.rating || 0).toFixed(1);
    document.getElementById('previewDownloads').textContent = paper.downloads || 0;

    const difficultyFeedback = document.getElementById('difficultyFeedback');
    if (difficultyFeedback) {
        difficultyFeedback.style.display = 'none';
        difficultyFeedback.textContent = '';
    }

    const viewFullPreviewBtn = document.getElementById('viewFullPreviewBtn');
    if (viewFullPreviewBtn) {
        viewFullPreviewBtn.style.display = paper.pdfUrl ? 'inline-flex' : 'none';
    }

    document.getElementById('previewModal').style.display = 'flex';
    renderRelatedPapers(paper);

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
 * Compute related papers by shared subject / level.
 * - +2 score for matching subject
 * - +1 score for matching level
 */
function getRelatedPapers(paper, limit = 6) {
    if (!paper) return [];

    return papersData
        .filter(candidate => candidate.id !== paper.id)
        .map(candidate => {
            let score = 0;
            if (candidate.subject === paper.subject) score += 2;
            if (candidate.level === paper.level) score += 1;
            return { ...candidate, _score: score };
        })
        .filter(candidate => candidate._score > 0)
        .sort((a, b) => b._score - a._score || b.year - a.year || a.title.localeCompare(b.title))
        .slice(0, limit);
}

/**
 * Render related papers list in modal.
 */
function renderRelatedPapers(paper) {
    const list = document.getElementById('relatedPapersList');
    if (!list) return;

    const related = getRelatedPapers(paper);
    if (related.length === 0) {
        list.innerHTML = '<p>No related papers found yet.</p>';
        return;
    }

    list.innerHTML = related.map(item => `
        <div class="related-paper-item">
            <h4>${item.title}</h4>
            <p>${item.subject} • ${item.level}</p>
            <button class="btn-secondary" onclick="openRelatedPaper(${item.id})">Open</button>
        </div>
    `).join('');
}

function openRelatedPaper(paperId) {
    closeRelatedPapers();
    previewPaper(paperId);
}

function openRelatedPapers() {
    if (!currentPreviewedPaper) return;
    renderRelatedPapers(currentPreviewedPaper);
    document.getElementById('relatedPapersModal').style.display = 'flex';
}

function closeRelatedPapers() {
    const modal = document.getElementById('relatedPapersModal');
    if (modal) modal.style.display = 'none';
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
 * Vote on paper difficulty
 */
function voteDifficulty(level) {
    if (!currentPreviewedPaper || !level) return;

    const key = 'difficultyVotes';
    const votes = JSON.parse(localStorage.getItem(key) || '{}');
    votes[currentPreviewedPaper.id] = level;
    localStorage.setItem(key, JSON.stringify(votes));

    const difficultyFeedback = document.getElementById('difficultyFeedback');
    if (difficultyFeedback) {
        difficultyFeedback.textContent = `Thanks! You voted "${level}" for "${currentPreviewedPaper.title}".`;
        difficultyFeedback.style.display = 'block';
    }
}

/**
 * Open the current PDF in a new tab
 */
function viewFullPDF() {
    if (!currentPreviewedPaper || !currentPreviewedPaper.pdfUrl) return;
    window.open(currentPreviewedPaper.pdfUrl, '_blank', 'noopener');
}

/**
 * Copy the current paper URL to clipboard
 */
function sharePaperLink() {
    if (!currentPreviewedPaper) return;

    const shareUrl = `${window.location.origin}${window.location.pathname}?paper=${currentPreviewedPaper.id}`;
    const onSuccess = () => alert('Paper link copied to clipboard.');
    const onFailure = () => alert(`Unable to copy automatically. Link: ${shareUrl}`);

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareUrl).then(onSuccess).catch(onFailure);
        return;
    }

    onFailure();
}

/**
 * Share the current paper via mail client
 */
function shareViaEmail() {
    if (!currentPreviewedPaper) return;

    const shareUrl = `${window.location.origin}${window.location.pathname}?paper=${currentPreviewedPaper.id}`;
    const subject = encodeURIComponent(`Check out this paper: ${currentPreviewedPaper.title}`);
    const body = encodeURIComponent(
        `I found this paper on Julisha Library:\n\n${currentPreviewedPaper.title}\n${shareUrl}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
}

/**
 * Close related papers modal
 */
function closeRelatedPapers() {
    const relatedPapersModal = document.getElementById('relatedPapersModal');
    if (relatedPapersModal) {
        relatedPapersModal.style.display = 'none';
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

    const button = document.querySelector(`.section-toggle[aria-controls="${id}"]`);
    const willExpand = el.hasAttribute('hidden');

    el.toggleAttribute('hidden');

    if (button) {
        button.setAttribute('aria-expanded', String(willExpand));

        const icon = button.querySelector('.toggle-icon');
        if (icon) {
            icon.classList.toggle('is-expanded', willExpand);
        }
    }
}

/**
 * Close related papers modal
 */
function closeRelatedPapers() {
    const relatedPapersModal = document.getElementById('relatedPapersModal');
    if (!relatedPapersModal) return;
    relatedPapersModal.style.display = 'none';
}

/**
 * Capture difficulty feedback for current paper
 */
function voteDifficulty(level) {
    const difficultyFeedback = document.getElementById('difficultyFeedback');
    if (!difficultyFeedback) return;

    if (!currentPreviewedPaper) {
        difficultyFeedback.textContent = 'Open a paper preview first to vote on difficulty.';
        difficultyFeedback.style.display = 'block';
        return;
    }

    currentPreviewedPaper.difficulty = level;
    difficultyFeedback.textContent = `Thanks! You marked this paper as "${level}".`;
    difficultyFeedback.style.display = 'block';
}

/**
 * Open currently previewed PDF in new tab
 */
function viewFullPDF() {
    if (!currentPreviewedPaper || !currentPreviewedPaper.pdfUrl) return;
    window.open(currentPreviewedPaper.pdfUrl, '_blank', 'noopener,noreferrer');
}

/**
 * Share current paper link via clipboard
 */
function sharePaperLink() {
    if (!currentPreviewedPaper || !currentPreviewedPaper.pdfUrl) return;

    const paperUrl = new URL(currentPreviewedPaper.pdfUrl, window.location.href).toString();
    const fallbackCopy = function(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.setAttribute('readonly', '');
        textArea.style.position = 'absolute';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(paperUrl).then(function() {
            alert('Paper link copied to clipboard.');
        }).catch(function() {
            fallbackCopy(paperUrl);
            alert('Paper link copied to clipboard.');
        });
        return;
    }

    fallbackCopy(paperUrl);
    alert('Paper link copied to clipboard.');
}

/**
 * Share current paper via email
 */
function shareViaEmail() {
    if (!currentPreviewedPaper || !currentPreviewedPaper.pdfUrl) return;

    const paperUrl = new URL(currentPreviewedPaper.pdfUrl, window.location.href).toString();
    const subject = encodeURIComponent(`Check out this paper: ${currentPreviewedPaper.title}`);
    const body = encodeURIComponent(`I found this revision paper on Julisha Library:\n\n${currentPreviewedPaper.title}\n${paperUrl}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
}

/**
 * Filter papers by exact subject match
 */
function filterBySubject(subject) {
    const filtered = papersData.filter(paper => paper.subject === subject);
    renderPapers(filtered);
}

window.addEventListener('click', function(event) {
    const previewModal = document.getElementById('previewModal');
    const relatedModal = document.getElementById('relatedPapersModal');

    if (previewModal && event.target === previewModal) {
        closePreview();
    }

    if (relatedModal && event.target === relatedModal) {
        closeRelatedPapers();
    }
});
