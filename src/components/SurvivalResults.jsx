import React, { useEffect, useState } from 'react'

const SurvivalResults = ({ ranking = [] }) => {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 0),
      setTimeout(() => setStage(2), 1000),
      setTimeout(() => setStage(3), 2000),
      setTimeout(() => setStage(4), 3000),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  const handleClick = () => {
    window.location.href = '/'
  }

  if (stage === 1 && ranking[2]) {
    return (
      <div className="flex flex-col items-center justify-center min-h-dvh text-center px-6">
        <div className="card p-8 animate-slide-up">
          <div className="text-6xl mb-4 animate-bounce-subtle">🥉</div>
          <p className="text-2xl font-semibold text-white">
            Tercer lugar
          </p>
          <p className="text-xl text-gray-300 mt-2">{ranking[2]}</p>
        </div>
      </div>
    )
  }

  if (stage === 2 && ranking[1]) {
    return (
      <div className="flex flex-col items-center justify-center min-h-dvh text-center px-6">
        <div className="card p-8 animate-slide-up">
          <div className="text-6xl mb-4 animate-bounce-subtle">🥈</div>
          <p className="text-2xl font-semibold text-white">
            Segundo lugar
          </p>
          <p className="text-xl text-gray-300 mt-2">{ranking[1]}</p>
        </div>
      </div>
    )
  }

  if (stage === 3 && ranking[0]) {
    return (
      <div className="flex flex-col items-center justify-center min-h-dvh text-center px-6">
        <div className="card p-12 animate-slide-up border-yellow-500/30">
          <div className="text-8xl mb-6 animate-glow">🏆</div>
          <h2 className="heading-primary text-3xl mb-4 text-yellow-300">
            ¡GANADOR!
          </h2>
          <p className="text-2xl font-bold text-white animate-bounce-subtle">{ranking[0]}</p>
          <div className="mt-6 text-yellow-300 animate-float">
            ✨ ¡Superviviente supremo! ✨
          </div>
        </div>
      </div>
    )
  }

  if (stage < 4) {
    return <div className="flex items-center justify-center min-h-dvh" />
  }

  return (
    <div className="flex flex-col items-center justify-between min-h-dvh text-center px-4 py-6 animate-fade-zoom">
      {/* Hero Section - Compact */}
      <div className="animate-slide-up">
        <h1 className="text-2xl font-bold text-white mb-2 animate-glow">
          ¡Supervivencia Completada!
        </h1>
        <div className="text-4xl mb-3 animate-bounce-subtle">🏆</div>
        <p className="text-gray-300 text-sm max-w-xs mx-auto">
          El desafío ha terminado
        </p>
      </div>

      {/* Podium Card - Compact with Scroll */}
      <div className="card p-4 w-full max-w-sm animate-slide-up stagger-delay-1">
        <h3 className="text-lg font-semibold text-white mb-4">🏅 Clasificación Final</h3>
        
        {/* Winner Spotlight */}
        {ranking[0] && (
          <div className="glass rounded-xl p-3 mb-4 border border-yellow-500/30 bg-yellow-500/10">
            <div className="flex items-center justify-center gap-2">
              <div className="text-2xl animate-bounce-subtle">🌟</div>
              <div>
                <div className="text-yellow-300 font-bold text-lg">{ranking[0]}</div>
                <div className="text-xs text-yellow-400">Campeón 🏆</div>
              </div>
              <div className="text-yellow-400 animate-glow">🏆</div>
            </div>
          </div>
        )}
        
        {/* Rest of Rankings - Horizontal Scroll */}
        {ranking.length > 1 && (
          <div className="space-y-2 max-h-32 overflow-y-auto scrollbar-hide">
            {ranking.slice(1).map((name, idx) => {
              const position = idx + 2
              const actualIdx = idx + 1
              
              return (
                <div
                  key={name}
                  className={`glass rounded-lg p-2 flex items-center justify-between animate-slide-up ${
                    actualIdx < 3 ? 'border border-white/20' : ''
                  }`}
                  style={{ animationDelay: `${(actualIdx + 2) * 100}ms` }}
                >
                  <div className="flex items-center gap-2">
                    <div className="text-lg">
                      {actualIdx === 1 && '🥈'}
                      {actualIdx === 2 && '🥉'}
                      {actualIdx > 2 && `${position}.`}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-white text-sm">
                        {name}
                      </div>
                      <div className="text-xs text-gray-400">
                        {actualIdx === 1 && 'Subcampeón'}
                        {actualIdx === 2 && 'Tercer lugar'}
                        {actualIdx > 2 && `${position}º lugar`}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Action Buttons - Compact */}
      <div className="w-full max-w-sm space-y-3">
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
          onClick={() => window.location.href = '/supervivencia'}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Otra ronda</span>
        </button>
        
        {/* Footer Message - Very compact */}
        <p className="text-gray-400 text-xs opacity-80 animate-slide-up stagger-delay-4 mt-2">
          ¡Gracias por jugar! 🛡️
        </p>
      </div>
    </div>
  )
}

export default SurvivalResults
