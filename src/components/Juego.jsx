import { useState } from 'react'

const cartasEjemplo = [
  "Toma 2 si alguna vez has dicho 'ya casi llego' estando en la regadera.",
  "Elige a alguien para tomar contigo, sin preguntar por qué.",
  "Todos los que usen tenis blancos beben.",
  "Haz un brindis ridículo. Si no lo haces, tomas 2."
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
    <div className="p-4 flex flex-col justify-center items-center text-center h-screen">
      <h2 className="text-xl mb-6">{cartasEjemplo[cartaActual]}</h2>
      <button
        className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
        onClick={siguienteCarta}
      >
        Siguiente
      </button>
    </div>
  )
}

export default Juego
