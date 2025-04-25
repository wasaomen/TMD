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
    // データベースが存在しない場合は作成
    $pdo = new PDO("mysql:host=$host", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // データベースの作成
    $pdo->exec("CREATE DATABASE IF NOT EXISTS $dbname");
    $pdo->exec("USE $dbname");
    
    // テーブルの作成
    $pdo->exec("CREATE TABLE IF NOT EXISTS sketches (
        id INT AUTO_INCREMENT PRIMARY KEY,
        image_data TEXT NOT NULL,
        created_at DATETIME NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

    // POSTデータの取得と検証
    $rawData = file_get_contents('php://input');
    if ($rawData === false) {
        throw new Exception('POSTデータの取得に失敗しました');
    }

    $data = json_decode($rawData, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('JSONデータの解析に失敗しました: ' . json_last_error_msg());
    }

    if (!isset($data['imageData'])) {
        throw new Exception('画像データがありません');
    }
    
    $imageData = $data['imageData'];
    $timestamp = date('Y-m-d H:i:s');

    // 画像データを保存
    $stmt = $pdo->prepare("INSERT INTO sketches (image_data, created_at) VALUES (?, ?)");
    $stmt->execute([$imageData, $timestamp]);

    echo json_encode(['success' => true, 'message' => 'スケッチを保存しました']);
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