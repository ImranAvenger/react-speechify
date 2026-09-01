import { useState } from "react";

function useTextStats(onChangeCallback) {
  const [text, setText] = useState("");

  const handleTextChange = (e) => {
    setText(e.target.value);
    if (typeof onChangeCallback === 'function') {
      onChangeCallback(e);
    }
  };

  const charCount = text.length;
  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  return {
    text,
    handleTextChange,
    charCount,
    wordCount,
  };
}

export default useTextStats;
