<?php
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "monitoring";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener datos de Python
$data = shell_exec('python3 monitor.py');
$decodedData = json_decode($data, true);

$cpu = $decodedData['cpu_usage'];
$memory = $decodedData['memory_usage'];

$sql = "INSERT INTO monitoring_data (cpu_usage, memory_usage) VALUES ($cpu, $memory)";

if ($conn->query($sql) === TRUE) {
    echo "Datos insertados correctamente";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
