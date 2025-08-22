import { useState } from 'react'

const MAX_JUGADORES = 10
const MIN_JUGADORES = 2
const MAX_CARACTERES_NOMBRE = 15

const NombreJugadores = ({ onContinue }) => {
  const [nombres, setNombres] = useState(Array(MIN_JUGADORES).fill(''))

  const handleChange = (i, value) => {
    // Limitar la longitud del nombre
    if (value.length <= MAX_CARACTERES_NOMBRE) {
      const nuevos = [...nombres]
      nuevos[i] = value
      setNombres(nuevos)
    }
  }

  const agregarJugador = () => {
    if (nombres.length < MAX_JUGADORES) {
      setNombres([...nombres, ''])
    }
  }

  const removerJugador = (index) => {
    if (nombres.length > MIN_JUGADORES) {
      setNombres(nombres.filter((_, i) => i !== index))
    }
  }

  const tieneMinimo = nombres.filter((n) => n.trim() !== '').length >= MIN_JUGADORES

  const continuar = () => {
    onContinue(nombres.filter((n) => n.trim() !== ''))
  }

  return (
    <div className="p-4 text-center max-w-sm mx-auto flex flex-col items-center justify-between min-h-dvh animate-fade-zoom">
      {/* Header - Modern & Compact */}
      <div className="animate-slide-up space-y-3">
        {/* Modern title with subtle gradient */}
        <div className="relative">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-1 animate-float">
            Jugadores
          </h2>
          <div className="absolute inset-0 text-3xl font-bold blur-lg opacity-20 bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
            Jugadores
          </div>
        </div>
        
        {/* Elegant subtitle */}
        <div className="glass rounded-lg px-3 py-2">
          <p className="text-gray-300 text-sm font-medium">
            Configura tu equipo • {MIN_JUGADORES}-{MAX_JUGADORES} participantes
          </p>
        </div>
      </div>

      {/* Players Input Card - Compact with scroll */}
      <div className="card w-full p-4 animate-slide-up stagger-delay-1">
        {/* Player Inputs - Scrollable */}
        <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-hide pr-1">
          {nombres.map((nombre, i) => (
            <div key={i} className="flex items-center gap-2 animate-slide-up" style={{animationDelay: `${(i + 2) * 100}ms`}}>
              <div className="relative flex-1">
                <input
                  className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-300 text-center focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:bg-white/20 transition-all duration-200"
                  placeholder={`Jugador ${i + 1}`}
                  value={nombre}
                  onChange={(e) => handleChange(i, e.target.value)}
                  maxLength={MAX_CARACTERES_NOMBRE}
                  title={`Máximo ${MAX_CARACTERES_NOMBRE} caracteres`}
                />
                {nombre.trim() && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <span className="text-xs text-gray-400">{nombre.length}/{MAX_CARACTERES_NOMBRE}</span>
                    <span className="text-green-400 text-sm">✓</span>
                  </div>
                )}
              </div>
              {nombres.length > MIN_JUGADORES && (
                <button
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:text-red-300 transition-all duration-200 focus-ring"
                  onClick={() => removerJugador(i)}
                  title={`Eliminar jugador ${i + 1}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>
        
        {/* Add Player Button - Compact & Smaller */}
        <button
          className="mt-3 px-4 py-2 btn-secondary focus-ring disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm mx-auto rounded-full"
          onClick={agregarJugador}
          disabled={nombres.length >= MAX_JUGADORES}
        >
          <span className="text-base">➕</span>
          <span className="font-medium">Añadir ({nombres.length}/{MAX_JUGADORES})</span>
        </button>
      </div>

      {/* Action Section */}
      <div className="w-full space-y-3">
        {/* Status Info - Compact */}
        <div className="text-center">
          <p className="text-sm text-gray-400">
            {tieneMinimo ? (
              <span className="text-green-400 flex items-center justify-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Listo para comenzar
              </span>
            ) : (
              <span className="flex items-center justify-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.502 0L5.232 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                Necesitas mínimo {MIN_JUGADORES} jugadores
              </span>
            )}
          </p>
        </div>
        
        {/* Continue Button */}
        <button
          className="btn-primary w-full text-lg py-4 focus-ring disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 animate-slide-up stagger-delay-4"
          onClick={continuar}
          disabled={!tieneMinimo}
        >
          <span className="text-xl">🚀</span>
          <span>¡Comenzar!</span>
        </button>
      </div>
    </div>
  )
}

export default NombreJugadores
