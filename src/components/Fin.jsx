const Fin = ({ onReiniciar }) => {
  const handleClick = () => {
    if (onReiniciar) onReiniciar()
    window.location.href = '/'
  }

  return (
    <div className="flex flex-col items-center justify-between min-h-dvh text-center px-4 py-6 animate-fade-zoom">
      {/* Celebration Section - Compact */}
      <div className="animate-slide-up">
        <h1 className="text-3xl font-bold text-white mb-3 animate-glow">
          ¡Fin del juego!
        </h1>
        <div className="text-5xl mb-4 animate-bounce-subtle">🎉</div>
        <p className="text-gray-300 text-sm max-w-xs mx-auto">
          ¡Esperamos que se hayan divertido!
        </p>
      </div>

      {/* Stats Card - Compact */}
      <div className="card p-6 w-full max-w-sm animate-slide-up stagger-delay-1">
        <div className="text-center">
          <div className="glass rounded-xl p-4">
            <div className="text-3xl font-bold text-primary-400 mb-2">✓</div>
            <div className="text-lg font-semibold text-white mb-1">¡Partida completada!</div>
            <div className="text-sm text-gray-300">Juego terminado con éxito</div>
          </div>
        </div>
      </div>

      {/* Action Buttons - Compact */}
      <div className="w-full max-w-sm space-y-4">
        <button
          className="btn-primary w-full py-4 focus-ring flex items-center justify-center gap-3 animate-slide-up stagger-delay-2"
          onClick={handleClick}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>Inicio</span>
        </button>
        
        <button
          className="btn-secondary w-full py-3 focus-ring flex items-center justify-center gap-3 animate-slide-up stagger-delay-3"
          onClick={() => window.location.reload()}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Jugar de nuevo</span>
        </button>
        
        {/* Footer Message - Very compact */}
        <p className="text-gray-400 text-xs opacity-80 animate-slide-up stagger-delay-4 mt-4">
          ¡Gracias por jugar DrinkMaster! 🍻
        </p>
      </div>
    </div>
  )
}
  
  export default Fin
