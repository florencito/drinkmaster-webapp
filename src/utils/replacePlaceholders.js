const replacePlaceholders = (content, placeholders = [], players = []) => {
  let text = content
  let playerIndex = null

  if (placeholders.includes('player')) {
    playerIndex = Math.floor(Math.random() * players.length)
    text = text.replace(/{{player}}/g, players[playerIndex])
  }

  if (placeholders.includes('other')) {
    const options = players.filter((_, i) => i !== playerIndex)
    const other = options[Math.floor(Math.random() * options.length)]
    text = text.replace(/{{other}}/g, other)
  }

  return text.replace(/{{all}}/g, players.join(', '))
}

export default replacePlaceholders
