import { useEffect, useState } from 'react'
import useActiveCards from '../hooks/useActiveCards'
import replacePlaceholders from '../utils/replacePlaceholders'

const fondos = [
  'bg-gradient-to-br from-pink-500 to-fuchsia-600',
  'bg-gradient-to-br from-emerald-500 to-lime-500',
  'bg-gradient-to-br from-sky-500 to-indigo-500',
  'bg-gradient-to-br from-amber-500 to-orange-600',
]

const barajar = (arr) => {
  const copia = [...arr]
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copia[i], copia[j]] = [copia[j], copia[i]]
  }
  return copia
}

const players = ['floren', 'pau', 'sergio']

const Juego = ({ jugadores, onFin }) => {
  const { cards, loading } = useActiveCards()
  const [mazo, setMazo] = useState([])
  const [indice, setIndice] = useState(0)
  const [textoCarta, setTextoCarta] = useState('')

  useEffect(() => {
    if (!loading) {
      setMazo(barajar(cards))
      setIndice(0)
    }
  }, [cards, loading])

  useEffect(() => {
    if (mazo.length > 0 && indice < mazo.length) {
      const carta = mazo[indice]
      setTextoCarta(
        replacePlaceholders(carta.content, carta.placeholders || [], players)
      )
    }
  }, [mazo, indice])

  const siguienteCarta = () => {
    if (indice < mazo.length - 1) {
      setIndice(indice + 1)
    } else {
      onFin()
    }
  }

  return (
    <div className="p-4 flex flex-col justify-center items-center text-center min-h-screen">
      <div
        className={`w-full max-w-md text-white rounded-xl shadow-xl p-6 mb-6 transition-colors duration-300 ${
          fondos[indice % fondos.length]
        }`}
      >
        <h2 className="text-lg font-medium">{textoCarta}</h2>
      </div>
      <button
        className="bg-purple-600 hover:bg-purple-700 active:scale-95 text-white px-6 py-2 rounded-full shadow-md transition duration-300"
        onClick={siguienteCarta}
      >
        Siguiente
      </button>
    </div>
  )
}

export default Juego
