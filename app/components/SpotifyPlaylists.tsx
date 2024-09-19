"use client";

import React, { useEffect, useState } from "react";
import { getSpotifyPlaylists } from "../lib/api/spotify";
import { useRouter } from "next/navigation";
import { SpotifyPlaylistItem, SpotifyPlaylistResponse } from "../types/spotify";
import Spotify from "@/components/svg/spotify.svg";
import PlaylistItem from "./PlaylistItem";

const SpotifyPlaylists = () => {
  const [playlists, setPlaylists] = useState<SpotifyPlaylistResponse | null>(
    null
  );
  const router = useRouter();

  const fetchSpotifyPlaylists = async () => {
    const data = await getSpotifyPlaylists();
    setPlaylists(data as SpotifyPlaylistResponse);
  };
  useEffect(() => {
    fetchSpotifyPlaylists();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center  rounded-xl pt-5">
      <div className="flex flex-row gap-2 mb-2 justify-center items-center pt-5 pb-5 w-full h-full border-b shadow-xl shadow-green-950 border-green-900">
        <Spotify className="w-10 h-10" />
        <h1 className="text-2xl font-bold text-green-400 flex items-center gap-2">
          Spotify
        </h1>
      </div>
      <div className="p-5 mt-0 h-[70vh] overflow-y-auto ">
        <div className="my-2">
          {playlists?.items?.map((playlist: SpotifyPlaylistItem) => (
            <PlaylistItem
              isSpotify={true}
              key={playlist.id}
              image={playlist.images[0].url}
              title={playlist.name}
              description={playlist.description}
              owner={playlist.owner.display_name}
              onClick={() =>
                router.push(`/spotify/playlist/${playlist.id}/${playlist.name}`)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpotifyPlaylists;
