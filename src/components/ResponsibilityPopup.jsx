import React from 'react'

const ResponsibilityPopup = ({ onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50 animate-fade-in p-6">
    <div className="card w-full max-w-lg p-8 text-center space-y-6 animate-slide-up border border-yellow-500/30">
      {/* Icon */}
      <div className="text-6xl mb-4 animate-bounce-subtle">⚠️</div>
      
      {/* Title */}
      <h2 className="heading-primary text-2xl text-yellow-300">¡Bienvenido a DrinkMaster!</h2>
      
      {/* Warning Content */}
      <div className="glass rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-center gap-2 text-red-400 font-semibold">
          <span className="text-xl">🔞</span>
          <span>Solo para mayores de 18 años</span>
        </div>
        
        <div className="space-y-3 text-gray-200">
          <p className="flex items-start gap-2">
            <span className="text-lg">🎯</span>
            <span>El objetivo es divertirse, no perder el control.</span>
          </p>
          
          <p className="flex items-start gap-2">
            <span className="text-lg">🤝</span>
            <span>Juega con responsabilidad y respeta tus límites y los de los demás.</span>
          </p>
          
          <p className="flex items-start gap-2">
            <span className="text-lg">🛡️</span>
            <span>Si decides participar, hazlo de manera consciente y cuida de tu grupo.</span>
          </p>
        </div>
      </div>
      
      {/* Fun Message */}
      <div className="glass rounded-xl p-4">
        <p className="font-semibold text-green-400 flex items-center justify-center gap-2">
          <span className="text-xl">🎉</span>
          <span>¡Que comience la diversión (con moderación)!</span>
        </p>
      </div>
      
      {/* Action Button */}
      <button
        className="btn-primary w-full py-4 focus-ring flex items-center justify-center gap-3 text-lg animate-glow"
        onClick={onClose}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Entendido, jugaré responsablemente</span>
      </button>
    </div>
  </div>
)

export default ResponsibilityPopup
