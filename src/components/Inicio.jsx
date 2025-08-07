const Inicio = ({ onStart, mode = 'normal' }) => {
  const startLabel = mode === 'hardcore' ? 'Modo Hardcore' : 'Modo Clásico'
  const startType = mode === 'hardcore' ? 'hardcore' : 'classic'

  const styles = {
    classic: 'bg-emerald-500 hover:bg-emerald-600',
    hardcore: 'bg-red-500 hover:bg-red-600',
    survival: 'bg-amber-500 hover:bg-amber-600',
    community: 'bg-blue-500 hover:bg-blue-600',
  }

  const icons = {
    classic: '🍹',
    hardcore: '🔥',
    survival: '🛡️',
    community: '🤝',
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh text-center px-4 animate-fade-zoom">
      <h1 className="text-5xl font-extrabold tracking-wide mb-8 drop-shadow">DrinkMaster 🍻</h1>
      <div className="space-y-4 w-full max-w-xs">
        <button
          className={`w-full ${styles[startType]} active:scale-95 text-white px-6 py-3 rounded-full shadow-lg transition duration-300 animate-fade-in-up`}
          style={{ animationDelay: '100ms' }}
          onClick={onStart}
        >
          <span className="mr-2">{icons[startType]}</span>
          {startLabel}
        </button>
        {mode === 'normal' && (
          <button
            className={`w-full ${styles.hardcore} active:scale-95 text-white px-6 py-3 rounded-full shadow-lg transition duration-300 animate-fade-in-up`}
            style={{ animationDelay: '200ms' }}
            onClick={() => (window.location.href = '/hardcore')}
          >
            <span className="mr-2">{icons.hardcore}</span>
            Modo Hardcore
          </button>
        )}
        <button
          className={`w-full ${styles.survival} active:scale-95 text-white px-6 py-3 rounded-full shadow-lg transition duration-300 animate-fade-in-up`}
          style={{ animationDelay: mode === 'normal' ? '300ms' : '200ms' }}
          onClick={() => (window.location.href = '/supervivencia')}
        >
          <span className="mr-2">{icons.survival}</span>
          Modo Supervivencia
        </button>
        <button
          className={`w-full ${styles.community} active:scale-95 text-white px-6 py-3 rounded-full shadow-lg transition duration-300 animate-fade-in-up`}
          style={{ animationDelay: mode === 'normal' ? '400ms' : '300ms' }}
          onClick={() => (window.location.href = '/comunidad')}
        >
          <span className="mr-2">{icons.community}</span>
          Modo Comunidad
        </button>
      </div>
    </div>
  )
}
  
  export default Inicio
