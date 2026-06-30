import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

const DISCORD_ID = process.env.DISCORD_ID;

export async function GET() {
  try {
    const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`, {
      cache: "no-store",
    });
       console.log("Lanyard response status:", res.status)
         const json = await res.json()
    console.log("Lanyard full response:", JSON.stringify(json))
    const { data } = json;
 if (!data) {
      return NextResponse.json({ error: "No data field", raw: json })
    }
    return NextResponse.json({
      status: data.discord_status,
      username: data.discord_user.username,
      displayName: data.discord_user.display_name,
      avatar: `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.webp?size=128`,
      activities: data.activities,
      listeningToSpotify: data.listening_to_spotify,
      spotify: data.spotify,
    });
  } catch (e) {
   console.log("Discord API error:", e)
    return NextResponse.json({ status: "offline", activities: [], error: String(e) })
  }
}
