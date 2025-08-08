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
        className="fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg text-xl"
        onClick={() => setShowEdit(true)}
      >
        ✏️
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

