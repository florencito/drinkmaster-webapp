const Inicio = ({ onStart, mode = 'normal' }) => {
  const startLabel = mode === 'hardcore' ? 'Modo Hardcore' : 'Modo Clásico'
  const startType = mode === 'hardcore' ? 'hardcore' : 'classic'

  const gameMode = {
    classic: {
      icon: '🍹',
      title: 'Clásico',
      description: 'Diversión clásica',
      gradient: 'from-emerald-400 to-emerald-600',
      action: onStart
    },
    hardcore: {
      icon: '🔥',
      title: 'Hardcore',
      description: 'Para valientes',
      gradient: 'from-red-400 to-red-600',
      action: () => (window.location.href = '/hardcore')
    },
    survival: {
      icon: '🛡️',
      title: 'Supervivencia',
      description: 'El último en pie',
      gradient: 'from-amber-400 to-amber-600',
      action: () => (window.location.href = '/supervivencia')
    },
    info: {
      icon: '❓',
      title: '¿Cómo jugar?',
      description: 'Aprende las reglas',
      gradient: 'from-blue-400 to-blue-600',
      action: () => (window.location.href = '/como-jugar')
    }
  }

  const modes = mode === 'normal' 
    ? [gameMode.classic, gameMode.hardcore, gameMode.survival, gameMode.info]
    : [gameMode[startType], gameMode.survival, gameMode.info]

  return (
    <div className="flex flex-col items-center justify-between min-h-dvh text-center px-4 py-8 animate-fade-zoom">
      {/* Hero Section - Elegant */}
      <div className="animate-slide-up space-y-4">
        {/* Title with vibrant blue gradient like florenApps */}
        <div className="relative mb-2">
          {/* Main title with vibrant blue gradient */}
          <h1 className="relative text-5xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent mb-3 animate-float z-10">
            DrinkMaster
          </h1>
          
          {/* Multiple glow layers for depth */}
          <div className="absolute inset-0 text-5xl md:text-6xl font-black blur-2xl opacity-30 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent animate-pulse">
            DrinkMaster
          </div>
          <div className="absolute inset-0 text-5xl md:text-6xl font-black blur-xl opacity-40 bg-gradient-to-r from-cyan-300 via-blue-400 to-blue-500 bg-clip-text text-transparent">
            DrinkMaster
          </div>
          <div className="absolute inset-0 text-5xl md:text-6xl font-black blur-lg opacity-20 bg-gradient-to-r from-blue-300 to-blue-700 bg-clip-text text-transparent">
            DrinkMaster
          </div>
          
          {/* Subtle background glow */}
          <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 h-20 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent blur-3xl"></div>
        </div>
        
        {/* Elegant subtitle */}
        <p className="text-gray-300 text-base max-w-sm mx-auto leading-relaxed">
          Elige tu aventura y vive momentos únicos
        </p>
      </div>

      {/* Game Modes - Elegant List Design */}
      <div className="w-full max-w-sm space-y-4 animate-slide-up stagger-delay-1">
        {modes.map((modeData, index) => (
          <div key={modeData.title} className="card card-hover animate-slide-up" style={{animationDelay: `${(index + 1) * 100}ms`}}>
            <button
              className="w-full p-6 flex items-center gap-4 text-left focus-ring rounded-2xl group transition-all duration-300"
              onClick={modeData.action}
            >
              {/* Icon with gradient background */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${modeData.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-2xl filter drop-shadow-sm">{modeData.icon}</span>
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white group-hover:text-primary-300 transition-colors duration-300">
                  {modeData.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {modeData.description}
                </p>
              </div>
              
              {/* Arrow indicator */}
              <div className="text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>
        ))}
      </div>

      {/* Footer - Elegant */}
      <div className="animate-slide-up stagger-delay-4 space-y-3">
        <div className="glass rounded-xl px-4 py-2">
          <p className="text-gray-400 text-xs opacity-80 flex items-center justify-center gap-2">
            <span>🍻</span>
            <span>Juega responsablemente y diviértete</span>
          </p>
        </div>
      </div>
    </div>
  )
}
  
  export default Inicio
