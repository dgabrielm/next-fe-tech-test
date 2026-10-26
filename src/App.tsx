import heroImg from './assets/hero-with-title.svg'
import { useItunesSearchQuery } from './utils/hooks/useItunesSearchQuery'
import { SongCard } from './components/SongCard'
import Box from '@mui/material/Box'
import { SearchBar } from './components/SearchBar'
import { useCallback, useEffect, useState } from 'react'
import { type MusicEntry } from './utils/itunesClient'
import { AlertToast } from './components/AlertToast'
import { movePageToTop } from './utils/helpers'
import { Button } from './components/Button'
import Container from '@mui/material/Container'

const PAGE_SIZE = 10

function App() {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const { data, refetch, isFetching } = useItunesSearchQuery(searchTerm, 50)
  const [songs, setSongs] = useState<Array<MusicEntry>>([])
  const [noResultsToastIsOpen, setNoResultsToastIsOpen] = useState<boolean>(false)
  const [endOfResultsToastIsOpen, setEndOfResultsToastIsOpen] = useState<boolean>(false)
  const [apiErrorToastIsOpen, setApiErrorToastIsOpen] = useState<boolean>(false)

  // initial search function
  // enabled: false active on useQuery,
  // user feedback should happen where the user action occurs, not in response to data changing
  // not trimming or lowercasing the search because the API handles it
  const search = async (): Promise<void> => {
    setSongs([])
    setNoResultsToastIsOpen(false)
    setApiErrorToastIsOpen(false)

    const result = await refetch()

    if (result.isError) {
      setApiErrorToastIsOpen(true)
      return
    }

    if (!result.data) return

    if (result.data.resultCount === 0) {
      setNoResultsToastIsOpen(true)
      return
    }

    setSongs(result.data.results.slice(0, PAGE_SIZE))
  }

  // useCallback because fn used in deps array and would trigger scroll useEffect with every re-render
  const addPageSongs = useCallback((): void => {
    const results = data?.results ?? []

    if (songs.length >= results.length && songs.length > 0) {
      setEndOfResultsToastIsOpen(true)
      return
    }

    setSongs((previous) => [
      ...previous,
      ...results.slice(previous.length, previous.length + PAGE_SIZE),
    ])
  }, [data, songs])

  // scroll listener for loading more songs
  useEffect(() => {
    function handleScroll() {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        addPageSongs()
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [addPageSongs])

  return (
    <>
      <Box component="header" sx={{ width: '100%', mx: 'auto' }}>
        <Box
          component="img"
          fetchPriority="high"
          loading="eager"
          src={heroImg}
          alt="dark hero image with music theme"
          sx={{ display: 'block', width: '100%', height: 'auto' }}
        />
      </Box>

      <Box component="main">
        {/* Searchbar */}
        <Box component="section" sx={{ p: 2 }}>
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            search={() => search()}
          />
        </Box>

        {/* search Results */}
        <Box component="section" sx={{ p: 2 }}>
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
        </Box>

        <Box component="section" sx={{ p: 2 }}>
          <Container sx={{ textAlign: 'center' }}>
            {songs.length > 0 && <Button onClick={movePageToTop}>Back to Top</Button>}
          </Container>
        </Box>
      </Box>

      {/* No Results alert */}
      <AlertToast
        useIsOpen={[noResultsToastIsOpen, setNoResultsToastIsOpen]}
        alertType="warning"
      >
        There are no results for the entered search term.
      </AlertToast>

      {/* End of Results alert */}
      <AlertToast
        useIsOpen={[endOfResultsToastIsOpen, setEndOfResultsToastIsOpen]}
        alertType="info"
      >
        There are no more search results.
      </AlertToast>

      {/* API Error alert */}
      <AlertToast
        useIsOpen={[apiErrorToastIsOpen, setApiErrorToastIsOpen]}
        alertType="error"
      >
        iTunes API search failed. Please check your connection.
      </AlertToast>
    </>
  )
}

export default App
