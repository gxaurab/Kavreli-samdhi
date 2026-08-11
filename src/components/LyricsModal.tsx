import React, { useState } from 'react';
import { Song } from '../types';
import { BookOpen, Copy, Check, Sparkles, X, MapPin, Youtube } from 'lucide-react';

interface LyricsModalProps {
  song: Song | null;
  onClose: () => void;
  onOpenYoutube: (song: Song) => void;
}

export const LyricsModal: React.FC<LyricsModalProps> = ({
  song,
  onClose,
  onOpenYoutube,
}) => {
  const [copied, setCopied] = useState(false);
  const [scriptMode, setScriptMode] = useState<'nepali' | 'roman'>('nepali');

  if (!song) return null;

  const textToCopy = scriptMode === 'nepali' ? song.lyricsNepali : song.lyricsRoman;

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-xl p-6 relative shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full bg-zinc-800/80 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-amber-500/30">
            <img
              src={song.coverImage}
              alt={song.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-zinc-100">
              {song.title}
            </h3>
            <p className="text-xs font-bold text-amber-400">
              {song.nepaliTitle} • 📍 {song.district}
            </p>
          </div>
        </div>

        {/* Script Switcher Tabs */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setScriptMode('nepali')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                scriptMode === 'nepali'
                  ? 'bg-amber-400 text-zinc-950 shadow'
                  : 'bg-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              नेपाली (Devanagari)
            </button>
            <button
              onClick={() => setScriptMode('roman')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                scriptMode === 'roman'
                  ? 'bg-amber-400 text-zinc-950 shadow'
                  : 'bg-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              Romanized Nepali
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-amber-200 transition cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy Lyrics'}</span>
          </button>
        </div>

        {/* Lyrics Content Box */}
        <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-amber-100 text-sm leading-relaxed font-sans font-medium whitespace-pre-wrap">
          {scriptMode === 'nepali' ? song.lyricsNepali : song.lyricsRoman}
        </div>

        {/* Meme Lore Breakdown */}
        <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/30 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-black text-purple-300 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Viral Trend & Twitter Origin</span>
          </div>
          <p className="text-xs text-purple-200 leading-relaxed">
            {song.memeLore}
          </p>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => onOpenYoutube(song)}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-full text-xs shadow-lg transition cursor-pointer"
          >
            <Youtube className="w-4 h-4" />
            <span>Watch Full Music Video</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold rounded-full text-xs transition cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
