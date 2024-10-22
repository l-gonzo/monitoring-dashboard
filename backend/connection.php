<?php
class Conexion {
    private $host = 'localhost';   // Servidor de la base de datos
    private $db = 'system_monytor';  // Nombre de la base de datos
    private $user = 'gonzo';  // Usuario de la base de datos
    private $pass = 'gonzo1010!';  // Contraseña de la base de datos
    private $charset = 'utf8mb4';  // Charset de la conexión
    private $pdo;
    private $error;

    public function __construct() {
        $dsn = "mysql:host={$this->host};dbname={$this->db};charset={$this->charset}";
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,  // Manejo de errores con excepciones
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,  // Devuelve los resultados como arrays asociativos
            PDO::ATTR_PERSISTENT => true,  // Mantiene la conexión persistente
        ];

        try {
            $this->pdo = new PDO($dsn, $this->user, $this->pass, $options);
        } catch (PDOException $e) {
            $this->error = $e->getMessage();
            echo "Error de conexión: " . $this->error;
        }
    }

    // Método para obtener la instancia PDO (la conexión)
    public function getConexion() {
        return $this->pdo;
    }

    // Método para ejecutar una consulta SQL simple
    public function ejecutarConsulta($sql, $params = []) {
        try {
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute($params);
            return $stmt;
        } catch (PDOException $e) {
            echo "Error en la consulta: " . $e->getMessage();
        }
    }

    // Método para cerrar la conexión
    public function cerrarConexion() {
        $this->pdo = null;
    }
}
?>
