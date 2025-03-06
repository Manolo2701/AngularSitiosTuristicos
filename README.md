# Desarrollador
Manuel Ramiro Barbado Sánchez

A continuación se verá la documentación sobre la estructura y comportamiento del proyecto, si desea ver las instrucciones directamente, salte al apartado "Instrucciones de uso".


# Descripción del proyecto

- Este es un proyecto hecho con Angular cuyo objetivo principal es mostrar una serie de sitios turísticos de Extremadura.
- Se permiten varias funciones, tanto como usuario visitante y como administrador del sitio.

# Estructura del proyecto
- El proyecto se compone por un JSON Server simulando un backend (dbExtr.json), cuyo contenido son los distintos sitios y usuarios de la página. En este archivo, además, se guardarán los sitios/proyectos que se añadan, así como se eliminarán o editarán los mismos si un administrador lo desea.
- El proyecto se desarrolla en Angular 19, haciendo uso de componentes standalone.
- Para la seguridad, se utilizan distintos elementos para proteger a los usuarios, así como el uso de tokens (simulados, puesto que es parte del backend) y bcrypt, para encriptar las contraseñas y mantener la seguridad.
- Existe un index.html y un styles.scss como plantilla, por otro lado, se hace uso de varios componentes para completar la página, así como la barra de navegación (navbar) o la lista de los sitios (lista-sitios), entre otros (ubicados en la carpeta components).
- Existe un componente "admin" aparte del resto, aquí se configura el comportamiento y la vista para los usuarios con el role "admin".
- Dentro de los servicios tenemos los que manejan la parte de seguridad y autenticación (bcrypt y auth) y la configuración general del proyecto.
- Se han usado componentes de Angular Material UI/UX: Grid, Cards, Forms, Icons

# Instrucciones de uso
Para hacer uso del proyecto, siga los siguientes pasos:

1. Abra una terminal dentro del proyecto y ejecute el comando "npm run start:server". Esto iniciará el JSON Server.
2. Abra una nueva terminal dentro del proyecto (no cierre la anterior) y ejecute "ng s -o". Esto iniciará el proyecto y abrirá una nueva página en su navegador por defecto.
3. Registre un usuario para hacer uso de la aplicacion.
4. Si quiere entrar como administrador, use las credenciales "admin@extremadura.com" - "admin1"
5. Si quiere crear nuevos usuarios manualmente, vaya al archivo dbExtr.json, añada usuarios al final del archivo con la misma estructura que los anteriores y para generar su contraseña vaya al archivo generate-hash.js, sustituya "admin1" por la contraseña que quiera encriptar e ingrese el siguiente comando en una terminal nueva dentro del proyecto: node generate-hash.js. Esto le dará la contraseña encriptada.

# IMPORTANTE
1. Si está en Windows y le sale el siguiente error al ejecutar el servidor: "npm : No se puede cargar el archivo C:\Program Files\nodejs\npm.ps1 porque la ejecución de scripts está deshabilitada en este sistema." debe hacer lo siguiente: Presione windows + S > Escriba powershell y ejecute como administrador > Inserte Get-ExecutionPolicy > Si sale "restricted" inserte Set-ExecutionPolicy RemoteSigned.
2. Asegúrese de que las dependencias necesarias están en el proyecto: "npm install" en la raíz del proyecto.

# Información Extra
1. Si inicia sesión como administrador, no será redirigido a ninguna página pero tendrá la opción de ir a los sitios manualmente o de administrarlos.
2. Registrarse no implica iniciar sesión directamente, esto es intencionado, no vamos a forzar a un usuario a iniciar sesión si sólo quiere registrarse.
3. Clicar el logo de la barra de navegación redirige a la página oficial del ayuntamiento de Extremadura.

# Requisitos

1. Instalar Node.js: https://nodejs.org.

2. Instalar Angular Cli: npm install -g @angular/cli

3. Instalar JSON Server: npm install -g json-server