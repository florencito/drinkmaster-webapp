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
    <div className="p-4 text-center">
      <h2 className="text-2xl font-bold mb-4">Nombres de jugadores</h2>
      <div className="space-y-2">
        {nombres.map((nombre, i) => (
          <div key={i} className="flex items-center space-x-2">
            <input
              className="border p-2 rounded w-full"
              placeholder={`Jugador ${i + 1}`}
              value={nombre}
              onChange={(e) => handleChange(i, e.target.value)}
            />
            {nombres.length > MIN_JUGADORES && (
              <button
                className="text-red-500 font-bold px-2"
                onClick={() => removerJugador(i)}
              >
                X
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-center space-x-4 mt-4">
        <button
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 disabled:bg-blue-400"
          onClick={agregarJugador}
          disabled={nombres.length >= MAX_JUGADORES}
        >
          Agregar jugador
        </button>
      </div>
      <button
        className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:bg-green-400"
        onClick={continuar}
        disabled={!tieneMinimo}
      >
        Comenzar partida
      </button>
    </div>
  )
}

export default NombreJugadores
