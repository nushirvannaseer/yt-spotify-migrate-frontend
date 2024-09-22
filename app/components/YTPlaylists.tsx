"use client";

import React from "react";
import { getYoutubeMusicPlaylists } from "../lib/api/youtube-music";
import { YouTubePlaylistItem } from "../types/ytmusic";
import YTMusic from "@/components/svg/ytmusic.svg";
import PlaylistItem from "./PlaylistItem";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";
import { toast } from "sonner";

const YTPlaylists = () => {
  const {
    data: playlists,
    isLoading,
    error,
  } = useQuery<YouTubePlaylistItem[]>({
    queryKey: ["youtube-music-playlists"],
    queryFn: getYoutubeMusicPlaylists,
  });
  const router = useRouter();
  if (error) {
    toast.error("Error fetching playlists: " + error.message);
  }

  return (
    <div className="flex flex-col justify-center items-center rounded-xl pt-0">
      <div className="flex flex-row gap-2 mb-2 justify-center items-center pt-5 pb-5 w-full h-full border-b shadow-xl shadow-red-950 border-red-950">
        <YTMusic className="w-10 h-10" />
        <h1 className="text-2xl font-bold text-red-500 flex items-center gap-2">
          YouTube Music
        </h1>
      </div>
      {isLoading && <Loading fill="red-500" />}
      <div className="p-5 mt-0 w-full h-[70vh] overflow-y-auto ">
        <div className="my-2">
          {playlists?.map(
            (playlist: YouTubePlaylistItem) =>
              playlist.playlistId !== "LM" && (
                <PlaylistItem
                  isSpotify={false}
                  key={playlist.playlistId}
                  image={playlist.thumbnails[0].url}
                  title={playlist.title}
                  description={playlist.description}
                  owner={playlist?.author?.[0].name || ""}
                  onClick={() =>
                    router.push(`/ytmusic/playlist/${playlist.playlistId}`)
                  }
                />
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default YTPlaylists;
