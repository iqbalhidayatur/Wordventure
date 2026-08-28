(() => {
    'use strict';

    const COURSES = {
        'Travel English': 8,
        'Everyday Conversations': 10,
        'Vocabulary Builder': 12,
        'Speak With Confidence': 9,
        'Grammar In Context': 14,
        'Listening Lab': 7,
        'Writing Practice': 8
    };

    const $ = (id) => document.getElementById(id);

    const getUser = () => window.LS?.Auth?.getUser?.() || window.LS?.DEMO_USER || {
        name: 'Alex Morgan',
        currentLevel: 'Communicator',
        level: 4
    };

    const safeArray = (key) => {
        try {
            const value = JSON.parse(localStorage.getItem(key) || '[]');
            return Array.isArray(value) ? value : [];
        } catch {
            return [];
        }
    };

    const completedCount = (course) => Math.min(
        safeArray(`lingosphere.completedLessons.${course}`).length,
        COURSES[course]
    );

    const isEarned = (course) => (
        localStorage.getItem(`lingosphere.courseCompleted.${course}`) === 'true' &&
        localStorage.getItem(`lingosphere.courseTestPassed.${course}`) === 'true' &&
        completedCount(course) >= COURSES[course]
    );

    const certificateKey = (course) => `wordventure.certificate.${course}`;
    const certificateDateKey = (course) => `${certificateKey(course)}.date`;

    const escapeHtml = (value) => String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');

    const getCertificateId = (course) => {
        const existing = localStorage.getItem(certificateKey(course));
        if (existing) return existing;

        const stamp = new Date().toISOString().slice(0, 10).replaceAll('-', '');
        const code = Math.random().toString(36).slice(2, 8).toUpperCase();
        const id = `WV-${stamp}-${code}`;
        localStorage.setItem(certificateKey(course), id);
        return id;
    };

    const getCertificateDate = (course) => {
        const existing = localStorage.getItem(certificateDateKey(course));
        if (existing) return existing;

        const date = new Date().toISOString();
        if (isEarned(course)) localStorage.setItem(certificateDateKey(course), date);
        return date;
    };

    const formatDate = (value) => {
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return 'Date unavailable';
        return new Intl.DateTimeFormat('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        }).format(date);
    };

    const user = getUser();
    const name = user.name || 'Alex Morgan';
    const initials = name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase() || 'AM';

    $('sidebarUserName').textContent = name;
    $('sidebarUserLevel').textContent = `${user.currentLevel || user.levelName || 'Communicator'} · Level ${user.level || 4}`;
    $('sidebarAvatar').textContent = initials;

    const list = $('certificateCourseList');
    const previewPanel = $('certificatePreviewPanel');
    const modal = $('certificateModal');
    const modalBody = $('certificateModalBody');
    const modalTitle = $('certificateModalTitle');
    const count = $('certificateCount');

    const certificateMarkup = (course, { preview = false, print = false } = {}) => {
        const earned = isEarned(course);
        const id = earned ? getCertificateId(course) : `PREVIEW-${course.replaceAll(' ', '-').toUpperCase()}`;
        const date = earned ? getCertificateDate(course) : new Date().toISOString();

        return `
            <article class="certificate-paper ${preview && !earned ? 'preview-mode' : ''} ${print ? 'certificate-print-target' : ''}" aria-label="Certificate for ${escapeHtml(name)}">
                <div class="certificate-frame"></div>
                <div class="certificate-leaf leaf-one"><i class="bi bi-leaf-fill"></i><i class="bi bi-leaf-fill"></i><i class="bi bi-leaf-fill"></i></div>
                <div class="certificate-leaf leaf-two"><i class="bi bi-leaf-fill"></i><i class="bi bi-leaf-fill"></i><i class="bi bi-leaf-fill"></i></div>
                <div class="certificate-topline"><span></span><b>WORDVENTURE</b><span></span></div>
                <div class="certificate-content">
                    <div class="certificate-brand"><span class="brand-dot"></span><span>Wordventure</span></div>
                    <div class="certificate-kicker">Certificate of Completion</div>
                    <h2 class="certificate-title">Certificate</h2>
                    <p class="certificate-presented">This certificate is proudly presented to</p>
                    <div class="certificate-name">${escapeHtml(name)}</div>
                    <p class="certificate-completed">for successfully completing</p>
                    <div class="certificate-course-name">${escapeHtml(course)}</div>
                    <p class="certificate-copy">and demonstrating commitment to improving English communication skills through the Wordventure learning program.</p>
                    <div class="certificate-footer">
                        <div><span>Issued on</span><strong>${formatDate(date)}</strong></div>
                        <div class="certificate-medallion"><i class="bi bi-patch-check-fill"></i><span>VERIFIED</span></div>
                        <div><span>Certificate ID</span><strong>${escapeHtml(id)}</strong></div>
                    </div>
                </div>
                ${!earned ? '<div class="certificate-preview-watermark">PREVIEW</div>' : ''}
            </article>
        `;
    };

    const renderInlinePreview = (course) => {
        const earned = isEarned(course);
        const id = earned ? getCertificateId(course) : `PREVIEW-${course.replaceAll(' ', '-').toUpperCase()}`;

        previewPanel.innerHTML = `
            <div class="certificate-preview-wrap">
                <div class="certificate-toolbar">
                    <div class="certificate-toolbar-copy">
                        <strong>${escapeHtml(course)}</strong>
                        <span>${earned ? `Certificate ID · ${escapeHtml(id)}` : 'Certificate design preview · complete the course to unlock it'}</span>
                    </div>
                    <div class="certificate-actions">
                        <button type="button" class="certificate-open-modal" data-open-modal="${escapeHtml(course)}"><i class="bi bi-arrows-fullscreen"></i> Preview</button>
                        ${earned ? '<button type="button" class="certificate-download"><i class="bi bi-printer"></i> Print / PDF</button>' : ''}
                    </div>
                </div>
                <div class="certificate-stage">${certificateMarkup(course, { preview: true })}</div>
            </div>
        `;

        previewPanel.querySelector('[data-open-modal]')?.addEventListener('click', () => openModal(course));
        previewPanel.querySelector('.certificate-download')?.addEventListener('click', () => printCertificate(course));
    };

    const renderList = () => {
        const entries = Object.entries(COURSES);
        const earnedTotal = entries.filter(([course]) => isEarned(course)).length;
        count.textContent = earnedTotal;

        list.innerHTML = entries.map(([course, total]) => {
            const earned = isEarned(course);
            const done = completedCount(course);
            const percent = Math.min(100, Math.round((done / total) * 100));

            return `
                <div class="certificate-course ${earned ? 'earned' : 'locked'}" data-course="${escapeHtml(course)}">
                    <button type="button" class="certificate-course-main" data-select-course="${escapeHtml(course)}">
                        <span class="course-certificate-icon"><i class="bi ${earned ? 'bi-patch-check-fill' : 'bi-award'}"></i></span>
                        <span class="certificate-course-copy">
                            <strong>${escapeHtml(course)}</strong>
                            <span>${earned ? 'Certificate earned' : `${done}/${total} lessons · ${percent}% complete`}</span>
                        </span>
                        <span class="certificate-course-status">${earned ? 'EARNED' : 'LOCKED'}</span>
                    </button>
                    <button type="button" class="certificate-course-preview" data-preview-course="${escapeHtml(course)}" aria-label="Preview ${escapeHtml(course)} certificate">
                        <i class="bi bi-eye"></i>
                    </button>
                </div>
            `;
        }).join('');

        list.querySelectorAll('[data-select-course]').forEach((button) => {
            button.addEventListener('click', () => selectCourse(button.dataset.selectCourse));
        });

        list.querySelectorAll('[data-preview-course]').forEach((button) => {
            button.addEventListener('click', (event) => {
                event.stopPropagation();
                openModal(button.dataset.previewCourse);
            });
        });
    };

    const selectCourse = (course) => {
        list.querySelectorAll('.certificate-course').forEach((item) => {
            item.classList.toggle('active', item.dataset.course === course);
        });
        renderInlinePreview(course);
    };

    const openModal = (course) => {
        if (!modal || !modalBody || !modalTitle) return;
        modalTitle.textContent = course;
        modalBody.innerHTML = `<div class="certificate-stage certificate-modal-stage">${certificateMarkup(course, { preview: true })}</div>`;
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('certificate-modal-open');
    };

    const closeModal = () => {
        if (!modal) return;
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('certificate-modal-open');
    };

    const printCertificate = (course) => {
        if (!isEarned(course)) return;

        const existing = document.querySelector('.certificate-print-target');
        existing?.remove();

        const wrapper = document.createElement('div');
        wrapper.innerHTML = certificateMarkup(course, { print: true });
        document.body.appendChild(wrapper.firstElementChild);

        window.setTimeout(() => {
            window.print();
            window.setTimeout(() => document.querySelector('.certificate-print-target')?.remove(), 300);
        }, 100);
    };

    $('closeCertificateModal')?.addEventListener('click', closeModal);
    modal?.querySelector('[data-close-certificate]')?.addEventListener('click', closeModal);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal?.classList.contains('open')) closeModal();
    });

    renderList();

    const requested = new URLSearchParams(window.location.search).get('course');
    const courses = Object.keys(COURSES);
    const initialCourse = courses.includes(requested) ? requested : courses[0];
    selectCourse(initialCourse);
})();
