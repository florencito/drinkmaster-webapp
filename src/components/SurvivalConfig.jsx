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
    <div className="flex flex-col items-center justify-center min-h-dvh text-center px-4">
      <h2 className="text-2xl font-bold mb-6">Configurar Supervivencia</h2>
      <div className="space-y-4 w-full max-w-xs">
        <div>
          <label className="block mb-1">Número de vidas</label>
          <input
            type="number"
            min="1"
            className="w-full border border-zinc-300 text-zinc-900 px-3 py-2 rounded"
            value={lives}
            onChange={(e) => setLives(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1">Número de comodines</label>
          <input
            type="number"
            min="0"
            className="w-full border border-zinc-300 text-zinc-900 px-3 py-2 rounded"
            value={jokers}
            onChange={(e) => setJokers(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1">Dificultad</label>
          <select
            className="w-full border border-zinc-300 text-zinc-900 px-3 py-2 rounded"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="fácil">fácil</option>
            <option value="no tan fácil">no tan fácil</option>
          </select>
        </div>
        <button
          className="w-full bg-green-600 hover:bg-green-700 active:scale-95 text-white px-6 py-3 rounded-full shadow-lg transition duration-300"
          onClick={handleStart}
        >
          Continuar
        </button>
      </div>
    </div>
  )
}

export default SurvivalConfig
