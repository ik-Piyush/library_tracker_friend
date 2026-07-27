<?php
require_once __DIR__ . '/config.php';

// Handle POST actions
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';

    if ($action === 'add_book') {
        $id = 'b_' . time();
        $title = trim($_POST['title']);
        $author = trim($_POST['author']);
        $genre = trim($_POST['genre']);
        $status = trim($_POST['status']);
        $pages = (int)$_POST['pages'];
        $current_page = (int)$_POST['current_page'];
        $rating = (float)$_POST['rating'];
        $cover = trim($_POST['cover']) ?: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80';
        $notes = trim($_POST['notes']);
        $excerpt = "Excerpt from " . $title;

        $stmt = $pdo->prepare("INSERT INTO books (id, title, author, genre, status, pages, current_page, rating, cover, notes, excerpt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$id, $title, $author, $genre, $status, $pages, $current_page, $rating, $cover, $notes, $excerpt]);
        header("Location: index.php?msg=book_added");
        exit;
    }

    if ($action === 'add_post') {
        $id = 'p_' . time();
        $user_name = "Alex Morgan (You)";
        $avatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";
        $content = trim($_POST['content']);
        $book_title = trim($_POST['book_title']) ?: null;

        if (!empty($content)) {
            $stmt = $pdo->prepare("INSERT INTO posts (id, user_name, avatar, content, book_title) VALUES (?, ?, ?, ?, ?)");
            $stmt->execute([$id, $user_name, $avatar, $content, $book_title]);
        }
        header("Location: index.php?msg=post_added");
        exit;
    }

    if ($action === 'request_loan') {
        $id = 'l_' . time();
        $book_title = trim($_POST['book_title']);
        $lender = trim($_POST['lender']);
        $borrower = "Alex Morgan (You)";
        $cover = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80';
        $dueDate = 'Pending Approval';

        $stmt = $pdo->prepare("INSERT INTO loans (id, book_title, cover, lender, borrower, due_date, status, type) VALUES (?, ?, ?, ?, ?, ?, 'pending', 'requested')");
        $stmt->execute([$id, $book_title, $cover, $lender, $borrower, $dueDate]);
        header("Location: index.php?msg=loan_requested");
        exit;
    }
}

// Fetch Data from Database
$books = $pdo->query("SELECT * FROM books ORDER BY created_at DESC")->fetchAll();
$friends = $pdo->query("SELECT * FROM friends")->fetchAll();
$posts = $pdo->query("SELECT * FROM posts ORDER BY created_at DESC")->fetchAll();
$loans = $pdo->query("SELECT * FROM loans")->fetchAll();

