import { useState } from 'react'

const NombreJugadores = ({ onContinue }) => {
  const [nombres, setNombres] = useState(['', '', '']) // Puedes ajustar

  const handleChange = (i, value) => {
    const nuevos = [...nombres]
    nuevos[i] = value
    setNombres(nuevos)
  }

  return (
    <div className="p-4 text-center">
      <h2 className="text-2xl font-bold mb-4">Nombres de jugadores</h2>
      <div className="space-y-2">
        {nombres.map((nombre, i) => (
          <input
            key={i}
            className="border p-2 rounded w-full"
            placeholder={`Jugador ${i + 1}`}
            value={nombre}
            onChange={(e) => handleChange(i, e.target.value)}
          />
        ))}
      </div>
      <button
        className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        onClick={() => onContinue(nombres.filter(n => n.trim() !== ''))}
      >
        Comenzar partida
      </button>
    </div>
  )
}

export default NombreJugadores
