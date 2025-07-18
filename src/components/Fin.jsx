const Fin = ({ onReiniciar }) => {
  const handleClick = () => {
    if (onReiniciar) onReiniciar()
    window.location.href = '/'
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh text-center px-4">
      <h1 className="text-3xl font-bold mb-6">¡Fin del juego! 🥳</h1>
      <button
        className="bg-blue-500 hover:bg-blue-600 active:scale-95 text-white px-8 py-3 rounded-full shadow-md transition duration-300"
        onClick={handleClick}
      >
        Volver al inicio
      </button>
    </div>
  )
}
  
  export default Fin
