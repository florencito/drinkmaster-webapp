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
    <div className="p-6 pb-24 text-center max-w-sm mx-auto flex flex-col items-center justify-between min-h-dvh animate-fade-zoom">
      {/* Header - Compact */}
      <div className="animate-slide-up">
        <div className="text-4xl mb-2 animate-float">🛡️</div>
        <h2 className="text-2xl font-bold text-white mb-2">Supervivencia</h2>
        <p className="text-gray-300 text-sm">
          Configura las reglas del desafío
        </p>
      </div>

      {/* Configuration Card - Compact Layout */}
      <div className="card w-full p-4 animate-slide-up stagger-delay-1">
        <div className="space-y-4">
          {/* Lives Input */}
          <div>
            <label className="block mb-2 text-left text-white text-sm font-medium flex items-center gap-2">
              <span>❤️</span>
              Vidas
            </label>
            <input
              type="number"
              min="1"
              max="10"
              className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-center focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:bg-white/20 transition-all duration-200"
              value={lives}
              onChange={(e) => setLives(e.target.value)}
            />
          </div>
          
          {/* Jokers Input */}
          <div>
            <label className="block mb-2 text-left text-white text-sm font-medium flex items-center gap-2">
              <span>🃏</span>
              Comodines
            </label>
            <input
              type="number"
              min="0"
              max="10"
              className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-center focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:bg-white/20 transition-all duration-200"
              value={jokers}
              onChange={(e) => setJokers(e.target.value)}
            />
          </div>
          
          {/* Difficulty Select */}
          <div>
            <label className="block mb-2 text-left text-white text-sm font-medium flex items-center gap-2">
              <span>🎯</span>
              Dificultad
            </label>
            <div className="relative">
              <select
                className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-center focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:bg-white/20 transition-all duration-200 appearance-none cursor-pointer"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="fácil" className="bg-gray-800">🟢 Fácil</option>
                <option value="no tan fácil" className="bg-gray-800">🟡 Difícil</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Configuration Summary - Horizontal */}
      <div className="glass rounded-xl p-3 w-full animate-slide-up stagger-delay-2">
        <div className="flex justify-around items-center text-center">
          <div className="flex flex-col items-center">
            <div className="text-red-400 text-lg mb-1">❤️</div>
            <div className="text-xs text-gray-300">{lives}</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-green-400 text-lg mb-1">🃏</div>
            <div className="text-xs text-gray-300">{jokers}</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-amber-400 text-lg mb-1">🎯</div>
            <div className="text-xs text-gray-300 capitalize">{difficulty === 'no tan fácil' ? 'Difícil' : 'Fácil'}</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full space-y-3">
        <button
          className="btn-primary w-full py-4 focus-ring flex items-center justify-center gap-3 animate-slide-up stagger-delay-3"
          onClick={handleStart}
        >
          <span className="text-xl">🚀</span>
          <span>Comenzar</span>
        </button>
        
        {/* Info Footer - Very compact */}
        <p className="text-gray-400 text-xs opacity-80 animate-slide-up stagger-delay-4">
          ¡El último en pie gana!
        </p>
      </div>
    </div>
  )
}

export default SurvivalConfig
