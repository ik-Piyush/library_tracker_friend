<?php
// Config & Database Connection for XAMPP (MySQL / SQLite Fallback)
session_start();

$db_host = 'localhost';
$db_user = 'root';
$db_pass = '';
$db_name = 'library_tracker_friend';

try {
    // Try connecting to MySQL (XAMPP Default)
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8mb4", $db_user, $db_pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
} catch (PDOException $e) {
    // Fallback: Create or connect to SQLite database file if MySQL database isn't initialized yet
    $sqlite_file = __DIR__ . '/library_tracker.db';
    $pdo = new PDO("sqlite:" . $sqlite_file);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
}

// Auto-initialize Tables if missing
$pdo->exec("
    CREATE TABLE IF NOT EXISTS books (
        id VARCHAR(50) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        genre VARCHAR(100) NOT NULL,
        status VARCHAR(50) NOT NULL,
        pages INT NOT NULL,
        current_page INT DEFAULT 0,
        rating FLOAT DEFAULT 4.5,
        cover TEXT,
        notes TEXT,
        excerpt TEXT,
        lent_to VARCHAR(255) DEFAULT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS friends (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        handle VARCHAR(100) NOT NULL,
        avatar TEXT,
        currently_reading VARCHAR(255),
        compatibility VARCHAR(20)
    );

    CREATE TABLE IF NOT EXISTS posts (
        id VARCHAR(50) PRIMARY KEY,
        user_name VARCHAR(255) NOT NULL,
        avatar TEXT,
        content TEXT NOT NULL,
        book_title VARCHAR(255),
        book_author VARCHAR(255),
        book_cover TEXT,
        quote TEXT,
        likes INT DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS loans (
        id VARCHAR(50) PRIMARY KEY,
        book_title VARCHAR(255) NOT NULL,
        cover TEXT,
        lender VARCHAR(255) NOT NULL,
        borrower VARCHAR(255) NOT NULL,
        due_date VARCHAR(100) NOT NULL,
        status VARCHAR(50) NOT NULL,
        type VARCHAR(50) NOT NULL
    );
");

// Seed Initial Data if tables are empty
$stmt = $pdo->query("SELECT COUNT(*) FROM books");
if ($stmt->fetchColumn() == 0) {
    $pdo->exec("
        INSERT INTO books (id, title, author, genre, status, pages, current_page, rating, cover, notes, excerpt) VALUES
        ('b1', 'Project Hail Mary', 'Andy Weir', 'Sci-Fi', 'reading', 496, 340, 4.9, 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=400&auto=format&fit=crop&q=80', 'Incredible survival narrative!', 'Ryland Grace is the sole survivor on a desperate mission.'),
        ('b2', 'Dune: Part One', 'Frank Herbert', 'Sci-Fi', 'completed', 658, 658, 4.8, 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=80', 'Masterpiece of sci-fi worldbuilding.', 'A beginning is the time for taking the most delicate care.'),
        ('b3', 'Atomic Habits', 'James Clear', 'Psychology', 'completed', 320, 320, 5.0, 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80', 'Systems over goals.', 'You do not rise to the level of your goals.'),
        ('b4', 'Clean Code', 'Robert C. Martin', 'Technology', 'reading', 464, 210, 4.6, 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&auto=format&fit=crop&q=80', 'Essential programming handbook.', 'Even bad code can function. Clean code matters.');

        INSERT INTO friends (id, name, handle, avatar, currently_reading, compatibility) VALUES
        ('f1', 'Sarah Jenkins', '@sarah_reads', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', 'The Name of the Wind', '94%'),
        ('f2', 'Marcus Chen', '@marcus_scifi', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', 'Hyperion Cantos', '98%'),
        ('f3', 'Elena Rostova', '@elena_lit', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80', 'Three-Body Problem', '87%');

        INSERT INTO posts (id, user_name, avatar, content, book_title, book_author, book_cover, likes) VALUES
        ('p1', 'Sarah Jenkins', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', 'Finished Chapter 12! Thanks to Alex for lending me this copy! 📚', 'The Name of the Wind', 'Patrick Rothfuss', 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&auto=format&fit=crop&q=80', 8),
        ('p2', 'Marcus Chen', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', 'Favorite quote from Hyperion session this morning!', 'Hyperion', 'Dan Simmons', 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=400&auto=format&fit=crop&q=80', 15);

        INSERT INTO loans (id, book_title, cover, lender, borrower, due_date, status, type) VALUES
        ('l1', 'The Name of the Wind', 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&auto=format&fit=crop&q=80', 'Alex Morgan (You)', 'Sarah Jenkins', '2026-08-15', 'active', 'lent'),
        ('l2', 'Foundation', 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=80', 'Marcus Chen', 'Alex Morgan (You)', '2026-08-01', 'active', 'borrowed');
    ");
}
?>
