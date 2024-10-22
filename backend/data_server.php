<?php
// Habilitar CORS para permitir solicitudes desde el frontend
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

// Manejar solicitudes OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit; // Finaliza para las solicitudes OPTIONS
}

// Ejecutar el script de Python y capturar su salida
$pythonOutput = shell_exec('python3 monitor.py');

// Verificar si el script se ejecutó correctamente
if ($pythonOutput === null) {
    http_response_code(500); // Retorna un error de servidor si falla
    # retorna la descripcion del error en formato JSON
    echo json_encode(['error' => 'Error al ejecutar el script de Python']);
    exit;
}

// Decodificar la salida de Python, que se espera esté en formato JSON
$data = json_decode($pythonOutput, true);

// Verificar si la salida fue válida (si es un JSON válido)
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(500); // Retorna un error de servidor si hay problemas con el JSON
    echo json_encode(['error' => 'Error al decodificar los datos JSON: ' . json_last_error_msg()]);
    exit;
}

// Retornar los datos como respuesta JSON
header('Content-Type: application/json');
echo json_encode($data);
?>
