"use client";

import { Button } from "@/components/ui/button";

export default function Login({
  google = false,
  spotify = false,
}: {
  google?: boolean | undefined;
  spotify?: boolean | undefined;
}) {
  const SpotifyButton = () => {
    return (
      <Button
        disabled={!spotify}
        onClick={async () => {
          window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/spotify/login`;
        }}
      >
        Login with Spotify
      </Button>
    );
  };

  const GoogleButton = () => {
    return (
      <Button
        disabled={!google}
        onClick={async () => {
          window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/google/login`;
        }}
      >
        Login with Google
      </Button>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Login</h1>
        <p className="text-sm text-primary-background">
          Login to both of your accounts to continue
        </p>
      </div>

      <GoogleButton />

      <SpotifyButton />
    </div>
  );
}
