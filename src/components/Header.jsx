import React from 'react'

function Header() {
  return (
    <header className="flex items-center justify-between p-4">
        <div className="logo">Logo</div>
        <div>
          <button>
            ⚙️ Settings
          </button>
        </div>
    </header>
  )
}

export default Header