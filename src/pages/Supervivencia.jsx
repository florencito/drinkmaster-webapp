import { useState } from 'react'
import SurvivalConfig from '../components/SurvivalConfig'
import NombreJugadores from '../components/NombreJugadores'
import SurvivalGame from '../components/SurvivalGame'
import Fin from '../components/Fin'

const Supervivencia = () => {
  const [phase, setPhase] = useState('config')
  const [settings, setSettings] = useState(null)
  const [players, setPlayers] = useState([])

  return (
    <div className="min-h-dvh bg-gradient-to-br from-fuchsia-900 via-purple-900 to-indigo-900 text-white">
      {phase === 'config' && (
        <SurvivalConfig
          onStart={(cfg) => {
            setSettings(cfg)
            setPhase('nombres')
          }}
        />
      )}
      {phase === 'nombres' && (
        <NombreJugadores
          onContinue={(nombres) => {
            setPlayers(nombres)
            setPhase('juego')
          }}
        />
      )}
      {phase === 'juego' && (
        <SurvivalGame
          players={players}
          settings={settings}
          onFinish={() => setPhase('fin')}
        />
      )}
      {phase === 'fin' && <Fin />}
    </div>
  )
}

export default Supervivencia
