"use client";

import useAuth from "./hooks/useAuth";
import Login from "./components/login/login";
import Header from "./components/Header";
import Loading from "./components/Loading";
import { toast } from "sonner";

export default function Auth({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loading, error } = useAuth();
  if (loading) {
    return <Loading fill="green-500" />;
  }

  if ((!user || Object.keys(user!).length === 0) && error) {
    toast.error("You are not logged in to the app");
    return <Login google={true} spotify={true} />;
  }

  if (!user || Object.keys(user!).length === 0) {
    return <Login google={true} spotify={true} />;
  }
  //if neither google nor spotify token info is present, redirect to login with both options
  if (
    user &&
    !("google_token_info" in user) &&
    !("spotify_token_info" in user)
  ) {
    return <Login google={true} spotify={true} />;
  }
  //if only spotify token info is present, redirect to login with google option
  if (user && "spotify_token_info" in user && !("google_token_info" in user)) {
    return <Login google={true} />;
  }
  //if only google token info is present, redirect to login with spotify option
  if (user && "google_token_info" in user && !("spotify_token_info" in user)) {
    return <Login spotify={true} />;
  }

  return (
    <>
      <Header user={user} />
      {children}
    </>
  );
}
