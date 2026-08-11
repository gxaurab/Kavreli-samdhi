import React from 'react';
import { Search, Radio, Disc, Volume2, Sparkles, Navigation, Music } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenSoundboard: () => void;
  onOpenSimulator: () => void;
  onOpenGenerator: () => void;
  isPlaying: boolean;
  currentSongTitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  onOpenSoundboard,
  onOpenSimulator,
  onOpenGenerator,
  isPlaying,
  currentSongTitle,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800 text-white transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-600 to-amber-500 p-0.5 shadow-lg shadow-purple-500/20">
            <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
              <Disc className={`w-5 h-5 text-amber-400 ${isPlaying ? 'animate-spin' : ''}`} />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-amber-300 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                काभ्रेली सम्धी
              </span>
              <span className="hidden sm:inline-block text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                TAMANG SELO VIRAL
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 -mt-0.5 font-medium">
              BP Highway & TikTok Bangers
            </p>
          </div>
        </div>

        {/* Live Status Pill & Search Input */}
        <div className="flex-1 max-w-md hidden md:flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Paan Mitho, Sindhuli, Kavre, Gym Selo..."
              className="w-full bg-zinc-900/90 border border-zinc-800 rounded-full pl-9 pr-4 py-1.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* Sindhuli FPP Rider Simulator */}
          <button
            onClick={onOpenSimulator}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold transition cursor-pointer shadow-sm"
            title="Open Sindhuli BP Highway Pulsar 220 Simulator"
          >
            <Navigation className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="hidden sm:inline">Pulsar 220 Ride</span>
          </button>

          {/* Meme Soundboard */}
          <button
            onClick={onOpenSoundboard}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-semibold transition cursor-pointer"
            title="Open Meme Soundboard (Tipper Horn, Pulsar Rev, Damphu)"
          >
            <Volume2 className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">Soundboard</span>
          </button>

          {/* Samdhi Generator */}
          <button
            onClick={onOpenGenerator}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-pink-500 to-amber-500 text-white font-semibold text-xs transition shadow-md hover:opacity-95 cursor-pointer"
            title="Generate your Kavreli Samdhi Swag Persona"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Swag Persona</span>
          </button>

          {/* External Links */}
          <div className="hidden lg:flex items-center gap-2 ml-1 border-l border-zinc-800 pl-3">
            <a
              href="https://spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-medium text-zinc-400 hover:text-emerald-400 transition"
            >
              Spotify ↗
            </a>
            <a
              href="https://music.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-medium text-zinc-400 hover:text-red-400 transition"
            >
              YT Music ↗
            </a>
          </div>

        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-2 pt-1">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search songs, artists, Kavre, Sindhuli..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-full pl-9 pr-4 py-1.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>
    </header>
  );
};
