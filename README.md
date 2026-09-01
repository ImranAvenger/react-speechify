# React Speechify 🎙️
A sleek, responsive Text-to-Speech web application built with **React 19**, **Tailwind CSS v4**, and the **Web Speech API**.

## ✨ Features
- **Instant Speech Synthesis**: Convert any written text into natural speech.
- **Playback Controls**: Play, Pause, Resume, and Stop controls with live status indicators.
- **Audio Waveform Visualization**: Animated waveform that pulses during playback and pauses seamlessly.
- **Real-Time Text Stats**: Dynamic character count, word count, and estimated reading time.
- **Responsive & Mobile-First**: Optimized layout with touch-target sizing and iOS auto-zoom prevention.
- **Dark Glassmorphism UI**: Modern frosted-glass aesthetic with smooth animations.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Run Tests
```bash
# Run unit tests once
npm test

# Run tests in watch mode
npm run test:watch
```

### Build for Production
```bash
npm run build
```

## 🧪 Testing
Unit tests are written with [Vitest](https://vitest.dev/) and [@testing-library/react](https://testing-library.com/).
Tests cover custom hooks (`useSpeech`, `useTextStats`), individual UI components (`Controls`, `TextArea`, `TextStats`, `Header`), and full app integration.
