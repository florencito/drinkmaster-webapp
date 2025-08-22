import { useState } from 'react'
import useTriviaQuestion from '../hooks/useTriviaQuestion'

const categorias = [
  { label: 'Cine y TV', value: 'cine y tv' },
  { label: 'Cultura General', value: 'cultura general' },
  { label: 'Deportes', value: 'deportes' },
]

const fondos = [
  'from-pink-500 to-fuchsia-600',
  'from-emerald-500 to-lime-500',
  'from-sky-500 to-indigo-500',
  'from-amber-500 to-orange-600',
  'from-purple-500 to-indigo-600',
  'from-red-500 to-pink-600',
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
      <div className="p-6 flex flex-col justify-center items-center text-center min-h-dvh animate-fade-zoom">
        <div className="card p-8 w-full max-w-lg animate-slide-up">
          <div className="flex items-center justify-center mb-6">
            <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
          </div>
          <h2 className="text-xl font-medium text-white mb-4">Cargando pregunta...</h2>
          <div className="shimmer h-4 bg-white/10 rounded-lg mb-2"></div>
          <div className="shimmer h-4 bg-white/10 rounded-lg w-3/4 mx-auto"></div>
        </div>
      </div>
    )
  }

  if (stage === 'question' && error) {
    return (
      <div className="p-6 flex flex-col justify-center items-center text-center min-h-dvh animate-fade-zoom">
        <div className="card p-8 w-full max-w-lg border-red-500/20 animate-slide-up">
          <div className="text-6xl mb-6 animate-bounce">⚠️</div>
          <h2 className="text-xl font-medium text-red-400 mb-4">Error al cargar la pregunta</h2>
          <p className="text-gray-300">{error.message}</p>
        </div>
      </div>
    )
  }

  const remainingPlayers = playersState.filter(p => p.lives > 0).length
  const totalQuestions = questionCount + 1

  return (
    <div
      className={`p-6 flex flex-col items-center justify-center text-center min-h-dvh relative ${
        feedback === 'correct' ? 'animate-flash bg-green-500/20' : ''
      } ${feedback === 'wrong' ? 'animate-shake bg-red-500/20' : ''}`}
    >
      {/* Survival Mode Badge */}
      <div className="absolute top-6 left-6 glass px-4 py-2 rounded-xl text-sm font-medium text-white/90">
        🛡️ Supervivencia
      </div>
      
      {/* Remaining Players Badge */}
      <div className="absolute top-6 right-6 glass px-4 py-2 rounded-xl text-sm font-medium text-white/90">
        {remainingPlayers} jugadores restantes
      </div>

      {/* Player Status Card */}
      <div className="card w-full max-w-lg p-6 mb-8 animate-slide-up">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold text-white mb-4">Turno de {currentPlayer.name}</h2>
          
          {/* Player Stats */}
          <div className="flex gap-8 mb-6">
            <div className={`glass px-4 py-3 rounded-xl flex items-center gap-2 ${lifeAnim ? 'animate-pop' : ''}`}>
              <span className="text-2xl">❤️</span>
              <div className="text-left">
                <div className="text-lg font-bold text-white">{currentPlayer.lives}</div>
                <div className="text-xs text-gray-300">Vidas</div>
              </div>
            </div>
            
            <div className={`glass px-4 py-3 rounded-xl flex items-center gap-2 ${jokerAnim ? 'animate-flash' : ''}`}>
              <span className="text-2xl">🃏</span>
              <div className="text-left">
                <div className="text-lg font-bold text-white">{currentPlayer.jokers}</div>
                <div className="text-xs text-gray-300">Comodines</div>
              </div>
            </div>
          </div>
          
          {/* All Players Overview */}
          <div className="w-full">
            <h3 className="text-sm text-gray-400 mb-3">🎮 Estado general</h3>
            <div className="grid grid-cols-2 gap-2">
              {playersState.map((player, i) => (
                <div key={player.name} className={`glass px-3 py-2 rounded-lg text-sm ${
                  i === currentIndex ? 'border border-primary-500/50' : ''
                } ${player.lives <= 0 ? 'opacity-50' : ''}`}>
                  <div className="font-medium text-white">{player.name}</div>
                  <div className="flex gap-2 text-xs text-gray-300">
                    <span>❤️{player.lives}</span>
                    <span>🃏{player.jokers}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Category Selection */}
      {stage === 'choose' && (
        <div className="space-y-4 w-full max-w-sm animate-slide-up">
          <h3 className="text-lg font-semibold text-white mb-4">🎡 Elige una categoría</h3>
          {categorias.map((cat, index) => (
            <button
              key={cat.value}
              className={`btn-game w-full ${
                currentPlayer.lastCategory === cat.value 
                  ? 'bg-gradient-to-r from-gray-500 to-gray-600 opacity-50 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-purple-500/25 hover:shadow-purple-500/40 focus:ring-purple-500/30'
              } animate-slide-up`}
              style={{animationDelay: `${index * 100}ms`}}
              onClick={() => startQuestion(cat.value)}
              disabled={currentPlayer.lastCategory === cat.value}
            >
              {cat.label}
              {currentPlayer.lastCategory === cat.value && (
                <span className="ml-2 text-xs">(Ya usada)</span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Question Card */}
      {stage === 'question' && question && (
        <div className="w-full max-w-lg flex flex-col items-center animate-fade-in-up">
          <div className="card card-hover p-8 mb-8 relative overflow-hidden">
            {/* Question Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${fondos[(questionCount >= 0 ? questionCount : 0) % fondos.length]} opacity-20 rounded-2xl`} />
            
            {/* Question Content */}
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="glass px-3 py-1 rounded-full text-sm text-white/80">
                  Pregunta #{totalQuestions}
                </span>
                <span className="glass px-3 py-1 rounded-full text-sm text-white/80">
                  {currentPlayer.lastCategory}
                </span>
              </div>
              
              <h3 className="text-xl md:text-2xl font-semibold text-white leading-relaxed break-words mb-6">
                {question.question}
              </h3>
              
              {/* Options (when using joker) */}
              {showOptions && (
                <div className="mt-4 grid gap-3 animate-slide-up">
                  {question.options.map((opt, i) => (
                    <div key={i} className="glass px-4 py-3 rounded-xl text-white text-left">
                      <span className="font-medium text-primary-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                      {opt}
                    </div>
                  ))}
                </div>
              )}
              
              {/* Answer (when revealed) */}
              {revealed && (
                <div className="mt-6 glass p-4 rounded-xl animate-slide-up">
                  <p className="font-semibold text-green-400 mb-2">
                    ✅ Respuesta correcta: {question.answer}
                  </p>
                  {question.explanation && (
                    <p className="text-sm text-gray-300 italic">
                      💡 {question.explanation}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full flex flex-col gap-4">
            {!showOptions && !revealed && currentPlayer.jokers > 0 && (
              <button
                className="btn-secondary flex items-center justify-center gap-3 py-3 focus-ring animate-slide-up"
                onClick={useJoker}
              >
                <span className="text-xl">🃏</span>
                <span>Usar comodín ({currentPlayer.jokers} restantes)</span>
              </button>
            )}
            
            {!revealed && (
              <button
                className="btn-primary flex items-center justify-center gap-3 py-4 focus-ring animate-slide-up"
                onClick={() => setRevealed(true)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>Mostrar respuesta</span>
              </button>
            )}
          </div>
          
          {/* Result Buttons */}
          {revealed && (
            <div className="w-full grid grid-cols-2 gap-4 mt-4 animate-slide-up">
              <button
                className="btn-game bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-green-500/25 hover:shadow-green-500/40 focus:ring-green-500/30 py-3 flex items-center justify-center gap-2"
                onClick={() => handleResult(true)}
              >
                <span className="text-xl">✅</span>
                <span>Acertó</span>
              </button>
              <button
                className="btn-game bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-red-500/25 hover:shadow-red-500/40 focus:ring-red-500/30 py-3 flex items-center justify-center gap-2"
                onClick={() => handleResult(false)}
              >
                <span className="text-xl">❌</span>
                <span>Falló</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SurvivalGame
