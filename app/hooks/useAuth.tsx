"use client";
import { useEffect, useState } from "react";
import { ErrorResponse } from "../types/errors";
import {
  refreshGoogleAccessToken,
  refreshSpotifyAccessToken,
} from "../lib/api/auth";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorResponse | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/session`,
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        if (data.spotify_token_info) {
          if (Date.now() <= data.spotify_token_info.expires_at) {
            const accessToken = await refreshSpotifyAccessToken({
              spotify_refresh_token: data.spotify_token_info.refresh_token,
            });
            if (accessToken) {
              data.spotify_token_info.access_token = accessToken;
              data.spotify_token_info.expires_in =
                Date.now() + accessToken.expires_in * 1000;
            }
          }
        }
        if (data.google_token_info) {
          if (Date.now() <= data.google_token_info.expires_at) {
            const accessToken = await refreshGoogleAccessToken({
              google_refresh_token: data.google_token_info.refresh_token,
            });
            if (accessToken) {
              data.google_token_info.access_token = accessToken;
              data.google_token_info.expires_in =
                Date.now() + accessToken.expires_in * 1000;
            }
          }
        }
        setUser(data);
      } catch (error) {
        setError(error as ErrorResponse);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);
  return { user, loading, error };
};

export default useAuth;
