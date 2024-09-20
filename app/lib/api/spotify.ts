import axios from "axios";

const getSpotifyPlaylists = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/spotify/playlists`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getSpotifyPlaylistSongs = async (playlistId: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/spotify/playlist-songs`,
      {
        params: { playlistId },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const migrateSpotifySongs = async (
  songs: { songs: { name: string; artist: string }[] },
  yt_playlist_id?: string
) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/spotify/migrate-songs`,
      { songs, yt_playlist_id: yt_playlist_id || null },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { getSpotifyPlaylists, getSpotifyPlaylistSongs, migrateSpotifySongs };
