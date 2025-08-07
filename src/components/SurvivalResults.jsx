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
      <div className="flex flex-col items-center justify-center min-h-dvh text-center px-4">
        <p className="text-xl animate-fade-in">
          <span className="mr-2">🥉</span>
          {ranking[2]}
        </p>
      </div>
    )
  }

  if (stage === 2 && ranking[1]) {
    return (
      <div className="flex flex-col items-center justify-center min-h-dvh text-center px-4">
        <p className="text-2xl animate-fade-in">
          <span className="mr-2">🥈</span>
          {ranking[1]}
        </p>
      </div>
    )
  }

  if (stage === 3 && ranking[0]) {
    return (
      <div className="flex flex-col items-center justify-center min-h-dvh text-center px-4">
        <p className="text-3xl font-bold text-yellow-300 animate-flash">
          <span className="mr-2">🌟</span>
          {ranking[0]}
        </p>
      </div>
    )
  }

  if (stage < 4) {
    return <div className="flex items-center justify-center min-h-dvh" />
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh text-center px-4 animate-fade-zoom">
      <h1 className="text-5xl font-extrabold mb-8 bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent animate-fade-in">
        ¡Podio Final! 🏆
      </h1>
      <ol className="w-full max-w-md mb-8 space-y-3">
        {ranking.map((name, idx) => (
          <li
            key={name}
            className={`px-6 py-3 rounded-full shadow-md flex items-center justify-center animate-fade-in-up ${
              idx === 0
                ? 'bg-yellow-500/20 text-yellow-300 text-xl font-bold'
                : 'bg-white/10 text-white'
            }`}
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            {idx === 0 && <span className="mr-2">🌟</span>}
            {idx === 1 && <span className="mr-2">🥈</span>}
            {idx === 2 && <span className="mr-2">🥉</span>}
            {idx > 2 && <span className="mr-2">{idx + 1}.</span>}
            {name}
          </li>
        ))}
      </ol>
      <button
        className="mt-4 flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full shadow-lg transition duration-300 animate-fade-in-up"
        onClick={handleClick}
      >
        <span className="text-xl">🏠</span>
        Regresar al inicio
      </button>
    </div>
  )
}

export default SurvivalResults
