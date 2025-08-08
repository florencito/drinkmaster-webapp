import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Dashboard from './pages/dashboard.jsx'
import Hardcore from './pages/Hardcore.jsx'
import Supervivencia from './pages/Supervivencia.jsx'
import ComoJugar from './pages/ComoJugar.jsx'

const path = window.location.pathname
let RootComponent = App

if (path === '/admin-floren-2025') RootComponent = Dashboard
else if (path === '/hardcore') RootComponent = Hardcore
else if (path === '/supervivencia') RootComponent = Supervivencia
else if (path === '/como-jugar') RootComponent = ComoJugar

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootComponent />
  </StrictMode>,
)
