import React from 'react'

const SurvivalResults = ({ ranking = [] }) => {
  const handleClick = () => {
    window.location.href = '/'
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
