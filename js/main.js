/* ============================================================
   Wordventure — main.js
   Global JavaScript: theme, navbar, toast, scroll reveal,
   animated counters, page transitions, chat demo
   ============================================================ */

'use strict';

/* ── Demo User Data ── */
const DEMO_USER = {
  name: 'Alex Morgan',
  level: 4,
  levelName: 'Communicator',
  xp: 1240,
  xpToNext: 1500,
  streak: 8,
  completedLessons: 18,
  skills: {
    speaking:    82,
    vocabulary:  74,
    grammar:     91,
    confidence:  88,
  },
};

const XP_REWARDS = {
  daily_conversation: 50,
  travel_simulation:  80,
  job_interview:      150,
  daily_challenge:    100,
  community_challenge: 120,
};

const LEVELS = [
  { num: 1, name: 'Explorer',      minXP: 0 },
  { num: 2, name: 'Traveler',      minXP: 300 },
  { num: 3, name: 'Speaker',       minXP: 700 },
  { num: 4, name: 'Communicator',  minXP: 1200 },
  { num: 5, name: 'Fluent',        minXP: 2000 },
];

/* ─────────────────────────────────────────────
   1. THEME SYSTEM
   ───────────────────────────────────────────── */
const ThemeManager = (() => {
  const KEY = 'ls_theme';
  const root = document.documentElement;
  let current = localStorage.getItem(KEY) || 'light';

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    current = theme;
    localStorage.setItem(KEY, theme);
    updateIcons(theme);
  }

  function updateIcons(theme) {
    document.querySelectorAll('[data-theme-icon]').forEach(el => {
      const icon = el.querySelector('i');
      if (!icon) return;
      icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
    });
  }

  function toggle() {
    apply(current === 'dark' ? 'light' : 'dark');
  }

  function init() {
    // Respect system preference if no saved preference
    if (!localStorage.getItem(KEY)) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      current = prefersDark ? 'dark' : 'light';
    }
    apply(current);

    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      btn.addEventListener('click', toggle);
    });
  }

  return { init, apply, toggle, get: () => current };
})();

/* ─────────────────────────────────────────────
   2. NAVBAR
   ───────────────────────────────────────────── */
const NavbarManager = (() => {
  function init() {
    const nav = document.getElementById('mainNav');
    if (!nav) return;

    // Scroll shrink
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Mark active page
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link[href]').forEach(link => {
      const href = link.getAttribute('href').split('/').pop();
      if (href === path) link.classList.add('active');
    });
  }

  return { init };
})();

/* ─────────────────────────────────────────────
   3. TOAST NOTIFICATIONS
   ───────────────────────────────────────────── */
const Toast = (() => {
  let container;

  function getContainer() {
    if (!container) {
      container = document.querySelector('.ls-toast-container');
      if (!container) {
        container = document.createElement('div');
        container.className = 'ls-toast-container';
        document.body.appendChild(container);
      }
    }
    return container;
  }

  function show({ title, message, type = 'info', duration = 3500 }) {
    const icons = {
      success: 'bi-check-circle-fill',
      info:    'bi-info-circle-fill',
      warning: 'bi-exclamation-triangle-fill',
      xp:      'bi-star-fill',
    };

    const el = document.createElement('div');
    el.className = `ls-toast ls-toast-${type}`;
    el.innerHTML = `
      <div class="ls-toast-icon">
        <i class="bi ${icons[type] || icons.info}"></i>
      </div>
      <div class="ls-toast-content">
        <div class="ls-toast-title">${title}</div>
        ${message ? `<div class="ls-toast-msg">${message}</div>` : ''}
      </div>
      <button class="ls-toast-close" aria-label="Close">
        <i class="bi bi-x"></i>
      </button>
    `;

    el.querySelector('.ls-toast-close').addEventListener('click', () => dismiss(el));

    getContainer().appendChild(el);

    // Auto dismiss
    const timer = setTimeout(() => dismiss(el), duration);
    el._dismissTimer = timer;

    return el;
  }

  function dismiss(el) {
    clearTimeout(el._dismissTimer);
    el.classList.add('hiding');
    el.addEventListener('animationend', () => el.remove(), { once: true });
  }

  function xp(amount, scenario) {
    show({
      title: `+${amount} XP Earned!`,
      message: scenario ? `Completed: ${scenario}` : 'Keep up the great work!',
      type: 'xp',
      duration: 4000,
    });
  }

  return { show, dismiss, xp };
})();

