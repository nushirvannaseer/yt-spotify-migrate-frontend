"use client";
import Loading from "@/app/components/Loading";
import MigrateSongsDrawer from "@/app/components/MigrateSongsDrawer";
import PleaseWaitModal from "@/app/components/PleaseWaitModal";
import SongItem from "@/app/components/SongItem";
import { migratePlaylist } from "@/app/lib/api/migration";
import {
  getSpotifyPlaylistSongs,
  migrateSpotifySongs,
} from "@/app/lib/api/spotify";
import { SpotifyPlaylistSongsResponse, SpotifySong } from "@/app/types/spotify";
import Sync from "@/components/svg/sync.svg";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "sonner";

const Playlist = ({ params }: { params: { playlistId: string } }) => {
  const { data: playlistSongs, isLoading } =
    useQuery<SpotifyPlaylistSongsResponse>({
      queryKey: ["spotify-playlist-songs", params.playlistId],
      queryFn: () => getSpotifyPlaylistSongs(params.playlistId),
    });

  const { mutateAsync: migratePlaylistMutation, isPending: isMigrating } =
    useMutation({
      mutationFn: () => migratePlaylist(params.playlistId),
      onSuccess: () => {
        toast.success("Playlist migrated successfully!");
      },
      onError: () => {
        toast.error("Error migrating playlist");
      },
    });

  const {
    mutateAsync: migrateSelectedSongsMutation,
    isPending: isMigratingSelectedSongs,
  } = useMutation({
    mutationFn: () => {
      setIsDrawerOpen(false);
      setIsModalOpen(true);
      return migrateSpotifySongs(
        selectedSongs.map((song) => ({
          name: song.name,
          artist: song.artist,
        })),

        playlistName
      );
    },
    onSuccess: () => {
      toast.success("Songs migrated successfully!");
    },
    onError: () => {
      toast.error("Error migrating playlist");
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

  const handleMigratePlaylist = async () => {
    setIsModalOpen(true);
    await migratePlaylistMutation();
  };

  if (isLoading) {
    return <Loading fill="green-500" />;
  }

  const isSongSelected = (song: SpotifySong) => {
    const isSelected =
      selectedSongs.find((s) => s.id === song.id) !== undefined;
    return isSelected;
  };

  const handleSongClick = (song: SpotifySong) => {
    if (isSongSelected(song)) {
      setSelectedSongs(selectedSongs.filter((s) => s.id !== song.id));
    } else {
      setSelectedSongs([
        ...selectedSongs,
        { name: song.name, artist: song.artist, id: song.id },
      ]);
    }
  };

  return (
    <div className="flex flex-col items-center mx-10 h-screen">
      <div className="flex flex-row w-full items-center justify-between my-5 px-2">
        <span className="text-2xl font-bold">
          Your Songs in{" "}
          <span className="text-green-500">{playlistSongs?.playlist_name}</span>
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
            isMigratingSelectedSongs={isMigratingSelectedSongs}
            migrateSelectedSongsMutation={migrateSelectedSongsMutation}
          />
          <Button
            className="my-2 text-green font-semibold bg-green-600 hover:bg-green-500 text-black"
            disabled={isMigrating}
            onClick={handleMigratePlaylist}
          >
            <Sync
              className={`mr-2 h-4 w-4 ${isMigrating ? "animate-spin" : ""}`}
            />
            {isMigrating ? "Migrating..." : "Migrate All to YouTube Music"}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-12 justify-start items-start w-full">
        {playlistSongs?.songs?.map((song: SpotifySong, index: number) => (
          <div
            onClick={() => handleSongClick(song)}
            className="m-2 col-span-4"
            key={song.id + song.name + song.artist + index}
          >
            <SongItem
              title={song.name}
              artist={song.artist}
              album={song.album}
              image={song.image}
              isSpotify={true}
              isSelected={isSongSelected(song)}
            />
          </div>
        ))}
      </div>
      <PleaseWaitModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        migrateTo="YouTube Music"
      />
    </div>
  );
};

export default Playlist;
