// refreshToken.js
import axios from "axios";

export const refreshSpotifyAccessToken = async ({
  spotify_refresh_token,
}: {
  spotify_refresh_token: string;
}) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/spotify/refresh-token`,
      {
        refresh_token: spotify_refresh_token,
      }
    );

    const { access_token, expires_in } = response.data;

    return { access_token, expires_in };
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    return null;
  }
};

export const refreshGoogleAccessToken = async ({
  google_refresh_token,
}: {
  google_refresh_token: string;
}) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/google/refresh-token`,
      {
        refresh_token: google_refresh_token,
      }
    );

    const { access_token, expires_in } = response.data;

    return { access_token, expires_in };
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    return null;
  }
};
