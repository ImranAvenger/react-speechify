import React from 'react'

function Controls() {
  return (
    <div className="flex justify-center space-x-4 p-4 border-t">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Play / Resume
        </button>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
            Pause
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Stop
        </button>
    </div>
  )
}

export default Controls