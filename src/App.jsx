import Header from "./components/Header";
import TextArea from "./components/TextArea";
import TextStats from "./components/TextStats";
import useTextStats from "./hooks/useTextStats";
import useSpeech from "./hooks/useSpeech";
import Controls from "./components/Controls";

function App() {
  const { isSpeaking, isPaused, handlePlayOrResume, pause, stop } = useSpeech();
  const { text, handleTextChange, charCount, wordCount } = useTextStats(stop);

  return (
    <div className="bg-app">
      {/* Ambient blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #6366f1, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #a855f7, transparent 70%)",
          }}
        />
      </div>

      {/* Main layout */}
      <div className="relative flex flex-col min-h-screen min-h-dvh max-w-2xl mx-auto px-3 sm:px-4">
        {/* Header */}
        <div className="fade-in">
          <Header />
        </div>

        {/* Card */}
        <main className="flex-1 flex flex-col sm:justify-center py-3 sm:py-6">
          <div
            className={`glass-card p-4 sm:p-6 flex flex-col gap-4 sm:gap-5 fade-in fade-in-delay-1 ${isSpeaking ? "glow-active" : ""}`}
          >
            {/* Tagline */}
            <div className="text-center">
              <h1 className="text-slate-200 text-xl font-semibold tracking-tight">
                Turn any text into speech
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                Powered by the Web Speech API · Works in your browser
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-white/5" />

            {/* Textarea */}
            <div className="fade-in fade-in-delay-2">
              <TextArea text={text} onTextChange={handleTextChange} />
            </div>

            {/* Stats */}
            <TextStats charCount={charCount} wordCount={wordCount} />

            {/* Divider */}
            <div className="border-t border-white/5" />

            {/* Controls */}
            <div className="fade-in fade-in-delay-3">
              <Controls
                text={text}
                isSpeaking={isSpeaking}
                isPaused={isPaused}
                onPlayOrResume={() => handlePlayOrResume(text)}
                onPause={pause}
                onStop={stop}
              />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center py-4 text-xs text-slate-700">
          Built with React &amp; Web Speech API
        </footer>
      </div>
    </div>
  );
}

export default App;
