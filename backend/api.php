<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type"); 
require_once 'connection.php'; 

$conn = new Connect();

$action = $_GET['action'] ?? '';

switch ($action) {
    case 'insertCpuUsage':
        $login_user = $_POST['login_user'] ?? '';
        $cpu_usage = $_POST['cpu_usage'] ?? '';
        if ($login_user && $cpu_usage) {
            $conn->insertCpuUsage($login_user, $cpu_usage);
            echo json_encode(['status' => 'success', 'message' => 'CPU usage recorded.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Invalid input.', 'data' => [$login_user, $cpu_usage]]);
        }
        break;

    case 'insertMemoryUsage':
        $login_user = $_POST['login_user'] ?? '';
        $memory_usage = $_POST['memory_usage'] ?? '';
        if ($login_user && $memory_usage) {
            $conn->insertMemoryUsage($login_user, $memory_usage);
            echo json_encode(['status' => 'success', 'message' => 'Memory usage recorded.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Invalid input.']);
        }
        break;

    case 'insertDiskUsage':
        $login_user = $_POST['login_user'] ?? '';
        $disk_usage = $_POST['disk_usage'] ?? '';
        if ($login_user && $disk_usage) {
            $conn->insertDiskUsage($login_user, $disk_usage);
            echo json_encode(['status' => 'success', 'message' => 'Disk usage recorded.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Invalid input.']);
        }
        break;

    case 'getCpuUsageByRange':
        $start_time = $_GET['start_time'] ?? '';
        $end_time = $_GET['end_time'] ?? '';
        if ($start_time && $end_time) {
            $data = $conn->getCpuUsageByRange($start_time, $end_time);
            echo json_encode(['status' => 'success', 'data' => $data]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Invalid time range.']);
        }
        break;

    case 'getMemoryUsageByRange':
        $start_time = $_GET['start_time'] ?? '';
        $end_time = $_GET['end_time'] ?? '';
        if ($start_time && $end_time) {
            $data = $conn->getMemoryUsageByRange($start_time, $end_time);
            echo json_encode(['status' => 'success', 'data' => $data]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Invalid time range.']);
        }
        break;

    case 'getDiskUsageByRange':
        $start_time = $_GET['start_time'] ?? '';
        $end_time = $_GET['end_time'] ?? '';
        if ($start_time && $end_time) {
            $data = $conn->getDiskUsageByRange($start_time, $end_time);
            echo json_encode(['status' => 'success', 'data' => $data]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Invalid time range.']);
        }
        break;

    default:
        echo json_encode(['status' => 'error', 'message' => 'Invalid action.']);
        break;
}

?>
