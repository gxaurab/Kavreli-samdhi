import React, { useState, useEffect, useRef } from 'react';
import { Song } from '../types';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Youtube, Gauge, Repeat, Radio, Flame, Sparkles, Navigation } from 'lucide-react';
import { audioSynth } from '../lib/audioSynth';

interface AudioPlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNextSong: () => void;
  onPrevSong: () => void;
  onOpenYoutubeModal: (song: Song) => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  currentSong,
  isPlaying,
  onTogglePlay,
  onNextSong,
  onPrevSong,
  onOpenYoutubeModal,
}) => {
  const [progress, setProgress] = useState(15);
  const [volume, setVolume] = useState(80);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 1.25 | 1.5>(1);
  const [engineAmbience, setEngineAmbience] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Simulated progress tick for player
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5 * playbackSpeed));
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  const handleToggleEngine = () => {
    const nextState = !engineAmbience;
    setEngineAmbience(nextState);
    audioSynth.toggleHighwayAmbience(nextState);
  };

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-950/95 border-t border-zinc-800 text-white px-4 py-3 shadow-2xl backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Left: Song Details */}
        <div className="flex items-center gap-3 w-full sm:w-1/4">
          <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-amber-500/30">
            <img
              src={currentSong.coverImage}
              alt={currentSong.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {isPlaying && (
              <div className="absolute inset-0 bg-zinc-950/40 flex items-center justify-center">
                <Radio className="w-5 h-5 text-amber-400 animate-pulse" />
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-black text-zinc-100 truncate flex items-center gap-1.5">
              <span>{currentSong.title}</span>
            </h4>
            <p className="text-[11px] font-bold text-amber-400 truncate">
              {currentSong.nepaliTitle}
            </p>
            <p className="text-[10px] text-zinc-400 font-medium truncate">
              📍 {currentSong.district} • {currentSong.artist}
            </p>
          </div>
        </div>

        {/* Center: Playback Controls & Progress */}
        <div className="flex-1 w-full max-w-xl flex flex-col items-center gap-1.5">
          
          <div className="flex items-center gap-4">
            
            {/* Speed Boost Button */}
            <button
              onClick={() => {
                const speeds: (1 | 1.25 | 1.5)[] = [1, 1.25, 1.5];
                const idx = speeds.indexOf(playbackSpeed);
                const nextSpeed = speeds[(idx + 1) % speeds.length];
                setPlaybackSpeed(nextSpeed);
              }}
              className={`px-2 py-0.5 rounded-full text-[10px] font-black border transition cursor-pointer ${
                playbackSpeed > 1
                  ? 'bg-pink-600 text-white border-pink-400 animate-pulse'
                  : 'bg-zinc-800 text-zinc-400 border-zinc-700 hover:text-white'
              }`}
              title="TikTok Speed Boost (1.0x, 1.25x, 1.5x)"
            >
              ⚡ {playbackSpeed}x SPEED
            </button>

            {/* Prev Song */}
            <button
              onClick={onPrevSong}
              className="p-1.5 text-zinc-400 hover:text-white transition cursor-pointer"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            {/* Main Play/Pause Button */}
            <button
              onClick={onTogglePlay}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 text-zinc-950 flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition cursor-pointer"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-zinc-950" />
              ) : (
                <Play className="w-5 h-5 fill-zinc-950 ml-0.5" />
              )}
            </button>

            {/* Next Song */}
            <button
              onClick={onNextSong}
              className="p-1.5 text-zinc-400 hover:text-white transition cursor-pointer"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            {/* Highway Ambience Synth Toggle */}
            <button
              onClick={handleToggleEngine}
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border transition flex items-center gap-1 cursor-pointer ${
                engineAmbience
                  ? 'bg-amber-500 text-zinc-950 border-amber-400 font-extrabold'
                  : 'bg-zinc-800 text-zinc-400 border-zinc-700 hover:text-white'
              }`}
              title="Toggle Highway Engine & Wind Rumble Ambient Audio"
            >
              <Navigation className="w-3 h-3" />
              <span>Engine Sound</span>
            </button>

          </div>

          {/* Progress Slider */}
          <div className="w-full flex items-center gap-2">
            <span className="text-[10px] font-medium text-zinc-400 w-8 text-right">
              0:45
            </span>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <span className="text-[10px] font-medium text-zinc-400 w-8">
              {currentSong.duration}
            </span>
          </div>

        </div>

        {/* Right: Extra Tools & Video Player Modal Trigger */}
        <div className="hidden sm:flex items-center justify-end gap-3 w-1/4">
          
          {/* Watch YouTube Video Button */}
          <button
            onClick={() => onOpenYoutubeModal(currentSong)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/40 text-xs font-bold transition cursor-pointer"
          >
            <Youtube className="w-4 h-4 text-red-500 fill-red-500 group-hover:text-white" />
            <span>Watch Video</span>
          </button>

          {/* Volume Slider */}
          <div className="flex items-center gap-1.5 text-zinc-400">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="hover:text-white cursor-pointer"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-rose-400" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(Number(e.target.value));
                setIsMuted(false);
              }}
              className="w-16 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
          </div>

        </div>

      </div>
    </div>
  );
};
