import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import TextArea from '../components/TextArea'

describe('TextArea', () => {
  it('renders a textarea element', () => {
    render(<TextArea text="" onTextChange={() => {}} />)

    expect(screen.getByPlaceholderText(/paste or type any text here/i)).toBeInTheDocument()
  })

  it('displays the provided text value', () => {
    render(<TextArea text="Hello world" onTextChange={() => {}} />)

    const textarea = screen.getByPlaceholderText(/paste or type any text here/i)
    expect(textarea.value).toBe('Hello world')
  })

  it('calls onTextChange when user types', () => {
    const onTextChange = vi.fn()
    render(<TextArea text="" onTextChange={onTextChange} />)

    const textarea = screen.getByPlaceholderText(/paste or type any text here/i)
    fireEvent.change(textarea, { target: { value: 'new text' } })

    expect(onTextChange).toHaveBeenCalledTimes(1)
  })

  it('has font-size of 16px to prevent iOS zoom', () => {
    render(<TextArea text="" onTextChange={() => {}} />)

    const textarea = screen.getByPlaceholderText(/paste or type any text here/i)
    expect(textarea.style.fontSize).toBe('16px')
  })
})
