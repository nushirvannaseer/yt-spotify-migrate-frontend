"use client";
import Loading from "@/app/components/Loading";
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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
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
    { name: string; artist: string }[]
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
      selectedSongs.find(
        (s) => s.name === song.name && s.artist === song.artist
      ) !== undefined;
    return isSelected;
  };

  const handleSongClick = (song: SpotifySong) => {
    if (isSongSelected(song)) {
      setSelectedSongs(
        selectedSongs.filter(
          (s) => s.name !== song.name && s.artist !== song.artist
        )
      );
    } else {
      setSelectedSongs([
        ...selectedSongs,
        { name: song.name, artist: song.artist },
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
          {selectedSongs.length > 0 && (
            <Drawer open={isDrawerOpen}>
              <DrawerTrigger>
                {" "}
                <Button
                  variant="outline"
                  className="my-2 text-green font-semibold bg-green-600/20 hover:bg-green-300/20 hover:text-white border-green-500"
                  onClick={() => setIsDrawerOpen(true)}
                >
                  <Sync
                    className={`mr-2 h-4 w-4 fill-green-500 ${
                      isMigratingSelectedSongs ? "animate-spin" : ""
                    }`}
                  />
                  Migrate Selected Songs ({selectedSongs.length})
                </Button>
              </DrawerTrigger>
              <DrawerContent className="bg-black border-0 h-3/4 ">
                <div className="flex flex-col items-center justify-between h-full">
                  <DrawerHeader>
                    <DrawerTitle>Migrate Selected Songs</DrawerTitle>
                  </DrawerHeader>
                  <div className="flex flex-col gap-4 max-w-[80%]">
                    <p className="h-2 text-md text-gray-200 mb-0">
                      {`You've selected ${selectedSongs.length} songs to migrate`}
                    </p>
                    <p className="text-sm text-yellow-300">
                      Please enter a name for the new playlist. If not
                      specified, the name will be randomly generated.{" "}
                    </p>
                    <input
                      type="text"
                      className="rounded-lg py-2 px-4  focus:outline-green-700"
                      placeholder="Playlist Name"
                      value={playlistName}
                      defaultValue={playlistName}
                      onChange={(e) => setPlaylistName(e.target.value)}
                    />
                    <div className="flex flex-row flex-wrap items-center gap-4 justify-start">
                      {selectedSongs.map((song, index) => (
                        <div
                          key={index}
                          className="bg-primary flex flex-col w-[200px] p-4 rounded-md col-span-3"
                        >
                          <span className="text-md line-clamp-1 text-ellipsis font-semibold">
                            {song.name}
                          </span>
                          <span className="text-sm text-gray-500">
                            {song.artist}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <DrawerFooter className="flex flex-row justify-center w-full">
                    <Button
                      variant="outline"
                      className="hover:bg-green-800 hover:text-white hover:border-green-700 w-1/5"
                      onClick={() => migrateSelectedSongsMutation()}
                    >
                      Migrate Selected
                    </Button>
                    <DrawerClose>
                      <Button variant="destructive" className="w-full">
                        Cancel
                      </Button>
                    </DrawerClose>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
          )}
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