/* ─────────────────────────────────────────────
   4. SCROLL REVEAL (IntersectionObserver)
   ───────────────────────────────────────────── */
const ScrollReveal = (() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  function init() {
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  return { init };
})();

/* ─────────────────────────────────────────────
   5. ANIMATED COUNTER
   ───────────────────────────────────────────── */
const CounterAnimation = (() => {
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animate(el, target, duration = 1800, suffix = '') {
    const start = performance.now();
    const isFloat = target % 1 !== 0;

    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value = easeOutCubic(progress) * target;

      el.textContent = (isFloat ? value.toFixed(1) : Math.floor(value))
        .toLocaleString() + suffix;

      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }

  function init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target._counted) {
          entry.target._counted = true;
          const target = parseFloat(entry.target.dataset.count);
          const suffix = entry.target.dataset.suffix || '';
          animate(entry.target, target, 1800, suffix);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-count]').forEach(el => observer.observe(el));
  }

  return { init, animate };
})();

/* ─────────────────────────────────────────────
   6. HERO CHAT DEMO ANIMATION
   ───────────────────────────────────────────── */
const ChatDemo = (() => {
  const scenarios = [
    {
      title: 'Job Interview',
      role: 'HR Manager · TechCorp',
      emoji: '💼',
      tag: 'JOB INTERVIEW',
      xp: 150,
      messages: [
        { type: 'bot',  text: "Tell me about yourself and why you're interested in this position." },
        { type: 'user', text: "I'm a software engineer with 3 years of experience in web development..." },
        { type: 'bot',  text: "Great! Can you describe a challenging project you've worked on recently?" },
      ],
    },
    {
      title: 'Travel Simulation',
      role: 'Airport Staff · London Heathrow',
      emoji: '✈️',
      tag: 'TRAVEL',
      xp: 80,
      messages: [
        { type: 'bot',  text: 'Good morning! May I see your passport and boarding pass, please?' },
        { type: 'user', text: 'Of course! Here they are. I also have a connecting flight to Paris.' },
        { type: 'bot',  text: 'Thank you. Your gate is B14. Boarding starts in 30 minutes. Enjoy your flight!' },
      ],
    },
    {
      title: 'Daily Conversation',
      role: 'Native Speaker · Coffee Chat',
      emoji: '☕',
      tag: 'DAILY CONV.',
      xp: 50,
      messages: [
        { type: 'bot',  text: 'Hey! Long time no see. How have you been lately?' },
        { type: 'user', text: "I've been great, thanks! Just got back from a trip to Bali last week." },
        { type: 'bot',  text: "No way! That sounds amazing. How was the weather over there?" },
      ],
    },
  ];

  let currentIdx = 0;
  let isAnimating = false;

  function renderScenario(scenario) {
    const widget = document.querySelector('.chat-widget');
    if (!widget) return;

    widget.querySelector('.chat-avatar-name').textContent = scenario.title;
    widget.querySelector('.chat-avatar-role').textContent = scenario.role;
    widget.querySelector('.chat-avatar').textContent = scenario.emoji;
    widget.querySelector('.chat-scenario-tag').textContent = scenario.tag;
    widget.querySelector('.chat-input-fake').textContent = 'Your response…';

    const body = widget.querySelector('.chat-body');
    body.innerHTML = '';
  }

  async function playMessages(scenario) {
    const body = document.querySelector('.chat-body');
    if (!body) return;

    for (let i = 0; i < scenario.messages.length; i++) {
      const msg = scenario.messages[i];
      await delay(i === 0 ? 600 : 1000);

      // Show typing first for bot
      if (msg.type === 'bot') {
        const typingEl = createTyping();
        body.appendChild(typingEl);
        scrollBottom(body);
        await delay(1200);
        typingEl.remove();
      }

      const msgEl = createMessage(msg);
      body.appendChild(msgEl);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => msgEl.classList.add('show'));
      });

      scrollBottom(body);
    }

    // XP toast after last message
    await delay(1000);
    if (document.querySelector('.chat-widget')) {
      Toast.xp(scenario.xp, scenario.title);
    }

    await delay(2000);
    if (!isAnimating) return;

    // Fade out and switch
    const body2 = document.querySelector('.chat-body');
    if (body2) {
      body2.style.opacity = '0';
      body2.style.transition = 'opacity 0.4s';
      await delay(400);
      currentIdx = (currentIdx + 1) % scenarios.length;
      renderScenario(scenarios[currentIdx]);
      body2.style.opacity = '1';
      await delay(200);
      playMessages(scenarios[currentIdx]);
    }
  }

  function createMessage({ type, text }) {
    const el = document.createElement('div');
    el.className = `chat-msg ${type}`;

    const initials = type === 'bot' ? '🤖' : 'AM';
    el.innerHTML = `
      <div class="chat-msg-avatar">${initials}</div>
      <div class="chat-bubble">${text}</div>
    `;
    return el;
  }

  function createTyping() {
    const el = document.createElement('div');
    el.className = 'chat-msg bot show';
    el.innerHTML = `
      <div class="chat-msg-avatar">🤖</div>
      <div class="typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    `;
    return el;
  }

  function scrollBottom(el) {
    el.scrollTop = el.scrollHeight;
  }

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function init() {
    if (!document.querySelector('.chat-widget')) return;
    isAnimating = true;
    renderScenario(scenarios[0]);
    playMessages(scenarios[0]);
  }

  function destroy() {
    isAnimating = false;
  }

  return { init, destroy };
})();

