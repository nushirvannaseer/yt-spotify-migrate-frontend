"use client";
import { migratePlaylist } from "@/app/lib/api/migration";
import { getSpotifyPlaylistSongs } from "@/app/lib/api/spotify";
import { SpotifySong } from "@/app/types/spotify";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
const Playlist = ({
  params,
}: {
  params: { playlistId: string; playlistName: string };
}) => {
  const [songs, setSongs] = useState<SpotifySong[] | null>(null);
  const playlistName = decodeURIComponent(params.playlistName);

  useEffect(() => {
    const fetchPlaylistSongs = async () => {
      const songs = await getSpotifyPlaylistSongs(params.playlistId);
      setSongs(songs as SpotifySong[]);
    };
    fetchPlaylistSongs();
  }, [params.playlistId]);

  return (
    <div className="flex flex-col items-center mx-10">
      <div className="flex flex-row w-full items-center justify-between">
        <h1 className="text-2xl font-bold">playlist {playlistName}</h1>
        <Button
          className="my-2 bg-green-600 hover:bg-green-500 text-black"
          onClick={() => migratePlaylist(params.playlistId)}
        >
          Migrate
        </Button>
      </div>
      <div className="flex flex-col justify-start items-start w-full">
        {songs?.map((song: SpotifySong) => (
          <div
            className="my-2 border-y-[0.25px] border-green-400"
            key={song.id}
          >
            {song.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlist;
