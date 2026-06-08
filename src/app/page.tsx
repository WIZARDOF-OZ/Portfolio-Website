import {
  FaGithub,
  FaDiscord,
  FaInstagram,
  FaXTwitter,
  FaSpotify,
} from "react-icons/fa6";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-[#0a0a0f]">
      {/* Aurora blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[30%] w-[400px] h-[400px] rounded-full bg-pink-600/15 blur-[120px]" />
      </div>

      {/* Page content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        {/* Profile Card */}
        <div className="w-full max-w-lg rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
          {/* Banner */}
          <div className="h-36 w-full rounded-t-3xl bg-gradient-to-r from-purple-600/60 via-blue-600/60 to-pink-600/60" />

          {/* Body */}
          <div className="px-8 pt-0 pb-10">
            {/* Avatar */}
            <div className="relative -mt-12 mb-4">
              <div className="w-24 h-24 rounded-2xl border-4 border-[#0a0a0f] bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-3xl font-bold text-white">
                W
              </div>
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
              Full-stack developer, Discord server manager, & open source
              enthusiast. Building things that matter.
            </p>

            {/* Location & Date */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-white/40 text-xs">📍 Assam, India</span>
              <span className="text-white/40 text-xs">📅 Joined June 2025</span>
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

            {/* Spotify Widget */}
            <div className="mt-4 p-3 rounded-2xl bg-white/[0.06] border border-white/15">
              {/* Top row — album art + track info */}
              <div className="flex items-center gap-3 mb-3">
                {/* Album Art */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-700 flex-shrink-0 flex items-center justify-center text-2xl">
                  <FaSpotify size={18} className="text-white" />
                </div>

                {/* Track Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                    <span className="text-green-400 text-xs font-medium">
                      Listening on Spotify
                    </span>
                  </div>
                  <p className="text-white text-sm font-medium truncate">
                    Blinding Lights
                  </p>
                  <p className="text-white/50 text-xs truncate">The Weeknd</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="flex items-center gap-2">
                <span className="text-white/30 text-xs w-6">2:07</span>
                <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-400 rounded-full"
                    style={{ width: "63%" }}
                  />
                </div>
                <span className="text-white/30 text-xs w-6">3:20</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
