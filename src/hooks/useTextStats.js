import { useState } from 'react'

function useTextStats() {
  const [text, setText] = useState('')

  const handleTextChange = (e) => {
    setText(e.target.value)
  }

  const charCount = text.length
  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length
  console.log('Character Count:', charCount)
  console.log('Word Count:', wordCount)

  return {
    text,
    handleTextChange,
    charCount,
    wordCount
  }
}

export default useTextStats
