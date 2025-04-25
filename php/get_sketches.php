<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// エラーレポートを有効化
error_reporting(E_ALL);
ini_set('display_errors', 1);

// データベース接続情報
$host = 'localhost';
$dbname = 'tmd_db';
$username = 'root';
$password = '';

try {
    // データベース接続
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // スケッチデータの取得
    $stmt = $pdo->query("SELECT * FROM sketches ORDER BY created_at DESC");
    if ($stmt === false) {
        throw new Exception('クエリの実行に失敗しました');
    }
    
    $sketches = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['success' => true, 'sketches' => $sketches]);
} catch(PDOException $e) {
    error_log('Database Error: ' . $e->getMessage());
    echo json_encode([
        'success' => false, 
        'message' => 'データベースエラーが発生しました',
        'debug' => $e->getMessage()
    ]);
} catch(Exception $e) {
    error_log('General Error: ' . $e->getMessage());
    echo json_encode([
        'success' => false, 
        'message' => $e->getMessage(),
        'debug' => $e->getMessage()
    ]);
}
?> 