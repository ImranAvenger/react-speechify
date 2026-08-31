function TextArea({ text, onTextChange }) {
  return (
    <div>
      <textarea className="w-full h-32 p-2 border rounded" placeholder="Type your text here..." value={text} onChange={onTextChange}></textarea>
    </div>
  )
}

export default TextArea