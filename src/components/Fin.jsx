const Fin = ({ onReiniciar }) => {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-3xl font-bold mb-4">¡Fin del juego! 🥳</h1>
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          onClick={onReiniciar}
        >
          Volver al inicio
        </button>
      </div>
    )
  }
  
  export default Fin
  