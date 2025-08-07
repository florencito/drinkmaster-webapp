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
    <div className="flex flex-col items-center justify-center min-h-dvh text-center px-4">
      <h1 className="text-3xl font-bold mb-6">Podio Final 🏆</h1>
      <ol className="w-full max-w-md mb-6 space-y-2">
        {ranking.map((name, idx) => (
          <li
            key={name}
            className={
              idx === 0
                ? 'text-2xl font-bold text-yellow-300 flex items-center justify-center'
                : 'text-xl'
            }
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
        className="bg-blue-500 hover:bg-blue-600 active:scale-95 text-white px-8 py-3 rounded-full shadow-md transition duration-300"
        onClick={handleClick}
      >
        Volver al inicio
      </button>
    </div>
  )
}

export default SurvivalResults
