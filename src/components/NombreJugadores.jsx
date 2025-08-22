import { useState } from 'react'

const MAX_JUGADORES = 10
const MIN_JUGADORES = 2

const NombreJugadores = ({ onContinue }) => {
  const [nombres, setNombres] = useState(Array(MIN_JUGADORES).fill(''))

  const handleChange = (i, value) => {
    const nuevos = [...nombres]
    nuevos[i] = value
    setNombres(nuevos)
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
    <div className="p-6 text-center max-w-lg mx-auto flex flex-col items-center justify-center min-h-dvh animate-fade-zoom">
      {/* Header */}
      <div className="mb-12 animate-slide-up">
        <h2 className="heading-primary text-3xl mb-4">Nombres de jugadores</h2>
        <p className="text-gray-300 text-lg">
          Agrega los nombres de los participantes ({MIN_JUGADORES}-{MAX_JUGADORES} jugadores)
        </p>
      </div>

      {/* Players Input Card */}
      <div className="card w-full p-8 mb-8 animate-slide-up stagger-delay-1">
        <div className="space-y-4">
          {nombres.map((nombre, i) => (
            <div key={i} className="flex items-center gap-3 animate-slide-up" style={{animationDelay: `${(i + 2) * 100}ms`}}>
              <div className="relative flex-1">
                <input
                  className="w-full px-6 py-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-4 focus:ring-primary-500/30 focus:bg-white/20 transition-all duration-200"
                  placeholder={`Jugador ${i + 1}`}
                  value={nombre}
                  onChange={(e) => handleChange(i, e.target.value)}
                />
                {nombre.trim() && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400">
                    ✓
                  </div>
                )}
              </div>
              {nombres.length > MIN_JUGADORES && (
                <button
                  className="flex items-center justify-center w-12 h-12 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:text-red-300 transition-all duration-200 focus-ring"
                  onClick={() => removerJugador(i)}
                  title={`Eliminar jugador ${i + 1}`}
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
        
        {/* Add Player Button */}
        <button
          className="mt-8 w-full btn-secondary focus-ring disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          onClick={agregarJugador}
          disabled={nombres.length >= MAX_JUGADORES}
        >
          <span className="text-xl">➕</span>
          <span>Añadir jugador ({nombres.length}/{MAX_JUGADORES})</span>
        </button>
      </div>

      {/* Continue Button */}
      <button
        className="btn-primary w-full max-w-sm text-lg py-4 focus-ring disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 animate-slide-up stagger-delay-4"
        onClick={continuar}
        disabled={!tieneMinimo}
      >
        <span className="text-xl">🚀</span>
        <span>¡Comenzar partida!</span>
      </button>

      {/* Status Info */}
      <div className="mt-6 text-center animate-slide-up stagger-delay-4">
        <p className="text-sm text-gray-400">
          {tieneMinimo ? (
            <span className="text-green-400">✓ Listo para comenzar</span>
          ) : (
            <span>Necesitas al menos {MIN_JUGADORES} jugadores para continuar</span>
          )}
        </p>
      </div>
    </div>
  )
}

export default NombreJugadores
