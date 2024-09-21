import { YouTubePlaylistSongsResponse } from "@/app/types/ytmusic";
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
    return response.data as YouTubePlaylistSongsResponse;
  } catch (error) {
    throw error;
  }
};

const migrateYTPlaylist = async (playlistId: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/ytmusic/migrate-playlist`,
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

const migrateYTSongs = async (
  playlistName: string,
  songs: { name: string; artist: string }[]
) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/ytmusic/migrate-selected-songs`,
      { sp_playlist_name: playlistName, songs },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export {
  getYoutubeMusicPlaylists,
  getYTPlaylistSongs,
  migrateYTPlaylist,
  migrateYTSongs,
};
