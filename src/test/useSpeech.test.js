import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import useSpeech from '../hooks/useSpeech'

// Mock the Web Speech API
const mockSpeak = vi.fn()
const mockCancel = vi.fn()
const mockPause = vi.fn()
const mockResume = vi.fn()

let lastUtterance = null

class MockUtterance {
  constructor(text) {
    this.text = text
    this.onend = null
    this.onerror = null
    lastUtterance = this
  }
}

beforeEach(() => {
  mockSpeak.mockClear()
  mockCancel.mockClear()
  mockPause.mockClear()
  mockResume.mockClear()
  lastUtterance = null

  // Install mock speechSynthesis
  Object.defineProperty(window, 'speechSynthesis', {
    configurable: true,
    writable: true,
    value: {
      speak: mockSpeak,
      cancel: mockCancel,
      pause: mockPause,
      resume: mockResume,
    },
  })

  // Mock SpeechSynthesisUtterance with standard constructor
  globalThis.SpeechSynthesisUtterance = MockUtterance
  window.SpeechSynthesisUtterance = MockUtterance
})

describe('useSpeech', () => {
  it('starts with isSpeaking=false and isPaused=false', () => {
    const { result } = renderHook(() => useSpeech())

    expect(result.current.isSpeaking).toBe(false)
    expect(result.current.isPaused).toBe(false)
  })

  it('exposes handlePlayOrResume, pause, and stop functions', () => {
    const { result } = renderHook(() => useSpeech())

    expect(typeof result.current.handlePlayOrResume).toBe('function')
    expect(typeof result.current.pause).toBe('function')
    expect(typeof result.current.stop).toBe('function')
  })

  describe('handlePlayOrResume', () => {
    it('does nothing for empty text', () => {
      const { result } = renderHook(() => useSpeech())

      act(() => {
        result.current.handlePlayOrResume('')
      })

      expect(mockSpeak).not.toHaveBeenCalled()
      expect(result.current.isSpeaking).toBe(false)
    })

    it('does nothing for whitespace-only text', () => {
      const { result } = renderHook(() => useSpeech())

      act(() => {
        result.current.handlePlayOrResume('   ')
      })

      expect(mockSpeak).not.toHaveBeenCalled()
    })

    it('does nothing for null/undefined text', () => {
      const { result } = renderHook(() => useSpeech())

      act(() => {
        result.current.handlePlayOrResume(null)
      })
      expect(mockSpeak).not.toHaveBeenCalled()

      act(() => {
        result.current.handlePlayOrResume(undefined)
      })
      expect(mockSpeak).not.toHaveBeenCalled()
    })

    it('cancels previous speech, creates utterance, and calls speak', () => {
      const { result } = renderHook(() => useSpeech())

      act(() => {
        result.current.handlePlayOrResume('Hello world')
      })

      expect(mockCancel).toHaveBeenCalled()
      expect(lastUtterance.text).toBe('Hello world')
      expect(mockSpeak).toHaveBeenCalledWith(lastUtterance)
    })

    it('sets isSpeaking to true after play', () => {
      const { result } = renderHook(() => useSpeech())

      act(() => {
        result.current.handlePlayOrResume('Hello')
      })

      expect(result.current.isSpeaking).toBe(true)
      expect(result.current.isPaused).toBe(false)
    })

    it('resumes from paused state instead of restarting', () => {
      const { result } = renderHook(() => useSpeech())

      // Start speaking
      act(() => {
        result.current.handlePlayOrResume('Hello')
      })

      // Pause
      act(() => {
        result.current.pause()
      })

      // Clear mocks to check resume behavior
      mockSpeak.mockClear()
      mockCancel.mockClear()

      // Resume
      act(() => {
        result.current.handlePlayOrResume('Hello')
      })

      // Should resume, not create new utterance
      expect(mockResume).toHaveBeenCalled()
      expect(mockSpeak).not.toHaveBeenCalled()
      expect(result.current.isSpeaking).toBe(true)
      expect(result.current.isPaused).toBe(false)
    })
  })

  describe('pause', () => {
    it('pauses when currently speaking', () => {
      const { result } = renderHook(() => useSpeech())

      act(() => {
        result.current.handlePlayOrResume('Hello')
      })

      act(() => {
        result.current.pause()
      })

      expect(mockPause).toHaveBeenCalled()
      expect(result.current.isPaused).toBe(true)
      expect(result.current.isSpeaking).toBe(false)
    })

    it('does nothing if not speaking', () => {
      const { result } = renderHook(() => useSpeech())

      act(() => {
        result.current.pause()
      })

      expect(mockPause).not.toHaveBeenCalled()
      expect(result.current.isPaused).toBe(false)
    })

    it('does nothing if already paused', () => {
      const { result } = renderHook(() => useSpeech())

      act(() => {
        result.current.handlePlayOrResume('Hello')
      })
      act(() => {
        result.current.pause()
      })

      mockPause.mockClear()

      act(() => {
        result.current.pause()
      })

      // Should not call pause again — isSpeaking is false when paused
      expect(mockPause).not.toHaveBeenCalled()
    })
  })

  describe('stop', () => {
    it('cancels speech and resets all state', () => {
      const { result } = renderHook(() => useSpeech())

      act(() => {
        result.current.handlePlayOrResume('Hello')
      })

      mockCancel.mockClear()

      act(() => {
        result.current.stop()
      })

      expect(mockCancel).toHaveBeenCalled()
      expect(result.current.isSpeaking).toBe(false)
      expect(result.current.isPaused).toBe(false)
    })

    it('can be called safely when not speaking', () => {
      const { result } = renderHook(() => useSpeech())

      act(() => {
        result.current.stop()
      })

      expect(mockCancel).toHaveBeenCalled()
      expect(result.current.isSpeaking).toBe(false)
    })
  })

  describe('utterance callbacks', () => {
    it('resets state when utterance ends (onend)', () => {
      const { result } = renderHook(() => useSpeech())

      act(() => {
        result.current.handlePlayOrResume('Hello')
      })
      expect(result.current.isSpeaking).toBe(true)

      // Simulate utterance end
      act(() => {
        lastUtterance.onend()
      })

      expect(result.current.isSpeaking).toBe(false)
      expect(result.current.isPaused).toBe(false)
    })

    it('resets state when utterance errors (onerror)', () => {
      const { result } = renderHook(() => useSpeech())

      act(() => {
        result.current.handlePlayOrResume('Hello')
      })

      act(() => {
        lastUtterance.onerror()
      })

      expect(result.current.isSpeaking).toBe(false)
      expect(result.current.isPaused).toBe(false)
    })
  })

  describe('cleanup on unmount', () => {
    it('cancels speech synthesis on unmount', () => {
      const { unmount } = renderHook(() => useSpeech())

      mockCancel.mockClear()
      unmount()

      expect(mockCancel).toHaveBeenCalled()
    })
  })
})
