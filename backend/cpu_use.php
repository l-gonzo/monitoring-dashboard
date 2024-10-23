<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

require_once 'connection.php';

class CpuHistoryCrud {
    private $conexion;

    public function __construct() {
        $this->conexion = (new Conexion())->getConexion();
    }

    // Crear un nuevo registro
    public function create($login_user, $cpu_usage) {
        $sql = "INSERT INTO cpu_history (login_user, cpu_usage) VALUES (:login_user, :cpu_usage)";
        $stmt = $this->conexion->prepare($sql);
        return $stmt->execute(['login_user' => $login_user, 'cpu_usage' => $cpu_usage]);
    }

    // Leer todos los registros
    public function readAll() {
        $sql = "SELECT * FROM cpu_history";
        $stmt = $this->conexion->query($sql);
        return $stmt->fetchAll();
    }

    // Leer un registro por ID
    public function readById($id_log) {
        $sql = "SELECT * FROM cpu_history WHERE id_log = :id_log";
        $stmt = $this->conexion->prepare($sql);
        $stmt->execute(['id_log' => $id_log]);
        return $stmt->fetch();
    }

    // Actualizar un registro
    public function update($id_log, $login_user, $cpu_usage) {
        $sql = "UPDATE cpu_history SET login_user = :login_user, cpu_usage = :cpu_usage WHERE id_log = :id_log";
        $stmt = $this->conexion->prepare($sql);
        return $stmt->execute([
            'id_log' => $id_log,
            'login_user' => $login_user,
            'cpu_usage' => $cpu_usage
        ]);
    }

    // Eliminar un registro
    public function delete($id_log) {
        $sql = "DELETE FROM cpu_history WHERE id_log = :id_log";
        $stmt = $this->conexion->prepare($sql);
        return $stmt->execute(['id_log' => $id_log]);
    }
}
?>
