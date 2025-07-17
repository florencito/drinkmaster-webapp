import { useEffect, useState } from 'react'
import supabase from './supabaseClient'

const Dashboard = () => {
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
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
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
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
  }

  return (
    <div className="p-4 min-h-screen bg-gradient-to-br from-fuchsia-900 via-purple-900 to-indigo-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      {error && <div className="text-red-300 mb-4">{error}</div>}
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table className="w-full text-left mb-8">
          <thead>
            <tr>
              <th className="p-2">Contenido</th>
              <th className="p-2">Tipo</th>
              <th className="p-2">Modo</th>
              <th className="p-2">Activa</th>
            </tr>
          </thead>
          <tbody>
            {cards.map((card) => (
              <tr key={card.id} className="border-t border-purple-800">
                <td className="p-2">{card.content}</td>
                <td className="p-2">{card.type}</td>
                <td className="p-2">{card.mode}</td>
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={card.is_active}
                    onChange={() => toggleActive(card)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
