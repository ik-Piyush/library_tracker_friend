/* ==========================================================================
   Bibliophile - Library Tracker & Social Friend Portal App Logic
   ========================================================================== */

// --- INITIAL MOCK DATASTORE ---
const INITIAL_BOOKS = [
  {
    id: 'b1',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    genre: 'Sci-Fi',
    status: 'reading',
    pages: 496,
    currentPage: 340,
    rating: 4.9,
    cover: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=400&auto=format&fit=crop&q=80',
    notes: 'Incredible sci-fi survival narrative with hilarious problem solving!',
    excerpt: 'Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the earth itself will perish.',
    lentTo: null,
    addedAt: '2026-07-10'
  },
  {
    id: 'b2',
    title: 'Dune: Part One',
    author: 'Frank Herbert',
    genre: 'Sci-Fi',
    status: 'completed',
    pages: 658,
    currentPage: 658,
    rating: 4.8,
    cover: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=80',
    notes: 'A masterpiece of world-building and galactic politics.',
    excerpt: 'A beginning is the time for taking the most delicate care that the balances be correct.',
    lentTo: null,
    addedAt: '2026-05-14'
  },
  {
    id: 'b3',
    title: 'Atomic Habits',
    author: 'James Clear',
    genre: 'Psychology',
    status: 'completed',
    pages: 320,
    currentPage: 320,
    rating: 5.0,
    cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80',
    notes: 'Practical framework for continuous self improvement.',
    excerpt: 'You do not rise to the level of your goals. You fall to the level of your systems.',
    lentTo: null,
    addedAt: '2026-06-01'
  },
  {
    id: 'b4',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    genre: 'Technology',
    status: 'reading',
    pages: 464,
    currentPage: 210,
    rating: 4.6,
    cover: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&auto=format&fit=crop&q=80',
    notes: 'Essential handbook of agile software craftsmanship.',
    excerpt: 'Even bad code can function. But if code isn’t clean, it can bring a development organization to its knees.',
    lentTo: null,
    addedAt: '2026-07-02'
  },
  {
    id: 'b5',
    title: 'The Name of the Wind',
    author: 'Patrick Rothfuss',
    genre: 'Fantasy',
    status: 'lent',
    pages: 662,
    currentPage: 662,
    rating: 4.9,
    cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&auto=format&fit=crop&q=80',
    notes: 'Lent to Sarah on July 15th.',
    excerpt: 'My name is Kvothe. You may have heard of me.',
    lentTo: 'Sarah Jenkins',
    addedAt: '2026-04-10'
  },
  {
    id: 'b6',
    title: 'Steve Jobs',
    author: 'Walter Isaacson',
    genre: 'Biography',
    status: 'completed',
    pages: 656,
    currentPage: 656,
    rating: 4.7,
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&auto=format&fit=crop&q=80',
    notes: 'Riveting biography of the Apple visionary.',
    excerpt: 'The people who are crazy enough to think they can change the world are the ones who do.',
    lentTo: null,
    addedAt: '2026-03-20'
  },
  {
    id: 'b7',
    title: 'Tomorrow, and Tomorrow, and Tomorrow',
    author: 'Gabrielle Zevin',
    genre: 'Fiction',
    status: 'reading',
    pages: 416,
    currentPage: 150,
    rating: 4.7,
    cover: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&auto=format&fit=crop&q=80',
    notes: 'Beautiful story about gaming, friendship, and art.',
    excerpt: 'To allow yourself to play with another person is no small risk.',
    lentTo: null,
    addedAt: '2026-07-20'
  },
  {
    id: 'b8',
    title: 'Klara and the Sun',
    author: 'Kazuo Ishiguro',
    genre: 'Fiction',
    status: 'wishlist',
    pages: 320,
    currentPage: 0,
    rating: 4.5,
    cover: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&auto=format&fit=crop&q=80',
    notes: 'High priority on my reading wishlist.',
    excerpt: 'Do you believe in the human heart? I don’t mean simply the organ, obviously.',
    lentTo: null,
    addedAt: '2026-07-22'
  }
];

