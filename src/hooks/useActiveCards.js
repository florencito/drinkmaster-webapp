import { useEffect, useState } from 'react'
// Use the preconfigured client with credentials
import { supabase } from '../lib/supabaseClient'

const useActiveCards = () => {
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCards = async () => {
      const { data, error } = await supabase
        .from('cards')
        .select('content, placeholders')
        .eq('is_active', true)

      if (!error) setCards(data || [])
      else console.error('Error fetching cards', error)
      setLoading(false)
    }

    fetchCards()
  }, [])

  return { cards, loading }
}

export default useActiveCards
