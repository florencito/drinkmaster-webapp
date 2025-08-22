import { useState } from 'react'
import EditarJugadoresPopup from './EditarJugadoresPopup'

const EditarJugadoresButton = ({ players = [], onPlayersChange, className = "" }) => {
  const [showEdit, setShowEdit] = useState(false)

  const handleSave = (nombres) => {
    sessionStorage.setItem('players', JSON.stringify(nombres))
    if (onPlayersChange) onPlayersChange(nombres)
    setShowEdit(false)
  }

  return (
    <>
      {/* Zona segura que previene overlaps */}
      <div className="fixed bottom-0 right-0 p-6 pointer-events-none z-30">
        <button
          className={`glass p-4 rounded-2xl shadow-xl text-white hover:scale-110 active:scale-95 transition-all duration-200 focus-ring animate-float pointer-events-auto group ${className}`}
          onClick={() => setShowEdit(true)}
          title="Editar jugadores"
        >
          <svg className="w-6 h-6 group-hover:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          
          {/* Indicador sutil de funcionalidad */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary-500 rounded-full opacity-80 group-hover:scale-125 transition-all duration-200"></div>
        </button>
      </div>
      
      {showEdit && (
        <EditarJugadoresPopup
          players={players}
          onClose={() => setShowEdit(false)}
          onSave={handleSave}
        />
      )}
    </>
  )
}

export default EditarJugadoresButton

