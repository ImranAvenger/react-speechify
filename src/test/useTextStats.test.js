import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import useTextStats from '../hooks/useTextStats'

describe('useTextStats', () => {
  it('starts with empty text and zero counts', () => {
    const { result } = renderHook(() => useTextStats())

    expect(result.current.text).toBe('')
    expect(result.current.charCount).toBe(0)
    expect(result.current.wordCount).toBe(0)
  })

  it('counts characters correctly', () => {
    const { result } = renderHook(() => useTextStats())

    act(() => {
      result.current.handleTextChange({ target: { value: 'hello' } })
    })

    expect(result.current.charCount).toBe(5)
  })

  it('counts a single word', () => {
    const { result } = renderHook(() => useTextStats())

    act(() => {
      result.current.handleTextChange({ target: { value: 'hello' } })
    })

    expect(result.current.wordCount).toBe(1)
  })

  it('counts multiple words', () => {
    const { result } = renderHook(() => useTextStats())

    act(() => {
      result.current.handleTextChange({ target: { value: 'hello world foo' } })
    })

    expect(result.current.wordCount).toBe(3)
    expect(result.current.charCount).toBe(15)
  })

  it('treats whitespace-only input as zero words', () => {
    const { result } = renderHook(() => useTextStats())

    act(() => {
      result.current.handleTextChange({ target: { value: '   ' } })
    })

    expect(result.current.wordCount).toBe(0)
    expect(result.current.charCount).toBe(3)
  })

  it('handles text with extra whitespace between words', () => {
    const { result } = renderHook(() => useTextStats())

    act(() => {
      result.current.handleTextChange({ target: { value: 'hello   world' } })
    })

    expect(result.current.wordCount).toBe(2)
  })

  it('handles newlines as word separators', () => {
    const { result } = renderHook(() => useTextStats())

    act(() => {
      result.current.handleTextChange({ target: { value: 'line one\nline two' } })
    })

    expect(result.current.wordCount).toBe(4)
  })

  it('updates text value on change', () => {
    const { result } = renderHook(() => useTextStats())

    act(() => {
      result.current.handleTextChange({ target: { value: 'first' } })
    })
    expect(result.current.text).toBe('first')

    act(() => {
      result.current.handleTextChange({ target: { value: 'second' } })
    })
    expect(result.current.text).toBe('second')
  })

  it('resets counts when text is cleared', () => {
    const { result } = renderHook(() => useTextStats())

    act(() => {
      result.current.handleTextChange({ target: { value: 'some text' } })
    })
    expect(result.current.wordCount).toBe(2)

    act(() => {
      result.current.handleTextChange({ target: { value: '' } })
    })
    expect(result.current.wordCount).toBe(0)
    expect(result.current.charCount).toBe(0)
  })

  it('calls optional onChange callback when text changes', () => {
    const callback = vi.fn()
    const { result } = renderHook(() => useTextStats(callback))

    act(() => {
      result.current.handleTextChange({ target: { value: 'testing callback' } })
    })

    expect(callback).toHaveBeenCalledTimes(1)
  })
})
