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
    <div className="flex flex-col items-center justify-center min-h-dvh text-center px-6 animate-fade-zoom">
      {/* Hero Section */}
      <div className="mb-16 animate-slide-up">
        <div className="relative">
          {/* Floating celebration emojis */}
          <div className="absolute -top-10 -left-10 text-4xl animate-float" style={{animationDelay: '0s'}}>🎉</div>
          <div className="absolute -top-16 -right-8 text-3xl animate-float" style={{animationDelay: '0.5s'}}>🏆</div>
          <div className="absolute -top-6 left-16 text-2xl animate-float" style={{animationDelay: '1s'}}>✨</div>
          <div className="absolute -top-12 right-20 text-3xl animate-float" style={{animationDelay: '1.5s'}}>🛡️</div>
          
          <h1 className="heading-primary mb-6 animate-glow">
            Supervivencia Completada
          </h1>
          
          <div className="text-6xl mb-8 animate-bounce-subtle">🏆</div>
          
          <p className="heading-secondary max-w-md mx-auto mb-8">
            El desafío ha terminado. ¡Estos son los valientes supervivientes!
          </p>
        </div>
      </div>

      {/* Podium Card */}
      <div className="card card-hover p-8 w-full max-w-lg mb-8 animate-slide-up stagger-delay-1">
        <h3 className="text-xl font-semibold text-white mb-6">🏅 Clasificación Final</h3>
        <div className="space-y-4">
          {ranking.map((name, idx) => {
            const position = idx + 1
            const isWinner = idx === 0
            const isPodium = idx < 3
            
            return (
              <div
                key={name}
                className={`glass rounded-xl p-4 flex items-center justify-between animate-slide-up ${
                  isWinner ? 'border border-yellow-500/30 bg-yellow-500/10' : ''
                } ${isPodium && !isWinner ? 'border border-white/20' : ''}`}
                style={{ animationDelay: `${(idx + 2) * 100}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div className={`text-2xl ${
                    isWinner ? 'animate-bounce-subtle' : ''
                  }`}>
                    {idx === 0 && '🌟'}
                    {idx === 1 && '🥈'}
                    {idx === 2 && '🥉'}
                    {idx > 2 && `${position}.`}
                  </div>
                  <div className="text-left">
                    <div className={`font-semibold ${
                      isWinner ? 'text-yellow-300 text-lg' : 'text-white'
                    }`}>
                      {name}
                    </div>
                    <div className="text-xs text-gray-400">
                      {idx === 0 && 'Campeón 🏆'}
                      {idx === 1 && 'Subcampeón'}
                      {idx === 2 && 'Tercer lugar'}
                      {idx > 2 && `${position}º lugar`}
                    </div>
                  </div>
                </div>
                
                {isWinner && (
                  <div className="text-yellow-400 animate-glow">
                    🏆
                  </div>
                )}
              </div>
            )
          })}
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
          onClick={() => window.location.href = '/supervivencia'}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Jugar otra ronda</span>
        </button>
      </div>

      {/* Footer Message */}
      <div className="mt-16 animate-slide-up stagger-delay-4">
        <p className="text-gray-400 text-sm max-w-xs mx-auto opacity-80">
          ¡Gracias por jugar el modo supervivencia! 🛡️
        </p>
      </div>
    </div>
  )
}

export default SurvivalResults