/* ─────────────────────────────────────────────
   7. PAGE TRANSITION
   ───────────────────────────────────────────── */
function initPageTransition() {
  document.body.classList.add('page-transition');

  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;

    link.addEventListener('click', (e) => {
      e.preventDefault();
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity 0.25s ease';
      setTimeout(() => { window.location.href = href; }, 250);
    });
  });
}

/* ─────────────────────────────────────────────
   8. localStorage HELPERS
   ───────────────────────────────────────────── */
const Storage = {
  get(key, fallback = null) {
    try {
      const v = localStorage.getItem(key);
      return v !== null ? JSON.parse(v) : fallback;
    } catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  },
  remove(key) {
    try { localStorage.removeItem(key); } catch {}
  },
};

/* ─────────────────────────────────────────────
   9. AUTH HELPERS (used across pages)
   ───────────────────────────────────────────── */
const Auth = {
  isLoggedIn() {
    return !!Storage.get('ls_user');
  },
  getUser() {
    return Storage.get('ls_user', DEMO_USER);
  },
  login(email, password) {
    // Demo: accept anything with @ and password length > 5
    if (email.includes('@') && password.length >= 6) {
      const user = { ...DEMO_USER, email };
      Storage.set('ls_user', user);
      return { success: true, user };
    }
    return { success: false, message: 'Invalid email or password.' };
  },
  register(data) {
    const user = {
      ...DEMO_USER,
      name: data.name || DEMO_USER.name,
      email: data.email,
      goal: data.goal,
      currentLevel: data.level,
      dailyTime: data.dailyTime,
    };
    Storage.set('ls_user', user);
    return { success: true, user };
  },
  logout() {
    Storage.remove('ls_user');
    window.location.href = 'index.html';
  },
};

/* ─────────────────────────────────────────────
   10. LANDING PAGE SPECIFIC
   ───────────────────────────────────────────── */
function initLanding() {
  if (!document.querySelector('.hero-section')) return;

  ChatDemo.init();

  // Scenario chip hover effect on cards
  document.querySelectorAll('.scenario-card').forEach(card => {
    card.addEventListener('click', () => {
      if (Auth.isLoggedIn()) {
        window.location.href = 'learning.html';
      } else {
        window.location.href = 'signup.html';
      }
    });
  });

  // Update CTA button if logged in
  if (Auth.isLoggedIn()) {
    const ctaBtns = document.querySelectorAll('[data-cta-start]');
    ctaBtns.forEach(btn => {
      btn.textContent = 'Continue Learning';
      btn.href = 'learning.html';
    });
  }
}

/* ─────────────────────────────────────────────
   11. SMOOTH SCROLL FOR ANCHOR LINKS
   ───────────────────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}


/* ─────────────────────────────────────────────
   12. BOTANICAL LEAF DECORATION
   Randomized per section without changing layout.
   ───────────────────────────────────────────── */
