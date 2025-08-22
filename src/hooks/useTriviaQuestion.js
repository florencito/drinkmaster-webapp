import { useState } from 'react'
import supabase from '../supabaseClient'

// Mock questions para desarrollo
const mockQuestions = {
  'cine y tv-fácil': [
    {
      id: 1,
      question: '¿Cuál es el nombre del protagonista de la serie "Friends"?',
      options: ['Ross', 'Chandler', 'Joey', 'Todos son protagonistas'],
      answer: 'Todos son protagonistas',
      explanation: 'Friends es un ensemble cast donde todos los personajes principales son protagonistas.'
    },
    {
      id: 2,
      question: '¿En qué año se estrenó la primera película de "Star Wars"?',
      options: ['1975', '1977', '1979', '1980'],
      answer: '1977',
      explanation: 'La primera película de Star Wars (Episodio IV) se estrenó en 1977.'
    }
  ],
  'cultura general-fácil': [
    {
      id: 3,
      question: '¿Cuál es la capital de Francia?',
      options: ['Londres', 'Madrid', 'París', 'Roma'],
      answer: 'París',
      explanation: 'París es la capital y ciudad más poblada de Francia.'
    }
  ],
  'deportes-fácil': [
    {
      id: 4,
      question: '¿Cada cuántos años se celebran los Juegos Olímpicos?',
      options: ['2 años', '3 años', '4 años', '5 años'],
      answer: '4 años',
      explanation: 'Los Juegos Olímpicos se celebran cada 4 años.'
    }
  ]
}

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
      if (!supabase) {
        // Use mock data if Supabase is not configured
        console.log('Using mock trivia questions for development')
        pool = mockQuestions[key] || mockQuestions['cultura general-fácil'] || []
      } else {
        try {
          const { data, error } = await supabase
            .from('questions_survival')
            .select('id, question, options, answer, explanation')
            .eq('category', category)
            .eq('difficulty', difficulty)
            
          if (error) {
            console.error('Error fetching trivia questions:', error)
            // Fallback to mock data
            pool = mockQuestions[key] || mockQuestions['cultura general-fácil'] || []
          } else {
            pool = data || []
          }
        } catch (err) {
          console.error('Error connecting to database:', err)
          pool = mockQuestions[key] || mockQuestions['cultura general-fácil'] || []
        }
      }
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
