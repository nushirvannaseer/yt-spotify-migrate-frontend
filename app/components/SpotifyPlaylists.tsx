"use client";

import React from "react";
import { getSpotifyPlaylists } from "../lib/api/spotify";
import { useRouter } from "next/navigation";
import { SpotifyPlaylistItem, SpotifyPlaylistResponse } from "../types/spotify";
import Spotify from "@/components/svg/spotify.svg";
import PlaylistItem from "./PlaylistItem";
import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";
import { toast } from "sonner";

const SpotifyPlaylists = () => {
  const {
    data: playlists,
    isLoading,
    error,
  } = useQuery<SpotifyPlaylistResponse>({
    queryKey: ["spotify-playlists"],
    queryFn: getSpotifyPlaylists,
  });
  if (error) {
    toast.error("Error fetching playlists: " + error.message);
  }
  const router = useRouter();
  return (
    <div className="flex flex-col justify-center items-center  rounded-xl pt-0">
      <div className="flex flex-row gap-2 mb-2 justify-center items-center pt-5 pb-5 w-full h-full border-b shadow-xl shadow-green-950 border-green-900">
        <Spotify className="w-10 h-10" />
        <h1 className="text-2xl font-bold text-green-400 flex items-center gap-2">
          Spotify
        </h1>
      </div>
      {isLoading && <Loading fill="green-500" />}
      <div className="p-5 mt-0 w-full h-[70vh] overflow-y-auto ">
        <div className="my-2">
          {playlists?.items?.map((playlist: SpotifyPlaylistItem) => (
            <PlaylistItem
              isSpotify={true}
              key={playlist.id}
              image={playlist.images[0].url}
              title={playlist.name}
              description={playlist.description}
              owner={playlist.owner.display_name}
              onClick={() => router.push(`/spotify/playlist/${playlist.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpotifyPlaylists;
