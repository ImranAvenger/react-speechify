import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import TextStats from '../components/TextStats'

describe('TextStats', () => {
  it('renders character count', () => {
    render(<TextStats charCount={42} wordCount={7} />)

    expect(screen.getByText('Characters')).toBeInTheDocument()
    expect(screen.getByText('42')).toBeInTheDocument()
  })

  it('renders word count', () => {
    render(<TextStats charCount={42} wordCount={7} />)

    expect(screen.getByText('Words')).toBeInTheDocument()
    expect(screen.getByText('7')).toBeInTheDocument()
  })

  it('shows "Start typing…" when charCount is 0', () => {
    render(<TextStats charCount={0} wordCount={0} />)

    expect(screen.getByText('Start typing…')).toBeInTheDocument()
  })

  it('shows estimated read time when there is text', () => {
    // 260 words ÷ 130 = 2 → "~2 min read"
    render(<TextStats charCount={1500} wordCount={260} />)

    expect(screen.getByText('~2 min read')).toBeInTheDocument()
  })

  it('shows ~1 min read for small word counts', () => {
    render(<TextStats charCount={10} wordCount={2} />)

    expect(screen.getByText('~1 min read')).toBeInTheDocument()
  })

  it('formats large numbers with locale string', () => {
    render(<TextStats charCount={12345} wordCount={2000} />)

    // toLocaleString() formats as "12,345" in en-US
    expect(screen.getByText('12,345')).toBeInTheDocument()
    expect(screen.getByText('2,000')).toBeInTheDocument()
  })
})
