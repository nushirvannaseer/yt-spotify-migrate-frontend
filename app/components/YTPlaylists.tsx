"use client";

import React, { useEffect, useState } from "react";
import { getYoutubeMusicPlaylists } from "../lib/api/youtube-music";
import { YouTubePlaylistItem } from "../types/ytmusic";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import YTMusic from "@/components/svg/ytmusic.svg";

const YTPlaylists = () => {
  const [playlists, setPlaylists] = useState<YouTubePlaylistItem[] | null>(
    null
  );

  const fetchYoutubeMusicPlaylists = async () => {
    const data = await getYoutubeMusicPlaylists();
    setPlaylists(data);
  };
  useEffect(() => {
    fetchYoutubeMusicPlaylists();
  }, []);

  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <h1 className="text-2xl font-bold text-red-500 flex items-center gap-2">
        <YTMusic className="w-10 h-10" />
        YouTube Music
      </h1>
      <TableCaption>A list of your YouTube Music playlists.</TableCaption>
      <Table className="max-h-[1024px]w-full hover:cursor-pointer">
        <TableHeader>
          <TableRow>
            <TableHead className="w-40 text-red-500">Title</TableHead>
            <TableHead className="text-red-500">Description</TableHead>
            <TableHead className="text-red-500">Owner</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {playlists?.map((playlist: YouTubePlaylistItem) => (
            <TableRow className="hover:bg-[#c3352e]" key={playlist.playlistId}>
              <TableCell className="font-medium">{playlist.title}</TableCell>
              <TableCell>{playlist.description}</TableCell>
              <TableCell>{playlist.author?.[0].name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default YTPlaylists;
