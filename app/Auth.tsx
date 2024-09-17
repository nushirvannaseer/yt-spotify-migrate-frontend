
'use client'

import useAuth from "./hooks/useAuth";
import Login from "./login/page";

export default function Auth({children}: Readonly<{
    children: React.ReactNode;
  }>) {
  const { user } = useAuth();
  console.log(user)
  if (!user || Object.keys(user!).length === 0) {
    return <Login google={true} spotify={true}/>
  }
  //if neither google nor spotify token info is present, redirect to login with both options
  if(user && !('google_token_info' in user) && !('spotify_token_info' in user)) {
    console.log("both")
    return <Login google={true} spotify={true}/>
  }
  //if only spotify token info is present, redirect to login with google option
  if(user && 'spotify_token_info' in user && !('google_token_info' in user)) {
    console.log("google")
    return <Login google={true}/>
  }
  //if only google token info is present, redirect to login with spotify option
  if(user && 'google_token_info' in user && !('spotify_token_info' in user)) {
    console.log("spotify")
    return <Login spotify={true}/>
  }
  return <>{children}</>
}
