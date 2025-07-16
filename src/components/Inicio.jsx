const Inicio = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-5xl font-extrabold tracking-wide mb-8 drop-shadow">DrinkMaster 🍻</h1>
      <button
        className="bg-green-500 hover:bg-green-600 active:scale-95 text-white px-8 py-3 rounded-full shadow-lg transition duration-300"
        onClick={onStart}
      >
        ¡Comenzar juego!
      </button>
    </div>
  )
}
  
  export default Inicio
