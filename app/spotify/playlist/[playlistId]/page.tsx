'use client'
import { migratePlaylist } from '@/app/lib/api/migration';
import { getSpotifyPlaylistSongs } from '@/app/lib/api/spotify';
import React, { useEffect, useState } from 'react'
const Playlist = ({params}: {params: {playlistId: string}}) => {
    const [songs, setSongs] = useState(null);

    useEffect(() => {
        const fetchPlaylistSongs = async () => {
            const songs = await getSpotifyPlaylistSongs(params.playlistId);
            console.log(songs);
            setSongs(songs);
        }
        fetchPlaylistSongs();
    }, [params.playlistId]);
  return (
    <div>playlist {params.playlistId}
    <button onClick={() => migratePlaylist(params.playlistId)}>Migrate</button>
        {songs?.map((song: any) => (
            <div key={song.id}>{song.track.name}</div>
        ))}
    </div>
  )
}

export default Playlist