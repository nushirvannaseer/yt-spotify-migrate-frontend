import axios from "axios";

const getYoutubeMusicPlaylists = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/ytmusic/playlists`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getYTPlaylistSongs = async (playlistId: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/ytmusic/playlist-songs`,
      {
        params: { playlistId },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getYoutubeMusicPlaylists, getYTPlaylistSongs };
