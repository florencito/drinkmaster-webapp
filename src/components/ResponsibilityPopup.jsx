import React from 'react'

const ResponsibilityPopup = ({ onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 animate-fade-in">
    <div className="bg-white text-black w-11/12 max-w-md mx-auto p-6 rounded-lg shadow-lg text-center space-y-4 m-4 animate-fade-zoom">
      <h2 className="text-xl font-bold">¡Bienvenido a DrinkMaster!</h2>
      <p className="text-sm md:text-base">
        Este juego está diseñado para mayores de 18 años.
        Recuerda: el objetivo es divertirse, no perder el control.
      </p>
      <p className="text-sm md:text-base">
        Juega con responsabilidad, respeta tus límites y los de los demás.
        Si decides participar, hazlo de manera consciente y cuida de tu grupo.
      </p>
      <p className="font-semibold">¡Que comience la diversión (con moderación)!</p>
      <button
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full mt-2"
        onClick={onClose}
      >
        Entendido
      </button>
    </div>
  </div>
)

export default ResponsibilityPopup
