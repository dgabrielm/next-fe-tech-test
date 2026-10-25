function createParamsString(urlParams: Record<string, string | number>): string {
    let urlString = ''
    const entries = Object.entries(urlParams)

    entries.forEach(([k, v], i) => {
        urlString += `${k}=${v}${(i + 1) === entries.length ? '' : '&'}`
    })

    return urlString
}

// restricted to song search by artist, album or song name
type ItunesEndpoints = 'search'

// restricted to music endpoints for now
type HarmoniqItunesRequest = {
    term: string
    limit?: number // default 50, max 200 (note, itunes endpoint does not always return specified number of results)
    country?: string // default US
    media?: 'music'
    entity?: 'song'
    explicit?: 'yes' | 'no' // default yes
}

// simplified music entry object to make development simpler
type MusicEntry = {
    artistName: string
    collectionName: string
    trackName: string
    artworkUrl100: string
    previewUrl: string
}

interface ItunesSearchResponse {
    resultCount: number,
    results: MusicEntry[]
}

function client(endpoint: ItunesEndpoints, urlParams: HarmoniqItunesRequest, options?: Request): Promise<ItunesSearchResponse> {
    return window.fetch(
        `https://itunes.apple.com/${endpoint}?${createParamsString(urlParams)}`,
        {
            method: 'GET',
            ...options
        }
    ).then(response => response.json() as Promise<ItunesSearchResponse>)

}

export { client }
export type { ItunesSearchResponse, MusicEntry }
