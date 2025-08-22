const Fin = ({ onReiniciar }) => {
  const handleClick = () => {
    if (onReiniciar) onReiniciar()
    window.location.href = '/'
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh text-center px-6 animate-fade-zoom">
      {/* Celebration Section */}
      <div className="mb-16 animate-slide-up">
        <div className="relative">
          {/* Floating celebration emojis */}
          <div className="absolute -top-10 -left-10 text-4xl animate-float" style={{animationDelay: '0s'}}>🎉</div>
          <div className="absolute -top-16 -right-8 text-3xl animate-float" style={{animationDelay: '0.5s'}}>🎆</div>
          <div className="absolute -top-6 left-16 text-2xl animate-float" style={{animationDelay: '1s'}}>✨</div>
          <div className="absolute -top-12 right-20 text-3xl animate-float" style={{animationDelay: '1.5s'}}>🎊</div>
          
          <h1 className="heading-primary mb-6 animate-glow">
            ¡Fin del juego!
          </h1>
          
          <div className="text-8xl mb-8 animate-bounce-subtle">🎉</div>
          
          <p className="heading-secondary max-w-md mx-auto mb-8">
            ¡Esperamos que se hayan divertido! ¿Listos para otra ronda?
          </p>
        </div>
      </div>

      {/* Stats Card */}
      <div className="card card-hover p-8 w-full max-w-md mb-8 animate-slide-up stagger-delay-1">
        <h3 className="text-xl font-semibold text-white mb-4">¡Partida completada!</h3>
        <div className="grid grid-cols-1 gap-4 text-center">
          <div className="glass rounded-xl p-4">
            <div className="text-2xl font-bold text-primary-400 mb-1">✓</div>
            <div className="text-sm text-gray-300">Juego terminado</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4 w-full max-w-sm">
        <button
          className="btn-primary w-full text-lg py-4 focus-ring flex items-center justify-center gap-3 animate-slide-up stagger-delay-2"
          onClick={handleClick}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>Regresar al inicio</span>
        </button>
        
        <button
          className="btn-secondary w-full py-3 focus-ring flex items-center justify-center gap-3 animate-slide-up stagger-delay-3"
          onClick={() => window.location.reload()}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Jugar de nuevo</span>
        </button>
      </div>

      {/* Footer Message */}
      <div className="mt-16 animate-slide-up stagger-delay-4">
        <p className="text-gray-400 text-sm max-w-xs mx-auto opacity-80">
          ¡Gracias por jugar DrinkMaster! 🍻
        </p>
      </div>
    </div>
  )
}
  
  export default Fin
