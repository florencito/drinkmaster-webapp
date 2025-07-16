import { useState } from 'react'

const cartasEjemplo = [
  "Toma 2 si alguna vez has dicho 'ya casi llego' estando en la regadera.",
  "Elige a alguien para tomar contigo, sin preguntar por qué.",
  "Todos los que usen tenis blancos beben.",
  "Haz un brindis ridículo. Si no lo haces, tomas 2."
]

const fondos = [
  'bg-gradient-to-br from-pink-500 to-fuchsia-600',
  'bg-gradient-to-br from-emerald-500 to-lime-500',
  'bg-gradient-to-br from-sky-500 to-indigo-500',
  'bg-gradient-to-br from-amber-500 to-orange-600',
]

const Juego = ({ onFin }) => {
  const [cartaActual, setCartaActual] = useState(0)

  const siguienteCarta = () => {
    if (cartaActual < cartasEjemplo.length - 1) {
      setCartaActual(cartaActual + 1)
    } else {
      onFin()
    }
  }

  return (
    <div className="p-4 flex flex-col justify-center items-center text-center min-h-screen">
      <div
        className={`w-full max-w-md text-white rounded-xl shadow-xl p-6 mb-6 transition-colors duration-300 ${fondos[cartaActual % fondos.length]}`}
      >
        <h2 className="text-lg font-medium">{cartasEjemplo[cartaActual]}</h2>
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

