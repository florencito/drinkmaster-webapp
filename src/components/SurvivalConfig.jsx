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
    <div className="p-4 text-center max-w-md mx-auto flex flex-col items-center justify-center min-h-dvh animate-fade-zoom">
      <h2 className="text-3xl font-bold mb-6 drop-shadow">Configurar Supervivencia</h2>
      <div className="space-y-4 w-full">
        <div>
          <label className="block mb-1 ml-2 text-left">Número de vidas</label>
          <input
            type="number"
            min="1"
            className="w-full px-4 py-2 rounded-full bg-white/90 shadow-inner text-zinc-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={lives}
            onChange={(e) => setLives(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 ml-2 text-left">Número de comodines</label>
          <input
            type="number"
            min="0"
            className="w-full px-4 py-2 rounded-full bg-white/90 shadow-inner text-zinc-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={jokers}
            onChange={(e) => setJokers(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 ml-2 text-left">Dificultad</label>
          <select
            className="w-full px-4 py-2 rounded-full bg-white/90 shadow-inner text-zinc-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="fácil">fácil</option>
            <option value="no tan fácil">no tan fácil</option>
          </select>
        </div>
        <button
          className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow-lg transition"
          onClick={handleStart}
        >
          🚀 Continuar
        </button>
      </div>
    </div>
  )
}

export default SurvivalConfig