function initLeafDecoration() {
  if (document.querySelector('.leaf-decoration-layer')) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const layer = document.createElement('div');
  layer.className = 'leaf-decoration-layer';
  layer.setAttribute('aria-hidden', 'true');
  document.body.appendChild(layer);

  const random = (min, max) => Math.random() * (max - min) + min;
  const randomInt = (min, max) => Math.floor(random(min, max + 1));
  const leaves = [];
  const count = window.innerWidth < 768 ? randomInt(5, 8) : randomInt(9, 14);

  for (let i = 0; i < count; i += 1) {
    const leaf = document.createElement('span');
    leaf.className = 'leaf is-floating';
    leaf.style.setProperty('--leaf-size', `${random(20, 40).toFixed(1)}px`);
    leaf.style.setProperty('--leaf-rotation', `${random(-75, 75).toFixed(1)}deg`);
    leaf.style.setProperty('--leaf-opacity', random(0.10, 0.20).toFixed(2));
    leaf.style.setProperty('--leaf-duration', `${random(7, 14).toFixed(2)}s`);
    leaf.style.setProperty('--leaf-delay', `${random(-12, 0).toFixed(2)}s`);
    leaf.style.setProperty('--leaf-drift-x', `${random(-18, 18).toFixed(1)}px`);
    leaf.style.setProperty('--leaf-drift-y', `${random(-14, 14).toFixed(1)}px`);
    leaf.style.setProperty('--leaf-sway', `${random(-14, 14).toFixed(1)}deg`);
    leaf.style.setProperty('--leaf-scale', random(0.78, 1.15).toFixed(2));
    leaf.style.setProperty('--leaf-z', randomInt(15, 35));
    if (reducedMotion.matches) leaf.classList.remove('is-floating');
    layer.appendChild(leaf);
    leaves.push({
      element: leaf,
      xRatio: random(0.03, 0.97),
      yRatio: random(0.04, 0.96)
    });
  }

  const updatePositions = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    leaves.forEach(item => {
      const size = parseFloat(getComputedStyle(item.element).getPropertyValue('--leaf-size')) || 30;
      const x = Math.max(-size, Math.min(width - size, width * item.xRatio - size / 2));
      const y = Math.max(-size, Math.min(height - size, height * item.yRatio - size / 2));
      item.element.style.setProperty('--leaf-x', `${x.toFixed(1)}px`);
      item.element.style.setProperty('--leaf-y', `${y.toFixed(1)}px`);
    });
  };

  window.addEventListener('resize', updatePositions, { passive: true });
  reducedMotion.addEventListener?.('change', event => {
    leaves.forEach(({ element }) => element.classList.toggle('is-floating', !event.matches));
  });

  updatePositions();
}

/* ─────────────────────────────────────────────
   INIT ALL
   ───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initLeafDecoration();
  ThemeManager.init();
  NavbarManager.init();
  ScrollReveal.init();
  CounterAnimation.init();
  initSmoothScroll();
  initLanding();
  // Page transitions disabled for simplicity; can re-enable:
  // initPageTransition();
});

// Expose globals for other scripts
window.LS = {
  Toast,
  Storage,
  Auth,
  ThemeManager,
  DEMO_USER,
  XP_REWARDS,
  LEVELS,
};

(function initLingoSidebar() {
    'use strict';

    const sidebar = document.getElementById('learningSidebar');
    const backdrop = document.getElementById('sidebarBackdrop');

    const openButton = document.getElementById('sidebarOpen');
    const closeButton = document.getElementById('sidebarClose');

    if (!sidebar) return;


    function setSidebar(open) {
        sidebar.classList.toggle('open', open);
        backdrop?.classList.toggle('show', open);

        document.body.classList.toggle(
            'sidebar-open',
            open
        );
    }


    openButton?.addEventListener(
        'click',
        () => setSidebar(true)
    );


    closeButton?.addEventListener(
        'click',
        () => setSidebar(false)
    );


    backdrop?.addEventListener(
        'click',
        () => setSidebar(false)
    );


    document.addEventListener(
        'keydown',
        event => {
            if (event.key === 'Escape') {
                setSidebar(false);
            }
        }
    );


    const currentPage =
        window.location.pathname
            .split('/')
            .pop()
            .replace('.html', '') || 'learning';


    document
        .querySelectorAll('.learning-nav-link[data-page]')
        .forEach(link => {

            const page = link.dataset.page;

            link.classList.toggle(
                'active',
                page === currentPage
            );

        });

})();