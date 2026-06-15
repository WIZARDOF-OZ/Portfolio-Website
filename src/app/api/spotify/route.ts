import { NextResponse } from "next/server";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

// get a fresh access token using our refresh token
async function getAccessToken() {
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN!,
    }),
  });

  return res.json();
}

// use that access token to get currently playing song
export async function GET() {
  try {
    const { access_token } = await getAccessToken();
    console.log("Access token:", access_token);

    const res = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );

    console.log("Spotify status:", res.status);

    if (res.status === 204) {
      return NextResponse.json({ isPlaying: false });
    }

    if (!res.ok) {
      return NextResponse.json({
        error: res.status,
        message: await res.text(),
      });
    }

    const data = await res.json();
    console.log("Data:", data);

    return NextResponse.json({
      isPlaying: data.is_playing,
      title: data.item?.name,
      artist: data.item?.artists
        ?.map((a: { name: string }) => a.name)
        .join(", "),
      album: data.item?.album?.name,
      albumArt: data.item?.album?.images?.[0]?.url,
      songUrl: data.item?.external_urls?.spotify,
      progress: data.progress_ms,
      duration: data.item?.duration_ms,
    });
  } catch (e) {
    console.log("Error:", e);
    return NextResponse.json({ isPlaying: false });
  }
}
