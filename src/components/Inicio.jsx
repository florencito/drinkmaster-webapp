const Inicio = ({ onStart }) => {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-4xl font-bold mb-6">DrinkMaster 🍻</h1>
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          onClick={onStart}
        >
          Empezar juego
        </button>
      </div>
    )
  }
  
  export default Inicio
  