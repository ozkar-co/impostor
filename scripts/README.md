# Scripts de Configuración

Este directorio contiene scripts útiles para configurar y gestionar el proyecto.

## Scripts Disponibles

### setup.js
Script interactivo para configurar Firebase automáticamente.

**Uso:**
```bash
npm run setup
```

**Qué hace:**
- Verifica que estés autenticado en Firebase
- Solicita el nombre del proyecto (para mostrar en la UI)
- Solicita el ID del proyecto Firebase (debe existir previamente)
- Verifica que el proyecto existe en tu cuenta de Firebase
- Actualiza `firebase.json` con la configuración completa
- Actualiza `.firebaserc` con el proyecto por defecto
- Actualiza `index.html` con el título del proyecto
- Actualiza `src/components/Main.tsx` con el nombre del proyecto
- Proporciona instrucciones para los próximos pasos

**Configuración incluida:**
- Hosting configurado para servir desde `dist/`
- Rewrites para SPA (Single Page Application)
- Headers de cache para archivos estáticos
- Ignore patterns para archivos innecesarios

### check-case.js
Script para verificar la consistencia de nombres de archivos y estructura del proyecto.

**Uso:**
```bash
npm run check-case
```

**Qué hace:**
- Verifica que los componentes React usen PascalCase
- Verifica que los archivos CSS usen camelCase o kebab-case
- Detecta importaciones que apuntan a archivos inexistentes
- Identifica problemas de case-sensitivity en nombres de archivos
- Proporciona recomendaciones para mantener consistencia

**Problemas que detecta:**
- Componentes React sin PascalCase
- Archivos CSS con nombres inconsistentes
- Importaciones rotas o inexistentes
- Nombres de directorios mixtos (mayúsculas y minúsculas)

**Recomendaciones incluidas:**
- Usar PascalCase para componentes React (.tsx)
- Usar camelCase o kebab-case para archivos CSS
- Verificar que todas las importaciones apunten a archivos existentes
- Configurar Git para ser case-sensitive en Linux

### upload-words.cjs
Script interactivo para subir todas las palabras del archivo `src/data/words.ts` a la base de datos.

**Uso:**
```bash
npm run upload-words
```

**Qué hace:**
- Solicita autenticación (usuario y contraseña)
- Lee el archivo `src/data/words.ts` y extrae todas las palabras
- Agrupa las palabras en lotes de 50 (para no sobrecargar el servidor)
- Sube las palabras a la API con categoría "pop-culture"
- Detecta palabras duplicadas
- Proporciona un resumen detallado con estadísticas

**Características:**
- Autenticación automática en la API
- Subida en lotes para mejor rendimiento
- Reporte detallado de palabras subidas, duplicadas y errores
- Pausas entre solicitudes para no sobrecargar el servidor
- Mensajes de progreso en tiempo real
- Colores en la consola para mejor legibilidad

**Ejemplo de salida:**
```
📚 Script para subir palabras a la Base de Datos

Ingresa tu usuario: oscar
Ingresa tu contraseña: ****

🔐 Autenticando...
✅ Autenticación exitosa

📖 Se encontraron 300 palabras para subir

📦 Se crearán 6 solicitud(es) de carga

📤 Cargando lote 1/6 (50 palabras)...
✅ Lote 1: 48 palabra(s) subida(s)
⏭️  Lote 1: 2 palabra(s) ya existía(n)

[... más lotes ...]

==================================================
📊 RESUMEN DE CARGA
==================================================
✅ Palabras subidas: 285
⏭️  Palabras duplicadas: 15
📚 Total procesado: 300 de 300
==================================================

🎉 ¡Éxito! Se subieron 285 nueva(s) palabra(s) a la base de datos
```

## Comandos NPM Disponibles

### `npm start`
Inicia el servidor de desarrollo usando Vite. **Ejecuta automáticamente check-case antes de iniciar.**
```bash
npm start
```

### `npm run setup`
Ejecuta el script de configuración de Firebase.
```bash
npm run setup
```

### `npm run check-case`
Ejecuta la verificación de consistencia de nombres de archivos.
```bash
npm run check-case
```

### `npm run upload-words`
Sube todas las palabras de `src/data/words.ts` a la base de datos.
```bash
npm run upload-words
```

### `npm run dev`
Alternativa a `npm start` - inicia el servidor de desarrollo.
```bash
npm run dev
```

### `npm run build`
Compila el proyecto para producción.
```bash
npm run build
```

### `npm run deploy`
Compila y despliega a Firebase Hosting.
```bash
npm run deploy
```

## Flujo de Trabajo Recomendado

1. **Autenticación (si no lo has hecho):**
   ```bash
   firebase login
   ```

2. **Configuración inicial:**
   ```bash
   npm run setup
   ```

3. **Desarrollo:**
   ```bash
   npm start
   ```

4. **Despliegue:**
   ```bash
   npm run deploy
   ```

## Notas Importantes

- **El proyecto debe existir previamente en Firebase Console**
- El script verifica la autenticación y existencia del proyecto
- El ID del sitio será el mismo que el ID del proyecto Firebase
- El nombre del proyecto se usa para personalizar la UI (título y contenido)
- La configuración incluye soporte completo para SPA con React Router
- Los archivos estáticos (JS/CSS) se cachean para mejor rendimiento
- Todos los archivos de configuración se actualizan automáticamente
- **El check-case se ejecuta automáticamente antes de cada `npm start`**