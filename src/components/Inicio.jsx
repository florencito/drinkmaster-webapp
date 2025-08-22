const Inicio = ({ onStart, mode = 'normal' }) => {
  const startLabel = mode === 'hardcore' ? 'Modo Hardcore' : 'Modo Clásico'
  const startType = mode === 'hardcore' ? 'hardcore' : 'classic'

  const styles = {
    classic: 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-emerald-500/25 hover:shadow-emerald-500/40 focus:ring-emerald-500/30',
    hardcore: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-red-500/25 hover:shadow-red-500/40 focus:ring-red-500/30',
    survival: 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-amber-500/25 hover:shadow-amber-500/40 focus:ring-amber-500/30',
    info: 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-primary-500/25 hover:shadow-primary-500/40 focus:ring-primary-500/30',
  }

  const icons = {
    classic: '🍹',
    hardcore: '🔥',
    survival: '🛡️',
    info: '❓',
  }

  return (
    <div className="flex flex-col items-center justify-between min-h-dvh text-center px-4 py-6 animate-fade-zoom">
      {/* Hero Section - Compact */}
      <div className="animate-slide-up">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent mb-2 animate-float">DrinkMaster</h1>
        <div className="text-4xl mb-3 animate-glow">🍻</div>
        <p className="text-gray-300 text-sm max-w-xs mx-auto">
          ¡Elige tu modo y vive la diversión!
        </p>
      </div>

      {/* Game Mode Cards - Grid 2x2 for mobile */}
      <div className="w-full max-w-sm">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="card card-hover p-3 animate-slide-up stagger-delay-1">
            <button
              className={`btn-game w-full ${styles[startType]} focus-ring py-4 flex flex-col items-center gap-2`}
              onClick={onStart}
            >
              <span className="text-2xl">{icons[startType]}</span>
              <span className="text-xs font-medium">{startLabel}</span>
            </button>
          </div>

          {mode === 'normal' && (
            <div className="card card-hover p-3 animate-slide-up stagger-delay-2">
              <button
                className={`btn-game w-full ${styles.hardcore} focus-ring py-4 flex flex-col items-center gap-2`}
                onClick={() => (window.location.href = '/hardcore')}
              >
                <span className="text-2xl">{icons.hardcore}</span>
                <span className="text-xs font-medium">Hardcore</span>
              </button>
            </div>
          )}

          <div className="card card-hover p-3 animate-slide-up stagger-delay-3">
            <button
              className={`btn-game w-full ${styles.survival} focus-ring py-4 flex flex-col items-center gap-2`}
              onClick={() => (window.location.href = '/supervivencia')}
            >
              <span className="text-2xl">{icons.survival}</span>
              <span className="text-xs font-medium">Supervivencia</span>
            </button>
          </div>

          <div className="card card-hover p-3 animate-slide-up stagger-delay-4">
            <button
              className={`btn-game w-full ${styles.info} focus-ring py-4 flex flex-col items-center gap-2`}
              onClick={() => (window.location.href = '/como-jugar')}
            >
              <span className="text-2xl">{icons.info}</span>
              <span className="text-xs font-medium">¿Cómo jugar?</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Info - Compact */}
      <div className="animate-slide-up stagger-delay-4">
        <p className="text-gray-400 text-xs max-w-xs mx-auto opacity-80">
          ¡Juega responsablemente y diviértete!
        </p>
      </div>
    </div>
  )
}
  
  export default Inicio
