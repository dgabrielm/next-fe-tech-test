import type { Meta, StoryObj } from '@storybook/react-vite'
import albumPlaceholder from '../assets/album-placeholder.png'
import { SongCard } from './SongCard'

const meta = {
  title: 'Components/SongCard',
  component: SongCard,
  args: {
    songTitle: 'Midnight City',
    albumName: "Hurry Up, We're Dreaming",
    artistName: 'M83',
    albumCoverURL: albumPlaceholder,
    audioSample: '',
  },
} satisfies Meta<typeof SongCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const LongTitles: Story = {
  args: {
    songTitle: 'A Much Longer Example Song Title to Show Its Wrapping',
    albumName: 'An Example Album Name That Is Also Quite Long',
    artistName: 'An Artist with a Longer Name',
  },
}

export const BrokenCover: Story = {
  args: {
    albumCoverURL: '/missing-album-cover.jpg',
  },
}
