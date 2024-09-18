'use client'
import { migratePlaylist } from '@/app/lib/api/migration';
import { getSpotifyPlaylistSongs } from '@/app/lib/api/spotify';
import { SpotifySong } from '@/app/types/spotify';
import React, { useEffect, useState } from 'react'
const Playlist = ({params}: {params: {playlistId: string}}) => {
    const [songs, setSongs] = useState<SpotifySong[] | null>(null);

    useEffect(() => {
        const fetchPlaylistSongs = async () => {
            const songs = await getSpotifyPlaylistSongs(params.playlistId);
            setSongs(songs as SpotifySong[]);
        }
        fetchPlaylistSongs();
    }, [params.playlistId]);
  return (
    <div>playlist {params.playlistId}
    <button onClick={() => migratePlaylist(params.playlistId)}>Migrate</button>
        {songs?.map((song: SpotifySong) => (
            <div key={song.id}>{song.name}</div>
        ))}
    </div>
  )
}

export default Playlist