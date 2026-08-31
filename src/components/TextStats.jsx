

function TextStats({ charCount, wordCount }) {
  return (
    <div className="flex justify-between p-4 border-t">
        <div className="">Characters: <span>{charCount}</span></div>
        <div className="">Words: <span>{wordCount}</span></div>
    </div>
  )
}

export default TextStats