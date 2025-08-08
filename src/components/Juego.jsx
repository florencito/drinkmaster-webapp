import { useEffect, useState } from 'react'
import useActiveCards from '../hooks/useActiveCards'
import replacePlaceholders from '../utils/replacePlaceholders'

const fondos = [
  'bg-gradient-to-br from-pink-500 to-fuchsia-600',
  'bg-gradient-to-br from-emerald-500 to-lime-500',
  'bg-gradient-to-br from-sky-500 to-indigo-500',
  'bg-gradient-to-br from-amber-500 to-orange-600',
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
    if (indice < mazo.length - 1) {
      setIndice(indice + 1)
    } else {
      onFin()
    }
  }


  // Show loading state
  if (loading) {
    return (
      <div className="p-4 flex flex-col justify-center items-center text-center min-h-dvh animate-fade-zoom">
        <div className="bg-gray-500 w-full max-w-md text-white rounded-xl shadow-xl p-6 mb-6">
          <h2 className="text-lg font-medium">Cargando cartas...</h2>
        </div>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="p-4 flex flex-col justify-center items-center text-center min-h-dvh animate-fade-zoom">
        <div className="bg-red-500 w-full max-w-md text-white rounded-xl shadow-xl p-6 mb-6">
          <h2 className="text-lg font-medium">Error al cargar las cartas</h2>
          <p className="text-sm mt-2">{error.message}</p>
        </div>
      </div>
    )
  }

  // Show empty state
  if (mazo.length === 0) {
    return (
      <div className="p-4 flex flex-col justify-center items-center text-center min-h-dvh animate-fade-zoom">
        <div className="bg-yellow-500 w-full max-w-md text-white rounded-xl shadow-xl p-6 mb-6">
          <h2 className="text-lg font-medium">No hay cartas disponibles</h2>
          <p className="text-sm mt-2">Necesitas agregar cartas a la base de datos</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 flex flex-col justify-center items-center text-center min-h-dvh relative animate-fade-zoom">
      <div className="absolute top-2 left-2 text-xs bg-black/40 px-2 py-1 rounded">
        {modeLabel}
      </div>
      <div
        key={indice}
        className={`w-full max-w-md text-white rounded-xl shadow-xl p-6 mb-6 transition-colors duration-300 animate-fade-in-up ${
          fondos[indice % fondos.length]
        }`}
      >
        <h2 className="text-lg font-medium break-words">{textoCarta}</h2>
      </div>
      <button
        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full shadow-md"
        onClick={siguienteCarta}
      >
        Siguiente
      </button>
    </div>
  )
}

export default Juego
