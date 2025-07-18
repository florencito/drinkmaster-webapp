const Inicio = ({ onStart, mode = 'normal' }) => {
  const startLabel = mode === 'hardcore' ? 'Modo Hardcore' : 'Modo Clásico'
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-5xl font-extrabold tracking-wide mb-8 drop-shadow">DrinkMaster 🍻</h1>
      <div className="space-y-4 w-full max-w-xs">
        <button
          className="w-full bg-green-500 hover:bg-green-600 active:scale-95 text-white px-6 py-3 rounded-full shadow-lg transition duration-300"
          onClick={onStart}
        >
          {startLabel}
        </button>
        <button
          className="w-full bg-green-500 hover:bg-green-600 active:scale-95 text-white px-6 py-3 rounded-full shadow-lg transition duration-300"
          onClick={() => (window.location.href = '/hardcore')}
        >
          Modo Hardcore
        </button>
        <button
          className="w-full bg-green-500 hover:bg-green-600 active:scale-95 text-white px-6 py-3 rounded-full shadow-lg transition duration-300"
          onClick={() => (window.location.href = '/supervivencia')}
        >
          Modo Supervivencia
        </button>
        <button
          className="w-full bg-green-500 hover:bg-green-600 active:scale-95 text-white px-6 py-3 rounded-full shadow-lg transition duration-300"
          onClick={() => (window.location.href = '/comunidad')}
        >
          Modo Comunidad
        </button>
      </div>
    </div>
  )
}
  
  export default Inicio
