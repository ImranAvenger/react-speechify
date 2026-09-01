/* Animated waveform displayed while speaking */
function Waveform({ state }) {
  // state: 'idle' | 'speaking' | 'paused'
  const barClass = state === 'idle'
    ? 'wave-bar stopped'
    : state === 'paused'
    ? 'wave-bar paused'
    : 'wave-bar'

  return (
    <div className="flex items-center justify-center gap-1 h-7">
      {[0, 1, 2, 3, 4].map(i => (
        <span key={i} className={barClass} />
      ))}
    </div>
  )
}

function Controls({ text, isSpeaking, isPaused, onPlayOrResume, onPause, onStop }) {
  const hasText = text.trim().length > 0

  const speechState = isSpeaking ? 'speaking' : isPaused ? 'paused' : 'idle'

  const statusLabel = isSpeaking
    ? 'Reading aloud…'
    : isPaused
    ? 'Paused'
    : hasText
    ? 'Ready to play'
    : 'Enter text above'

  const statusColor = isSpeaking
    ? 'text-indigo-400'
    : isPaused
    ? 'text-yellow-400'
    : 'text-slate-500'

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Waveform + status */}
      <div className="flex flex-col items-center gap-2">
        <Waveform state={speechState} />
        <span className={`text-xs font-medium transition-colors duration-300 ${statusColor}`}>
          {statusLabel}
        </span>
      </div>

      {/* Buttons — mobile: Play full-width on top, Pause+Stop row below; sm+: single row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">

        {/* Play / Resume — always full-width on mobile */}
        <button
          type="button"
          onClick={onPlayOrResume}
          disabled={!hasText || (isSpeaking && !isPaused)}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 sm:py-3 px-5 rounded-2xl font-semibold text-sm transition-all duration-200
            bg-gradient-to-r from-indigo-600 to-purple-600 text-white
            hover:from-indigo-500 hover:to-purple-500 hover:shadow-lg hover:shadow-indigo-500/30
            active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:active:scale-100"
        >
          {isPaused ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              Resume
            </>
          ) : isSpeaking ? (
            <>
              <span className="flex gap-0.5">
                <span className="w-1 h-4 bg-white rounded-sm opacity-90"></span>
                <span className="w-1 h-4 bg-white rounded-sm opacity-90"></span>
              </span>
              Reading…
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              Play
            </>
          )}
        </button>

        {/* Pause + Stop — side by side on mobile too */}
        <div className="flex gap-3 sm:contents">

          {/* Pause */}
          <button
            type="button"
            onClick={onPause}
            disabled={!isSpeaking || isPaused}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 py-3.5 sm:py-3 px-5 rounded-2xl font-semibold text-sm transition-all duration-200
              text-yellow-400 border border-yellow-500/30
              hover:bg-yellow-500/10 hover:border-yellow-500/60 hover:shadow-lg hover:shadow-yellow-500/10
              active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-yellow-500/30 disabled:active:scale-100"
          >
            <span className="flex gap-0.5">
              <span className="w-1 h-4 bg-current rounded-sm"></span>
              <span className="w-1 h-4 bg-current rounded-sm"></span>
            </span>
            Pause
          </button>

          {/* Stop */}
          <button
            type="button"
            onClick={onStop}
            disabled={!isSpeaking && !isPaused}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 py-3.5 sm:py-3 px-5 rounded-2xl font-semibold text-sm transition-all duration-200
              text-red-400 border border-red-500/30
              hover:bg-red-500/10 hover:border-red-500/60 hover:shadow-lg hover:shadow-red-500/10
              active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-red-500/30 disabled:active:scale-100"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
            Stop
          </button>

        </div>
      </div>
    </div>
  )
}

export default Controls