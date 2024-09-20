"use client";
import Loading from "@/app/components/Loading";
import PleaseWaitModal from "@/app/components/PleaseWaitModal";
import SongItem from "@/app/components/SongItem";
import { getYTPlaylistSongs } from "@/app/lib/api/youtube-music";
import { YouTubePlaylistSongsResponse, YouTubeSong } from "@/app/types/ytmusic";
import Sync from "@/components/svg/sync.svg";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Playlist = ({ params }: { params: { playlistId: string } }) => {
  const [playlistSongs, setPlaylistSongs] =
    useState<YouTubePlaylistSongsResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isMigrating, setIsMigrating] = useState<boolean>(false);
  const [selectedSongs, setSelectedSongs] = useState<
    { name: string; artist: string }[]
  >([]);

  const handleMigratePlaylist = async () => {
    setIsModalOpen(true);
    setIsMigrating(true);
    try {
      //   await migratePlaylist(params.playlistId);
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
      const songs = await getYTPlaylistSongs(params.playlistId);
      setPlaylistSongs(songs);
      setIsLoading(false);
      toast.success("Playlist fetched successfully!");
    };
    fetchPlaylistSongs();
  }, [params.playlistId]);

  if (isLoading) {
    return <Loading fill="red-500" />;
  }

  const isSongSelected = (song: YouTubeSong) => {
    return (
      selectedSongs.find(
        (s) => s.name === song.title && s.artist === song.artist
      ) !== undefined
    );
  };

  const handleSongClick = (song: YouTubeSong) => {
    if (isSongSelected(song)) {
      setSelectedSongs(
        selectedSongs.filter(
          (s) => s.name !== song.title && s.artist !== song.artist
        )
      );
    } else {
      setSelectedSongs([
        ...selectedSongs,
        { name: song.title, artist: song.artist },
      ]);
    }
  };

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
        <Button
          className="my-2 text-green font-semibold bg-red-600 hover:bg-red-600 text-white"
          disabled={isMigrating}
          onClick={handleMigratePlaylist}
        >
          <Sync
            className={`mr-2 h-4 w-4 fill-white ${
              isMigrating ? "animate-spin" : ""
            }`}
          />
          {isMigrating ? "Migrating..." : "Migrate to YouTube Music"}
        </Button>
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
