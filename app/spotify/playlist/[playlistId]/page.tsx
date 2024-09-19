"use client";
import Loading from "@/app/components/Loading";
import PleaseWaitModal from "@/app/components/PleaseWaitModal";
import SongItem from "@/app/components/SongItem";
import { migratePlaylist } from "@/app/lib/api/migration";
import { getSpotifyPlaylistSongs } from "@/app/lib/api/spotify";
import { SpotifyPlaylistSongsResponse, SpotifySong } from "@/app/types/spotify";
import Sync from "@/components/svg/sync.svg";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Playlist = ({ params }: { params: { playlistId: string } }) => {
  const [playlistSongs, setPlaylistSongs] =
    useState<SpotifyPlaylistSongsResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isMigrating, setIsMigrating] = useState<boolean>(false);

  const handleMigratePlaylist = async () => {
    setIsModalOpen(true);
    setIsMigrating(true);
    try {
      await migratePlaylist(params.playlistId);
      toast.success("Playlist migrated successfully!");
    } catch (error) {
      toast.error("Error migrating playlist");
    } finally {
      setIsMigrating(false);
    }
  };

  useEffect(() => {
    const fetchPlaylistSongs = async () => {
      setIsLoading(true);
      const songs = await getSpotifyPlaylistSongs(params.playlistId);
      setPlaylistSongs(songs as SpotifyPlaylistSongsResponse);
      setIsLoading(false);
      toast.success("Playlist fetched successfully!");
    };
    fetchPlaylistSongs();
  }, [params.playlistId]);

  if (isLoading) {
    return <Loading fill="green-500" />;
  }

  return (
    <div className="flex flex-col items-center mx-10 h-full">
      <div className="flex flex-row w-full items-center justify-between my-5 px-2">
        <span className="text-2xl font-bold">
          Your Songs in{" "}
          <span className="text-green-500">{playlistSongs?.playlist_name}</span>
          <span className="ml-4 text-base text-gray-500">
            {"[" + playlistSongs?.songs?.length + " songs]"}
          </span>
        </span>
        <Button
          className="my-2 text-green font-semibold bg-green-600 hover:bg-green-500 text-black"
          disabled={isMigrating}
          onClick={handleMigratePlaylist}
        >
          <Sync
            className={`mr-2 h-4 w-4 ${isMigrating ? "animate-spin" : ""}`}
          />
          {isMigrating ? "Migrating..." : "Migrate to YouTube Music"}
        </Button>
      </div>
      <div className="grid grid-cols-12 justify-start items-start w-full">
        {playlistSongs?.songs?.map((song: SpotifySong) => (
          <div className="m-2 col-span-4" key={song.id}>
            <SongItem
              title={song.name}
              artist={song.artist}
              album={song.album}
              image={song.image}
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
