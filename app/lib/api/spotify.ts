import axios from "axios"

const getSpotifyPlaylists = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/spotify/playlists`, {
            withCredentials: true,
        })
        return response.data;
    } catch (error) {
        console.error(error)
        throw error
    }
}

const getSpotifyPlaylistSongs = async (playlistId: string) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/spotify/playlist-songs`, {
            params: { playlistId },
            withCredentials: true,
        })
        return response.data;
    } catch (error) {
        console.error(error)
        throw error
    }
}

export { getSpotifyPlaylists, getSpotifyPlaylistSongs }