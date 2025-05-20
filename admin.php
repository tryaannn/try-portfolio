<?php
// Include database configuration
require_once 'db_config.php';

// Simple authentication
$admin_username = "admin";
$admin_password = "admin123"; // In a real application, use hashed passwords!

$authenticated = false;

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = isset($_POST['username']) ? $_POST['username'] : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';
    
    if ($username === $admin_username && $password === $admin_password) {
        $authenticated = true;
        
        // Set session for authentication
        session_start();
        $_SESSION['admin_auth'] = true;
    } else {
        $error_message = "Invalid username or password!";
    }
}

// Check if already authenticated via session
session_start();
if (isset($_SESSION['admin_auth']) && $_SESSION['admin_auth'] === true) {
    $authenticated = true;
}

// Handle logout
if (isset($_GET['logout'])) {
    session_start();
    session_destroy();
    header("Location: admin.php");
    exit;
}

// Handle message deletion
if ($authenticated && isset($_GET['delete'])) {
    $id = $_GET['delete'];
    $delete_sql = "DELETE FROM contact_messages WHERE id = $id";
    if (mysqli_query($conn, $delete_sql)) {
        $success_message = "Message deleted successfully!";
    } else {
        $error_message = "Error deleting message: " . mysqli_error($conn);
    }
}

