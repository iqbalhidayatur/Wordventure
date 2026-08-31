(() => {
'use strict';

const TOTAL_LESSONS = 60;
const COURSES = {
    'Travel English': 8,
    'Everyday Conversations': 10,
    'Vocabulary Builder': 12,
    'Speak With Confidence': 9,
    'Grammar In Context': 14,
    'Listening Lab': 7
};

const $ = id => document.getElementById(id);

function readArray(key) {
    try {
        const value = JSON.parse(localStorage.getItem(key) || '[]');
        return Array.isArray(value) ? value : [];
    } catch {
        return [];
    }
}

function courseCompleted(course) {
    return readArray(`lingosphere.completedLessons.${course}`).length;
}

function examPassedCount() {
    const courseTests = Object.keys(localStorage).filter(key =>
        key.startsWith('lingosphere.courseTestPassed.') &&
        localStorage.getItem(key) === 'true'
    ).length;
    const weeklyTests = Object.keys(localStorage).filter(key =>
        key.startsWith('wordventure.weeklyExam.') &&
        localStorage.getItem(key) === 'passed'
    ).length;
    return courseTests + weeklyTests;
}

function getActivity() {
    const activity = readArray('wordventure.analytics.activity');
    return activity.filter(item => item && item.date);
}

function renderOverview(completed, vocab, xp, exams) {
    $('totalLessons').textContent = completed;
    $('overviewLessons').textContent = completed;
    $('xpTotal').textContent = `${xp.toLocaleString()} XP`;
    $('vocabMetric').textContent = vocab.length;
    $('examMetric').textContent = exams;

    const progress = Math.min(100, Math.round(completed / TOTAL_LESSONS * 100));
    $('progressValue').textContent = `${progress}%`;
    $('progressBar').style.width = `${progress}%`;
    $('courseCount').textContent = `${completed} of ${TOTAL_LESSONS} lessons completed`;
    $('remainingLessons').textContent = `${Math.max(0, TOTAL_LESSONS - completed)} remaining`;
}

function renderSkills(completed, vocab, exams) {
    const skills = [
        ['Grammar', Math.min(100, 70 + Math.round(completed / 3))],
        ['Vocabulary', Math.min(100, 55 + Math.round(vocab.length * 1.5))],
        ['Speaking', Math.min(100, 62 + Math.round(completed / 4))],
        ['Listening', Math.min(100, 58 + Math.round(completed / 5) + exams * 2)]
    ];

    $('skillList').innerHTML = skills.map(([name, value]) => `
        <div class="skill-row">
            <span>${name}</span>
            <div class="skill-track"><span style="width:${value}%"></span></div>
            <strong>${value}%</strong>
        </div>
    `).join('');
}

function renderWeeklyActivity() {
    const activity = getActivity();
    const now = new Date();
    const days = [];

    for (let offset = 6; offset >= 0; offset--) {
        const date = new Date(now);
        date.setHours(0, 0, 0, 0);
        date.setDate(now.getDate() - offset);

        const count = activity.filter(item => {
            const itemDate = new Date(item.date);
            return itemDate.getFullYear() === date.getFullYear() &&
                itemDate.getMonth() === date.getMonth() &&
                itemDate.getDate() === date.getDate();
        }).length;

        days.push({
            label: date.toLocaleDateString('en-US', { weekday: 'short' }),
            count
        });
    }

    const max = Math.max(...days.map(day => day.count), 1);
    const total = days.reduce((sum, day) => sum + day.count, 0);
    $('weekTotal').textContent = total;

    $('weekBars').innerHTML = days.map(day => {
        const height = day.count ? Math.max(12, Math.round(day.count / max * 100)) : 5;
        return `<div class="day-bar" title="${day.count} learning activities">
            <span style="--h:${height}%"></span>
            <small>${day.label}</small>
        </div>`;
    }).join('');
}

function renderCourses() {
    const rows = Object.entries(COURSES).map(([name, total]) => {
        const completed = Math.min(total, courseCompleted(name));
        const percent = Math.round(completed / total * 100);
        const passed = localStorage.getItem(`lingosphere.courseTestPassed.${name}`) === 'true';

        return `<div class="course-progress-row">
            <div class="course-progress-name">
                <strong>${name}</strong>
                <small>${completed} of ${total} lessons${passed ? ' · Assessment passed' : ''}</small>
            </div>
            <div class="course-progress-track"><span style="width:${percent}%"></span></div>
            <div class="course-progress-percent">${percent}%</div>
        </div>`;
    });

    $('courseProgressList').innerHTML = rows.join('');
}

function renderMilestones(completed, vocab, exams) {
    const activity = getActivity();
    const items = [];

    if (completed > 0) {
        items.push(['bi-journal-check', `${completed} lessons completed`, 'You are building steady course progress.']);
    }
    if (vocab.length > 0) {
        items.push(['bi-bookmark-heart-fill', `${vocab.length} words saved`, 'Your vocabulary notebook is growing.']);
    }
    if (exams > 0) {
        items.push(['bi-trophy-fill', `${exams} assessment${exams > 1 ? 's' : ''} passed`, 'Your course assessments show measurable progress.']);
    }
    if (activity.length === 0) {
        items.push(['bi-rocket-takeoff-fill', 'Start your first lesson', 'Complete a lesson and your activity will appear here.']);
    }

    $('milestoneList').innerHTML = items.slice(0, 3).map(([icon, title, text]) => `
        <div class="milestone-item">
            <div class="milestone-icon"><i class="bi ${icon}"></i></div>
            <div><strong>${title}</strong><span>${text}</span></div>
        </div>
    `).join('');
}

function renderFocus() {
    const courseData = Object.entries(COURSES).map(([name, total]) => ({
        name,
        total,
        completed: Math.min(total, courseCompleted(name))
    })).sort((a, b) => a.completed / a.total - b.completed / b.total);

    const weakest = courseData[0];
    const vocab = readArray('wordventure.vocabNotebook');

    const focus = [
        weakest.completed < weakest.total
            ? ['bi-journal-bookmark-fill', `Continue ${weakest.name}`, `${weakest.completed} of ${weakest.total} lessons completed.`]
            : ['bi-bookmark-heart-fill', 'Review your vocabulary', `${vocab.length} saved words are ready for review.`],
        ['bi-lightning-charge-fill', 'Practice consistently', 'Short daily sessions help keep your learning rhythm active.']
    ];

    $('focusList').innerHTML = focus.map(([icon, title, text]) => `
        <div class="focus-item">
            <div class="focus-icon"><i class="bi ${icon}"></i></div>
            <div><strong>${title}</strong><span>${text}</span></div>
        </div>
    `).join('');
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

const vocab = readArray('wordventure.vocabNotebook');
const exams = examPassedCount();
const completed = Object.keys(COURSES).reduce((sum, course) => sum + courseCompleted(course), 0);
const xp = Number(localStorage.getItem('lingosphere.xp') || 0);

renderOverview(completed, vocab, xp, exams);
renderSkills(completed, vocab, exams);
renderWeeklyActivity();
renderCourses();
renderMilestones(completed, vocab, exams);
renderFocus();
initMenu();
})();