const INITIAL_FRIENDS = [
  {
    id: 'f1',
    name: 'Sarah Jenkins',
    handle: '@sarah_reads',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    currentlyReading: 'The Name of the Wind',
    booksReadThisYear: 22,
    mutualBooks: 14,
    compatibility: '94%'
  },
  {
    id: 'f2',
    name: 'Marcus Chen',
    handle: '@marcus_scifi',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    currentlyReading: 'Hyperion Cantos',
    booksReadThisYear: 31,
    mutualBooks: 19,
    compatibility: '98%'
  },
  {
    id: 'f3',
    name: 'Elena Rostova',
    handle: '@elena_lit',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    currentlyReading: 'Three-Body Problem',
    booksReadThisYear: 16,
    mutualBooks: 8,
    compatibility: '87%'
  },
  {
    id: 'f4',
    name: 'David Kim',
    handle: '@david_tech',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    currentlyReading: 'Designing Data-Intensive Apps',
    booksReadThisYear: 12,
    mutualBooks: 11,
    compatibility: '91%'
  }
];

const INITIAL_POSTS = [
  {
    id: 'p1',
    user: 'Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    time: '2 hours ago',
    content: 'Just finished Chapter 12 of The Name of the Wind! Big thanks to @alex_reads for lending me this physical copy! 📚✨',
    bookTitle: 'The Name of the Wind',
    bookAuthor: 'Patrick Rothfuss',
    bookCover: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&auto=format&fit=crop&q=80',
    quote: null,
    likes: 8,
    likedByMe: false,
    comments: [
      { user: 'Alex Morgan', text: 'Enjoy the magic system! It gets even better in Chapter 15.' }
    ]
  },
  {
    id: 'p2',
    user: 'Marcus Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    time: '5 hours ago',
    content: 'Favorite quote from my morning session of Hyperion. Mind blown!',
    bookTitle: 'Hyperion',
    bookAuthor: 'Dan Simmons',
    bookCover: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=400&auto=format&fit=crop&q=80',
    quote: 'In the beginning was the Word. Then came the word-processor.',
    likes: 15,
    likedByMe: true,
    comments: []
  }
];

const INITIAL_LOANS = [
  {
    id: 'l1',
    bookTitle: 'The Name of the Wind',
    cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&auto=format&fit=crop&q=80',
    lender: 'Alex Morgan (You)',
    borrower: 'Sarah Jenkins',
    dueDate: '2026-08-15',
    status: 'active',
    type: 'lent'
  },
  {
    id: 'l2',
    bookTitle: 'Foundation',
    cover: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=80',
    lender: 'Marcus Chen',
    borrower: 'Alex Morgan (You)',
    dueDate: '2026-08-01',
    status: 'active',
    type: 'borrowed'
  },
  {
    id: 'l3',
    bookTitle: 'Sapiens: A Brief History of Humankind',
    cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80',
    lender: 'Elena Rostova',
    borrower: 'Alex Morgan (You)',
    dueDate: 'Pending Approval',
    status: 'pending',
    type: 'requested'
  }
];

