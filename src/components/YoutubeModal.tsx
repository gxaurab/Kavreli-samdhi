import React from 'react';
import { Song } from '../types';
import { X, ExternalLink, Youtube, Sparkles } from 'lucide-react';

interface YoutubeModalProps {
  song: Song | null;
  onClose: () => void;
}

export const YoutubeModal: React.FC<YoutubeModalProps> = ({ song, onClose }) => {
  if (!song) return null;

  // Search query fallback on YouTube Music or standard search if embed restricted
  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    `${song.title} ${song.artist} Tamang Selo`
  )}`;

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl relative flex flex-col">
        
        {/* Header */}
        <div className="p-4 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Youtube className="w-5 h-5 text-red-500" />
            <div>
              <h3 className="font-extrabold text-sm text-zinc-100">
                {song.title}
              </h3>
              <p className="text-xs font-semibold text-amber-400">
                {song.nepaliTitle} • 🎤 {song.artist}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-zinc-400 hover:text-white bg-zinc-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Embed Container */}
        <div className="relative w-full aspect-video bg-black flex items-center justify-center">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${song.youtubeId}?autoplay=1&rel=0`}
            title={song.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Footer info & Direct YouTube Link */}
        <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-zinc-400 font-medium">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Kavreli Samdhi Viral Collection</span>
          </div>

          <a
            href={youtubeSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white font-bold rounded-full border border-red-500/30 transition cursor-pointer"
          >
            <span>Open in YouTube App</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </div>
  );
};
