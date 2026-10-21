# Sitios turísticos de Extremadura

Aplicación frontend desarrollada con Angular para explorar sitios turísticos de Extremadura y practicar componentes, formularios, navegación y gestión de roles.

> **Proyecto académico:** el backend se simula mediante JSON Server y un archivo JSON local. Las cuentas y los datos son demostrativos; no es un sistema de autenticación ni un backend de producción.

## Funcionalidades

- Listado de lugares turísticos de Extremadura.
- Visualización y gestión de sitios desde la interfaz.
- Vistas y opciones distintas para visitantes y administrador.
- Registro e inicio de sesión de demostración.
- Formularios y componentes de Angular Material.

## Tecnologías

- Angular 19 y TypeScript
- Angular Material
- JSON Server para simular la API
- bcryptjs para practicar el almacenamiento de hashes de contraseñas

## Requisitos

- Node.js y npm
- Angular CLI compatible con Angular 19 (opcional si se usa `npx ng`)

## Instalación y ejecución

1. Clona el repositorio e instala las dependencias:

   ```bash
   git clone https://github.com/Manolo2701/AngularSitiosTuristicos.git
   cd AngularSitiosTuristicos
   npm install
   ```

2. Inicia el backend simulado en una terminal:

   ```bash
   npm run start:server
   ```

3. En otra terminal, inicia Angular:

   ```bash
   npm start
   ```

4. Abre la URL local que indique Angular, normalmente `http://localhost:4200`.

## Datos y cuenta de demostración

`dbExtr.json` funciona como base de datos local de JSON Server y contiene datos de ejemplo, incluida una cuenta administrativa de demostración. No uses esas credenciales fuera del proyecto ni despliegues este JSON Server como backend real. Para una instalación propia, cambia o elimina las cuentas de ejemplo.

Para generar un hash manualmente, pasa la contraseña como argumento en tu terminal:

```bash
node generate-hash.js "una-contraseña-local"
```

No guardes contraseñas reales ni secretos en el repositorio. El hash no convierte JSON Server en un sistema seguro de autenticación; esta parte existe con fines didácticos.

## Objetivo de aprendizaje

Proyecto realizado para practicar Angular standalone components, Angular Material, formularios, servicios, navegación y consumo de una API simulada.

## Autor

**Manuel Barbado**  
[GitHub](https://github.com/Manolo2701) · [LinkedIn](https://www.linkedin.com/in/manuel-ramiro-barbado-s%C3%A1nchez-7404b5345/)
