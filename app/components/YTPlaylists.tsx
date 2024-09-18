"use client";

import React, { useEffect, useState } from "react";
import { getYoutubeMusicPlaylists } from "../lib/api/youtube-music";
import { YouTubePlaylistResponse, YouTubePlaylistItem } from "../types/ytmusic";

const YTPlaylists = () => {
  const [playlists, setPlaylists] = useState<YouTubePlaylistResponse | null>(
    null
  );

  const fetchYoutubeMusicPlaylists = async () => {
    const data = await getYoutubeMusicPlaylists();
    setPlaylists({ items: data } as YouTubePlaylistResponse);
  };
  useEffect(() => {
    fetchYoutubeMusicPlaylists();
  }, []);

  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <h1 className="text-2xl font-bold">YouTube Music Playlists</h1>
      {playlists?.items?.map((playlist: YouTubePlaylistItem) => (
        <div className="p-2 bg-gray-200 rounded-md" key={playlist.playlistId}>
          <span className="cursor-pointer text-lg font-bold text-black">
            {playlist.title}
          </span>
        </div>
      ))}
    </div>
  );
};

export default YTPlaylists;
