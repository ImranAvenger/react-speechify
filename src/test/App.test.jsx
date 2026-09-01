import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import App from '../App'

const mockSpeak = vi.fn()
const mockCancel = vi.fn()
const mockPause = vi.fn()
const mockResume = vi.fn()

beforeEach(() => {
  mockSpeak.mockClear()
  mockCancel.mockClear()
  mockPause.mockClear()
  mockResume.mockClear()

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
})

describe('App Integration', () => {
  it('renders all main sections properly', () => {
    render(<App />)

    expect(screen.getByText('Speechify')).toBeInTheDocument()
    expect(screen.getByText('Turn any text into speech')).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/paste or type any text here/i)).toBeInTheDocument()
    expect(screen.getByText('Characters')).toBeInTheDocument()
    expect(screen.getByText('Words')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /play/i })).toBeDisabled()
  })

  it('updates stats and enables play when typing text', () => {
    render(<App />)

    const textarea = screen.getByPlaceholderText(/paste or type any text here/i)
    fireEvent.change(textarea, { target: { value: 'Hello testing world' } })

    expect(screen.getByText('19')).toBeInTheDocument() // 19 chars
    expect(screen.getByText('3')).toBeInTheDocument() // 3 words
    expect(screen.getByRole('button', { name: /play/i })).not.toBeDisabled()
  })

  it('triggers speech when clicking play button with text', () => {
    render(<App />)

    const textarea = screen.getByPlaceholderText(/paste or type any text here/i)
    fireEvent.change(textarea, { target: { value: 'Hello Speechify' } })

    const playBtn = screen.getByRole('button', { name: /play/i })
    fireEvent.click(playBtn)

    expect(mockSpeak).toHaveBeenCalledTimes(1)
  })
})

