import { useState, useEffect } from "react";

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // কম্পোনেন্ট আনমাউন্ট হলে অডিও বন্ধ রাখার ক্লিইনাপ
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  // Play / Resume Combined Function
  const handlePlayOrResume = (textToSpeak) => {
    if (!textToSpeak || !textToSpeak.trim()) return;

    // ১. পজ থাকা অবস্থায় Resume করা
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsSpeaking(true);
      return;
    }

    // ২. একদম শুরু থেকে Play করা
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
    setIsPaused(false);
  };

  // Pause Function
  const pause = () => {
    if (isSpeaking && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsSpeaking(false);
    }
  };

  // Stop Function (সবকিছু রিসেট হয়ে যাবে এবং বাটন 'Play' হবে)
  const stop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  return {
    isSpeaking,
    isPaused,
    handlePlayOrResume,
    pause,
    stop,
  };
}

export default useSpeech;