// --- APP STATE CONTROLLER ---
class AppState {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('biblio_books')) || INITIAL_BOOKS;
    this.friends = JSON.parse(localStorage.getItem('biblio_friends')) || INITIAL_FRIENDS;
    this.posts = JSON.parse(localStorage.getItem('biblio_posts')) || INITIAL_POSTS;
    this.loans = JSON.parse(localStorage.getItem('biblio_loans')) || INITIAL_LOANS;
    this.userGoal = JSON.parse(localStorage.getItem('biblio_goal')) || 24;
    this.currentFilter = 'all';
    this.currentGenre = 'all';
    this.searchQuery = '';
    this.viewMode = 'grid';
  }

  save() {
    localStorage.setItem('biblio_books', JSON.stringify(this.books));
    localStorage.setItem('biblio_friends', JSON.stringify(this.friends));
    localStorage.setItem('biblio_posts', JSON.stringify(this.posts));
    localStorage.setItem('biblio_loans', JSON.stringify(this.loans));
    localStorage.setItem('biblio_goal', JSON.stringify(this.userGoal));
  }

  // Sync with PHP Backend API if present
  async syncWithPHPDatabase() {
    try {
      const res = await fetch('api.php?action=get_all');
      if (res.ok) {
        const data = await res.json();
        if (data.status === 'success') {
          if (data.books && data.books.length > 0) this.books = data.books;
          if (data.friends && data.friends.length > 0) this.friends = data.friends;
          if (data.posts && data.posts.length > 0) this.posts = data.posts;
          if (data.loans && data.loans.length > 0) this.loans = data.loans;
          this.save();
          renderDashboard();
          renderLibrary();
          renderFriendPortal();
          renderLendingHub();
        }
      }
    } catch (err) {
      console.log('Running in client-only mode or PHP server offline.');
    }
  }

  async addBook(newBook) {
    this.books.unshift(newBook);
    this.save();

    // Sync with PHP Database
    try {
      await fetch('api.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add_book', ...newBook })
      });
    } catch (e) {}
  }

  async updateBookProgress(id, newPage) {
    const book = this.books.find(b => b.id === id);
    if (book) {
      book.currentPage = Math.min(newPage, book.pages);
      if (book.currentPage >= book.pages) {
        book.status = 'completed';
      }
      this.save();

      try {
        await fetch('api.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'update_progress', id, currentPage: book.currentPage })
        });
      } catch (e) {}
    }
  }

  async addPost(post) {
    this.posts.unshift(post);
    this.save();

    try {
      await fetch('api.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add_post', ...post })
      });
    } catch (e) {}
  }

  toggleLikePost(id) {
    const post = this.posts.find(p => p.id === id);
    if (post) {
      post.likedByMe = !post.likedByMe;
      post.likes += post.likedByMe ? 1 : -1;
      this.save();
    }
  }

  addLoanRequest(loan) {
    this.loans.unshift(loan);
    this.save();
  }
}

const state = new AppState();

// --- DOM UTILITIES & NAVIGATION ---
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initThemeToggle();
  initModals();
  initDashboard();
  initLibrary();
  initFriendPortal();
  initLendingHub();
  initAnalyticsCharts();
  initSearchAndNotifications();
  state.syncWithPHPDatabase();
});

// View Navigation Switcher
function initNavigation() {
  const navBtns = document.querySelectorAll('.nav-item');
  const viewSections = document.querySelectorAll('.view-section');

  function switchView(targetViewId) {
    navBtns.forEach(btn => {
      if (btn.dataset.view === targetViewId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    viewSections.forEach(section => {
      if (section.id === `view-${targetViewId}`) {
        section.classList.add('active');
      } else {
        section.classList.remove('active');
      }
    });

    // Refresh views on switch
    if (targetViewId === 'dashboard') renderDashboard();
    if (targetViewId === 'library') renderLibrary();
    if (targetViewId === 'friends') renderFriendPortal();
    if (targetViewId === 'lending') renderLendingHub();
    if (targetViewId === 'analytics') renderAnalyticsCharts();

    // Close mobile menu if open
    document.querySelector('.sidebar').classList.remove('active');
  }

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => switchView(btn.dataset.view));
  });

  // Buttons with dataset target view
  document.addEventListener('click', (e) => {
    const target = e.target.closest('[data-view-target]');
    if (target) {
      switchView(target.dataset.viewTarget);
    }
  });

  // Mobile menu toggle
  document.getElementById('mobile-menu-toggle').addEventListener('click', () => {
    document.querySelector('.sidebar').classList.toggle('active');
  });
}

// Theme Toggle Handler
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  const icon = toggleBtn.querySelector('i');

  const savedTheme = localStorage.getItem('biblio_theme') || 'dark';
  if (savedTheme === 'light') {
    document.body.classList.replace('dark-theme', 'light-theme');
    icon.className = 'fa-solid fa-sun';
  }

  toggleBtn.addEventListener('click', () => {
    if (document.body.classList.contains('dark-theme')) {
      document.body.classList.replace('dark-theme', 'light-theme');
      icon.className = 'fa-solid fa-sun';
      localStorage.setItem('biblio_theme', 'light');
      showToast('Switched to Light Mode');
    } else {
      document.body.classList.replace('light-theme', 'dark-theme');
      icon.className = 'fa-solid fa-moon';
      localStorage.setItem('biblio_theme', 'dark');
      showToast('Switched to Dark Mode');
    }
  });
}

