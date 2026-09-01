import '@testing-library/jest-dom'

// Mock SpeechSynthesisUtterance class
class MockSpeechSynthesisUtterance {
  constructor(text) {
    this.text = text || ''
    this.onend = null
    this.onerror = null
  }
}

globalThis.SpeechSynthesisUtterance = MockSpeechSynthesisUtterance
window.SpeechSynthesisUtterance = MockSpeechSynthesisUtterance
