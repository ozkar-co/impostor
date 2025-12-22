# 🎭 El Impostor - Juego Social Interactivo

Un emocionante juego social donde un jugador es elegido al azar como **"El Impostor"** y debe ocultarse entre el grupo mientras los demás intentan descubrirlo haciendo preguntas inteligentes.

## 🎮 Características

- 🎯 **Juego Social Divertido** - Perfecto para jugar con amigos y familia
- 🌐 **Modo Online** - Juega a distancia con código de partida (¡NUEVO!)
- 🎮 **Modo Local** - Juega en persona pasando el dispositivo
- 🎲 **Palabra Aleatoria** - Se selecciona una palabra diferente cada partida
- 👥 **Múltiples Jugadores** - Soporta de 3 a 12 jugadores
- 🎨 **Interfaz Moderna** - Diseño limpio y fácil de usar
- 📱 **Responsive** - Funciona en móviles, tablets y computadoras
- ⚡ **Rápido e Instantáneo** - Sin necesidad de descargar nada
- 🔄 **Palabras Personalizadas** - Opción para usar tu propia palabra o proponer nuevas

## 📋 Modos de Juego

### 🎮 Modo Local
El modo clásico donde todos los jugadores están juntos físicamente y pasan el dispositivo entre sí.

1. **Selecciona "Modo Local"**
2. **Elige el número de jugadores** (3-12)
3. **Opcionalmente, ingresa una palabra personalizada**
4. **Cada jugador toca "Ver Mi Rol"** en su turno
5. **¡Juega!** - Haz preguntas para descubrir al impostor

### 🌐 Modo Online (¡NUEVO!)
Juega con amigos a distancia a través de videollamadas o chat.

**Crear una partida:**
1. **Inicia sesión** con tu cuenta
2. **Selecciona "Crear Nueva Partida"**
3. **Configura** el filtro de palabras y número de impostores
4. **Comparte el código** de 6 caracteres con tus amigos
5. **Espera** a que todos se unan
6. **Inicia la partida** cuando estén listos

**Unirse a una partida:**
1. **Inicia sesión** con tu cuenta
2. **Selecciona "Unirse a Partida"**
3. **Ingresa el código** que te compartió el creador
4. **Espera** a que el creador inicie la partida
5. **Ve tu rol** (impostor o palabra secreta)

**Características adicionales del modo online:**
- 📋 **Mis Partidas** - Consulta tu historial de partidas
- 💭 **Proponer Palabras** - Sugiere nuevas palabras para el juego
- 🔄 **Actualización en tiempo real** - El estado de la partida se actualiza automáticamente
- 🎯 **Múltiples impostores** - Configura partidas con 1-5 impostores

## 📋 Cómo Jugar

### Objetivo
Un jugador es elegido como **"El Impostor"**. Todos excepto el impostor conocen una palabra secreta. El impostor debe descubrir qué es la palabra mientras el resto intenta identificarlo.

### Reglas
1. **La Palabra**: Se selecciona una palabra al azar (o personalizada)
2. **Ronda de Preguntas**: Cada jugador hace preguntas para obtener pistas
3. **Votación**: Al final, todos votan para decidir quién es el impostor

### Ejemplo de Juego
```
Palabra: "Pizza"
Impostor: Jugador 3

Jugador 1: "¿Es algo que comes?" → Impostor: "Sí"
Jugador 2: "¿Tiene ingredientes?" → Impostor: "Sí"
Jugador 3: "¿Es dulce?" → Impostor: "A veces..."
Jugador 4: "¡Eres el impostor!" → Votación → ¡Correcto!
```

## 🛠️ Tecnologías

- **React 18** - Biblioteca de UI
- **TypeScript** - Seguridad de tipos
- **Vite** - Herramienta de construcción rápida
- **Firebase** - Alojamiento en la nube
- **API Backend** - Sistema de partidas online (forja-api.onrender.com)
- **CSS3** - Estilos modernos

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── ImpostorGame.tsx      # Lógica principal del juego
│   ├── SetupScreen.tsx       # Pantalla de configuración
│   ├── GameScreen.tsx        # Pantalla durante el juego
│   ├── RoleModal.tsx         # Modal para revelar el rol
│   ├── InstructionsModal.tsx # Modal de instrucciones
│   ├── GameOver.tsx          # Pantalla de finalización
│   ├── Main.tsx              # Componente principal
│   └── NotFound.tsx          # Página no encontrada
├── data/
│   └── words.ts              # Lista de palabras del juego
├── App.tsx                   # Configuración de rutas
├── App.css                   # Estilos globales
├── index.css                 # Estilos base
└── main.tsx                  # Punto de entrada
```

## 🎯 Consejos para Ganar

### Como Ciudadano (No Impostor)
- Haz preguntas específicas para validar respuestas
- Presta atención a las respuestas vagas o inconsistentes
- Colabora con otros jugadores para identificar patrones

### Como Impostor
- Responde de forma vaga pero creíble
- Haz preguntas que parezcan genuinas
- Observa cómo responden otros para deducir la palabra
- Mantén la calma y actúa naturalmente

## 🔧 Configuración del Proyecto

### Requisitos
- Node.js 16+
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/ozkar-co/impostor.git
cd impostor

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Desplegar en Firebase
npm run deploy
```

## 📝 Desarrollo

### Scripts Disponibles

```bash
npm run dev          # Inicia el servidor de desarrollo
npm run build        # Construye la aplicación para producción
npm run preview      # Previsualiza la construcción
npm run lint         # Ejecuta ESLint
npm run deploy       # Construye y despliega en Firebase
```

## 🌐 Despliegue

La aplicación está desplegada en Firebase Hosting:
[https://el-impostor.web.app](https://el-impostor.web.app)

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

## 👨‍💻 Autor

Oscar Cordero - [@ozkar-co](https://github.com/ozkar-co)

---

¡Diviértete jugando y descubriendo al impostor! 🎭✨

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
