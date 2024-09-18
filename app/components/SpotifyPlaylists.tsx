"use client";

import React, { useEffect, useState } from "react";
import { getSpotifyPlaylists } from "../lib/api/spotify";
import { useRouter } from "next/navigation";
import { SpotifyPlaylistItem } from "../types/spotify";

const SpotifyPlaylists = () => {
  const [playlists, setPlaylists] = useState<SpotifyPlaylistItem[] | null>(
    null
  );
  const router = useRouter();

  const fetchSpotifyPlaylists = async () => {
    const data = await getSpotifyPlaylists();
    setPlaylists(data as SpotifyPlaylistItem[]);
  };
  useEffect(() => {
    fetchSpotifyPlaylists();
  }, []);

  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <h1 className="text-2xl font-bold">Spotify Playlists</h1>
      {playlists?.map((playlist: SpotifyPlaylistItem, index: number) => (
        <div className="p-2 bg-gray-200 rounded-md" key={playlist.id}>
          <span
            className="cursor-pointer text-lg font-bold text-black"
            onClick={() => router.push(`/spotify/playlist/${playlist.id}`)}
          >
            {index + 1}. {playlist.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SpotifyPlaylists;