// Modal Managers
function initModals() {
  const closeBtns = document.querySelectorAll('[data-close-modal]');
  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.dataset.closeModal;
      document.getElementById(modalId).classList.remove('active');
    });
  });

  // Close when clicking outside modal card
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  });

  // Open Add Book Modal
  document.getElementById('open-add-book-btn').addEventListener('click', () => {
    document.getElementById('add-book-modal').classList.add('active');
  });

  // Handle Add Book Form Submit
  document.getElementById('add-book-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('book-title-input').value;
    const author = document.getElementById('book-author-input').value;
    const genre = document.getElementById('book-genre-input').value;
    const status = document.getElementById('book-status-input').value;
    const pages = parseInt(document.getElementById('book-pages-input').value);
    const currentPage = parseInt(document.getElementById('book-current-page-input').value);
    const rating = parseFloat(document.getElementById('book-rating-input').value);
    const coverInput = document.getElementById('book-cover-input').value;
    const notes = document.getElementById('book-notes-input').value;

    const defaultCovers = [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&auto=format&fit=crop&q=80'
    ];

    const newBook = {
      id: 'b_' + Date.now(),
      title,
      author,
      genre,
      status,
      pages,
      currentPage,
      rating,
      cover: coverInput || defaultCovers[Math.floor(Math.random() * defaultCovers.length)],
      notes: notes || 'Recently added to my bookshelf.',
      excerpt: `An excerpt from ${title} by ${author}.`,
      lentTo: status === 'lent' ? 'Friend' : null,
      addedAt: new Date().toISOString().split('T')[0]
    };

    state.addBook(newBook);
    document.getElementById('add-book-modal').classList.remove('active');
    document.getElementById('add-book-form').reset();
    showToast(`Added "${title}" to your library!`);
    renderDashboard();
    renderLibrary();
  });
}

// --- RENDERERS ---

// 1. Dashboard Renderer
function initDashboard() {
  renderDashboard();
}

