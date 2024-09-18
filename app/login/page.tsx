"use client";

export default function Login({ google = false, spotify =false }) {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {google && (
        <button
          onClick={async () => {
            window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/google/login`
          }}
        >
          Login with Google
        </button>
      )}
      {spotify && (
        <button
          onClick={async () => {
            window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/spotify/login`;
          }}
        >
          Login with Spotify
        </button>
      )}
    </div>
  );
}
