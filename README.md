
# Proyecto React con Base de Datos

Este proyecto es una aplicación web construida con React en el frontend y utiliza una base de datos MySQL. A continuación, se detallan los pasos para clonar el repositorio, instalar las dependencias necesarias y configurar la base de datos.

## Requisitos Previos

1. **Node.js**: Asegúrate de tener Node.js instalado en tu máquina. Puedes descargarlo [aquí](https://nodejs.org/).
2. **Apache Server**: Este proyecto necesita estar ubicado en la carpeta de tu servidor Apache (`htdocs`, `html`, u otro directorio de tu preferencia).
3. **MySQL**: Necesitarás un servidor MySQL en funcionamiento para importar el archivo `dump.sql` que creará la base de datos.

## Instalación

### 1. Clonar el repositorio

#### Linux / macOS
```bash
cd /var/www/html/  # O la carpeta donde esté tu servidor Apache (htdocs, etc.)
git clone https://github.com/usuario/proyecto-react.git
cd proyecto-react
```

#### Windows
```bash
cd C:/xampp/htdocs/  # O la carpeta donde esté tu servidor Apache
git clone https://github.com/usuario/proyecto-react.git
cd proyecto-react
```

### 2. Instalar dependencias

Una vez que hayas clonado el repositorio, navega a la carpeta del proyecto e instala las dependencias de Node.js:

```bash
npm install
```

### 3. Iniciar la aplicación

Para iniciar la aplicación en modo de desarrollo, ejecuta:

```bash
npm start
```

Esto lanzará la aplicación en `http://localhost:3000`.

## Configuración de la Base de Datos

### 1. Crear la base de datos

El archivo SQL para crear la base de datos se encuentra en la siguiente ubicación dentro del proyecto: `backend/SQL/dump.sql`.

Debes importar este archivo en tu servidor MySQL para crear las tablas necesarias. La base de datos se llamará **`system_monytor`**. Puedes hacerlo usando la línea de comandos de MySQL o una herramienta como phpMyAdmin.

#### Usando la línea de comandos MySQL

1. Abre tu terminal o consola.
2. Accede a tu servidor MySQL:
    ```bash
    mysql -u tu_usuario -p
    ```
3. Crea la base de datos:
    ```sql
    CREATE DATABASE system_monytor;
    ```
4. Importa el archivo SQL:
    ```bash
    USE system_monytor;
    SOURCE /ruta/al/proyecto/backend/SQL/dump.sql;
    ```

#### Usando phpMyAdmin

1. Ve a `http://localhost/phpmyadmin`.
2. Crea una base de datos nueva llamada **`system_monytor`**.
3. Ve a la pestaña "Importar" y selecciona el archivo `dump.sql` que se encuentra en `backend/SQL/dump.sql`.
4. Haz clic en "Continuar" para importar el archivo y crear las tablas.

### 2. Configurar las credenciales de la base de datos

Es posible que necesites editar las credenciales de acceso a la base de datos en tu archivo de configuración dentro del backend del proyecto. Asegúrate de que las credenciales coincidan con tu servidor MySQL.

## Tecnologías Utilizadas

- **React**
- **Node.js**
- **MySQL**
- **Apache**

## Contacto

Si tienes algún problema o pregunta, no dudes en abrir un issue en el repositorio o contactarme en [email@example.com](mailto:email@example.com).