// Fetch all messages if authenticated
if ($authenticated) {
    $sql = "SELECT * FROM contact_messages ORDER BY submission_date DESC";
    $result = mysqli_query($conn, $sql);
    $messages = mysqli_fetch_all($result, MYSQLI_ASSOC);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - Contact Messages</title>
    <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.0/css/line.css" />
    <link rel="stylesheet" href="css/style.css">
    <link rel="shortcut icon" href="assets/img/profile.png" type="image/png">
    <style>
        /* Admin Dashboard Styles */
        .admin-container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 2rem;
        }
        
        .admin-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
        }
        
        .logout-btn {
            color: #ff6b6b;
            display: flex;
            align-items: center;
        }
        
        .logout-btn i {
            margin-right: 0.5rem;
        }
        
        .message-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 2rem;
        }
        
        .message-table th,
        .message-table td {
            padding: 1rem;
            text-align: left;
            border-bottom: 1px solid var(--text-color-light);
        }
        
        .message-table th {
            background-color: var(--first-color);
            color: white;
        }
        
        .message-table tr:hover {
            background-color: var(--input-color);
        }
        
        .message-content {
            max-width: 300px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        
        .action-btn {
            color: #ff6b6b;
            cursor: pointer;
        }
        
        .login-form {
            max-width: 400px;
            margin: 0 auto;
            padding: 2rem;
            background-color: var(--container-color);
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .form-group {
            margin-bottom: 1.5rem;
        }
        
        .form-control {
            width: 100%;
            padding: 0.75rem 1rem;
            border-radius: 0.5rem;
            background-color: var(--input-color);
            border: none;
            outline: none;
            color: var(--text-color);
        }
        
        .alert {
            padding: 1rem;
            border-radius: 0.5rem;
            margin-bottom: 1.5rem;
        }
        
        .alert-danger {
            background-color: #ffe5e5;
            color: #ff6b6b;
        }
        
        .alert-success {
            background-color: #e5ffe5;
            color: #28a745;
        }
        
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 1000;
            justify-content: center;
            align-items: center;
        }
        
        .modal-content {
            background-color: var(--container-color);
            padding: 2rem;
            border-radius: 0.5rem;
            max-width: 500px;
            width: 100%;
            position: relative;
        }
        
        .close-modal {
            position: absolute;
            top: 1rem;
            right: 1rem;
            font-size: 1.5rem;
            cursor: pointer;
        }
        
        .modal-body {
            margin-bottom: 1.5rem;
        }
    </style>
</head>
<body>
    <div class="admin-container">
        <?php if (!$authenticated): ?>
            <!-- Login Form -->
            <h2 class="section__title">Admin Login</h2>
            <span class="section__subtitle">Please login to view contact messages</span>
            
            <?php if (isset($error_message)): ?>
                <div class="alert alert-danger">
                    <?php echo $error_message; ?>
                </div>
            <?php endif; ?>
            
            <div class="login-form">
                <form method="POST" action="admin.php">
                    <div class="form-group">
                        <label for="username" class="contact__label">Username</label>
                        <input type="text" name="username" id="username" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="password" class="contact__label">Password</label>
                        <input type="password" name="password" id="password" class="form-control" required>
                    </div>
                    <button type="submit" class="button button--flex">
                        Login <i class="uil uil-signin button__icon"></i>
                    </button>
                </form>
            </div>
        <?php else: ?>
            <!-- Admin Dashboard -->
            <div class="admin-header">
                <div>
                    <h2 class="section__title">Contact Messages</h2>
                    <span class="section__subtitle">Manage messages from the contact form</span>
                </div>
                <a href="admin.php?logout=1" class="logout-btn">
                    <i class="uil uil-signout"></i> Logout
                </a>
            </div>
            
            <?php if (isset($success_message)): ?>
                <div class="alert alert-success">
                    <?php echo $success_message; ?>
                </div>
            <?php endif; ?>
            
            <?php if (isset($error_message)): ?>
                <div class="alert alert-danger">
                    <?php echo $error_message; ?>
                </div>
            <?php endif; ?>
            
            <?php if (isset($messages) && count($messages) > 0): ?>
                <table class="message-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Message</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($messages as $message): ?>
                            <tr>
                                <td><?php echo $message['id']; ?></td>
                                <td><?php echo $message['name']; ?></td>
                                <td><?php echo $message['email']; ?></td>
                                <td><?php echo $message['phone'] ? $message['phone'] : 'N/A'; ?></td>
                                <td class="message-content"><?php echo $message['message']; ?></td>
                                <td><?php echo date('d M Y H:i', strtotime($message['submission_date'])); ?></td>
                                <td>
                                    <a href="#" class="action-btn view-message" data-id="<?php echo $message['id']; ?>" data-name="<?php echo $message['name']; ?>" data-email="<?php echo $message['email']; ?>" data-phone="<?php echo $message['phone']; ?>" data-message="<?php echo htmlspecialchars($message['message'], ENT_QUOTES); ?>" data-date="<?php echo date('d M Y H:i', strtotime($message['submission_date'])); ?>">
                                        <i class="uil uil-eye"></i>
                                    </a>
                                    <a href="admin.php?delete=<?php echo $message['id']; ?>" class="action-btn" onclick="return confirm('Are you sure you want to delete this message?');">
                                        <i class="uil uil-trash-alt"></i>
                                    </a>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            <?php else: ?>
                <p>No messages found.</p>
            <?php endif; ?>
            
            <!-- Message Modal -->
            <div class="modal" id="message-modal">
                <div class="modal-content">
                    <span class="close-modal"><i class="uil uil-times"></i></span>
                    <h3 class="message-title">Message Details</h3>
                    <div class="modal-body">
                        <p><strong>From:</strong> <span id="modal-name"></span></p>
                        <p><strong>Email:</strong> <span id="modal-email"></span></p>
                        <p><strong>Phone:</strong> <span id="modal-phone"></span></p>
                        <p><strong>Date:</strong> <span id="modal-date"></span></p>
                        <p><strong>Message:</strong></p>
                        <p id="modal-message"></p>
                    </div>
                </div>
            </div>
            
            <script>
                // Message modal functionality
                const modal = document.getElementById("message-modal");
                const viewButtons = document.querySelectorAll(".view-message");
                const closeButton = document.querySelector(".close-modal");
                
                viewButtons.forEach(button => {
                    button.addEventListener("click", function(e) {
                        e.preventDefault();
                        const id = this.getAttribute("data-id");
                        const name = this.getAttribute("data-name");
                        const email = this.getAttribute("data-email");
                        const phone = this.getAttribute("data-phone") || "N/A";
                        const message = this.getAttribute("data-message");
                        const date = this.getAttribute("data-date");
                        
                        document.getElementById("modal-name").textContent = name;
                        document.getElementById("modal-email").textContent = email;
                        document.getElementById("modal-phone").textContent = phone;
                        document.getElementById("modal-message").textContent = message;
                        document.getElementById("modal-date").textContent = date;
                        
                        modal.style.display = "flex";
                    });
                });
                
                closeButton.addEventListener("click", function() {
                    modal.style.display = "none";
                });
                
                window.addEventListener("click", function(e) {
                    if (e.target === modal) {
                        modal.style.display = "none";
                    }
                });
            </script>
        <?php endif; ?>
    </div>
</body>
</html>