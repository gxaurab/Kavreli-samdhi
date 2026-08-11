import React, { useState } from 'react';
import { Song } from '../types';
import { Play, Pause, Flame, MapPin, Youtube, BookOpen, Heart, Sparkles, Volume2, Share2, Music } from 'lucide-react';

interface SongCardProps {
  song: Song;
  isPlaying: boolean;
  isCurrentSong: boolean;
  onPlay: (song: Song) => void;
  onOpenLyrics: (song: Song) => void;
  onToggleFavorite: (songId: string) => void;
  isFavorite: boolean;
}

export const SongCard: React.FC<SongCardProps> = ({
  song,
  isPlaying,
  isCurrentSong,
  onPlay,
  onOpenLyrics,
  onToggleFavorite,
  isFavorite,
}) => {
  const [showLore, setShowLore] = useState(false);

  return (
    <div
      className={`group relative bg-zinc-900/90 rounded-2xl border transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col justify-between ${
        isCurrentSong
          ? 'border-amber-400/80 shadow-xl shadow-amber-500/10 ring-1 ring-amber-400/50'
          : 'border-zinc-800/90 hover:border-zinc-700 hover:shadow-lg'
      }`}
    >
      {/* Top Image Banner & Badges */}
      <div className="relative h-44 w-full overflow-hidden bg-zinc-950">
        <img
          src={song.coverImage}
          alt={song.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

        {/* Viral Badge & District */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <span className="flex items-center gap-1 bg-zinc-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-black text-amber-300 border border-amber-500/30">
            <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
            {song.viralScore}% VIRAL
          </span>

          <span className="flex items-center gap-1 bg-zinc-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-zinc-300 border border-zinc-700">
            <MapPin className="w-3 h-3 text-purple-400" />
            {song.district}
          </span>
        </div>

        {/* Play Button Overlay */}
        <button
          onClick={() => onPlay(song)}
          className={`absolute bottom-3 right-3 z-10 w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition cursor-pointer ${
            isCurrentSong && isPlaying
              ? 'bg-amber-400 text-zinc-950 scale-105 ring-4 ring-amber-400/30'
              : 'bg-zinc-900/90 hover:bg-amber-400 text-amber-300 hover:text-zinc-950 border border-amber-400/40'
          }`}
        >
          {isCurrentSong && isPlaying ? (
            <Pause className="w-5 h-5 fill-current" />
          ) : (
            <Play className="w-5 h-5 fill-current ml-0.5" />
          )}
        </button>

        {/* Long Hair Rating Indicator */}
        <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1 bg-zinc-950/80 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-bold text-pink-300 border border-pink-500/30">
          <span>💈 Hair Swag:</span>
          <span className="text-amber-400">{'★'.repeat(song.longHairRating)}</span>
        </div>
      </div>

      {/* Card Body Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-extrabold text-sm text-zinc-100 group-hover:text-amber-300 transition line-clamp-1">
                {song.title}
              </h3>
              <p className="text-xs font-semibold text-amber-400/90 line-clamp-1 mt-0.5">
                {song.nepaliTitle}
              </p>
            </div>

            {/* Favorite Heart Button */}
            <button
              onClick={() => onToggleFavorite(song.id)}
              className={`p-1.5 rounded-lg border transition cursor-pointer shrink-0 ${
                isFavorite
                  ? 'bg-rose-500/20 border-rose-500/50 text-rose-400'
                  : 'bg-zinc-800/60 border-zinc-700/60 text-zinc-400 hover:text-rose-400'
              }`}
              title="Add to My Highway Cassette"
            >
              <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-rose-400' : ''}`} />
            </button>
          </div>

          <p className="text-xs text-zinc-400 font-medium mt-1 line-clamp-1">
            🎤 {song.artist}
          </p>
        </div>

        {/* Subthemes Pills */}
        <div className="flex flex-wrap gap-1">
          {song.subThemes.slice(0, 3).map((theme) => (
            <span
              key={theme}
              className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-zinc-800/80 text-zinc-300 border border-zinc-700/50"
            >
              {theme}
            </span>
          ))}
        </div>

        {/* Meme Lore Expandable Accordion */}
        <div className="pt-2 border-t border-zinc-800/80">
          <button
            onClick={() => setShowLore(!showLore)}
            className="w-full text-left text-[11px] font-bold text-purple-300 hover:text-purple-200 flex items-center justify-between transition cursor-pointer"
          >
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-purple-400" />
              Meme Lore & Trend Origin
            </span>
            <span>{showLore ? '▲' : '▼'}</span>
          </button>

          {showLore && (
            <div className="mt-2 p-2.5 rounded-lg bg-purple-950/30 border border-purple-500/30 text-[11px] text-purple-200 leading-relaxed font-sans">
              {song.memeLore}
            </div>
          )}
        </div>

        {/* Card Footer Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80 text-xs text-zinc-400 font-semibold">
          <div className="flex items-center gap-2">
            <span>⏱️ {song.duration}</span>
            <span>•</span>
            <span className="text-amber-400 font-bold">{song.bpm} BPM</span>
          </div>

          <button
            onClick={() => onOpenLyrics(song)}
            className="flex items-center gap-1 text-[11px] font-bold text-amber-300 hover:text-amber-200 hover:underline transition cursor-pointer"
          >
            <BookOpen className="w-3 h-3" />
            <span>Lyrics</span>
          </button>
        </div>

      </div>
    </div>
  );
};
