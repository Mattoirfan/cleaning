<?php
/**
 * PureNest Cleaning Co. - Hostinger PHP Backend Handler
 * This provides an alternative API endpoint for Hostinger Shared/Web Hosting environments
 * where a persistent Node.js daemon is not configured.
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$dbDir = __DIR__ . '/../../data';
if (!file_exists($dbDir)) {
    mkdir($dbDir, 0755, true);
}
$dbFile = $dbDir . '/enquiries.json';

// Handle POST Enquiry
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $rawInput = file_get_contents('php://input');
    $data = json_decode($rawInput, true);

    if (!$data || empty($data['fullName']) || empty($data['email']) || empty($data['phone'])) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => 'Please provide full name, email, and phone number.'
        ]);
        exit;
    }

    $id = 'PN-' . rand(10000, 99999);
    $newEnquiry = [
        'id' => $id,
        'fullName' => trim($data['fullName']),
        'email' => strtolower(trim($data['email'])),
        'phone' => trim($data['phone']),
        'serviceId' => $data['serviceId'] ?? 'residential-regular',
        'propertyType' => $data['propertyType'] ?? 'apartment',
        'bedrooms' => (string)($data['bedrooms'] ?? '2'),
        'bathrooms' => (string)($data['bathrooms'] ?? '2'),
        'preferredDate' => $data['preferredDate'] ?? date('Y-m-d'),
        'preferredTime' => $data['preferredTime'] ?? 'morning',
        'address' => trim($data['address'] ?? ''),
        'zipCode' => trim($data['zipCode'] ?? ''),
        'message' => trim($data['message'] ?? ''),
        'status' => 'New',
        'createdAt' => date('c'),
    ];

    $existing = [];
    if (file_exists($dbFile)) {
        $content = file_get_contents($dbFile);
        $existing = json_decode($content, true) ?: [];
    }

    array_unshift($existing, $newEnquiry);
    file_put_contents($dbFile, json_encode($existing, JSON_PRETTY_PRINT));

    http_response_code(201);
    echo json_encode([
        'success' => true,
        'enquiry' => [
            'id' => $newEnquiry['id'],
            'fullName' => $newEnquiry['fullName'],
            'email' => $newEnquiry['email'],
            'serviceId' => $newEnquiry['serviceId'],
            'preferredDate' => $newEnquiry['preferredDate']
        ]
    ]);
    exit;
}

// Fallback
http_response_code(405);
echo json_encode(['success' => false, 'error' => 'Method not allowed']);
?>
