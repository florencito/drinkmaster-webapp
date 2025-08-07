import { useState } from 'react'
import supabase from '../supabaseClient'

const useTriviaQuestion = () => {
  const [question, setQuestion] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [pools, setPools] = useState({})

  const fetchQuestion = async (category, difficulty) => {
    setLoading(true)
    setQuestion(null)
    setError(null)
    const key = `${category}-${difficulty}`
    let pool = pools[key] || []
    if (pool.length === 0) {
      const { data, error } = await supabase
        .from('survival_questions')
        .select('id, question, options, answer, explanation')
        .eq('category', category)
        .eq('difficulty', difficulty)
      if (error) {
        setError(error)
        setLoading(false)
        return { success: false }
      }
      pool = data || []
    }
    if (pool.length === 0) {
      setLoading(false)
      return { success: false, noQuestions: true }
    }
    const index = Math.floor(Math.random() * pool.length)
    const selected = pool[index]
    const remaining = [...pool.slice(0, index), ...pool.slice(index + 1)]
    setPools({ ...pools, [key]: remaining })
    setQuestion(selected)
    setLoading(false)
    return { success: true }
  }

  return { question, loading, error, fetchQuestion }
}

export default useTriviaQuestion
