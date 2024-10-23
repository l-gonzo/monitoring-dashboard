CREATE database system_monytor;

use system_monytor;

CREATE TABLE cpu_history (
    id_log INT NOT NULL AUTO_INCREMENT,
    login_user VARCHAR(50),
    cpu_usage DECIMAL(5, 2),  -- Uso de CPU como porcentaje
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,  -- Fecha y hora del registro
    PRIMARY KEY (id_log)
);

CREATE TABLE memory_history (
    id_log INT NOT NULL AUTO_INCREMENT,
    login_user VARCHAR(50),
    memory_usage DECIMAL(5, 2),  -- Uso de memoria como porcentaje
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,  -- Fecha y hora del registro
    PRIMARY KEY (id_log)
);

CREATE TABLE disk_history (
    id_log INT NOT NULL AUTO_INCREMENT,
    login_user VARCHAR(50),
    disk_usage DECIMAL(5, 2),  -- Uso de disco como porcentaje
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,  -- Fecha y hora del registro
    PRIMARY KEY (id_log)
);
