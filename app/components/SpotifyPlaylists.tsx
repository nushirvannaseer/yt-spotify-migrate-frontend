"use client";

import React, { useEffect, useState } from "react";
import { getSpotifyPlaylists } from "../lib/api/spotify";
import { useRouter } from "next/navigation";

const SpotifyPlaylists = () => {
  const [playlists, setPlaylists] = useState(null);
  const router = useRouter();

  const fetchSpotifyPlaylists = async () => {
    console.log("Fetching playlists");
    const data = await getSpotifyPlaylists();
    setPlaylists(data);
    console.log(data) 
  };
  useEffect(() => {
    fetchSpotifyPlaylists();
  }, []);

  return <div className="flex flex-col gap-2 justify-center items-center">
    <h1 className="text-2xl font-bold">Spotify Playlists</h1>
    {playlists?.items?.map((playlist: any, index: number) => (
        <div className="p-2 bg-gray-200 rounded-md" key={playlist.id}><span className="cursor-pointer text-lg font-bold text-black" onClick={() => router.push(`/spotify/playlist/${playlist.id}`)}>{index + 1}. {playlist.name}</span></div>
    ))}
  </div>;
};

export default SpotifyPlaylists;
