import { useEffect, useState } from 'react'
import cartasBase from '../data/cartas'

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

const personalizarCarta = (carta, jugadores) => {
  let texto = carta

  let indiceJugador = null
  if (texto.includes('{{player}}')) {
    indiceJugador = Math.floor(Math.random() * jugadores.length)
    const nombre = jugadores[indiceJugador]
    texto = texto.replace(/{{player}}/g, nombre)
  }

  if (texto.includes('{{other}}')) {
    const opciones = jugadores
      .map((_, i) => i)
      .filter((i) => i !== indiceJugador)
    const idx = opciones.length
      ? opciones[Math.floor(Math.random() * opciones.length)]
      : indiceJugador ?? 0
    const nombreOtro = jugadores[idx]
    texto = texto.replace(/{{other}}/g, nombreOtro)
  }

  texto = texto.replace(/{{all}}/g, 'todos')
  return texto
}

const Juego = ({ jugadores, onFin }) => {
  const [mazo, setMazo] = useState([])
  const [indice, setIndice] = useState(0)
  const [textoCarta, setTextoCarta] = useState('')

  useEffect(() => {
    const disponibles =
      jugadores.length > 1
        ? cartasBase
        : cartasBase.filter((c) => !c.includes('{{other}}'))
    setMazo(barajar(disponibles))
    setIndice(0)
  }, [jugadores])

  useEffect(() => {
    if (mazo.length > 0 && indice < mazo.length) {
      setTextoCarta(personalizarCarta(mazo[indice], jugadores))
    }
  }, [mazo, indice, jugadores])

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
