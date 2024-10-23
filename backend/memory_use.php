<?php

// Habilitar el modo de depuración de PHP (para entornos de desarrollo)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Encabezados para permitir CORS
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

require_once 'connection.php';

class MemoryHistoryCrud {
    private $conexion;

    public function __construct() {
        try {
            $this->conexion = (new Conexion())->getConexion();
        } catch (PDOException $e) {
            // Captura cualquier error en la conexión a la base de datos
            echo 'Connection failed: ' . $e->getMessage();
            exit(); // Termina el script si falla la conexión
        }
    }

    // Crear un nuevo registro
    public function create($login_user, $memory_usage) {
        // Validación básica de los parámetros de entrada
        if (empty($login_user) || !is_numeric($memory_usage)) {
            echo "Invalid input: 'login_user' must be provided and 'memory_usage' must be a number.";
            return false;
        }

        $sql = "INSERT INTO memory_history (login_user, memory_usage) VALUES (:login_user, :memory_usage)";
        $stmt = $this->conexion->prepare($sql);
        if ($stmt->execute(['login_user' => $login_user, 'memory_usage' => $memory_usage])) {
            return true;
        } else {
            // Mostrar errores si ocurre alguno
            $errorInfo = $stmt->errorInfo();
            echo "SQL Error: " . $errorInfo[2];
            return false;
        }
    }

    // Leer todos los registros
    public function readAll() {
        $sql = "SELECT * FROM memory_history";
        $stmt = $this->conexion->query($sql);
        if ($stmt) {
            return $stmt->fetchAll();
        } else {
            // Manejar el error si ocurre
            $errorInfo = $stmt->errorInfo();
            echo "SQL Error: " . $errorInfo[2];
            return [];
        }
    }

    // Leer un registro por ID
    public function readById($id_log) {
        if (!is_numeric($id_log)) {
            echo "Invalid input: 'id_log' must be a number.";
            return false;
        }

        $sql = "SELECT * FROM memory_history WHERE id_log = :id_log";
        $stmt = $this->conexion->prepare($sql);
        $stmt->execute(['id_log' => $id_log]);
        return $stmt->fetch();
    }

    // Actualizar un registro
    public function update($id_log, $login_user, $memory_usage) {
        if (empty($login_user) || !is_numeric($memory_usage) || !is_numeric($id_log)) {
            echo "Invalid input: 'id_log' must be a number, 'login_user' must be provided, and 'memory_usage' must be a number.";
            return false;
        }

        $sql = "UPDATE memory_history SET login_user = :login_user, memory_usage = :memory_usage WHERE id_log = :id_log";
        $stmt = $this->conexion->prepare($sql);
        if ($stmt->execute([
            'id_log' => $id_log,
            'login_user' => $login_user,
            'memory_usage' => $memory_usage
        ])) {
            return true;
        } else {
            // Mostrar errores si ocurre alguno
            $errorInfo = $stmt->errorInfo();
            echo "SQL Error: " . $errorInfo[2];
            return false;
        }
    }

    // Eliminar un registro
    public function delete($id_log) {
        if (!is_numeric($id_log)) {
            echo "Invalid input: 'id_log' must be a number.";
            return false;
        }

        $sql = "DELETE FROM memory_history WHERE id_log = :id_log";
        $stmt = $this->conexion->prepare($sql);
        if ($stmt->execute(['id_log' => $id_log])) {
            return true;
        } else {
            // Mostrar errores si ocurre alguno
            $errorInfo = $stmt->errorInfo();
            echo "SQL Error: " . $errorInfo[2];
            return false;
        }
    }
}
?>
