<?php
// API Endpoint for Connecting HTML Frontend with PHP Database
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once __DIR__ . '/config.php';

$action = $_GET['action'] ?? $_POST['action'] ?? '';

// If raw JSON POST body was sent
$inputData = json_decode(file_get_contents('php://input'), true);
if ($inputData && isset($inputData['action'])) {
    $action = $inputData['action'];
}

try {
    if ($action === 'get_all') {
        $books = $pdo->query("SELECT * FROM books ORDER BY created_at DESC")->fetchAll();
        $friends = $pdo->query("SELECT * FROM friends")->fetchAll();
        $posts = $pdo->query("SELECT * FROM posts ORDER BY created_at DESC")->fetchAll();
        $loans = $pdo->query("SELECT * FROM loans")->fetchAll();

        echo json_encode([
            'status' => 'success',
            'books' => $books,
            'friends' => $friends,
            'posts' => $posts,
            'loans' => $loans
        ]);
        exit;
    }

    if ($action === 'add_book') {
        $data = $inputData ?? $_POST;
        $id = 'b_' . time();
        $title = trim($data['title']);
        $author = trim($data['author']);
        $genre = trim($data['genre']);
        $status = trim($data['status']);
        $pages = (int)($data['pages'] ?? 350);
        $current_page = (int)($data['current_page'] ?? 0);
        $rating = (float)($data['rating'] ?? 4.5);
        $cover = trim($data['cover'] ?? '') ?: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80';
        $notes = trim($data['notes'] ?? 'Added via HTML app');
        $excerpt = "Excerpt from " . $title;

        $stmt = $pdo->prepare("INSERT INTO books (id, title, author, genre, status, pages, current_page, rating, cover, notes, excerpt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$id, $title, $author, $genre, $status, $pages, $current_page, $rating, $cover, $notes, $excerpt]);

        echo json_encode(['status' => 'success', 'id' => $id, 'message' => 'Book saved to PHP database']);
        exit;
    }

    if ($action === 'add_post') {
        $data = $inputData ?? $_POST;
        $id = 'p_' . time();
        $user_name = "Alex Morgan (You)";
        $avatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";
        $content = trim($data['content']);
        $book_title = trim($data['book_title'] ?? '') ?: null;

        $stmt = $pdo->prepare("INSERT INTO posts (id, user_name, avatar, content, book_title) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$id, $user_name, $avatar, $content, $book_title]);

        echo json_encode(['status' => 'success', 'id' => $id, 'message' => 'Post saved to PHP database']);
        exit;
    }

    if ($action === 'update_progress') {
        $data = $inputData ?? $_POST;
        $id = $data['id'];
        $currentPage = (int)$data['currentPage'];

        $stmt = $pdo->prepare("UPDATE books SET current_page = ? WHERE id = ?");
        $stmt->execute([$currentPage, $id]);

        echo json_encode(['status' => 'success', 'message' => 'Progress updated in PHP database']);
        exit;
    }

    echo json_encode(['status' => 'error', 'message' => 'Invalid action']);

} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
