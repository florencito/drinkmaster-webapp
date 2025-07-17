const replacePlaceholders = (content, placeholders = [], players = []) => {
  let text = content
  let playerIndex = null

  if (placeholders.includes('player') && players.length > 0) {
    playerIndex = Math.floor(Math.random() * players.length)
    text = text.replace(/{{player}}/g, players[playerIndex])
  }

  if (placeholders.includes('other') && players.length > 1) {
    const options = players.filter((_, i) => i !== playerIndex)
    const other = options[Math.floor(Math.random() * options.length)]
    text = text.replace(/{{other}}/g, other)
  }

  if (placeholders.includes('all')) {
    text = text.replace(/{{all}}/g, 'todos')
  }

  return text
}

export default replacePlaceholders
