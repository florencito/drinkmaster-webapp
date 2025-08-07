# DrinkMaster

Juego de preguntas y retos para beber diseñado para dinamizar reuniones y fiestas.

## Descripción General
- **Qué hace:** Propone preguntas y desafíos interactivos a los participantes, mostrando animaciones y llevando un control del puntaje.
- **A quién está dirigido:** Grupos de amigos mayores de edad que buscan una alternativa digital para juegos de bebidas.
- **Modos de juego:**
  - **Clásico:** Rondas de preguntas con opciones.
  - **Hardcore:** Retos rápidos y castigados.
  - **Supervivencia:** Cada jugador cuenta con vidas limitadas para responder correctamente.
- **Tecnologías utilizadas:** React, Vite, Tailwind CSS, Node.js, Supabase, Vercel, PostgreSQL.

## Características Principales
- Preguntas con opciones múltiples.
- Sistema de vidas y ranking final.
- Comodines de ayuda para cada jugador.
- Animaciones y transiciones para una experiencia más entretenida.

## Instalación
### Requisitos
- Node.js 18+
- npm
- Git

### Clonar el proyecto
```bash
git clone https://github.com/tu-usuario/drinkmaster-webapp.git
cd drinkmaster-webapp
```

### Instalar dependencias
```bash
npm install
```

### Ejecutar en modo desarrollo
```bash
npm run dev
```
Visita `http://localhost:5173` desde tu navegador.

### Variables de entorno
Crea un archivo `.env` en la raíz del proyecto:
```env
VITE_SUPABASE_URL=tu-url-de-supabase
VITE_SUPABASE_ANON_KEY=tu-anon-key
```

## Estructura del Proyecto
```
public/
src/
├─ components/
├─ assets/
├─ App.jsx
├─ index.css
└─ main.jsx
tailwind.config.js
vite.config.js
```

## Modo de Uso
1. Inicia el servidor local y abre el enlace en el navegador.
2. El anfitrión (host) mantiene la aplicación abierta, comparte la pantalla y dirige el ritmo del juego.
3. Los modos disponibles son:
   - **Clásico:** Preguntas de cultura general y retos sencillos.
   - **Hardcore:** Retos extremos con penalizaciones fuertes.
   - **Supervivencia:** Responde correctamente para no perder tus vidas.

## Base de Datos
- Servicio: **Supabase** (PostgreSQL)
- Tabla: `survival_questions`
- Columnas principales:
  - `id` (uuid)
  - `question` (text)
  - `options` (jsonb)
  - `correct_option` (text)
  - `created_at` (timestamp)

## Autores
- **Florencio Reyes** – Desarrollo full-stack y mantenimiento general del proyecto.

## Licencia
Este proyecto está bajo la licencia MIT.
