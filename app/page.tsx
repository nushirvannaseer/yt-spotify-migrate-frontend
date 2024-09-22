"use client";
import YTPlaylists from "./components/YTPlaylists";
import SpotifyPlaylists from "./components/SpotifyPlaylists";

export default function Home() {
  return (
    <div className="grid grid-cols-12 justify-between h-full items-start gap-4 px-10 pb-5">
      <div className="col-span-12 mx-auto mt-5">
        <h1 className="text-xl bg-gradient-to-r from-green-500 to-red-500 text-transparent bg-clip-text font-bold">
          Click on a playlist to migrate it
        </h1>
      </div>
      <div className="col-span-6">
        <YTPlaylists />
      </div>
      <div className="col-span-6">
        <SpotifyPlaylists />
      </div>
      <footer className="col-span-12 text-center text-sm text-zinc-500">
        <a href="/privacy-policy">Privacy Policy</a>
      </footer>
    </div>
  );
}
