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
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-900 via-purple-900 to-indigo-900 text-white flex flex-col p-4">
      <div className="flex-1 overflow-y-auto w-full max-w-3xl mx-auto bg-black bg-opacity-20 p-6 rounded-lg text-left">
        {renderMarkdown(howToPlay)}
      </div>
      <button
        className="mt-4 bg-blue-500 hover:bg-blue-600 active:scale-95 text-white px-6 py-3 rounded-full shadow-md transition w-full max-w-xs self-center"
        onClick={() => (window.location.href = '/')}
      >
        Regresar al inicio
      </button>
    </div>
  )
}

export default ComoJugar

