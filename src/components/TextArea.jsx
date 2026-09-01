function TextArea({ text, onTextChange }) {
  return (
    <div className="relative">
      <textarea
        className="w-full h-44 sm:h-52 p-4 resize-none rounded-2xl text-slate-200 placeholder-slate-500 leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-200"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          fontSize: "16px" /* prevent iOS auto-zoom on focus */,
        }}
        placeholder="Paste or type any text here, then press Play to listen..."
        value={text}
        onChange={onTextChange}
      />
      {/* Corner accent */}
      <div className="absolute top-3 right-3 pointer-events-none">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(99,102,241,0.4)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </div>
    </div>
  );
}

export default TextArea;
