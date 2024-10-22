<?php
require_once 'connection.php';

class DiskHistoryCrud {
    private $conexion;

    public function __construct() {
        $this->conexion = (new Conexion())->getConexion();
    }

    // Crear un nuevo registro
    public function create($login_user, $disk_usage) {
        $sql = "INSERT INTO disk_history (login_user, disk_usage) VALUES (:login_user, :disk_usage)";
        $stmt = $this->conexion->prepare($sql);
        return $stmt->execute(['login_user' => $login_user, 'disk_usage' => $disk_usage]);
    }

    // Leer todos los registros
    public function readAll() {
        $sql = "SELECT * FROM disk_history";
        $stmt = $this->conexion->query($sql);
        return $stmt->fetchAll();
    }

    // Leer un registro por ID
    public function readById($id_log) {
        $sql = "SELECT * FROM disk_history WHERE id_log = :id_log";
        $stmt = $this->conexion->prepare($sql);
        $stmt->execute(['id_log' => $id_log]);
        return $stmt->fetch();
    }

    // Actualizar un registro
    public function update($id_log, $login_user, $disk_usage) {
        $sql = "UPDATE disk_history SET login_user = :login_user, disk_usage = :disk_usage WHERE id_log = :id_log";
        $stmt = $this->conexion->prepare($sql);
        return $stmt->execute([
            'id_log' => $id_log,
            'login_user' => $login_user,
            'disk_usage' => $disk_usage
        ]);
    }

    // Eliminar un registro
    public function delete($id_log) {
        $sql = "DELETE FROM disk_history WHERE id_log = :id_log";
        $stmt = $this->conexion->prepare($sql);
        return $stmt->execute(['id_log' => $id_log]);
    }
}
?>
