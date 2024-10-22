<?php
// Ejecutar el script de Python y capturar su salida
$pythonOutput = shell_exec('python3 monitor.py');

// Verificar si se ejecutó correctamente
if ($pythonOutput === null) {
    http_response_code(500); // Retorna un error de servidor si falla
    echo json_encode(['error' => 'Error al ejecutar el script de Python']);
    exit;
}

// Decodificar la salida de Python, que se espera esté en formato JSON
$data = json_decode($pythonOutput, true);

// Verificar si la salida fue válida
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(500); // Retorna un error de servidor si hay problemas con el JSON
    echo json_encode(['error' => 'Error al decodificar los datos JSON']);
    exit;
}

// Retornar los datos como respuesta JSON
header('Content-Type: application/json');
echo json_encode($data);
?>
