import React from 'react'

const Hardcore = () => (
  <div className="min-h-screen bg-gradient-to-br from-fuchsia-900 via-purple-900 to-indigo-900 text-white flex flex-col items-center justify-center text-center p-4">
    <h1 className="text-2xl font-bold mb-6">Estamos trabajando para traerte más modos de juego.</h1>
    <button
      className="bg-blue-500 hover:bg-blue-600 active:scale-95 text-white px-6 py-3 rounded-full shadow-md transition"
      onClick={() => (window.location.href = '/')}
    >
      Regresar al inicio
    </button>
  </div>
)

export default Hardcore
