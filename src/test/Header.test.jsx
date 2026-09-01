import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Header from '../components/Header'

describe('Header', () => {
  it('renders the app name', () => {
    render(<Header />)

    expect(screen.getByText('Speechify')).toBeInTheDocument()
  })

  it('renders the "Text to Speech" badge', () => {
    render(<Header />)

    expect(screen.getByText('Text to Speech')).toBeInTheDocument()
  })

  it('renders a settings button', () => {
    render(<Header />)

    expect(screen.getByText('Settings')).toBeInTheDocument()
  })

  it('renders a header element', () => {
    render(<Header />)

    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
  })
})
