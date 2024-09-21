import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import Sync from "@/components/svg/sync.svg";

interface MigrateSongsDrawerProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  selectedSongs: { name: string; artist: string }[];
  playlistName: string;
  setPlaylistName: (name: string) => void;
  isMigratingSelectedSongs: boolean;
  migrateSelectedSongsMutation: () => void;
  isSpotify?: boolean;
}

const MigrateSongsDrawer: React.FC<MigrateSongsDrawerProps> = ({
  isDrawerOpen,
  setIsDrawerOpen,
  selectedSongs,
  playlistName,
  setPlaylistName,
  isMigratingSelectedSongs,
  migrateSelectedSongsMutation,
  isSpotify = true,
}) => {
  return (
    <Drawer
      open={isDrawerOpen}
      onOpenChange={(open) => setIsDrawerOpen(open)} // Added this line
    >
      <DrawerTrigger
        disabled={isMigratingSelectedSongs || selectedSongs.length === 0}
      >
        <Button
          variant="outline"
          disabled={isMigratingSelectedSongs || selectedSongs.length === 0}
          className={`my-2 text-green font-semibold hover:text-white ${
            isSpotify
              ? " border-green-500 bg-green-600/20 hover:bg-green-300/20"
              : "border-red-500 bg-red-600/20 hover:bg-red-300/20"
          }`}
          onClick={() => setIsDrawerOpen(true)}
        >
          <Sync
            className={`mr-2 h-4 w-4 ${
              isSpotify ? "fill-green-500" : "fill-red-500"
            } ${isMigratingSelectedSongs ? "animate-spin" : ""}`}
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
              Please enter a name for the new playlist. If not specified, the
              name will be randomly generated.
            </p>
            <input
              type="text"
              className={`rounded-lg py-2 px-4  ${
                isSpotify ? "focus:outline-green-700" : "focus:outline-red-700"
              }`}
              placeholder="Playlist Name"
              value={playlistName}
              defaultValue={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
            />
            <div className="flex flex-row flex-wrap items-center bg-neutral-800/90 rounded-lg p-4 gap-4 justify-center max-h-[40vh] overflow-auto">
              {selectedSongs.map((song, index) => (
                <div
                  key={index}
                  className="bg-primary flex flex-col w-[200px] p-4 rounded-md col-span-3"
                >
                  <span className="text-md line-clamp-1 text-ellipsis font-semibold">
                    {song.name}
                  </span>
                  <span className="text-sm text-gray-500 line-clamp-1 text-ellipsis">
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
              onClick={migrateSelectedSongsMutation}
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
  );
};

export default MigrateSongsDrawer;
