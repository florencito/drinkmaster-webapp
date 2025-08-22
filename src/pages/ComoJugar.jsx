import { useEffect } from 'react'
import howToPlay from '../../como-jugar.md?raw'

const applyInlineStyles = (text) =>
  text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')

const renderMarkdown = (markdown) => {
  const lines = markdown.split('\n')
  const elements = []
  let listItems = []
  let ordered = false

  const flushList = () => {
    if (listItems.length) {
      const ListTag = ordered ? 'ol' : 'ul'
      elements.push(
        <ListTag
          key={elements.length}
          className={`${ordered ? 'list-decimal' : 'list-disc'} ml-6 mb-4`}
        >
          {listItems.map((item, idx) => (
            <li key={idx} className="mb-1" dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ListTag>,
      )
      listItems = []
      ordered = false
    }
  }

  lines.forEach((line) => {
    if (line.startsWith('### ')) {
      flushList()
      elements.push(
        <h3 key={elements.length} className="text-xl font-semibold mt-4 mb-2">{line.slice(4)}</h3>,
      )
    } else if (line.startsWith('## ')) {
      flushList()
      elements.push(
        <h2 key={elements.length} className="text-2xl font-semibold mt-6 mb-2">{line.slice(3)}</h2>,
      )
    } else if (line.startsWith('# ')) {
      flushList()
      elements.push(
        <h1 key={elements.length} className="text-3xl font-bold mb-4">{line.slice(2)}</h1>,
      )
    } else if (line === '---') {
      flushList()
      elements.push(
        <hr key={elements.length} className="my-6 border-gray-500" />,
      )
    } else if (/^\d+\. /.test(line)) {
      if (!listItems.length || !ordered) {
        flushList()
        ordered = true
      }
      listItems.push(applyInlineStyles(line.replace(/^\d+\. /, '')))
    } else if (line.startsWith('- ')) {
      if (!listItems.length || ordered) {
        flushList()
        ordered = false
      }
      listItems.push(applyInlineStyles(line.slice(2)))
    } else if (line.trim() === '') {
      flushList()
    } else {
      flushList()
      elements.push(
        <p key={elements.length} className="mb-4" dangerouslySetInnerHTML={{ __html: applyInlineStyles(line) }} />,
      )
    }
  })

  flushList()
  return elements
}

const ComoJugar = () => {
  useEffect(() => {
    const html = document.documentElement
    const body = document.body
    const root = document.getElementById('root')

    const prevHtml = html.style.overflow
    const prevBody = body.style.overflow
    const prevRoot = root.style.overflow

    html.style.overflow = 'auto'
    body.style.overflow = 'auto'
    root.style.overflow = 'auto'

    return () => {
      html.style.overflow = prevHtml || 'hidden'
      body.style.overflow = prevBody || 'hidden'
      root.style.overflow = prevRoot || 'hidden'
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-900 via-purple-900 to-indigo-900 text-white flex flex-col p-6 pb-24">
      {/* Header */}
      <div className="mb-8 text-center animate-slide-up safe-area-top">
        <div className="text-6xl mb-4 animate-bounce-subtle">❓</div>
        <h1 className="heading-primary text-3xl mb-4">¿Cómo jugar?</h1>
        <p className="text-gray-300 text-lg">
          Todo lo que necesitas saber para disfrutar DrinkMaster
        </p>
      </div>

      {/* Content Card */}
      <div className="flex-1 overflow-y-auto w-full max-w-4xl mx-auto animate-slide-up stagger-delay-1">
        <div className="card p-8 text-left">
          <div className="prose prose-invert max-w-none">
            {renderMarkdown(howToPlay)}
          </div>
        </div>
      </div>
      
      {/* Action Button */}
      <div className="mt-8 text-center animate-slide-up stagger-delay-2">
        <button
          className="btn-primary px-8 py-4 focus-ring flex items-center justify-center gap-3 mx-auto"
          onClick={() => (window.location.href = '/')}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>Regresar al inicio</span>
        </button>
      </div>
    </div>
  )
}

export default ComoJugar

