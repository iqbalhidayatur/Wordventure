(() => {
'use strict';

const KEY = 'wordventure.vocabNotebook';
let words = readWords();

const $ = id => document.getElementById(id);

function readWords() {
    try {
        const value = JSON.parse(localStorage.getItem(KEY) || '[]');
        return Array.isArray(value) ? value : [];
    } catch {
        return [];
    }
}

function saveWords() {
    localStorage.setItem(KEY, JSON.stringify(words));
}

function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({
        '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#039;'
    }[char]));
}

function getTimestamp(word) {
    const time = Date.parse(word.addedAt || '');
    return Number.isNaN(time) ? 0 : time;
}

function render() {
    const grid = $('notebookGrid');
    const query = ($('vocabSearch')?.value || '').trim().toLowerCase();
    const sort = $('vocabSort')?.value || 'newest';

    let list = words.filter(item => {
        const word = String(item.word || '').toLowerCase();
        const meaning = String(item.meaning || '').toLowerCase();
        const course = String(item.course || '').toLowerCase();
        return !query || word.includes(query) || meaning.includes(query) || course.includes(query);
    });

    list.sort((a, b) => {
        if (sort === 'az') return String(a.word).localeCompare(String(b.word));
        if (sort === 'za') return String(b.word).localeCompare(String(a.word));
        if (sort === 'oldest') return getTimestamp(a) - getTimestamp(b);
        return getTimestamp(b) - getTimestamp(a);
    });

    $('vocabCount').textContent = words.length;
    $('totalWords').textContent = words.length;

    const courses = new Set(words.map(item => item.course).filter(Boolean));
    $('courseCount').textContent = courses.size;

    const recentLimit = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const recent = words.filter(item => getTimestamp(item) >= recentLimit);
    $('recentCount').textContent = recent.length;

    if (!list.length) {
        grid.innerHTML = words.length
            ? `<div class="empty-notebook"><i class="bi bi-search"></i><strong>No matching words</strong><p>Try another word, meaning, or course.</p></div>`
            : `<div class="empty-notebook"><i class="bi bi-bookmark-heart"></i><strong>Your notebook is empty</strong><p>Save words from a lesson to start building your vocabulary collection.</p></div>`;
        return;
    }

    grid.innerHTML = list.map(item => {
        const index = words.indexOf(item);
        const course = escapeHTML(item.course || 'Wordventure');
        const lesson = item.lesson ? ` · ${escapeHTML(item.lesson)}` : '';
        return `<article class="notebook-card">
            <div class="notebook-word">${escapeHTML(item.word)}</div>
            <div class="notebook-meaning">${escapeHTML(item.meaning)}</div>
            <div class="notebook-meta">
                <span class="notebook-course">${course}${lesson}</span>
                <button class="remove-word" type="button" data-index="${index}" aria-label="Remove ${escapeHTML(item.word)}" title="Remove word">
                    <i class="bi bi-trash3"></i>
                </button>
            </div>
        </article>`;
    }).join('');

    grid.querySelectorAll('.remove-word').forEach(button => {
        button.addEventListener('click', () => {
            words.splice(Number(button.dataset.index), 1);
            saveWords();
            render();
        });
    });
}

function initMenu() {
    const sidebar = $('learningSidebar');
    const backdrop = $('sidebarBackdrop');
    const button = $('mobileMenuBtn');
    if (!sidebar || !backdrop || !button) return;

    const close = () => {
        sidebar.classList.remove('open');
        backdrop.classList.remove('show');
    };
    button.addEventListener('click', () => {
        sidebar.classList.add('open');
        backdrop.classList.add('show');
    });
    backdrop.addEventListener('click', close);
}

$('vocabSearch')?.addEventListener('input', render);
$('vocabSort')?.addEventListener('change', render);

$('clearVocab')?.addEventListener('click', () => {
    if (!words.length) return;
    if (!window.confirm('Clear all saved vocabulary?')) return;
    words = [];
    saveWords();
    render();
});

initMenu();
render();
})();
