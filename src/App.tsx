import heroImg from './assets/hero-with-title.svg'
import './App.css'
import { useItunesSearchQuery } from './utils/hooks/useItunesSearchQuery'
import { SongCard } from './components/SongCard'
import Box from '@mui/material/Box'
import { SearchBar } from './components/SearchBar'
import { useEffect, useState } from 'react'
import { type MusicEntry } from './utils/itunesClient'
import { AlertToast } from './components/AlertToast'
import { movePageToTop } from './utils/helpers'
import { Button } from './components/Button'
import Container from '@mui/material/Container'


// TODO: add routing
// TODO: add pre-commit hooks
// TODO: add storybook
// TODO: add unit tests (via storybook?)
// TODO: change css container styles for MUI styles
// TODO: find the best way to label these
// TODO: lazy loading
// TODO: loading state
// TODO: error handling
// TODO: add return to top
// add playwright tests, go through UI journeys and record what should be done for some UI testing
// maybe just some basic snapshot tests and storybook for the components
// TODO: consistency checking, semicolons and spacing etc
// TODO: add a linting standard

const PAGE_SIZE = 10

function App() {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const { data, refetch, isFetching } = useItunesSearchQuery(searchTerm, 50)
  const [songs, setSongs] = useState<Array<MusicEntry>>([])
  const [noResultsToastIsOpen, setNoResultsToastIsOpen] = useState<boolean>(false)
  const [endOfResultsToastIsOpen, setEndOfResultsToastIsOpen] = useState<boolean>(false)

  function search() {
    setSongs([])
    refetch()
  }

  function addPageSongs() {
    const results = data?.results ?? []

    if (songs.length >= results.length) {
      setEndOfResultsToastIsOpen(true)
      return
    }

    setSongs((previous) => {
      const start = previous.length
      return [...previous, ...results.slice(start, start + PAGE_SIZE)]
    })
  }

  // initial entries get added to list of songs to display
  useEffect(() => {
    if (isFetching || !data) {
      return
    }

    if (data.resultCount === 0) {
      setNoResultsToastIsOpen(true)
    }

    setSongs(data?.results.slice(0, PAGE_SIZE))
  }, [data, isFetching])

  // scroll listener for loading more songs
  useEffect(() => {
    function handleScroll() {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight) {
        addPageSongs()
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [songs])

  return (
    <>
      <header>
        <div className="hero">
          <img className="hero-image" src={heroImg} alt="dark hero image with music theme" />
        </div>
      </header>

      <main role="main">
        {/* Searchbar */}
        <section>
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            search={() => search()}
          />
        </section>

        {/* search Results */}
        <section>
          {isFetching ? (
            <p>Searching...</p>
          ) : (<Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
              gap: { xs: 2, md: 3 },
              width: '100%',
              maxWidth: 1700,
              mx: 'auto',
            }}
          >
            {songs.map((song, index) => (
              <SongCard
                key={index}
                songTitle={song.trackName}
                albumName={song.collectionName}
                artistName={song.artistName}
                albumCoverURL={song.artworkUrl100}
                audioSample={song.previewUrl}
              />
            ))}
          </Box>)
          }
        </section>

        <section>
          <Container sx={{ textAlign: 'center' }}>
            {songs.length > 0 && <Button onClick={movePageToTop}>Back to Top</Button>}
          </Container>
        </section>
      </main>

      {/* No Results alert */}
      <AlertToast
        useIsOpen={[noResultsToastIsOpen, setNoResultsToastIsOpen]}
        alertType="warning"
      >
        There are no results for the entered search term
      </AlertToast>

      {/* End of Results alert */}
      <AlertToast
        useIsOpen={[endOfResultsToastIsOpen, setEndOfResultsToastIsOpen]}
        alertType="info"
      >
        There are no more search results
      </AlertToast>
    </>
  )
}

export default App