// Calculated Statistics
$currently_reading = array_filter($books, fn($b) => $b['status'] === 'reading');
$completed_books = array_filter($books, fn($b) => $b['status'] === 'completed');
$annual_goal = 24;
$goal_percent = min(100, round((count($completed_books) / $annual_goal) * 100));
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Bibliophile - PHP Library Tracker & Friend Portal</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link rel="stylesheet" href="styles.css" />
</head>
<body class="dark-theme">
  <div class="app-layout">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-icon"><i class="fa-solid fa-book-bookmark"></i></div>
        <div class="brand-text">
          <h2>Bibliophile</h2>
          <span>PHP + XAMPP Stack</span>
        </div>
      </div>

      <nav class="nav-menu">
        <button class="nav-item active" data-view="dashboard">
          <i class="fa-solid fa-chart-pie"></i>
          <span>Dashboard</span>
        </button>
        <button class="nav-item" data-view="library">
          <i class="fa-solid fa-books"></i>
          <span>My Library</span>
          <span class="nav-badge" id="total-books-count"><?= count($books) ?></span>
        </button>
        <button class="nav-item" data-view="friends">
          <i class="fa-solid fa-user-group"></i>
          <span>Friend Portal</span>
          <span class="nav-badge alert"><?= count($friends) ?></span>
        </button>
        <button class="nav-item" data-view="lending">
          <i class="fa-solid fa-hand-holding-hand"></i>
          <span>Book Loans</span>
          <span class="nav-badge pulse"><?= count($loans) ?></span>
        </button>
        <button class="nav-item" data-view="analytics">
          <i class="fa-solid fa-chart-column"></i>
          <span>Analytics & Goals</span>
        </button>
      </nav>

      <div class="user-sidebar-card">
        <div class="user-avatar">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" alt="User Avatar" />
          <span class="online-indicator"></span>
        </div>
        <div class="user-info">
          <h4>Alex Morgan</h4>
          <p>@alex_reads</p>
        </div>
        <button class="icon-btn theme-toggle-btn" id="theme-toggle" title="Toggle Theme">
          <i class="fa-solid fa-moon"></i>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <header class="top-bar">
        <div class="mobile-toggle" id="mobile-menu-toggle"><i class="fa-solid fa-bars"></i></div>
        <div class="search-box">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" id="global-search" placeholder="Search books, authors, or genres..." />
          <span class="shortcut-key">⌘K</span>
        </div>

        <div class="header-actions">
          <a href="index.html" class="btn btn-secondary" title="Switch to HTML Standalone SPA Mode">
            <i class="fa-solid fa-code text-emerald"></i> HTML SPA Mode
          </a>
          <button class="btn btn-primary" id="open-add-book-btn">
            <i class="fa-solid fa-plus"></i> Add Book (PHP)
          </button>
        </div>
      </header>

      <!-- DASHBOARD VIEW -->
      <section class="view-section active" id="view-dashboard">
        <div class="hero-welcome">
          <div class="hero-text">
            <h1>Welcome back to <span class="highlight-gradient">Bibliophile PHP</span>! 🐘</h1>
            <p>Database connected via PDO (SQLite/MySQL XAMPP support). You've read <?= count($completed_books) ?> books this year.</p>
          </div>
          <div class="quick-stats-row">
            <div class="stat-card">
              <div class="stat-icon bg-indigo"><i class="fa-solid fa-book-open"></i></div>
              <div class="stat-info">
                <span class="stat-label">Currently Reading</span>
                <h3><?= count($currently_reading) ?> Books</h3>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon bg-emerald"><i class="fa-solid fa-circle-check"></i></div>
              <div class="stat-info">
                <span class="stat-label">Completed</span>
                <h3><?= count($completed_books) ?> Books</h3>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon bg-amber"><i class="fa-solid fa-fire"></i></div>
              <div class="stat-info">
                <span class="stat-label">Reading Streak</span>
                <h3>14 Days 🔥</h3>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon bg-rose"><i class="fa-solid fa-user-group"></i></div>
              <div class="stat-info">
                <span class="stat-label">Friends</span>
                <h3><?= count($friends) ?> Active</h3>
              </div>
            </div>
          </div>
        </div>

        <div class="dashboard-grid">
          <!-- Currently Reading -->
          <div class="grid-card wide">
            <div class="card-header">
              <h2><i class="fa-solid fa-book-bookmark text-indigo"></i> Continue Reading</h2>
            </div>
            <div class="currently-reading-slider">
              <?php foreach ($currently_reading as $b): ?>
                <?php $prog = round(($b['current_page'] / $b['pages']) * 100); ?>
                <div class="reading-book-card">
                  <img class="book-cover-thumb" src="<?= htmlspecialchars($b['cover']) ?>" />
                  <div class="book-meta">
                    <div>
                      <h4><?= htmlspecialchars($b['title']) ?></h4>
                      <span class="author"><?= htmlspecialchars($b['author']) ?></span>
                    </div>
                    <div class="progress-bar-container">
                      <div class="progress-label-row">
                        <span>Page <?= $b['current_page'] ?> / <?= $b['pages'] ?></span>
                        <span><?= $prog ?>%</span>
                      </div>
                      <div class="progress-track">
                        <div class="progress-fill" style="width: <?= $prog ?>%"></div>
                      </div>
                    </div>
                  </div>
                </div>
              <?php endforeach; ?>
            </div>
          </div>

          <!-- Goal Ring -->
          <div class="grid-card">
            <div class="card-header">
              <h2><i class="fa-solid fa-trophy text-amber"></i> 2026 Goal</h2>
            </div>
            <div class="goal-widget-content">
              <div class="goal-circle-container">
                <svg class="progress-ring" width="140" height="140">
                  <circle class="progress-ring-bg" stroke="rgba(255,255,255,0.08)" stroke-width="12" fill="transparent" r="58" cx="70" cy="70"/>
                  <circle class="progress-ring-fill" stroke="url(#gradient-ring)" stroke-width="12" stroke-dasharray="364.4" stroke-dashoffset="<?= 364.4 - (364.4 * $goal_percent / 100) ?>" stroke-linecap="round" fill="transparent" r="58" cx="70" cy="70"/>
                  <defs>
                    <linearGradient id="gradient-ring" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#6366f1" />
                      <stop offset="100%" stop-color="#10b981" />
                    </linearGradient>
                  </defs>
                </svg>
                <div class="circle-text">
                  <span class="percent"><?= $goal_percent ?>%</span>
                  <span class="subtext"><?= count($completed_books) ?> of <?= $annual_goal ?> Books</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- LIBRARY VIEW -->
      <section class="view-section" id="view-library">
        <div class="section-title-bar">
          <div>
            <h1>My Bookshelf</h1>
            <p>Managed dynamically via PHP Database</p>
          </div>
        </div>
        <div class="books-grid-container" id="books-grid">
          <?php foreach ($books as $b): ?>
            <div class="book-card-item">
              <div class="book-cover-wrapper">
                <img src="<?= htmlspecialchars($b['cover']) ?>" />
                <span class="book-status-badge badge-<?= $b['status'] ?>"><?= htmlspecialchars($b['status']) ?></span>
              </div>
              <div class="book-info-content">
                <span class="book-genre-tag"><?= htmlspecialchars($b['genre']) ?></span>
                <h3 class="book-title"><?= htmlspecialchars($b['title']) ?></h3>
                <p class="book-author"><?= htmlspecialchars($b['author']) ?></p>
                <div class="book-rating-row">
                  <i class="fa-solid fa-star"></i>
                  <span class="rating-num"><?= $b['rating'] ?></span>
                </div>
              </div>
            </div>
          <?php endforeach; ?>
        </div>
      </section>

      <!-- FRIEND PORTAL VIEW -->
      <section class="view-section" id="view-friends">
        <div class="section-title-bar">
          <div>
            <h1>Friend Portal</h1>
            <p>Community feed powered by PHP backend</p>
          </div>
        </div>

        <div class="friends-layout">
          <div class="feed-column">
            <!-- Create Post Form -->
            <div class="create-post-card">
              <form action="index.php" method="POST">
                <input type="hidden" name="action" value="add_post" />
                <div class="post-user-info">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" />
                  <input type="text" name="content" required placeholder="Share a reading update..." />
                </div>
                <div class="post-actions">
                  <select name="book_title" style="background:var(--bg-glass); border:1px solid var(--border-color); color:var(--text-muted); padding:6px 12px; border-radius:var(--radius-md);">
                    <option value="">Attach Book</option>
                    <?php foreach($books as $b): ?>
                      <option value="<?= htmlspecialchars($b['title']) ?>"><?= htmlspecialchars($b['title']) ?></option>
                    <?php endforeach; ?>
                  </select>
                  <button type="submit" class="btn btn-primary btn-sm">Post Update</button>
                </div>
              </form>
            </div>

            <!-- Posts List -->
            <div class="social-feed-container">
              <?php foreach ($posts as $p): ?>
                <div class="feed-item-card">
                  <div class="feed-user-header">
                    <img class="feed-avatar" src="<?= htmlspecialchars($p['avatar']) ?>" />
                    <div class="feed-user-title">
                      <strong><?= htmlspecialchars($p['user_name']) ?></strong>
                      <div class="feed-time"><?= $p['created_at'] ?></div>
                    </div>
                  </div>
                  <div class="feed-post-content"><?= htmlspecialchars($p['content']) ?></div>
                  <?php if ($p['book_title']): ?>
                    <div class="feed-book-attachment">
                      <div class="attach-title"><?= htmlspecialchars($p['book_title']) ?></div>
                    </div>
                  <?php endif; ?>
                </div>
              <?php endforeach; ?>
            </div>
          </div>

          <!-- Sidebar Friends -->
          <div class="friends-sidebar-column">
            <div class="grid-card">
              <div class="card-header"><h3><i class="fa-solid fa-users text-indigo"></i> Reading Buddies</h3></div>
              <div class="friends-list">
                <?php foreach ($friends as $f): ?>
                  <div class="friend-item-row">
                    <div class="friend-avatar-wrapper">
                      <img src="<?= htmlspecialchars($f['avatar']) ?>" />
                    </div>
                    <div class="friend-details">
                      <h4><?= htmlspecialchars($f['name']) ?></h4>
                      <p><?= htmlspecialchars($f['handle']) ?></p>
                    </div>
                    <span class="nav-badge alert"><?= $f['compatibility'] ?></span>
                  </div>
                <?php endforeach; ?>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- LENDING VIEW -->
      <section class="view-section" id="view-lending">
        <div class="section-title-bar">
          <div>
            <h1>Book Loans</h1>
            <p>Borrowing & Lending active records</p>
          </div>
        </div>
        <div class="lending-grid">
          <?php foreach ($loans as $l): ?>
            <div class="loan-item-card">
              <img src="<?= htmlspecialchars($l['cover']) ?>" />
              <div class="loan-details-info">
                <h4><?= htmlspecialchars($l['book_title']) ?></h4>
                <p><?= $l['type'] === 'lent' ? 'Lent to: ' . htmlspecialchars($l['borrower']) : 'Borrowed from: ' . htmlspecialchars($l['lender']) ?></p>
                <span class="loan-due-tag">Due: <?= htmlspecialchars($l['due_date']) ?></span>
              </div>
            </div>
          <?php endforeach; ?>
        </div>
      </section>

      <!-- ANALYTICS VIEW -->
      <section class="view-section" id="view-analytics">
        <div class="section-title-bar">
          <div>
            <h1>Analytics</h1>
            <p>Database statistics summary</p>
          </div>
        </div>
        <div class="grid-card">
          <h3>Collection Stats</h3>
          <p style="margin-top:10px; color:var(--text-muted);">Total Books in PHP Database: <strong><?= count($books) ?></strong></p>
          <p style="color:var(--text-muted);">Total Community Posts: <strong><?= count($posts) ?></strong></p>
        </div>
      </section>
    </main>
  </div>

  <!-- ADD BOOK MODAL -->
  <div class="modal-overlay" id="add-book-modal">
    <div class="modal-card">
      <div class="modal-header">
        <h2><i class="fa-solid fa-plus-circle"></i> Add Book (PHP Database)</h2>
        <button class="modal-close-btn" data-close-modal="add-book-modal">&times;</button>
      </div>
      <form action="index.php" method="POST">
        <input type="hidden" name="action" value="add_book" />
        <div class="form-group">
          <label>Book Title *</label>
          <input type="text" name="title" required placeholder="e.g. The Martian" />
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Author *</label>
            <input type="text" name="author" required placeholder="e.g. Andy Weir" />
          </div>
          <div class="form-group">
            <label>Genre *</label>
            <select name="genre" required>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Technology">Technology</option>
              <option value="Fiction">Fiction</option>
              <option value="Psychology">Psychology</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Status *</label>
            <select name="status" required>
              <option value="reading">Currently Reading</option>
              <option value="completed">Completed</option>
              <option value="wishlist">Wishlist</option>
            </select>
          </div>
          <div class="form-group">
            <label>Total Pages *</label>
            <input type="number" name="pages" required value="350" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Current Page</label>
            <input type="number" name="current_page" value="0" />
          </div>
          <div class="form-group">
            <label>Rating (1-5)</label>
            <input type="number" step="0.1" name="rating" value="4.5" />
          </div>
        </div>
        <div class="form-group">
          <label>Cover Image URL</label>
          <input type="url" name="cover" placeholder="https://..." />
        </div>
        <div class="form-group">
          <label>Notes</label>
          <textarea name="notes" rows="2"></textarea>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-close-modal="add-book-modal">Cancel</button>
          <button type="submit" class="btn btn-primary">Save to Database</button>
        </div>
      </form>
    </div>
  </div>

  <script src="app.js"></script>
</body>
</html>
