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
    <div className="p-4 text-center max-w-md mx-auto flex flex-col items-center justify-center min-h-dvh animate-fade-zoom">
      <h2 className="text-3xl font-bold mb-6 drop-shadow">Nombres de jugadores</h2>
      <div className="space-y-4 w-full">
        {nombres.map((nombre, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              className="w-full px-4 py-2 rounded-full bg-white/90 shadow-inner text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder={`Jugador ${i + 1}`}
              value={nombre}
              onChange={(e) => handleChange(i, e.target.value)}
            />
            {nombres.length > MIN_JUGADORES && (
              <button
                className="text-red-500 font-bold px-3 hover:text-red-600 transition"
                onClick={() => removerJugador(i)}
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>
      <button
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 active:scale-95 disabled:bg-blue-400 text-white px-5 py-2 rounded-full shadow-md transition flex items-center justify-center gap-2"
        onClick={agregarJugador}
        disabled={nombres.length >= MAX_JUGADORES}
      >
        ➕ Añadir jugador
      </button>
      <button
        className="mt-8 w-full bg-green-600 hover:bg-green-700 active:scale-95 disabled:bg-green-400 text-white px-6 py-3 rounded-full shadow-lg transition flex items-center justify-center gap-2"
        onClick={continuar}
        disabled={!tieneMinimo}
      >
        🚀 ¡Comenzar partida!
      </button>
    </div>
  )
}

export default NombreJugadores
