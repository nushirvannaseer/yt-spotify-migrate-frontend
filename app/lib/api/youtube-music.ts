import axios from "axios"

const getYoutubeMusicPlaylists = async () => {
    try {
        const response = await axios.get('http://localhost:8888/get-yt-playlists', {
            withCredentials: true,
        })
        return response.data;
    } catch (error) {
        console.error(error)
        throw error
    }
}

export { getYoutubeMusicPlaylists }