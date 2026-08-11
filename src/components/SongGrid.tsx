import React, { useState } from 'react';
import { Song } from '../types';
import { SongCard } from './SongCard';
import { Disc, Heart, Sparkles, Filter } from 'lucide-react';

interface SongGridProps {
  songs: Song[];
  currentSong: Song | null;
  isPlaying: boolean;
  onPlaySong: (song: Song) => void;
  onOpenLyrics: (song: Song) => void;
  favorites: string[];
  onToggleFavorite: (songId: string) => void;
}

export const SongGrid: React.FC<SongGridProps> = ({
  songs,
  currentSong,
  isPlaying,
  onPlaySong,
  onOpenLyrics,
  favorites,
  onToggleFavorite,
}) => {
  const [viewTab, setViewTab] = useState<'all' | 'favorites'>('all');

  const displayedSongs =
    viewTab === 'favorites'
      ? songs.filter((s) => favorites.includes(s.id))
      : songs;

  return (
    <div className="w-full space-y-4 my-8">
      
      {/* Grid Header & Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-3">
        <div className="flex items-center gap-2">
          <Disc className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg font-black text-zinc-100 tracking-tight">
            {viewTab === 'favorites' ? 'My Highway Cassette' : 'Kavreli Selo & Highway Songs'}
          </h2>
          <span className="text-xs font-bold text-amber-300 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
            {displayedSongs.length} Tracks
          </span>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-xl border border-zinc-800">
          <button
            onClick={() => setViewTab('all')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
              viewTab === 'all'
                ? 'bg-amber-400 text-zinc-950 shadow'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            🔥 All Bangers ({songs.length})
          </button>
          
          <button
            onClick={() => setViewTab('favorites')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              viewTab === 'favorites'
                ? 'bg-rose-500 text-white shadow'
                : 'text-zinc-400 hover:text-rose-400'
            }`}
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Saved Cassette ({favorites.length})</span>
          </button>
        </div>
      </div>

      {/* Grid List */}
      {displayedSongs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {displayedSongs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              isPlaying={isPlaying}
              isCurrentSong={currentSong?.id === song.id}
              onPlay={onPlaySong}
              onOpenLyrics={onOpenLyrics}
              onToggleFavorite={onToggleFavorite}
              isFavorite={favorites.includes(song.id)}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 bg-zinc-900/50 rounded-2xl border border-zinc-800 space-y-3">
          <Sparkles className="w-10 h-10 text-amber-400 mx-auto animate-bounce" />
          <h3 className="text-base font-black text-zinc-200">
            {viewTab === 'favorites'
              ? 'Your Highway Cassette is Empty!'
              : 'No Kavreli Bangers Match Your Filter'}
          </h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            {viewTab === 'favorites'
              ? 'Click the heart icon on any song card to save it to your custom Sindhuli highway cassette playlist.'
              : 'Try clearing your search query or switching to another district or vibe category.'}
          </p>
          {viewTab === 'favorites' && (
            <button
              onClick={() => setViewTab('all')}
              className="px-4 py-2 bg-amber-400 text-zinc-950 font-black rounded-full text-xs shadow-lg hover:bg-amber-300 transition cursor-pointer"
            >
              Browse All Bangers
            </button>
          )}
        </div>
      )}

    </div>
  );
};
