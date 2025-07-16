import { useState } from 'react'
import Inicio from './components/Inicio'
import NombreJugadores from './components/NombreJugadores'
import Juego from './components/Juego'
import Fin from './components/Fin'

function App() {
  const [fase, setFase] = useState('inicio')
  const [jugadores, setJugadores] = useState([])

  const irA = (nuevaFase) => setFase(nuevaFase)

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      {fase === 'inicio' && <Inicio onStart={() => irA('nombres')} />}
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
        />
      )}
      {fase === 'fin' && <Fin onReiniciar={() => irA('inicio')} />}
    </div>
  )
}

export default App
