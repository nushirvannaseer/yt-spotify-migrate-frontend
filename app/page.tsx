"use client";
import YTPlaylists from "./components/YTPlaylists";
import SpotifyPlaylists from "./components/SpotifyPlaylists";

export default function Home() {
  return (
    <div className="grid grid-cols-12 justify-between h-full items-start gap-4 px-10 pb-5">
      <div className="col-span-6">
        <YTPlaylists />
      </div>
      <div className="col-span-6">
        <SpotifyPlaylists />
      </div>
    </div>
  );
}
