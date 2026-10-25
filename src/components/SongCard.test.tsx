import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SongCard } from './SongCard'
import placeHolderImage from '../assets/album-placeholder.png'

const song = {
  songTitle: 'Song title',
  albumName: 'Album name',
  artistName: 'Artist name',
  albumCoverURL: 'https://example.com/cover.jpg',
  audioSample: 'https://example.com/sample.mp3',
}

describe('SongCard', () => {
  it('renders the song details and album cover', () => {
    render(<SongCard {...song} />)

    expect(
      screen.getByRole('heading', { name: song.songTitle }),
    ).toBeInTheDocument()
    expect(screen.getByText(song.artistName)).toBeInTheDocument()
    expect(screen.getByText(song.albumName)).toBeInTheDocument()

    expect(
      screen.getByRole('img', { name: `${song.albumName} album cover` }),
    ).toHaveAttribute('src', song.albumCoverURL)
  })

  it('sets up the audio preview without download controls', () => {
    const { container } = render(<SongCard {...song} />)
    const audio = container.querySelector('audio')

    expect(audio).not.toBeNull()
    expect(audio).toHaveAttribute('src', song.audioSample)
    expect(audio).toHaveAttribute('controls')
    expect(audio).toHaveAttribute(
      'controlslist',
      'nodownload noremoteplayback',
    )
  })

  it('uses the placeholder if the album cover fails to load', () => {
    render(<SongCard {...song} />)
    const cover = screen.getByRole('img', {
      name: `${song.albumName} album cover`,
    })

    fireEvent.error(cover)

    expect(cover).toHaveAttribute('src', placeHolderImage)
  })
})
