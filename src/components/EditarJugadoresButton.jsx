import { useState } from 'react'
import EditarJugadoresPopup from './EditarJugadoresPopup'

const EditarJugadoresButton = ({ players = [], onPlayersChange }) => {
  const [showEdit, setShowEdit] = useState(false)

  const handleSave = (nombres) => {
    sessionStorage.setItem('players', JSON.stringify(nombres))
    if (onPlayersChange) onPlayersChange(nombres)
    setShowEdit(false)
  }

  return (
    <>
      <button
        className="fixed bottom-6 right-6 glass p-4 rounded-2xl shadow-xl text-white hover:scale-110 active:scale-95 transition-all duration-200 focus-ring animate-float z-40"
        onClick={() => setShowEdit(true)}
        title="Editar jugadores"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </button>
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

