import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

export interface SpotifyAccessToken {
  access_token: string;
  token_type: string;
  expires_in: number;
}

let accessToken: string | null = null;
let tokenExpiryTime: number = 0;

export const getSpotifyToken = async (): Promise<string | undefined> => {
  const currentTime = Math.floor(Date.now() / 1000);

  if (accessToken && currentTime < tokenExpiryTime) {
    return accessToken;
  }


  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({ grant_type: "client_credentials" }),
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(
              `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
            ).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
      
    );

    const data: SpotifyAccessToken = response.data;
    accessToken = data.access_token;
    tokenExpiryTime = Math.floor(Date.now() / 1000) + data.expires_in;
    return accessToken;
  } catch (error: any) {
    console.error("Error fetching token:", error.response?.data || error.message);
  }
};
