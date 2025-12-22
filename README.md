# 🚀 React + TypeScript Base Project

Base para proyectos web usando React 18, TypeScript y Firebase. Diseñada para iniciar rápidamente nuevos proyectos con una estructura limpia y moderna.

## ⚡️ Características

- React 18
- TypeScript
- React Router v6
- CSS Modules
- Estructura de carpetas optimizada
- Configuración de ESLint y Prettier
- Componentes base reutilizables

## 📁 Estructura del Proyecto

```
src/
├── components/     # Componentes reutilizables de la aplicación
│   ├── Main.tsx
│   └── NotFound.tsx
├── styles/        # Archivos CSS globales
│   └── App.css
├── App.tsx        # Configuración de rutas y componente principal
└── main.tsx       # Punto de entrada de la aplicación
```

## 🚀 Inicio Rápido

1. **Clona el repositorio**

```bash
git clone https://github.com/forjadecodigo/base-project.git
cd base-project
```

2. **Instala las dependencias**
```bash
npm install
```

3. **Configura las variables de entorno**
```bash
cp .env.example .env
```
Edita el archivo `.env` con tus credenciales

4. **Inicia el servidor de desarrollo**
```bash
npm run dev
```

## 📦 Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo en `http://localhost:5173`
- `npm start`: Inicia el servidor de desarrollo (ejecuta check-case automáticamente)
- `npm run build`: Construye la aplicación para producción en `/dist`
- `npm run preview`: Vista previa de la build de producción
- `npm run deploy`: Despliega la aplicación en Firebase Hosting
- `npm run setup`: Configura Firebase automáticamente
- `npm run check-case`: Verifica la consistencia de nombres de archivos y estructura del proyecto

## 🔍 Verificación de Estructura

El proyecto incluye un script de verificación que se ejecuta automáticamente antes de cada `npm start`:

- **Verifica naming conventions**: PascalCase para componentes React, camelCase/kebab-case para CSS
- **Detecta importaciones rotas**: Identifica archivos que no existen
- **Revisa case-sensitivity**: Previene problemas en diferentes sistemas operativos
- **Proporciona recomendaciones**: Guía para mantener consistencia en el código

Para ejecutar manualmente:
```bash
npm run check-case
```

## 🔧 Configuración de Firebase

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com)
2. Copia las credenciales en tu archivo `.env`
3. Instala Firebase CLI: `npm install -g firebase-tools`
4. Inicia sesión: `firebase login`
5. Inicializa Firebase: `firebase init`

## Configuración del Proyecto

1. Crea un archivo `.env` en la raíz del proyecto y añade las variables de entorno necesarias
2. Modifica el archivo `firebase.json` y actualiza el campo "site" con el ID de tu proyecto de Firebase:
   ```json
   {
     "hosting": {
       "site": "tu-proyecto-id",
       // ... resto de la configuración
     }
   }
   ```
   Este paso es crucial para que Firebase Hosting sepa a qué proyecto debe desplegar tu aplicación.

## 📄 Licencia

MIT License - ver el archivo [LICENSE](LICENSE) para más detalles

---

Desarrollado por [OzCodeX](https://github.com/ozcodex) para [Forja de Código](https://forjadecodigo.com) ⚒️
