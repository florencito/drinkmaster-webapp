import { useEffect, useState } from 'react'
import supabase from '../supabaseClient'

const useActiveCards = (mode = 'normal') => {
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCards = async () => {
      console.log('Fetching cards from database...')
      
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
        setError(error)
      }
      setLoading(false)
    }

    fetchCards()
  }, [mode])

  return { cards, loading, error }
}

export default useActiveCards
