<?php
// Include database configuration
require_once 'db_config.php';

// Initialize response array
$response = array(
    'success' => false,
    'message' => ''
);

// Check if form is submitted via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data and sanitize
    $name = isset($_POST['name']) ? mysqli_real_escape_string($conn, $_POST['name']) : '';
    $email = isset($_POST['email']) ? mysqli_real_escape_string($conn, $_POST['email']) : '';
    $phone = isset($_POST['telepon']) ? mysqli_real_escape_string($conn, $_POST['telepon']) : '';
    $message = isset($_POST['message']) ? mysqli_real_escape_string($conn, $_POST['message']) : '';
    
    // Validate required fields
    if (empty($name) || empty($email) || empty($message)) {
        $response['message'] = "Please fill all required fields (name, email, and message).";
    } else {
        // Insert data into database
        $sql = "INSERT INTO contact_messages (name, email, phone, message) VALUES ('$name', '$email', '$phone', '$message')";
        
        if (mysqli_query($conn, $sql)) {
            $response['success'] = true;
            $response['message'] = "Thank you for your message. I'll get back to you soon!";
        } else {
            $response['message'] = "Error: " . mysqli_error($conn);
        }
    }
    
    // Return JSON response for AJAX requests
    if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
        header('Content-Type: application/json');
        echo json_encode($response);
        exit;
    } else {
        // Redirect for non-AJAX requests
        if ($response['success']) {
            header("Location: thanks.html");
        } else {
            header("Location: index.html?contact_status=error&message=" . urlencode($response['message']) . "#contact");
        }
        exit;
    }
}