import { useState } from 'react'
import Inicio from './components/Inicio'
import NombreJugadores from './components/NombreJugadores'
import Juego from './components/Juego'
import Fin from './components/Fin'

function App({ mode = 'normal', initialPhase = 'inicio' }) {
  const [fase, setFase] = useState(initialPhase)
  const [jugadores, setJugadores] = useState([])

  const agregarJugador = (nombre) =>
    setJugadores((prev) => [...prev, nombre])

  const irA = (nuevaFase) => setFase(nuevaFase)

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-900 via-purple-900 to-indigo-900 text-white">
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
