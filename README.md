**DrinkMaster** es una aplicación web de retos para juegos de beber con cartas dinámicas, construida con React y Supabase. Está pensada para ser divertida, personalizable y fácil de escalar con un mini CMS para gestionar las cartas.

---

## 📋 Prerrequisitos

Antes de empezar, asegúrate de tener instalado:

- Node.js (v18+ recomendado)
- Git
- Una cuenta en [Supabase](https://supabase.com)
- Una cuenta en [Vercel](https://vercel.com)

---

## ⚙️ Configuración

### 1. Clona el repositorio

```bash
git clone https://github.com/tu-usuario/drinkmaster.git
cd drinkmaster
```

### 2. Instala dependencias

```bash
npm install
```

### 3. Configura las variables de entorno

Crea un archivo `.env` en la raíz del proyecto con esta estructura:

```
VITE_SUPABASE_URL=tu-url-de-supabase
VITE_SUPABASE_ANON_KEY=tu-anon-key
```

> 🔐 Estos valores se obtienen en la sección **Project Settings > API** dentro de tu proyecto en Supabase.

---

### 4. Estructura esperada en Supabase

Crea una tabla llamada `cards` con los siguientes campos:

| Campo     | Tipo     |
|-----------|----------|
| id        | UUID     |
| texto     | text     |
| activo    | boolean  |

> Asegúrate de activar las políticas RLS y crear estas dos políticas:

#### Para leer:

```sql
CREATE POLICY "Allow all" ON public.cards
FOR SELECT
USING (true);
```

#### Para insertar:

```sql
CREATE POLICY "Allow insert for all" ON public.cards
FOR INSERT
WITH CHECK (true);
```

---

### 5. Corre el proyecto localmente

```bash
npm run dev
```

Visita [http://localhost:5173](http://localhost:5173) en tu navegador.

---

## 🚀 Despliegue en Vercel

1. Sube tu proyecto a GitHub.
2. Entra a [vercel.com](https://vercel.com) y haz clic en "Add New Project".
3. Importa el repositorio desde GitHub.
4. Agrega las variables de entorno `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` en la configuración de Vercel.
5. Dale Deploy.

> 🎉 ¡Cada vez que se haga push a `main`, se redeploya automáticamente gracias a Vercel (CI/CD mínimo implementado)!

---

## 🛠️ Troubleshooting básico

| Problema | Posible causa | Solución |
|---------|----------------|-----------|
| No carga ninguna carta | Falta de permisos en Supabase | Verifica que hayas creado las políticas de RLS correctamente |
| No se despliega bien en Vercel | Ruta inexistente (ej: `/admin`) | Asegúrate de tener un router (React Router o similar) que maneje esa ruta |
| No se puede insertar desde el dashboard | Falta de permiso `INSERT` | Agrega la política `WITH CHECK (true)` correctamente en Supabase |

---

## 📂 Estructura básica del proyecto

```
src/
├── components/
│   ├── Inicio.jsx
│   ├── Juego.jsx
│   ├── Fin.jsx
│   └── NombreJugadores.jsx
├── dashboard.jsx       ← panel admin accesible en /admin-floren-2025
├── supabaseClient.js   ← conexión con Supabase
├── App.jsx
└── main.jsx
```

---

## ✨ Autor

Este proyecto fue inicialmente planteado para desarrollarse en equipo, pero debido a circunstancias externas, fue completado de forma individual por:

- **Florencio Reyes** – Infraestructura, CI/CD, Supabase, desarrollo frontend, lógica del juego y panel de administración.

---

## 📌 Licencia

Proyecto académico con fines demostrativos. ¡Disfrútalo con responsabilidad!

---