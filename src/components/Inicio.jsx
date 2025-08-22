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
    <div className="flex flex-col items-center justify-center min-h-dvh text-center px-6 animate-fade-zoom">
      {/* Hero Section */}
      <div className="mb-16 animate-slide-up">
        <div className="relative">
          <h1 className="heading-primary mb-4 animate-float">DrinkMaster</h1>
          <div className="text-6xl mb-6 animate-glow">🍻</div>
          <p className="heading-secondary max-w-md mx-auto">
            ¡Prepárate para la diversión! Elige tu modo de juego y vive una experiencia única.
          </p>
        </div>
      </div>

      {/* Game Mode Cards */}
      <div className="grid gap-6 w-full max-w-md">
        <div className="card card-hover p-6 animate-slide-up stagger-delay-1">
          <button
            className={`btn-game w-full ${styles[startType]} focus-ring`}
            onClick={onStart}
          >
            <span className="text-2xl mr-3">{icons[startType]}</span>
            <span className="font-semibold">{startLabel}</span>
          </button>
        </div>

        {mode === 'normal' && (
          <div className="card card-hover p-6 animate-slide-up stagger-delay-2">
            <button
              className={`btn-game w-full ${styles.hardcore} focus-ring`}
              onClick={() => (window.location.href = '/hardcore')}
            >
              <span className="text-2xl mr-3">{icons.hardcore}</span>
              <span className="font-semibold">Modo Hardcore</span>
            </button>
          </div>
        )}

        <div className="card card-hover p-6 animate-slide-up stagger-delay-3">
          <button
            className={`btn-game w-full ${styles.survival} focus-ring`}
            onClick={() => (window.location.href = '/supervivencia')}
          >
            <span className="text-2xl mr-3">{icons.survival}</span>
            <span className="font-semibold">Modo Supervivencia</span>
          </button>
        </div>

        <div className="card card-hover p-6 animate-slide-up stagger-delay-4">
          <button
            className={`btn-game w-full ${styles.info} focus-ring`}
            onClick={() => (window.location.href = '/como-jugar')}
          >
            <span className="text-2xl mr-3">{icons.info}</span>
            <span className="font-semibold">¿Cómo jugar?</span>
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-16 animate-slide-up stagger-delay-4">
        <p className="text-gray-300 text-sm max-w-xs mx-auto opacity-80">
          ¡Juega responsablemente y diviértete con amigos!
        </p>
      </div>
    </div>
  )
}
  
  export default Inicio
