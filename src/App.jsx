import { useState } from 'react'
import ResponsibilityPopup from './components/ResponsibilityPopup'
import Inicio from './components/Inicio'
import NombreJugadores from './components/NombreJugadores'
import Juego from './components/Juego'
import Fin from './components/Fin'
import EditarJugadoresPopup from './components/EditarJugadoresPopup'

function App({ mode = 'normal', initialPhase = 'inicio' }) {
  const storedPlayers = JSON.parse(sessionStorage.getItem('players') || '[]')
  const [jugadores, setJugadores] = useState(storedPlayers)
  const [fase, setFase] = useState(
    storedPlayers.length >= 2 ? initialPhase : 'nombres'
  )
  const [showEdit, setShowEdit] = useState(false)
  const [showPopup, setShowPopup] = useState(() => {
    const alreadySeen = sessionStorage.getItem('popupSeen') === 'true'
    return !alreadySeen
  })

  const actualizarJugadores = (nuevos) => {
    setJugadores(nuevos)
    sessionStorage.setItem('players', JSON.stringify(nuevos))
  }

  const irA = (nuevaFase) => {
    if (nuevaFase === 'juego' && jugadores.length < 2) {
      setFase('nombres')
    } else {
      setFase(nuevaFase)
    }
  }

  return (
    <div className="min-h-dvh w-screen overflow-hidden bg-gradient-to-br from-fuchsia-900 via-purple-900 to-indigo-900 text-white">
      {showPopup && (
        <ResponsibilityPopup
          onClose={() => {
            sessionStorage.setItem('popupSeen', 'true')
            setShowPopup(false)
          }}
        />
      )}
      {fase === 'inicio' && <Inicio onStart={() => irA('juego')} mode={mode} />}
      {fase === 'nombres' && (
        <NombreJugadores
          onContinue={(nombres) => {
            actualizarJugadores(nombres)
            irA(initialPhase)
          }}
        />
      )}
      {fase === 'juego' && (
        <Juego
          jugadores={jugadores}
          onFin={() => irA('fin')}
          mode={mode}
        />
      )}
      {fase === 'fin' && <Fin onReiniciar={() => irA('inicio')} />}

      {fase !== 'nombres' && (
        <>
          <button
            className="fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg text-xl"
            onClick={() => setShowEdit(true)}
          >
            ✏️
          </button>
          {showEdit && (
            <EditarJugadoresPopup
              players={jugadores}
              onClose={() => setShowEdit(false)}
              onSave={(nombres) => {
                actualizarJugadores(nombres)
                setShowEdit(false)
              }}
            />
          )}
        </>
      )}
    </div>
  )
}

export default App
