"use client";

import React, { useEffect, useState } from "react";
import { getYoutubeMusicPlaylists, getYTPlaylistSongs } from "../lib/api/youtube-music";

const YTPlaylists = () => {
  const [playlists, setPlaylists] = useState(null);

  const fetchYoutubeMusicPlaylists = async () => {
    console.log("Fetching playlists");
    const data = await getYoutubeMusicPlaylists();
    setPlaylists(data);
    console.log(data) 
  };
  useEffect(() => {
    fetchYoutubeMusicPlaylists();
  }, []);

  return <div className="flex flex-col gap-2 justify-center items-center">
    <h1 className="text-2xl font-bold">YouTube Music Playlists</h1>
    {playlists?.map((playlist: any) => (
        <div className="p-2 bg-gray-200 rounded-md" key={playlist.playlistId}><span className="cursor-pointer text-lg font-bold text-black">{playlist.title}</span></div>
    ))}
  </div>;
};

export default YTPlaylists;
