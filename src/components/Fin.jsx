const Fin = ({ onReiniciar }) => {
  const handleClick = () => {
    if (onReiniciar) onReiniciar()
    window.location.href = '/'
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh text-center px-4 animate-fade-zoom">
      <h1 className="text-5xl font-extrabold mb-8 bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent animate-fade-in">
        ¡Fin del juego! 🎉
      </h1>
      <button
        className="mt-4 flex items-center gap-2 bg-purple-600 hover:bg-purple-700 active:scale-95 text-white px-8 py-4 rounded-full shadow-lg transition duration-300 animate-fade-in-up"
        onClick={handleClick}
      >
        <span className="text-xl">🏠</span>
        Regresar al inicio
      </button>
    </div>
  )
}
  
  export default Fin
