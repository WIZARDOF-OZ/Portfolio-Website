"use client";
import { useState, useEffect } from "react";
import {
  FaGithub,
  FaDiscord,
  FaInstagram,
  FaXTwitter,
  FaSpotify,
} from "react-icons/fa6";
import Image from "next/image";
interface DiscordData {
  status: "online" | "idle" | "dnd" | "offline";
  displayName: string;
  avatar: string;
  activities: {
    name: string;
    details?: string;
    state?: string;
    type: number;
  }[];
}

interface SpotifyData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  albumArt?: string;
  songUrl?: string;
  progress?: number;
  duration?: number;
}

interface GithubData {
  username: string;
  avatar: string;
  followers: number;
  following: number;
  publicRepos: number;
  totalStars: number;
  topRepos: {
    name: string;
    description: string | null;
    language: string | null;
    url: string;
    stars: number;
  }[];
}
export default function Home() {
  const [spotify, setSpotify] = useState<SpotifyData>({ isPlaying: false });
  const [progress, setProgress] = useState(0);
  const [discord, setDiscord] = useState<DiscordData>({
    status: "offline",
    displayName: "",
    avatar: "",
    activities: [],
  });

  useEffect(() => {
    const fetchSpotify = async () => {
      const res = await fetch("/api/spotify");
      const data = await res.json();
      setSpotify(data);
      setProgress(data.progress || 0);
    };

    fetchSpotify();
    const fetchInterval = setInterval(fetchSpotify, 30000);

    return () => clearInterval(fetchInterval);
  }, []);

  // Separate useEffect just for ticking progress
  useEffect(() => {
    if (!spotify.isPlaying) return;

    const tick = setInterval(() => {
      setProgress((prev) => prev + 1000);
    }, 1000);

    return () => clearInterval(tick);
  }, [spotify.isPlaying]);

  // Discord
  useEffect(() => {
    const fetchDiscord = async () => {
      const res = await fetch("/api/discord");
      const data = await res.json();
      setDiscord(data);
    };

    fetchDiscord();
    // Refresh every 30 seconds
    const interval = setInterval(fetchDiscord, 30000);
    return () => clearInterval(interval);
  }, []);

  // github
  const [github, setGithub] = useState<GithubData | null>(null);
  useEffect(() => {
    const fetchGithub = async () => {
      const res = await fetch("/api/github");
      const data = await res.json();
      setGithub(data);
    };

    fetchGithub();
    // GitHub data doesn't change often, refresh every 5 minutes
    const interval = setInterval(fetchGithub, 300000);
    return () => clearInterval(interval);
  }, []);
  return (
    <main className="min-h-screen relative overflow-hidden bg-[#0a0a0f]">
      {/* Aurora blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[30%] w-[400px] h-[400px] rounded-full bg-pink-600/15 blur-[120px]" />
      </div>

      {/* Page content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen py-16 p-6">
        {/* Profile Card */}
        <div className="w-full max-w-xl rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
          {/* Banner */}
          <div className="h-36 w-full rounded-t-3xl bg-gradient-to-r from-purple-600/60 via-blue-600/60 to-pink-600/60" />

          {/* Body */}
          <div className="px-8 pt-0 pb-10">
            {/* Avatar */}
            <div className="relative -mt-12 mb-4">
              <Image
                src="https://github.com/WIZARDOF-OZ.png"
                alt="Avatar"
                className="w-24 h-24 rounded-2xl border-4 border-[#0a0a0f] object-cover"
                width={96}
                height={96}
              />
            </div>

            {/* Name */}
            <h1 className="text-2xl font-bold flex flex-wrap items-baseline gap-2 mb-1">
              <span className="text-white">WIZARD OF OZ</span>
              <span className="text-white/40 font-normal text-lg">
                (Rizuwanul)
              </span>
            </h1>

            {/* Username */}
            <p className="text-white/50 text-sm mb-3">@wizardof_oz</p>

            {/* Bio */}
            <p className="text-white/70 text-sm leading-relaxed mb-3">
              Full-stack developer, Discord server manager, & Open source
              enthusiast. Building things that matter.
            </p>

            {/* Location & Date */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-white/40 text-xs">📍 Assam, India</span>
              <span className="text-white/40 text-xs">📅 Alive since 2007</span>
            </div>

            {/* Divider */}
            <div className="border-t border-white/10 mb-4" />

            {/* Social Links */}
            <div className="flex flex-wrap gap-2">
              <a
                href="https://x.com/Wizard_OFOZ2345"
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.08] border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-200 group"
              >
                <FaXTwitter size={14} className="text-white" />
                <span className="text-white/70 text-sm group-hover:text-white transition-colors">
                  Twitter
                </span>
              </a>
              <a
                href="https://github.com/WIZARDOF-OZ"
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.08] border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-200 group"
              >
                <FaGithub size={14} className="text-white/80" />
                <span className="text-white/70 text-sm group-hover:text-white transition-colors">
                  GitHub
                </span>
              </a>
              <a
                href="https://discord.com/channels/583666642010112000"
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.08] border border-white/20 hover:bg-indigo-400/20 hover:border-indigo-400/40 transition-all duration-200 group"
              >
                <FaDiscord size={14} className="text-indigo-400" />
                <span className="text-white/70 text-sm group-hover:text-white transition-colors">
                  Discord
                </span>
              </a>
              <a
                href="https://instagram.com/wizardofoz.dev"
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.08] border border-white/20 hover:bg-pink-400/20 hover:border-pink-400/40 transition-all duration-200 group"
              >
                <FaInstagram size={14} className="text-pink-400" />
                <span className="text-white/70 text-sm group-hover:text-white transition-colors">
                  Instagram
                </span>
              </a>
            </div>
            {/* Divider */}
            <div className="border-t border-white/10 mt-4 mb-4" />
            {/* Widgets */}
            <div className="space-y-4">
              {/* Spotify Widget */}
              <div className="p-3 rounded-2xl bg-white/[0.06] border border-white/15">
                {spotify.isPlaying ? (
                  <>
                    {/* Top row */}
                    <div className="flex items-center gap-2 mb-2">
                      {/* Album Art */}
                      {spotify.albumArt && (
                        <Image
                          src={spotify.albumArt}
                          alt="Album Art"
                          width={40}
                          height={40}
                          className="rounded-lg flex-shrink-0"
                        />
                      )}

                      {/* Track Info */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                          <span className="text-green-400 text-[10px] font-medium">
                            Listening on Spotify
                          </span>
                        </div>
                        <a href={spotify.songUrl} target="_blank">
                          <p className="text-white text-xs font-semibold truncate hover:underline leading-tight">
                            {spotify.title}
                          </p>
                        </a>
                        <p className="text-white/50 text-[10px] truncate leading-tight">
                          {spotify.artist}
                        </p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="flex items-center gap-2">
                      <span className="text-white/30 text-[10px] w-7 text-right flex-shrink-0">
                        {Math.floor(progress / 1000 / 60)}:
                        {String(Math.floor((progress / 1000) % 60)).padStart(
                          2,
                          "0",
                        )}
                      </span>
                      <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-400 rounded-full transition-all duration-1000"
                          style={{
                            width: `${(progress / spotify.duration!) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-white/30 text-[10px] w-7 flex-shrink-0">
                        {Math.floor(spotify.duration! / 1000 / 60)}:
                        {String(
                          Math.floor((spotify.duration! / 1000) % 60),
                        ).padStart(2, "0")}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                      <FaSpotify size={20} className="text-white/50" />
                    </div>
                    <div>
                      <p className="text-white/40 text-sm">
                        Not playing anything
                      </p>
                      <p className="text-white/20 text-xs">Spotify</p>
                    </div>
                  </div>
                )}
              </div>
              {/* Discord Status Widget */}
              <div
                className=" p-3 rounded-2xl bg-white/[0.06] border border-white/15 flex items-center gap-3"
                style={{ paddingTop: "1px" }}
              >
                {/* Status dot */}
                <div className="relative flex-shrink-0">
                  <Image
                    src={discord.avatar || "https://github.com/WIZARDOF-OZ.png"}
                    alt="Discord Avatar"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  {/* Colored dot based on status */}
                  <div
                    className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#0a0a0f]
      ${discord.status === "online" ? "bg-green-400" : ""}
      ${discord.status === "idle" ? "bg-yellow-400" : ""}
      ${discord.status === "dnd" ? "bg-red-400" : ""}
      ${discord.status === "offline" ? "bg-gray-500" : ""}
    `}
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm font-medium truncate">
                      WIZARD OF OZ
                    </span>
                    <span
                      className={`text-xs font-medium
        ${discord.status === "online" ? "text-green-400" : ""}
        ${discord.status === "idle" ? "text-yellow-400" : ""}
        ${discord.status === "dnd" ? "text-red-400" : ""}
        ${discord.status === "offline" ? "text-gray-500" : ""}
      `}
                    >
                      {discord.status === "online" ? "Online" : ""}
                      {discord.status === "idle" ? "Idle" : ""}
                      {discord.status === "dnd" ? "Do Not Disturb" : ""}
                      {discord.status === "offline" ? "Offline" : ""}
                    </span>
                  </div>
                  {/* Show current activity if any */}

                  {(() => {
                    const activity = discord.activities?.find(
                      (a) => a.type !== 4,
                    );
                    return activity ? (
                      <p className="text-white/40 text-xs truncate">
                        {activity.name}
                        {activity.details ? ` — ${activity.details}` : ""}
                      </p>
                    ) : (
                      <p className="text-white/40 text-xs">No activity</p>
                    );
                  })()}
                </div>
              </div>
              {/* GitHub Stats Widget */}
              {github && (
                <div className="p-3 rounded-2xl bg-white/[0.06] border border-white/15">
                  {/* Stats row */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <FaGithub size={16} className="text-white" />
                      <span className="text-white text-sm font-medium">
                        GitHub
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-white/50">
                      <span>⭐ {github.totalStars}</span>
                      <span>📦 {github.publicRepos}</span>
                      <span>👥 {github.followers}</span>
                    </div>
                  </div>

                  {/* Top repos */}
                  <div className="space-y-2">
                    {github.topRepos.map((repo) => (
                      <a
                        key={repo.name}
                        href={repo.url}
                        target="_blank"
                        className="block p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] transition-all duration-200 group border border-white/10 hover:border-white/20"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-white/80 text-xs font-medium group-hover:text-white truncate transition-colors">
                            {repo.name}
                          </span>
                          <span className="text-white/40 text-xs flex-shrink-0 ml-2 group-hover:text-white/60 transition-colors">
                            ⭐ {repo.stars}
                          </span>
                        </div>
                        {repo.description && (
                          <p className="text-white/40 text-xs truncate mt-1 group-hover:text-white/60 transition-colors">
                            {repo.description}
                          </p>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
