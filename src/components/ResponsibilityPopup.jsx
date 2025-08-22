import React from 'react'

const ResponsibilityPopup = ({ onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50 animate-fade-in p-4">
    <div className="card w-full max-w-sm p-6 text-center space-y-4 animate-slide-up border border-yellow-500/30">
      {/* Icon & Title */}
      <div>
        <div className="text-4xl mb-2 animate-bounce-subtle">⚠️</div>
        <h2 className="text-xl font-bold text-yellow-300 mb-1">¡Bienvenido a DrinkMaster!</h2>
        <p className="text-red-400 text-sm font-medium flex items-center justify-center gap-1">
          <span>🔞</span>
          <span>Solo +18 años</span>
        </p>
      </div>
      
      {/* Compact Warning Content */}
      <div className="glass rounded-xl p-4 space-y-3 text-sm">
        <div className="flex items-center gap-2 text-gray-200">
          <span>🎯</span>
          <span>El objetivo es divertirse, no perder el control</span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-200">
          <span>🤝</span>
          <span>Respeta límites propios y ajenos</span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-200">
          <span>🛡️</span>
          <span>Cuida de tu grupo siempre</span>
        </div>
      </div>
      
      {/* Fun Message - Compact */}
      <div className="glass rounded-xl p-3">
        <p className="text-green-400 text-sm font-medium flex items-center justify-center gap-2">
          <span>🎉</span>
          <span>¡Que comience la diversión (con moderación)!</span>
        </p>
      </div>
      
      {/* Action Button - Compact */}
      <button
        className="btn-primary w-full py-3 focus-ring flex items-center justify-center gap-2 animate-glow"
        onClick={onClose}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-sm">Entendido, jugaré responsablemente</span>
      </button>
    </div>
  </div>
)

export default ResponsibilityPopup
