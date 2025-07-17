import { useEffect, useState } from 'react'
import supabase from './supabaseClient'

const Dashboard = () => {
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({
    content: '',
    type: '',
    mode: '',
    is_active: true,
  })
  const [form, setForm] = useState({
    content: '',
    type: '',
    mode: '',
    is_active: true,
  })

  const fetchCards = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('cards').select('id, content, type, mode, is_active')
    if (error) {
      setError('Error al cargar cartas')
      setCards([])
    } else {
      setCards(data || [])
      setError(null)
    }
    setLoading(false)
    setMessage(null)
  }

  useEffect(() => {
    fetchCards()
  }, [])

  const toggleActive = async (card) => {
    const { error } = await supabase
      .from('cards')
      .update({ is_active: !card.is_active })
      .eq('id', card.id)
    if (error) {
      setError('No se pudo actualizar la carta')
      return
    }
    setCards(
      cards.map((c) =>
        c.id === card.id ? { ...c, is_active: !c.is_active } : c,
      ),
    )
    setError(null)
    setMessage('Carta actualizada ✅')
    setTimeout(() => setMessage(null), 2000)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target
    setEditForm({ ...editForm, [name]: type === 'checkbox' ? checked : value })
  }

  const startEdit = (card) => {
    setEditingId(card.id)
    setEditForm({
      content: card.content,
      type: card.type,
      mode: card.mode,
      is_active: card.is_active,
    })
  }

  const cancelEdit = () => {
    setEditingId(null)
  }

  const saveEdit = async (id) => {
    const { error } = await supabase
      .from('cards')
      .update(editForm)
      .eq('id', id)
    if (error) {
      setError('No se pudo actualizar la carta')
      return
    }
    setCards(
      cards.map((c) => (c.id === id ? { ...c, ...editForm } : c)),
    )
    setEditingId(null)
    setError(null)
    setMessage('Carta actualizada ✅')
    setTimeout(() => setMessage(null), 2000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { error } = await supabase.from('cards').insert({
      content: form.content,
      type: form.type,
      mode: form.mode,
      is_active: form.is_active,
    })
    if (error) {
      setError('No se pudo agregar la carta')
      return
    }
    setForm({ content: '', type: '', mode: '', is_active: true })
    fetchCards()
    setMessage('Carta agregada ✅')
    setTimeout(() => setMessage(null), 2000)
  }

  return (
    <div className="p-4 min-h-screen bg-gradient-to-br from-fuchsia-900 via-purple-900 to-indigo-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      {error && <div className="text-red-300 mb-4">{error}</div>}
      {message && <div className="text-green-300 mb-4">{message}</div>}
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-left text-sm sm:text-base">
            <thead>
              <tr>
                <th className="p-2">Contenido</th>
                <th className="p-2">Tipo</th>
                <th className="p-2">Modo</th>
                <th className="p-2">Activa</th>
                <th className="p-2"></th>
              </tr>
            </thead>
            <tbody>
              {cards.map((card) => (
                <tr key={card.id} className="border-t border-purple-800">
                  {editingId === card.id ? (
                    <>
                      <td className="p-2">
                        <input
                          className="w-full rounded px-2 py-1 text-black"
                          name="content"
                          value={editForm.content}
                          onChange={handleEditChange}
                        />
                      </td>
                      <td className="p-2">
                        <input
                          className="w-full rounded px-2 py-1 text-black"
                          name="type"
                          value={editForm.type}
                          onChange={handleEditChange}
                        />
                      </td>
                      <td className="p-2">
                        <input
                          className="w-full rounded px-2 py-1 text-black"
                          name="mode"
                          value={editForm.mode}
                          onChange={handleEditChange}
                        />
                      </td>
                      <td className="p-2 text-center">
                        <input
                          type="checkbox"
                          name="is_active"
                          checked={editForm.is_active}
                          onChange={handleEditChange}
                        />
                      </td>
                      <td className="p-2 space-x-2 whitespace-nowrap">
                        <button
                          className="bg-green-600 hover:bg-green-700 px-2 py-1 rounded"
                          onClick={() => saveEdit(card.id)}
                        >
                          Guardar
                        </button>
                        <button
                          className="bg-gray-600 hover:bg-gray-700 px-2 py-1 rounded"
                          onClick={cancelEdit}
                        >
                          Cancelar
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-2">{card.content}</td>
                      <td className="p-2">{card.type}</td>
                      <td className="p-2">{card.mode}</td>
                      <td className="p-2 text-center">
                        <input
                          type="checkbox"
                          checked={card.is_active}
                          onChange={() => toggleActive(card)}
                        />
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <button
                          className="bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded"
                          onClick={() => startEdit(card)}
                        >
                          Editar
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <input
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Contenido"
            className="w-full rounded px-3 py-2 text-black"
            required
          />
        </div>
        <div>
          <input
            name="type"
            value={form.type}
            onChange={handleChange}
            placeholder="Tipo"
            className="w-full rounded px-3 py-2 text-black"
            required
          />
        </div>
        <div>
          <input
            name="mode"
            value={form.mode}
            onChange={handleChange}
            placeholder="Modo"
            className="w-full rounded px-3 py-2 text-black"
            required
          />
        </div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="is_active"
            checked={form.is_active}
            onChange={handleChange}
          />
          <span>Activa</span>
        </label>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Agregar carta
        </button>
      </form>
    </div>
  )
}

export default Dashboard
