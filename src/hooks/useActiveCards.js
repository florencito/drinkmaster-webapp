import { useEffect, useState } from 'react'
import supabase from '../supabaseClient'

// Mock data para desarrollo
const mockCards = [
  { content: 'El jugador {player} debe beber', placeholders: ['player'] },
  { content: 'Todos beben excepto {player}', placeholders: ['player'] },
  { content: '{player1} y {player2} intercambian lugares', placeholders: ['player1', 'player2'] },
  { content: 'El último en tocar su nariz bebe', placeholders: [] },
  { content: '{player} elige a alguien para que beba', placeholders: ['player'] },
]

const useActiveCards = (mode = 'normal') => {
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCards = async () => {
      console.log('Fetching cards from database...')
      
      if (!supabase) {
        // Use mock data if Supabase is not configured
        console.log('Using mock cards for development')
        setCards(mockCards)
        setLoading(false)
        return
      }
      
      try {
        const { data, error } = await supabase
          .from('cards')
          .select('content, placeholders')
          .eq('is_active', true)
          .eq('mode', mode)

        if (!error) {
          console.log('Cards fetched successfully:', data)
          setCards(data || [])
          setError(null)
        } else {
          console.error('Error fetching cards:', error)
          // Fallback to mock data on error
          setCards(mockCards)
          setError(null)
        }
      } catch (err) {
        console.error('Error connecting to database:', err)
        setCards(mockCards)
        setError(null)
      }
      setLoading(false)
    }

    fetchCards()
  }, [mode])

  return { cards, loading, error }
}

export default useActiveCards
