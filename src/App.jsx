import { useState } from 'react'
import Header from './components/Header'
import TextArea from './components/TextArea'
import TextStats from './components/TextStats'
import useTextStats from './hooks/useTextStats'
import Controls from './components/Controls'

function App() {
  const [count, setCount] = useState(0)
  const { text, handleTextChange, charCount, wordCount } = useTextStats()


  return (
    <>
      <Header />
      <TextArea text={text} onTextChange={handleTextChange} />
      <TextStats charCount={charCount} wordCount={wordCount} />
      <Controls />
    </>
  )
}

export default App
