import { useQuery } from '@tanstack/react-query'
import { client, type ItunesSearchResponse } from '../itunesClient'

function useItunesSearchQuery(searchTerm: string, limit?: number) {
    // itunes API does not have any offset param (it used to unofficially, but now doesn't) 
    // otherwise useInfiniteQuery would have been perfect for the lazy loading
    const { data, refetch, isFetching } = useQuery<ItunesSearchResponse | undefined>({
        queryKey: ['test-change'],
        queryFn: () => client('search', {
            term: searchTerm,
            limit: limit || 200,
            media: 'music',
            entity: 'song'
        }),
        enabled: false
    })
    
    return { data, refetch, isFetching }
}

export { useItunesSearchQuery }
