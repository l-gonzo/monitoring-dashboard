<?php
// Asegúrate de que no haya nada antes de esta línea
header('Content-Type: application/json');

// Tu lógica de conexión aquí...


class Connect {
    private $host = 'localhost'; 
    private $db = 'system_monytor';
    private $user = 'gonzo'; 
    private $pass = 'gonzo1010!'; 
    private $pdo;

    public function __construct() {
        $this->connect();
    }

    private function connect() {
        try {
            $this->pdo = new PDO("mysql:host={$this->host};dbname={$this->db}", $this->user, $this->pass);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die("Connection failed: " . $e->getMessage());
        }
    }

    public function insertCpuUsage($login_user, $cpu_usage) {
        $stmt = $this->pdo->prepare("INSERT INTO cpu_history (login_user, cpu_usage) VALUES (:login_user, :cpu_usage)");
        $stmt->execute(['login_user' => $login_user, 'cpu_usage' => $cpu_usage]);
    }

    public function insertMemoryUsage($login_user, $memory_usage) {
        $stmt = $this->pdo->prepare("INSERT INTO memory_history (login_user, memory_usage) VALUES (:login_user, :memory_usage)");
        $stmt->execute(['login_user' => $login_user, 'memory_usage' => $memory_usage]);
    }

    public function insertDiskUsage($login_user, $disk_usage) {
        $stmt = $this->pdo->prepare("INSERT INTO disk_history (login_user, disk_usage) VALUES (:login_user, :disk_usage)");
        $stmt->execute(['login_user' => $login_user, 'disk_usage' => $disk_usage]);
    }

    public function getCpuUsageByRange($start_time, $end_time) {
        $stmt = $this->pdo->prepare("SELECT * FROM cpu_history WHERE timestamp BETWEEN :start_time AND :end_time");
        $stmt->execute(['start_time' => $start_time, 'end_time' => $end_time]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getMemoryUsageByRange($start_time, $end_time) {
        $stmt = $this->pdo->prepare("SELECT * FROM memory_history WHERE timestamp BETWEEN :start_time AND :end_time");
        $stmt->execute(['start_time' => $start_time, 'end_time' => $end_time]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getDiskUsageByRange($start_time, $end_time) {
        $stmt = $this->pdo->prepare("SELECT * FROM disk_history WHERE timestamp BETWEEN :start_time AND :end_time");
        $stmt->execute(['start_time' => $start_time, 'end_time' => $end_time]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}

?>
