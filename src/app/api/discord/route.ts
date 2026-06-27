import { NextResponse } from "next/server";

const DISCORD_ID = process.env.DISCORD_ID;

export async function GET() {
  try {
    const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`, {
      next: {
        revalidate: 30,
      },
    });
    const { data } = await res.json();

    return NextResponse.json({
      status: data.discord_status,
      username: data.discord_user.username,
      displayName: data.discord_user.display_name,
      avatar: `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.webp?size=128`,
      activities: data.activities,
      listeningToSpotify: data.listening_to_spotify,
      spotify: data.spotify,
    });
  } catch {
    return NextResponse.json({
      status: "offline",
      activities: [],
    });
  }
}
