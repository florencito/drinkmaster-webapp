import { useState } from 'react'
import useTriviaQuestion from '../hooks/useTriviaQuestion'

const categorias = [
  { label: 'Cine y TV', value: 'cine_y_tv' },
  { label: 'Cultura General', value: 'cultura_general' },
  { label: 'Deportes', value: 'deportes' },
]

const SurvivalGame = ({ players, settings, onFinish }) => {
  const [playersState, setPlayersState] = useState(
    players.map((name) => ({
      name,
      lives: settings.lives,
      jokers: settings.jokers,
      lastCategory: null,
    })),
  )
  const [currentIndex, setCurrentIndex] = useState(0)
  const [stage, setStage] = useState('choose')
  const [showOptions, setShowOptions] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const { question, loading, error, fetchQuestion } = useTriviaQuestion()

  const currentPlayer = playersState[currentIndex]

  const startQuestion = async (cat) => {
    const updated = playersState.map((p, i) =>
      i === currentIndex ? { ...p, lastCategory: cat } : p,
    )
    setPlayersState(updated)
    setShowOptions(false)
    setRevealed(false)
    setStage('question')
    const ok = await fetchQuestion(cat, settings.difficulty)
    if (!ok) {
      onFinish()
    }
  }

  const useJoker = () => {
    if (!currentPlayer || currentPlayer.jokers <= 0 || showOptions) return
    const updated = playersState.map((p, i) =>
      i === currentIndex ? { ...p, jokers: p.jokers - 1 } : p,
    )
    setPlayersState(updated)
    setShowOptions(true)
  }

  const handleResult = (correct) => {
    let updated = playersState.map((p, i) => {
      if (i !== currentIndex) return p
      const newLives = correct ? p.lives : p.lives - 1
      return { ...p, lives: newLives }
    })
    updated = updated.filter((p) => p.lives > 0)
    const eliminated = !updated.some((p) => p.name === currentPlayer.name)
    if (updated.length <= 1) {
      setPlayersState(updated)
      onFinish()
      return
    }
    let nextIndex
    if (eliminated) {
      nextIndex = currentIndex >= updated.length ? 0 : currentIndex
    } else {
      nextIndex = (currentIndex + 1) % updated.length
    }
    setPlayersState(updated)
    setCurrentIndex(nextIndex)
    setStage('choose')
  }

  if (!currentPlayer) return null

  return (
    <div className="p-4 flex flex-col justify-center items-center text-center min-h-dvh">
      <div className="mb-4">
        <h2 className="text-xl font-bold">Turno de {currentPlayer.name}</h2>
        <p>
          Vidas: {currentPlayer.lives} | Comodines: {currentPlayer.jokers}
        </p>
      </div>
      {stage === 'choose' && (
        <div className="space-y-4 w-full max-w-xs">
          {categorias.map((cat) => (
            <button
              key={cat.value}
              className="w-full bg-purple-600 hover:bg-purple-700 active:scale-95 text-white px-6 py-3 rounded-full shadow-lg transition duration-300 disabled:bg-purple-400"
              onClick={() => startQuestion(cat.value)}
              disabled={currentPlayer.lastCategory === cat.value}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}
      {stage === 'question' && (
        <div className="w-full max-w-md">
          {loading && <p>Cargando pregunta...</p>}
          {error && <p>Error al cargar pregunta</p>}
          {question && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">{question.question}</h3>
              {showOptions && (
                <ul className="text-left list-disc list-inside">
                  {question.options.map((opt, i) => (
                    <li key={i}>{opt}</li>
                  ))}
                </ul>
              )}
              {!showOptions && currentPlayer.jokers > 0 && (
                <button
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full shadow-md"
                  onClick={useJoker}
                >
                  Usar comodín ({currentPlayer.jokers})
                </button>
              )}
              {!revealed && (
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-md"
                  onClick={() => setRevealed(true)}
                >
                  Mostrar respuesta
                </button>
              )}
              {revealed && (
                <div className="space-y-2">
                  <p className="font-semibold">Respuesta: {question.correct_answer}</p>
                  {question.explanation && (
                    <p className="text-sm italic">{question.explanation}</p>
                  )}
                  <div className="flex justify-center space-x-4">
                    <button
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full shadow-md"
                      onClick={() => handleResult(true)}
                    >
                      Acertó
                    </button>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full shadow-md"
                      onClick={() => handleResult(false)}
                    >
                      Falló
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SurvivalGame
