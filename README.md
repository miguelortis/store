# Store Project

Este es un proyecto de una tienda en línea desarrollado con Vue 3, TypeScript, Pinia, Vuetify y Vite.

## Requisitos previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- [Node.js](https://nodejs.org/) (versión 16 o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

## Instalación

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/miguelortis/store.git

   ```

2. Navega al directorio del proyecto:
   cd store

3. Instala las dependencias del proyecto:
   Con npm:
   npm install
   O con yarn:
   yarn install

Ejecución del proyecto

1. Para iniciar el servidor de desarrollo, ejecuta:

Con npm:
npm run dev

O con yarn:
yarn dev

2. Abre tu navegador y navega a la URL proporcionada (por defecto: http://localhost:3000/).

Configuración adicional

Variables de entorno
Crea un archivo .env en la raíz del proyecto y define las siguientes variables según sea necesario:

    VITE_API_BASE_URL=

Estructura del proyecto

src/
├── components/ # Componentes reutilizables
├── layouts/ # Layouts principales
├── pages/ # Vistas de las rutas
├── router/ # Configuración de rutas
├── stores/ # Almacenamiento global (Pinia)
├── styles/ # Archivos de estilos globales
├── utils/ # Funciones y utilidades

Tecnologías utilizadas
-Vue 3: Framework de JavaScript para la construcción de -interfaces de usuario.
-TypeScript: Superset de JavaScript que añade tipado estático.
-Pinia: Librería para el manejo del estado global.
-Vuetify: Framework de componentes UI basado en Material Design.
-Vite: Herramienta de construcción rápida para proyectos frontend.
