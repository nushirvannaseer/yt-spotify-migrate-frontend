"use client";

import React, { useEffect, useState } from "react";
import { getSpotifyPlaylists } from "../lib/api/spotify";
import { useRouter } from "next/navigation";
import { SpotifyPlaylistItem, SpotifyPlaylistResponse } from "../types/spotify";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Spotify from "@/components/svg/spotify.svg";

const SpotifyPlaylists = () => {
  const [playlists, setPlaylists] = useState<SpotifyPlaylistResponse | null>(
    null
  );
  const router = useRouter();

  const fetchSpotifyPlaylists = async () => {
    const data = await getSpotifyPlaylists();
    setPlaylists(data as SpotifyPlaylistResponse);
  };
  useEffect(() => {
    fetchSpotifyPlaylists();
  }, []);

  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <h1 className="text-2xl font-bold text-green-400 flex items-center gap-2">
        <Spotify className="w-10 h-10" />
        Spotify
      </h1>
      <TableCaption>A list of your Spotify playlists.</TableCaption>
      <Table className="h-fit max-h-80 overflow-y-auto relative w-full hover:cursor-pointer">
        <TableHeader>
          <TableRow>
            <TableHead className="w-40 text-green-400">Title</TableHead>
            <TableHead className="text-green-400">Description</TableHead>
            <TableHead className="text-green-400">Owner</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="overflow-y-auto">
          {playlists?.items?.map((playlist: SpotifyPlaylistItem) => (
            <TableRow
              className="hover:bg-green-900"
              onClick={() => router.push(`/spotify/playlist/${playlist.id}/${playlist.name}`)}
              key={playlist.id}
            >
              <TableCell className="font-medium">{playlist.name}</TableCell>
              <TableCell>{playlist.description}</TableCell>
              <TableCell>{playlist.owner.display_name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SpotifyPlaylists;
