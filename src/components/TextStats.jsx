function TextStats({ charCount, wordCount }) {
  return (
    <div className="flex items-center justify-between px-1">
      <div className="flex items-center gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
          <span className="text-slate-500">Characters</span>
          <span className="text-slate-300 font-semibold tabular-nums">
            {charCount.toLocaleString()}
          </span>
        </div>
        <div className="w-px h-3 bg-slate-700"></div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
          <span className="text-slate-500">Words</span>
          <span className="text-slate-300 font-semibold tabular-nums">
            {wordCount.toLocaleString()}
          </span>
        </div>
      </div>
      <div className="text-xs text-slate-600">
        {charCount === 0
          ? "Start typing…"
          : `~${Math.ceil(wordCount / 130)} min read`}
      </div>
    </div>
  );
}

export default TextStats;
