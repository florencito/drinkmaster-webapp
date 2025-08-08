import { useState } from 'react'

const MAX_JUGADORES = 10
const MIN_JUGADORES = 2

const EditarJugadoresPopup = ({ players, onClose, onSave }) => {
  const [nombres, setNombres] = useState(players)

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

  const guardar = () => {
    onSave(nombres.filter((n) => n.trim() !== ''))
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 animate-fade-in">
      <div className="w-11/12 max-w-md mx-auto p-6 rounded-lg shadow-lg m-4 animate-fade-zoom bg-zinc-900/90 text-white backdrop-blur-md border border-white/10">
        <h2 className="text-xl font-bold text-center mb-4">Editar jugadores</h2>
        <div className="space-y-4">
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
        <div className="flex justify-end gap-2 mt-6">
          <button className="px-4 py-2 text-sm text-gray-300 hover:text-white" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-green-600 hover:bg-green-700 active:scale-95 disabled:bg-green-400 text-white rounded-full transition"
            onClick={guardar}
            disabled={!tieneMinimo}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditarJugadoresPopup

