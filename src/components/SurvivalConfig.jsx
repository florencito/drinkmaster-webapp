import { useState } from 'react'

const SurvivalConfig = ({ onStart }) => {
  const [lives, setLives] = useState(3)
  const [jokers, setJokers] = useState(3)
  const [difficulty, setDifficulty] = useState('no tan fácil')

  const handleStart = () => {
    onStart({
      lives: Number(lives),
      jokers: Number(jokers),
      difficulty,
    })
  }

  return (
    <div className="p-6 text-center max-w-lg mx-auto flex flex-col items-center justify-center min-h-dvh animate-fade-zoom">
      {/* Header */}
      <div className="mb-12 animate-slide-up">
        <div className="text-6xl mb-6 animate-float">🛡️</div>
        <h2 className="heading-primary text-3xl mb-4">Modo Supervivencia</h2>
        <p className="text-gray-300 text-lg">
          Configura las reglas para el desafío definitivo
        </p>
      </div>

      {/* Configuration Card */}
      <div className="card w-full p-8 mb-8 animate-slide-up stagger-delay-1">
        <div className="space-y-6">
          <div>
            <label className="block mb-3 text-left text-white font-medium flex items-center gap-2">
              <span className="text-xl">❤️</span>
              Número de vidas
            </label>
            <input
              type="number"
              min="1"
              max="10"
              className="w-full px-6 py-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-4 focus:ring-primary-500/30 focus:bg-white/20 transition-all duration-200"
              value={lives}
              onChange={(e) => setLives(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block mb-3 text-left text-white font-medium flex items-center gap-2">
              <span className="text-xl">🃏</span>
              Número de comodines
            </label>
            <input
              type="number"
              min="0"
              max="10"
              className="w-full px-6 py-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-4 focus:ring-primary-500/30 focus:bg-white/20 transition-all duration-200"
              value={jokers}
              onChange={(e) => setJokers(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block mb-3 text-left text-white font-medium flex items-center gap-2">
              <span className="text-xl">🎯</span>
              Dificultad
            </label>
            <div className="relative">
              <select
                className="w-full px-6 py-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white focus:outline-none focus:ring-4 focus:ring-primary-500/30 focus:bg-white/20 transition-all duration-200 appearance-none cursor-pointer"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="fácil" className="bg-gray-800">🟢 Fácil</option>
                <option value="no tan fácil" className="bg-gray-800">🟡 No tan fácil</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Configuration Summary */}
      <div className="glass rounded-xl p-4 mb-8 w-full max-w-sm animate-slide-up stagger-delay-2">
        <h3 className="text-white font-medium mb-3">📋 Resumen</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-red-400 text-xl mb-1">❤️</div>
            <div className="text-sm text-gray-300">{lives} vidas</div>
          </div>
          <div>
            <div className="text-green-400 text-xl mb-1">🃏</div>
            <div className="text-sm text-gray-300">{jokers} comodines</div>
          </div>
          <div>
            <div className="text-amber-400 text-xl mb-1">🎯</div>
            <div className="text-sm text-gray-300 capitalize">{difficulty}</div>
          </div>
        </div>
      </div>

      {/* Start Button */}
      <button
        className="btn-primary w-full max-w-sm text-lg py-4 focus-ring flex items-center justify-center gap-3 animate-slide-up stagger-delay-3"
        onClick={handleStart}
      >
        <span className="text-xl">🚀</span>
        <span>Comenzar Supervivencia</span>
      </button>
      
      {/* Info Footer */}
      <div className="mt-8 text-center animate-slide-up stagger-delay-4">
        <p className="text-gray-400 text-sm max-w-xs mx-auto opacity-80">
          ¡El último jugador en pie será el ganador!
        </p>
      </div>
    </div>
  )
}

export default SurvivalConfig
