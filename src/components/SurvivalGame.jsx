import { useState } from 'react'
import useTriviaQuestion from '../hooks/useTriviaQuestion'

const categorias = [
  { label: 'Cine y TV', value: 'cine y tv' },
  { label: 'Cultura General', value: 'cultura general' },
  { label: 'Deportes', value: 'deportes' },
]

const fondos = [
  'bg-gradient-to-br from-pink-500 to-fuchsia-600',
  'bg-gradient-to-br from-emerald-500 to-lime-500',
  'bg-gradient-to-br from-sky-500 to-indigo-500',
  'bg-gradient-to-br from-amber-500 to-orange-600',
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
  const [eliminationOrder, setEliminationOrder] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [stage, setStage] = useState('choose')
  const [showOptions, setShowOptions] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const [lifeAnim, setLifeAnim] = useState(false)
  const [jokerAnim, setJokerAnim] = useState(false)
  const [questionCount, setQuestionCount] = useState(-1)
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
    const res = await fetchQuestion(cat, settings.difficulty)
    if (!res.success) {
      if (res.noQuestions) {
        const ranking = [
          ...playersState.map((p) => p.name),
          ...eliminationOrder.slice().reverse(),
        ]
        onFinish(ranking)
      }
      return
    }
    setQuestionCount((prev) => prev + 1)
  }

  const useJoker = () => {
    if (!currentPlayer || currentPlayer.jokers <= 0 || showOptions) return
    const updated = playersState.map((p, i) =>
      i === currentIndex ? { ...p, jokers: p.jokers - 1 } : p,
    )
    setPlayersState(updated)
    setShowOptions(true)
    setJokerAnim(true)
    setTimeout(() => setJokerAnim(false), 600)
  }

  const processResult = (correct) => {
    let eliminatedPlayer = null
    const updated = playersState.map((p, i) => {
      if (i !== currentIndex) return p
      const newLives = correct ? p.lives : p.lives - 1
      if (!correct) {
        if (newLives <= 0) eliminatedPlayer = p.name
      }
      return { ...p, lives: newLives }
    })
    if (!correct) setLifeAnim(true)
    setPlayersState(updated)

    const finalize = () => {
      if (!correct) setLifeAnim(false)
      const filtered = updated.filter((p) => p.lives > 0)
      let newOrder = eliminationOrder
      if (eliminatedPlayer) {
        newOrder = [...eliminationOrder, eliminatedPlayer]
        setEliminationOrder(newOrder)
      }
      if (filtered.length <= 1) {
        const ranking = [
          filtered[0]?.name,
          ...newOrder.slice().reverse(),
        ].filter(Boolean)
        setPlayersState(filtered)
        onFinish(ranking)
        return
      }
      const eliminated = !!eliminatedPlayer
      let nextIndex
      if (eliminated) {
        nextIndex = currentIndex >= filtered.length ? 0 : currentIndex
      } else {
        nextIndex = (currentIndex + 1) % filtered.length
      }
      setPlayersState(filtered)
      setCurrentIndex(nextIndex)
      setStage('choose')
    }

    if (!correct) {
      setTimeout(finalize, 600)
    } else {
      finalize()
    }
  }

  const handleResult = (correct) => {
    setFeedback(correct ? 'correct' : 'wrong')
    setTimeout(() => {
      processResult(correct)
      setFeedback(null)
    }, 600)
  }

  if (!currentPlayer) return null

  if (stage === 'question' && loading) {
    return (
      <div className="p-4 flex flex-col justify-center items-center text-center min-h-dvh">
        <div className="bg-gray-500 w-full max-w-md text-white rounded-xl shadow-xl p-6 mb-6">
          <h2 className="text-lg font-medium">Cargando pregunta...</h2>
        </div>
      </div>
    )
  }

  if (stage === 'question' && error) {
    return (
      <div className="p-4 flex flex-col justify-center items-center text-center min-h-dvh">
        <div className="bg-red-500 w-full max-w-md text-white rounded-xl shadow-xl p-6 mb-6">
          <h2 className="text-lg font-medium">Error al cargar la pregunta</h2>
          <p className="text-sm mt-2">{error.message}</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`p-4 flex flex-col items-center justify-center text-center min-h-dvh ${
        feedback === 'correct' ? 'animate-flash bg-green-500/20' : ''
      } ${feedback === 'wrong' ? 'animate-shake bg-red-500/20' : ''}`}
    >
      <div className="mb-6 flex flex-col items-center">
        <h2 className="text-xl font-bold mb-2">Turno de {currentPlayer.name}</h2>
        <div className="flex gap-6 text-lg">
          <div className={`flex items-center gap-1 ${lifeAnim ? 'animate-pop' : ''}`}>
            <span>❤️</span>
            <span>{currentPlayer.lives}</span>
          </div>
          <div className={`flex items-center gap-1 ${jokerAnim ? 'animate-flash' : ''}`}>
            <span>🃏</span>
            <span>{currentPlayer.jokers}</span>
          </div>
        </div>
      </div>
      {stage === 'choose' && (
        <div className="space-y-4 w-full max-w-xs">
          {categorias.map((cat) => (
            <button
              key={cat.value}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full shadow-lg disabled:bg-purple-400"
              onClick={() => startQuestion(cat.value)}
              disabled={currentPlayer.lastCategory === cat.value}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}
      {stage === 'question' && question && (
        <div className="w-full max-w-md flex flex-col items-center">
          <div
            className={`w-full text-white rounded-xl shadow-xl p-6 mb-6 ${fondos[(questionCount >= 0 ? questionCount : 0) % fondos.length]}`}
          >
            <h3 className="text-lg font-medium break-words">{question.question}</h3>
            {showOptions && (
              <div className="mt-4 grid gap-2">
                {question.options.map((opt, i) => (
                  <button
                    key={i}
                    disabled
                    className="w-full bg-white/20 text-white px-4 py-2 rounded-full shadow-md cursor-default"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
            {revealed && (
              <div className="mt-4 space-y-2">
                <p className="font-semibold">Respuesta: {question.answer}</p>
                {question.explanation && (
                  <p className="text-sm italic">{question.explanation}</p>
                )}
              </div>
            )}
          </div>
          <div className="w-full flex flex-col gap-3">
            {!showOptions && currentPlayer.jokers > 0 && (
              <button
                className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full shadow-md"
                onClick={useJoker}
              >
                🃏 Usar comodín ({currentPlayer.jokers})
              </button>
            )}
            {!revealed && (
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-md"
                onClick={() => setRevealed(true)}
              >
                Mostrar respuesta
              </button>
            )}
          </div>
          {revealed && (
            <div className="w-full flex flex-col gap-3">
              <button
                className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full shadow-md"
                onClick={() => handleResult(true)}
              >
                Acertó
              </button>
              <button
                className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full shadow-md"
                onClick={() => handleResult(false)}
              >
                Falló
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SurvivalGame
