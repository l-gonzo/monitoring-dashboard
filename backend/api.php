<?php
require_once 'cpu_use.php';
require_once 'memory_use.php';
require_once 'disk_use.php';

// Crear instancias de los CRUDs
$cpuCrud = new CpuHistoryCrud();
$memoryCrud = new MemoryHistoryCrud();
$diskCrud = new DiskHistoryCrud();

// Obtener el método HTTP (GET o POST)
$method = $_SERVER['REQUEST_METHOD'];

// Procesar la solicitud
switch ($method) {
    case 'GET':
        if (isset($_GET['action'])) {
            $action = $_GET['action'];

            switch ($action) {
                case 'read_cpu':
                    $id_log = isset($_GET['id_log']) ? $_GET['id_log'] : null;
                    if ($id_log) {
                        $result = $cpuCrud->readById($id_log);
                        echo json_encode($result);
                    } else {
                        $result = $cpuCrud->readAll();
                        echo json_encode($result);
                    }
                    break;

                    # en javascript se puede hacer una peticion GET con la url: api.php?action=read_memory

                case 'read_memory':
                    $id_log = isset($_GET['id_log']) ? $_GET['id_log'] : null;
                    if ($id_log) {
                        $result = $memoryCrud->readById($id_log);
                        echo json_encode($result);
                    } else {
                        $result = $memoryCrud->readAll();
                        echo json_encode($result);
                    }
                    break;

                case 'read_disk':
                    $id_log = isset($_GET['id_log']) ? $_GET['id_log'] : null;
                    if ($id_log) {
                        $result = $diskCrud->readById($id_log);
                        echo json_encode($result);
                    } else {
                        $result = $diskCrud->readAll();
                        echo json_encode($result);
                    }
                    break;

                default:
                    echo json_encode(['error' => 'Invalid GET action']);
            }
        }
        break;

    case 'POST':
        if (isset($_POST['action'])) {
            $action = $_POST['action'];

            switch ($action) {
                case 'create_cpu':
                    $login_user = $_POST['login_user'];
                    $cpu_usage = $_POST['cpu_usage'];
                    $result = $cpuCrud->create($login_user, $cpu_usage);
                    echo json_encode(['success' => $result]);
                    break;

                case 'create_memory':
                    $login_user = $_POST['login_user'];
                    $memory_usage = $_POST['memory_usage'];
                    $result = $memoryCrud->create($login_user, $memory_usage);
                    echo json_encode(['success' => $result]);
                    break;

                case 'create_disk':
                    $login_user = $_POST['login_user'];
                    $disk_usage = $_POST['disk_usage'];
                    $result = $diskCrud->create($login_user, $disk_usage);
                    echo json_encode(['success' => $result]);
                    break;

                case 'update_cpu':
                    $id_log = $_POST['id_log'];
                    $login_user = $_POST['login_user'];
                    $cpu_usage = $_POST['cpu_usage'];
                    $result = $cpuCrud->update($id_log, $login_user, $cpu_usage);
                    echo json_encode(['success' => $result]);
                    break;

                case 'update_memory':
                    $id_log = $_POST['id_log'];
                    $login_user = $_POST['login_user'];
                    $memory_usage = $_POST['memory_usage'];
                    $result = $memoryCrud->update($id_log, $login_user, $memory_usage);
                    echo json_encode(['success' => $result]);
                    break;

                case 'update_disk':
                    $id_log = $_POST['id_log'];
                    $login_user = $_POST['login_user'];
                    $disk_usage = $_POST['disk_usage'];
                    $result = $diskCrud->update($id_log, $login_user, $disk_usage);
                    echo json_encode(['success' => $result]);
                    break;

                case 'delete_cpu':
                    $id_log = $_POST['id_log'];
                    $result = $cpuCrud->delete($id_log);
                    echo json_encode(['success' => $result]);
                    break;

                case 'delete_memory':
                    $id_log = $_POST['id_log'];
                    $result = $memoryCrud->delete($id_log);
                    echo json_encode(['success' => $result]);
                    break;

                case 'delete_disk':
                    $id_log = $_POST['id_log'];
                    $result = $diskCrud->delete($id_log);
                    echo json_encode(['success' => $result]);
                    break;

                default:
                    echo json_encode(['error' => 'Invalid POST action']);
            }
        }
        break;

    default:
        echo json_encode(['error' => 'Invalid HTTP method']);
}
?>
