"use client";
import Loading from "@/app/components/Loading";
import MigrateSongsDrawer from "@/app/components/MigrateSongsDrawer";
import PleaseWaitModal from "@/app/components/PleaseWaitModal";
import SongItem from "@/app/components/SongItem";
import {
  getYTPlaylistSongs,
  migrateYTPlaylist,
  migrateYTSongs,
} from "@/app/lib/api/youtube-music";
import { YouTubePlaylistSongsResponse, YouTubeSong } from "@/app/types/ytmusic";
import Sync from "@/components/svg/sync.svg";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "sonner";

const Playlist = ({ params }: { params: { playlistId: string } }) => {
  const { data: playlistSongs, isLoading: isFetchingPlaylistSongs } =
    useQuery<YouTubePlaylistSongsResponse>({
      queryKey: ["yt-playlist-songs", params.playlistId],
      queryFn: () => getYTPlaylistSongs(params.playlistId),
    });

  const { mutateAsync: migratePlaylistMutation, isPending: isMigrating } =
    useMutation({
      mutationFn: () => {
        setIsDrawerOpen(false);
        setIsModalOpen(true);
        return migrateYTPlaylist(params.playlistId);
      },
      onSuccess: () => {
        toast.success("Playlist migrated successfully!");
      },
      onError: () => {
        toast.error("Error migrating playlist");
      },
    });

  const { mutateAsync: migrateSongsMutation, isPending: isMigratingSongs } =
    useMutation({
      mutationFn: () => {
        setIsDrawerOpen(false);
        setIsModalOpen(true);
        return migrateYTSongs(playlistName, selectedSongs);
      },
      onSuccess: () => {
        toast.success("Songs migrated successfully!");
      },
      onError: () => {
        toast.error("Error migrating songs");
      },
    });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedSongs, setSelectedSongs] = useState<
    { name: string; artist: string; id: string }[]
  >([]);
  const [playlistName, setPlaylistName] = useState<string>(
    playlistSongs?.playlist_name || ""
  );

  if (isFetchingPlaylistSongs) {
    return <Loading fill="red-500" />;
  }

  const isSongSelected = (song: YouTubeSong) => {
    return selectedSongs.find((s) => s.id === song.id) !== undefined;
  };

  const handleSongClick = (song: YouTubeSong) => {
    if (isSongSelected(song)) {
      setSelectedSongs(selectedSongs.filter((s) => s.id !== song.id));
    } else {
      setSelectedSongs([
        ...selectedSongs,
        { name: song.title, artist: song.artist, id: song.id },
      ]);
    }
  };

  if (isFetchingPlaylistSongs) {
    return <Loading fill="red-500" />;
  }

  return (
    <div className="flex flex-col items-center mx-10 h-screen">
      <div className="flex flex-row w-full items-center justify-between my-5 px-2">
        <span className="text-2xl font-bold">
          Your Songs in{" "}
          <span className="text-red-500">{playlistSongs?.playlist_name}</span>
          <span className="ml-4 text-base text-gray-500">
            {"[" + playlistSongs?.songs?.length + " songs]"}
          </span>
        </span>
        <div className="flex flex-row items-center gap-4">
          <MigrateSongsDrawer
            isDrawerOpen={isDrawerOpen}
            setIsDrawerOpen={setIsDrawerOpen}
            selectedSongs={selectedSongs}
            playlistName={playlistName}
            setPlaylistName={setPlaylistName}
            isMigratingSelectedSongs={isMigratingSongs}
            migrateSelectedSongsMutation={migrateSongsMutation}
            isSpotify={false}
          />
          <Button
            className="my-2 text-green font-semibold bg-red-600 hover:bg-red-600 text-white"
            disabled={isMigrating}
            onClick={() => migratePlaylistMutation()}
          >
            <Sync
              className={`mr-2 h-4 w-4 fill-white ${
                isMigrating ? "animate-spin" : ""
              }`}
            />
            {isMigrating ? "Migrating..." : "Migrate All to Spotify"}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-12 justify-start items-start w-full">
        {playlistSongs?.songs?.map((song: YouTubeSong) => (
          <div
            className="m-2 col-span-4"
            onClick={() => handleSongClick(song)}
            key={song.id}
          >
            <SongItem
              title={song.title}
              artist={song.artist}
              album={song.album}
              image={song.image}
              isSelected={isSongSelected(song)}
              isSpotify={false}
            />
          </div>
        ))}
      </div>
      <PleaseWaitModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        migrateTo="Spotify"
      />
    </div>
  );
};

export default Playlist;
