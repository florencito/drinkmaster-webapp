import { useState } from 'react'
import ResponsibilityPopup from './components/ResponsibilityPopup'
import Inicio from './components/Inicio'
import NombreJugadores from './components/NombreJugadores'
import Juego from './components/Juego'
import Fin from './components/Fin'

function App({ mode = 'normal', initialPhase = 'inicio' }) {
  const [fase, setFase] = useState(initialPhase)
  const [jugadores, setJugadores] = useState([])
  const [showPopup, setShowPopup] = useState(() => {
    const alreadySeen = sessionStorage.getItem('popupSeen') === 'true'
    return !alreadySeen
  })

  const agregarJugador = (nombre) =>
    setJugadores((prev) => [...prev, nombre])

  const irA = (nuevaFase) => setFase(nuevaFase)

  return (
    <div className="min-h-dvh w-screen overflow-hidden bg-gradient-to-br from-fuchsia-900 via-purple-900 to-indigo-900 text-white">
      {showPopup && fase === 'inicio' && (
        <ResponsibilityPopup
          onClose={() => {
            sessionStorage.setItem('popupSeen', 'true')
            setShowPopup(false)
          }}
        />
      )}
      {fase === 'inicio' && <Inicio onStart={() => irA('nombres')} mode={mode} />}
      {fase === 'nombres' && (
        <NombreJugadores
          onContinue={(nombres) => {
            setJugadores(nombres)
            irA('juego')
          }}
        />
      )}
      {fase === 'juego' && (
        <Juego
          jugadores={jugadores}
          onFin={() => irA('fin')}
          onAddPlayer={agregarJugador}
          mode={mode}
        />
      )}
      {fase === 'fin' && <Fin onReiniciar={() => irA('inicio')} />}
    </div>
  )
}

export default App
