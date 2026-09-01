import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Controls from '../components/Controls'

describe('Controls', () => {
  const defaultProps = {
    text: 'Sample text to speak',
    isSpeaking: false,
    isPaused: false,
    onPlayOrResume: vi.fn(),
    onPause: vi.fn(),
    onStop: vi.fn(),
  }

  it('renders status message when idle with text', () => {
    render(<Controls {...defaultProps} />)
    expect(screen.getByText('Ready to play')).toBeInTheDocument()
  })

  it('renders "Enter text above" when text is empty', () => {
    render(<Controls {...defaultProps} text="" />)
    expect(screen.getByText('Enter text above')).toBeInTheDocument()
  })

  it('renders "Reading aloud…" when isSpeaking is true', () => {
    render(<Controls {...defaultProps} isSpeaking={true} />)
    expect(screen.getByText('Reading aloud…')).toBeInTheDocument()
  })

  it('renders "Paused" status when isPaused is true', () => {
    render(<Controls {...defaultProps} isPaused={true} />)
    expect(screen.getByText('Paused')).toBeInTheDocument()
  })

  it('disables play button if text is empty', () => {
    render(<Controls {...defaultProps} text="" />)
    const playBtn = screen.getByRole('button', { name: /play/i })
    expect(playBtn).toBeDisabled()
  })

  it('disables pause and stop buttons when idle', () => {
    render(<Controls {...defaultProps} />)
    const pauseBtn = screen.getByRole('button', { name: /pause/i })
    const stopBtn = screen.getByRole('button', { name: /stop/i })
    expect(pauseBtn).toBeDisabled()
    expect(stopBtn).toBeDisabled()
  })

  it('enables play button and calls onPlayOrResume on click', () => {
    const onPlayOrResume = vi.fn()
    render(<Controls {...defaultProps} onPlayOrResume={onPlayOrResume} />)

    const playBtn = screen.getByRole('button', { name: /play/i })
    expect(playBtn).not.toBeDisabled()

    fireEvent.click(playBtn)
    expect(onPlayOrResume).toHaveBeenCalledTimes(1)
  })

  it('renders Resume button and calls onPlayOrResume when paused', () => {
    const onPlayOrResume = vi.fn()
    render(
      <Controls
        {...defaultProps}
        isSpeaking={false}
        isPaused={true}
        onPlayOrResume={onPlayOrResume}
      />
    )

    const resumeBtn = screen.getByRole('button', { name: /resume/i })
    expect(resumeBtn).toBeInTheDocument()
    expect(resumeBtn).not.toBeDisabled()

    fireEvent.click(resumeBtn)
    expect(onPlayOrResume).toHaveBeenCalledTimes(1)
  })

  it('enables pause and stop buttons when speaking and triggers handlers', () => {
    const onPause = vi.fn()
    const onStop = vi.fn()
    render(
      <Controls
        {...defaultProps}
        isSpeaking={true}
        isPaused={false}
        onPause={onPause}
        onStop={onStop}
      />
    )

    const pauseBtn = screen.getByRole('button', { name: /pause/i })
    const stopBtn = screen.getByRole('button', { name: /stop/i })

    expect(pauseBtn).not.toBeDisabled()
    expect(stopBtn).not.toBeDisabled()

    fireEvent.click(pauseBtn)
    expect(onPause).toHaveBeenCalledTimes(1)

    fireEvent.click(stopBtn)
    expect(onStop).toHaveBeenCalledTimes(1)
  })
})