function renderDashboard() {
  const readingBooks = state.books.filter(b => b.status === 'reading');
  const completedBooks = state.books.filter(b => b.status === 'completed');

  document.getElementById('total-books-count').textContent = state.books.length;
  document.getElementById('stat-reading').textContent = `${readingBooks.length} Books`;
  document.getElementById('stat-completed').textContent = `${completedBooks.length} Books`;

  // Reading Goal Widget SVG Calculation
  const percent = Math.min(100, Math.round((completedBooks.length / state.userGoal) * 100));
  const circle = document.getElementById('goal-progress-circle');
  const radius = circle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;
  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  const offset = circumference - (percent / 100) * circumference;
  circle.style.strokeDashoffset = offset;

  document.getElementById('goal-percent').textContent = `${percent}%`;

  // Render Currently Reading Carousel
  const container = document.getElementById('currently-reading-container');
  if (readingBooks.length === 0) {
    container.innerHTML = `<p style="color:var(--text-muted); padding:10px;">No books currently being read. Add one!</p>`;
  } else {
    container.innerHTML = readingBooks.map(book => {
      const progPercent = Math.round((book.currentPage / book.pages) * 100);
      return `
        <div class="reading-book-card" onclick="openBookDetailModal('${book.id}')">
          <img class="book-cover-thumb" src="${book.cover}" alt="${book.title}" />
          <div class="book-meta">
            <div>
              <h4>${book.title}</h4>
              <span class="author">${book.author}</span>
            </div>
            <div class="progress-bar-container">
              <div class="progress-label-row">
                <span>Page ${book.currentPage} / ${book.pages}</span>
                <span>${progPercent}%</span>
              </div>
              <div class="progress-track">
                <div class="progress-fill" style="width: ${progPercent}%"></div>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Render Dashboard Social Feed snippet
  const feedContainer = document.getElementById('dashboard-feed-container');
  feedContainer.innerHTML = state.posts.slice(0, 2).map(post => `
    <div class="feed-item-card">
      <div class="feed-user-header">
        <img class="feed-avatar" src="${post.avatar}" alt="${post.user}" />
        <div class="feed-user-title">
          <strong>${post.user}</strong> shared an update
          <div class="feed-time">${post.time}</div>
        </div>
      </div>
      <div class="feed-post-content">${post.content}</div>
      ${post.bookTitle ? `
        <div class="feed-book-attachment">
          <img src="${post.bookCover}" alt="${post.bookTitle}" />
          <div>
            <div class="attach-title">${post.bookTitle}</div>
            <div class="attach-author">${post.bookAuthor}</div>
          </div>
        </div>
      ` : ''}
    </div>
  `).join('');

  // Render Loans snippet
  const loansContainer = document.getElementById('dashboard-loans-container');
  loansContainer.innerHTML = state.loans.slice(0, 2).map(loan => `
    <div class="loan-item-card" style="padding:10px;">
      <img src="${loan.cover}" style="width:36px; height:50px;" />
      <div class="loan-details-info">
        <h4 style="font-size:12px;">${loan.bookTitle}</h4>
        <p style="font-size:10px;">${loan.type === 'lent' ? 'Lent to ' + loan.borrower : 'Borrowed from ' + loan.lender}</p>
      </div>
    </div>
  `).join('');
}

// 2. Library Renderer
function initLibrary() {
  // Status filter tab clicks
  const statusTabs = document.querySelectorAll('#library-status-filters .filter-tab');
  statusTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      statusTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.currentFilter = tab.dataset.filter;
      renderLibrary();
    });
  });

  // Genre pills clicks
  const genrePills = document.querySelectorAll('#genre-pills .genre-pill');
  genrePills.forEach(pill => {
    pill.addEventListener('click', () => {
      genrePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.currentGenre = pill.dataset.genre;
      renderLibrary();
    });
  });

  // Sort select dropdown
  document.getElementById('sort-select').addEventListener('change', () => {
    renderLibrary();
  });

  renderLibrary();
}

function renderLibrary() {
  const container = document.getElementById('books-grid');

  let filtered = state.books.filter(b => {
    const matchesStatus = state.currentFilter === 'all' || b.status === state.currentFilter;
    const matchesGenre = state.currentGenre === 'all' || b.genre === state.currentGenre;
    const matchesSearch = state.searchQuery === '' ||
      b.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(state.searchQuery.toLowerCase());

    return matchesStatus && matchesGenre && matchesSearch;
  });

  // Sorting
  const sortVal = document.getElementById('sort-select').value;
  if (sortVal === 'rating') filtered.sort((a, b) => b.rating - a.rating);
  if (sortVal === 'title') filtered.sort((a, b) => a.title.localeCompare(b.title));
  if (sortVal === 'progress') filtered.sort((a, b) => (b.currentPage / b.pages) - (a.currentPage / a.pages));

  if (filtered.length === 0) {
    container.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:40px; color:var(--text-muted);">
      <i class="fa-solid fa-folder-open" style="font-size:36px; margin-bottom:12px;"></i>
      <p>No books match your selected filters.</p>
    </div>`;
    return;
  }

  container.innerHTML = filtered.map(book => {
    const stars = renderStarRating(book.rating);
    return `
      <div class="book-card-item" onclick="openBookDetailModal('${book.id}')">
        <div class="book-cover-wrapper">
          <img src="${book.cover}" alt="${book.title}" />
          <span class="book-status-badge badge-${book.status}">${book.status}</span>
        </div>
        <div class="book-info-content">
          <span class="book-genre-tag">${book.genre}</span>
          <h3 class="book-title">${book.title}</h3>
          <p class="book-author">${book.author}</p>
          <div class="book-rating-row">
            ${stars}
            <span class="rating-num">${book.rating}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// 3. Friend Portal Renderer
function initFriendPortal() {
  document.getElementById('submit-post-btn').addEventListener('click', () => {
    const input = document.getElementById('post-input');
    const text = input.value.trim();
    if (!text) return;

    const newPost = {
      id: 'p_' + Date.now(),
      user: 'Alex Morgan (You)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      time: 'Just now',
      content: text,
      bookTitle: null,
      likes: 0,
      likedByMe: false,
      comments: []
    };

    state.addPost(newPost);
    input.value = '';
    showToast('Published update to Friend Feed!');
    renderFriendPortal();
  });

  renderFriendPortal();
}

function renderFriendPortal() {
  const feedContainer = document.getElementById('full-social-feed');
  feedContainer.innerHTML = state.posts.map(post => `
    <div class="feed-item-card">
      <div class="feed-user-header">
        <img class="feed-avatar" src="${post.avatar}" alt="${post.user}" />
        <div class="feed-user-title">
          <strong>${post.user}</strong>
          <div class="feed-time">${post.time}</div>
        </div>
      </div>
      <div class="feed-post-content">${post.content}</div>
      ${post.quote ? `<div class="feed-quote">"${post.quote}"</div>` : ''}
      ${post.bookTitle ? `
        <div class="feed-book-attachment">
          <img src="${post.bookCover}" alt="${post.bookTitle}" />
          <div>
            <div class="attach-title">${post.bookTitle}</div>
            <div class="attach-author">${post.bookAuthor}</div>
          </div>
        </div>
      ` : ''}
      <div class="feed-actions-bar">
        <button class="feed-action-btn ${post.likedByMe ? 'liked' : ''}" onclick="toggleLike('${post.id}')">
          <i class="fa-${post.likedByMe ? 'solid' : 'regular'} fa-heart"></i> ${post.likes} Likes
        </button>
        <button class="feed-action-btn">
          <i class="fa-regular fa-comment"></i> ${post.comments.length} Comments
        </button>
      </div>
    </div>
  `).join('');

  // Friends List
  const friendsContainer = document.getElementById('friends-list-container');
  friendsContainer.innerHTML = state.friends.map(friend => `
    <div class="friend-item-row">
      <div class="friend-avatar-wrapper">
        <img src="${friend.avatar}" alt="${friend.name}" />
      </div>
      <div class="friend-details">
        <h4>${friend.name}</h4>
        <p>Reading: ${friend.currentlyReading}</p>
      </div>
      <span class="nav-badge alert">${friend.compatibility}</span>
    </div>
  `).join('');

  // Populate Post Book Select
  const bookSelect = document.getElementById('post-book-select');
  bookSelect.innerHTML = `<option value="">Attach a Book</option>` + state.books.map(b => `<option value="${b.title}">${b.title}</option>`).join('');
}

function toggleLike(postId) {
  state.toggleLikePost(postId);
  renderFriendPortal();
}

// 4. Lending Hub Renderer
function initLendingHub() {
  document.getElementById('request-borrow-modal-btn').addEventListener('click', () => {
    populateBorrowModal();
    document.getElementById('borrow-request-modal').classList.add('active');
  });

  document.getElementById('borrow-request-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const friend = document.getElementById('borrow-friend-select').value;
    const book = document.getElementById('borrow-book-select').value;
    const message = document.getElementById('borrow-message-input').value;

    const newLoan = {
      id: 'l_' + Date.now(),
      bookTitle: book,
      cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80',
      lender: friend,
      borrower: 'Alex Morgan (You)',
      dueDate: 'Pending Approval',
      status: 'pending',
      type: 'requested'
    };

    state.addLoanRequest(newLoan);
    document.getElementById('borrow-request-modal').classList.remove('active');
    showToast(`Borrow request sent to ${friend}!`);
    renderLendingHub();
  });

  renderLendingHub();
}

function populateBorrowModal() {
  const friendSelect = document.getElementById('borrow-friend-select');
  friendSelect.innerHTML = state.friends.map(f => `<option value="${f.name}">${f.name} (${f.handle})</option>`).join('');

  const bookSelect = document.getElementById('borrow-book-select');
  bookSelect.innerHTML = `
    <option value="Hyperion Cantos">Hyperion Cantos (Marcus Chen)</option>
    <option value="Three-Body Problem">Three-Body Problem (Elena Rostova)</option>
    <option value="Designing Data-Intensive Apps">Designing Data-Intensive Apps (David Kim)</option>
  `;
}

function renderLendingHub() {
  const requestsContainer = document.getElementById('loan-requests-container');
  const borrowedContainer = document.getElementById('borrowed-books-container');
  const lentContainer = document.getElementById('lent-books-container');

  const pending = state.loans.filter(l => l.status === 'pending');
  const borrowed = state.loans.filter(l => l.type === 'borrowed' && l.status === 'active');
  const lent = state.loans.filter(l => l.type === 'lent' && l.status === 'active');

  requestsContainer.innerHTML = pending.length ? pending.map(l => `
    <div class="loan-item-card">
      <img src="${l.cover}" />
      <div class="loan-details-info">
        <h4>${l.bookTitle}</h4>
        <p>Lender: ${l.lender}</p>
        <span class="loan-due-tag">Status: Pending Approval</span>
      </div>
    </div>
  `).join('') : `<p style="color:var(--text-muted);">No pending requests.</p>`;

  borrowedContainer.innerHTML = borrowed.length ? borrowed.map(l => `
    <div class="loan-item-card">
      <img src="${l.cover}" />
      <div class="loan-details-info">
        <h4>${l.bookTitle}</h4>
        <p>Lender: ${l.lender}</p>
        <span class="loan-due-tag">Due: ${l.dueDate}</span>
      </div>
    </div>
  `).join('') : `<p style="color:var(--text-muted);">No borrowed books currently.</p>`;

  lentContainer.innerHTML = lent.length ? lent.map(l => `
    <div class="loan-item-card">
      <img src="${l.cover}" />
      <div class="loan-details-info">
        <h4>${l.bookTitle}</h4>
        <p>Lent to: ${l.borrower}</p>
        <span class="loan-due-tag">Due: ${l.dueDate}</span>
      </div>
    </div>
  `).join('') : `<p style="color:var(--text-muted);">No books lent out.</p>`;
}

// 5. HTML5 Canvas Chart Renderers (Dependency Free)
function initAnalyticsCharts() {
  renderAnalyticsCharts();
}

function renderAnalyticsCharts() {
  // Render Genre Chart (Canvas Donut)
  const genreCanvas = document.getElementById('genreChart');
  if (genreCanvas) {
    const ctx = genreCanvas.getContext('2d');
    const width = genreCanvas.width = genreCanvas.parentElement.clientWidth;
    const height = genreCanvas.height = 220;

    // Count genres
    const genreCounts = {};
    state.books.forEach(b => { genreCounts[b.genre] = (genreCounts[b.genre] || 0) + 1; });

    const labels = Object.keys(genreCounts);
    const data = Object.values(genreCounts);
    const colors = ['#6366f1', '#10b981', '#f59e0b', '#a855f7', '#f43f5e', '#3b82f6'];

    ctx.clearRect(0, 0, width, height);

    const total = data.reduce((a, b) => a + b, 0);
    let startAngle = 0;
    const centerX = width / 3;
    const centerY = height / 2;
    const radius = 70;

    data.forEach((val, i) => {
      const sliceAngle = (val / total) * 2 * Math.PI;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
      ctx.arc(centerX, centerY, radius - 28, startAngle + sliceAngle, startAngle, true);
      ctx.fillStyle = colors[i % colors.length];
      ctx.fill();
      startAngle += sliceAngle;
    });

    // Legend
    let legendY = 30;
    labels.forEach((label, i) => {
      ctx.fillStyle = colors[i % colors.length];
      ctx.fillRect(width / 1.8, legendY, 14, 14);
      ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--text-main').trim() || '#ffffff';
      ctx.font = '600 12px "Plus Jakarta Sans"';
      ctx.fillText(`${label} (${genreCounts[label]})`, width / 1.8 + 24, legendY + 12);
      legendY += 28;
    });
  }

  // Render Monthly Pace Bar Chart
  const paceCanvas = document.getElementById('paceChart');
  if (paceCanvas) {
    const ctx = paceCanvas.getContext('2d');
    const width = paceCanvas.width = paceCanvas.parentElement.clientWidth;
    const height = paceCanvas.height = 220;

    ctx.clearRect(0, 0, width, height);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
    const bookValues = [2, 3, 4, 2, 3, 2, 2];
    const barWidth = 24;
    const spacing = (width - 60) / months.length;

    months.forEach((m, i) => {
      const x = 40 + i * spacing;
      const barH = bookValues[i] * 32;
      const y = height - 40 - barH;

      ctx.fillStyle = '#6366f1';
      ctx.beginPath();
      ctx.roundRect(x, y, barWidth, barH, [4, 4, 0, 0]);
      ctx.fill();

      // Labels
      ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--text-muted').trim() || '#9ca3af';
      ctx.font = '12px "Plus Jakarta Sans"';
      ctx.fillText(m, x + 2, height - 15);
      ctx.fillText(bookValues[i], x + 6, y - 8);
    });
  }

  // Render Badges
  const badgesContainer = document.getElementById('badges-container');
  const badges = [
    { name: 'Bookworm', desc: 'Read 10+ books', icon: 'fa-book-bookmark', unlocked: true },
    { name: 'Social Butterfly', desc: 'Connected with 5 friends', icon: 'fa-user-group', unlocked: true },
    { name: 'Streak Master', desc: '14-day reading streak', icon: 'fa-fire', unlocked: true },
    { name: 'Genre Explorer', desc: 'Read across 4 genres', icon: 'fa-compass', unlocked: true },
    { name: 'Library Master', desc: 'Read 50+ books', icon: 'fa-crown', unlocked: false }
  ];

  badgesContainer.innerHTML = badges.map(b => `
    <div class="badge-card ${b.unlocked ? 'unlocked' : 'locked'}">
      <div class="badge-icon"><i class="fa-solid ${b.icon}"></i></div>
      <h4>${b.name}</h4>
      <p>${b.desc}</p>
    </div>
  `).join('');
}

// --- BOOK DETAIL MODAL & READER ---
function openBookDetailModal(bookId) {
  const book = state.books.find(b => b.id === bookId);
  if (!book) return;

  const content = document.getElementById('book-detail-content');
  const stars = renderStarRating(book.rating);
  const progPercent = Math.round((book.currentPage / book.pages) * 100);

  content.innerHTML = `
    <div class="book-detail-grid">
      <div class="detail-cover">
        <img src="${book.cover}" alt="${book.title}" />
        <div style="margin-top:16px;">
          <label style="font-size:12px; color:var(--text-muted); font-weight:600;">Update Reading Progress:</label>
          <div style="display:flex; gap:8px; margin-top:6px;">
            <input type="number" id="detail-progress-input" value="${book.currentPage}" max="${book.pages}" style="width:100px; padding:6px 10px; border-radius:var(--radius-md); border:1px solid var(--border-color); background:var(--bg-card); color:var(--text-main);" />
            <button class="btn btn-primary btn-sm" onclick="saveProgress('${book.id}')">Save</button>
          </div>
        </div>
      </div>
      <div class="detail-content">
        <h1>${book.title}</h1>
        <h3>by ${book.author} • <span style="color:var(--accent-emerald);">${book.genre}</span></h3>
        
        <div class="book-rating-row" style="margin-bottom:16px;">
          ${stars} <span class="rating-num">${book.rating} / 5.0</span>
        </div>

        <p class="detail-synopsis">${book.notes}</p>

        <h4>Sample Excerpt Reader:</h4>
        <div class="excerpt-box">
          "${book.excerpt}"
        </div>

        <div class="progress-bar-container" style="margin-top:20px;">
          <div class="progress-label-row">
            <span>Completed ${book.currentPage} of ${book.pages} pages</span>
            <span>${progPercent}%</span>
          </div>
          <div class="progress-track" style="height:10px;">
            <div class="progress-fill" style="width:${progPercent}%"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('book-detail-modal').classList.add('active');
}

function saveProgress(bookId) {
  const val = parseInt(document.getElementById('detail-progress-input').value);
  state.updateBookProgress(bookId, val);
  showToast('Reading progress updated!');
  document.getElementById('book-detail-modal').classList.remove('active');
  renderDashboard();
  renderLibrary();
}

// Helper Star Rating Generator
function renderStarRating(rating) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) stars += '<i class="fa-solid fa-star"></i>';
    else if (i - 0.5 <= rating) stars += '<i class="fa-solid fa-star-half-stroke"></i>';
    else stars += '<i class="fa-regular fa-star"></i>';
  }
  return stars;
}

// Search and Notifications Handler
function initSearchAndNotifications() {
  const searchInput = document.getElementById('global-search');
  searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    renderLibrary();
  });

  // Keyboard shortcut Ctrl+K / Cmd+K
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      searchInput.focus();
    }
  });

  // Notification dropdown
  const notifBtn = document.getElementById('notif-btn');
  const notifDropdown = document.getElementById('notif-dropdown');
  notifBtn.addEventListener('click', () => {
    notifDropdown.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (!notifBtn.contains(e.target) && !notifDropdown.contains(e.target)) {
      notifDropdown.classList.remove('active');
    }
  });

  const notifList = document.getElementById('notif-list');
  notifList.innerHTML = `
    <div class="notif-item"><i class="fa-solid fa-heart"></i> Marcus liked your post about Dune.</div>
    <div class="notif-item"><i class="fa-solid fa-book"></i> Sarah accepted your loan request.</div>
  `;
}

// Toast Helper
function showToast(message) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color:var(--accent-emerald);"></i> ${message}`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
