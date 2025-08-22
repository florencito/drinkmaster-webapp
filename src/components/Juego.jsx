import { useEffect, useState } from 'react'
import useActiveCards from '../hooks/useActiveCards'
import replacePlaceholders from '../utils/replacePlaceholders'

const fondos = [
  'from-pink-500 to-fuchsia-600',
  'from-emerald-500 to-lime-500',
  'from-sky-500 to-indigo-500',
  'from-amber-500 to-orange-600',
  'from-purple-500 to-indigo-600',
  'from-red-500 to-pink-600',
]

const MAX_CARTAS = 25

const barajar = (arr) => {
  const copia = [...arr]
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copia[i], copia[j]] = [copia[j], copia[i]]
  }
  return copia
}

const Juego = ({ jugadores, onFin, mode = 'normal' }) => {
  const { cards, loading, error } = useActiveCards(mode)
  const modeLabel = mode === 'hardcore' ? 'Modo Hardcore' : 'Modo Clásico'
  const [mazo, setMazo] = useState([])
  const [indice, setIndice] = useState(0)
  const [textoCarta, setTextoCarta] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (!loading) {
      const barajado = barajar(cards)
      setMazo(barajado.slice(0, MAX_CARTAS))
      setIndice(0)
    }
  }, [cards, loading])

  useEffect(() => {
    if (mazo.length > 0 && indice < mazo.length) {
      const carta = mazo[indice]
      setTextoCarta(
        replacePlaceholders(carta.content, carta.placeholders || [], jugadores)
      )
    }
  }, [mazo, indice, jugadores])

  const siguienteCarta = () => {
    if (isAnimating) return
    
    setIsAnimating(true)
    setTimeout(() => {
      if (indice < mazo.length - 1) {
        setIndice(indice + 1)
      } else {
        onFin()
      }
      setIsAnimating(false)
    }, 150)
  }

  // Show loading state
  if (loading) {
    return (
      <div className="p-6 flex flex-col justify-center items-center text-center min-h-dvh animate-fade-zoom">
        <div className="card p-8 w-full max-w-lg animate-slide-up">
          <div className="flex items-center justify-center mb-6">
            <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
          </div>
          <h2 className="text-xl font-medium text-white mb-4">Cargando cartas...</h2>
          <div className="shimmer h-4 bg-white/10 rounded-lg mb-2"></div>
          <div className="shimmer h-4 bg-white/10 rounded-lg w-3/4 mx-auto"></div>
        </div>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="p-6 flex flex-col justify-center items-center text-center min-h-dvh animate-fade-zoom">
        <div className="card p-8 w-full max-w-lg border-red-500/20 animate-slide-up">
          <div className="text-6xl mb-6 animate-bounce">⚠️</div>
          <h2 className="text-xl font-medium text-red-400 mb-4">Error al cargar las cartas</h2>
          <p className="text-gray-300">{error.message}</p>
        </div>
      </div>
    )
  }

  // Show empty state
  if (mazo.length === 0) {
    return (
      <div className="p-6 flex flex-col justify-center items-center text-center min-h-dvh animate-fade-zoom">
        <div className="card p-8 w-full max-w-lg border-yellow-500/20 animate-slide-up">
          <div className="text-6xl mb-6 animate-bounce-subtle">🎴</div>
          <h2 className="text-xl font-medium text-yellow-400 mb-4">No hay cartas disponibles</h2>
          <p className="text-gray-300">Necesitas agregar cartas a la base de datos</p>
        </div>
      </div>
    )
  }

  const progreso = ((indice + 1) / mazo.length) * 100

  return (
    <div className="p-6 pb-24 flex flex-col justify-center items-center text-center min-h-dvh relative animate-fade-zoom">
      {/* Header with badges */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-10">
        <div className="glass px-4 py-2 rounded-xl text-sm font-medium text-white/90">
          {modeLabel}
        </div>
        <div className="glass px-4 py-2 rounded-xl text-sm font-medium text-white/90">
          {indice + 1} / {mazo.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-lg mb-8 mt-20">
        <div className="glass rounded-full h-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-primary-400 to-primary-600 h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progreso}%` }}
          />
        </div>
      </div>

      {/* Card */}
      <div
        key={indice}
        className={`card card-hover w-full max-w-lg p-8 mb-8 relative overflow-hidden transition-all duration-300 ${isAnimating ? 'animate-pop' : 'animate-fade-in-up'}`}
      >
        {/* Card Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${fondos[indice % fondos.length]} opacity-20 rounded-2xl`} />
        
        {/* Card Content */}
        <div className="relative z-10">
          <h2 className="text-xl md:text-2xl font-semibold text-white leading-relaxed break-words">
            {textoCarta}
          </h2>
        </div>
        
        {/* Card Number */}
        <div className="absolute bottom-4 right-6 text-white/40 font-mono text-sm">
          #{String(indice + 1).padStart(2, '0')}
        </div>
      </div>

      {/* Action Button */}
      <button
        className="btn-primary text-lg px-8 py-4 focus-ring flex items-center gap-3 animate-glow disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={siguienteCarta}
        disabled={isAnimating}
      >
        {indice < mazo.length - 1 ? (
          <>
            <span>Siguiente</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </>
        ) : (
          <>
            <span>Finalizar</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </>
        )}
      </button>

      {/* Players List */}
      <div className="mt-8 flex flex-wrap justify-center gap-2 max-w-lg">
        {jugadores.map((jugador, i) => (
          <span 
            key={i} 
            className="glass px-3 py-1 rounded-full text-sm text-white/80 animate-slide-up"
            style={{animationDelay: `${i * 50}ms`}}
          >
            {jugador}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Juego
