import React, { useState, useEffect, useRef } from 'react';
import { SONGS_DATA } from './data/songs';
import { Song } from './types';
import { Play, Pause, SkipBack, SkipForward, Music, Volume2, VolumeX, ListMusic, Youtube, Sparkles, X, Radio, Link2 } from 'lucide-react';
import { audioSynth } from './lib/audioSynth';
import sindhuliWarmRide from './assets/images/sindhuli_warm_ride_1786460587651.jpg';
import sindhuliTripalTipper from './assets/images/sindhuli_tripal_tipper_wide_1786460831879.jpg';
import sindhuliWideFppTipper from './assets/images/sindhuli_wide_fpp_tipper_1786461100128.jpg';
import sindhuliHighwayFpp from './assets/images/sindhuli_highway_fpp_clean_1786461323311.jpg';
import firstSindhuliPulsarRide from './assets/images/first_sindhuli_pulsar_ride.jpg';

const BACKGROUND_IMAGES = [
  sindhuliHighwayFpp,
  sindhuliWarmRide,
  sindhuliTripalTipper,
  sindhuliWideFppTipper,
  firstSindhuliPulsarRide,
];
const BACKGROUND_CHANGE_INTERVAL_MS = 60_000;

export default function App() {
  const [songs, setSongs] = useState<Song[]>(SONGS_DATA);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [showYoutubeModal, setShowYoutubeModal] = useState(false);
  const [showCustomLinkModal, setShowCustomLinkModal] = useState(false);
  const [customLinkInput, setCustomLinkInput] = useState('');
  const [customTitleInput, setCustomTitleInput] = useState('');
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  
  // Real-time clock & Audio progress state
  const [timeStr, setTimeStr] = useState<string>('');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const time = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase();
      setTimeStr(time);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  // Cycle through every locally bundled highway image once per minute.
  useEffect(() => {
    const interval = window.setInterval(() => {
      setBackgroundIndex((index) => (index + 1) % BACKGROUND_IMAGES.length);
    }, BACKGROUND_CHANGE_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, []);

  const currentSong = songs[currentSongIndex] || songs[0];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().then(() => {
          audioSynth.stopSeloLoop();
        }).catch(() => {
          // Fallback to Web Audio Selo rhythm synth
          audioSynth.startSeloLoop();
        });
      } else {
        audioRef.current.pause();
        audioSynth.stopSeloLoop();
      }
    }
  }, [isPlaying, currentSongIndex, currentSong.audioPreviewUrl]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (!duration && audioRef.current.duration) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs <= 0) return '0:00';
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  };

  const handleSelectSong = (index: number) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
  };

  const handleSaveCustomLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customLinkInput.trim()) return;

    let updatedAudioUrl = currentSong.audioPreviewUrl;
    let updatedYtId = currentSong.youtubeId;

    // Check if YouTube URL or ID
    if (customLinkInput.includes('youtube.com') || customLinkInput.includes('youtu.be')) {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = customLinkInput.match(regExp);
      if (match && match[2].length === 11) {
        updatedYtId = match[2];
      }
    } else {
      // Direct audio URL
      updatedAudioUrl = customLinkInput.trim();
    }

    const updatedSongs = [...songs];
    updatedSongs[currentSongIndex] = {
      ...updatedSongs[currentSongIndex],
      title: customTitleInput.trim() || updatedSongs[currentSongIndex].title,
      audioPreviewUrl: updatedAudioUrl,
      youtubeId: updatedYtId,
    };

    setSongs(updatedSongs);
    setShowCustomLinkModal(false);
    setIsPlaying(true);
  };


  return (
    <div className="relative w-screen h-screen overflow-hidden bg-zinc-950 font-sans select-none">
      
      {/* 1. FULLSCREEN WIDE-ANGLE ARTWORK (Prominent Sindhuli Milestone, Pulsar 220 FPP, Clean Tripal Tipper, Red Sky) */}
      <div className="absolute inset-0 z-0">
        <img
          src={BACKGROUND_IMAGES[backgroundIndex]}
          alt={`Sindhuli highway background ${backgroundIndex + 1} of ${BACKGROUND_IMAGES.length}`}
          className="w-full h-full object-cover object-center"
        />
        {/* Subtle Bottom Vignette for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
      </div>

      {/* 2. TOP BAR (Clock | 🟢 28 online | Spotify / YT Music) */}
      <div className="absolute top-0 left-0 right-0 z-20 px-6 py-4 flex items-center justify-between text-white text-xs font-semibold tracking-wide backdrop-blur-[2px]">
        
        {/* Left: Live Time */}
        <div className="text-zinc-200/90 font-mono text-xs font-bold drop-shadow">
          {timeStr || '7:16 pm'}
        </div>

        {/* Center: Live Online Listener Count */}
        <div className="flex items-center gap-2 bg-black/40 border border-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-medium text-emerald-300 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>28 online</span>
        </div>

        {/* Right: Streaming Links & Playlist */}
        <div className="flex items-center gap-3">
          <a
            href={`https://www.youtube.com/watch?v=${currentSong.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1 text-zinc-200 hover:text-red-400 transition drop-shadow text-[11px]"
          >
            <Youtube className="w-3.5 h-3.5 text-red-500" />
            <span>YT Music ↗</span>
          </a>

          <button
            onClick={() => setShowPlaylist(true)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 hover:bg-amber-500/40 text-amber-300 border border-amber-500/30 text-[11px] font-bold transition cursor-pointer backdrop-blur-md shadow"
          >
            <ListMusic className="w-3.5 h-3.5 text-amber-400" />
            <span>Playlist ({songs.length})</span>
          </button>
        </div>

      </div>

      {/* 3. HTML5 AUDIO PLAYER (Instant playback + time tracking) */}
      <audio
        ref={audioRef}
        src={currentSong.audioPreviewUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleNext}
        preload="auto"
      />

      {/* 4. FLOATING BOTTOM PLAYER BAR WITH 360 ROTATING ICON & INTERACTIVE SEEK SLIDER */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 w-[92%] max-w-xl">
        <div className="bg-gradient-to-r from-red-950/90 via-zinc-900/95 to-red-950/90 border border-white/20 backdrop-blur-2xl rounded-3xl p-3 sm:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.9)] text-white flex flex-col gap-2.5">
          
          {/* Main Controls Row */}
          <div className="flex items-center justify-between gap-3">
            {/* Left: 360 Spinning Album Vinyl Cover + Song Title */}
            <div
              onClick={() => setShowPlaylist(true)}
              className="flex items-center gap-3 min-w-0 cursor-pointer group"
            >
              <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border-2 border-amber-400/50 group-hover:scale-105 transition shadow-md bg-zinc-950 flex items-center justify-center">
                <img
                  src={currentSong.coverImage}
                  alt={currentSong.title}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover rounded-full ${isPlaying ? 'animate-spin-360' : ''}`}
                />
                {/* Vinyl Center Hole Overlay for authentic 360 disk look */}
                <div className="absolute inset-0 m-auto w-2.5 h-2.5 bg-zinc-950 rounded-full border border-amber-400/60 pointer-events-none" />
              </div>

              <div className="min-w-0 pr-1">
                <h4 className="text-xs font-black text-white truncate group-hover:text-amber-300 transition flex items-center gap-1.5">
                  <span>{currentSong.title}</span>
                  {isPlaying && (
                    <span className="inline-flex gap-0.5 items-end h-3">
                      <span className="w-0.5 bg-amber-400 h-full animate-bounce" />
                      <span className="w-0.5 bg-amber-400 h-2/3 animate-bounce [animation-delay:0.2s]" />
                      <span className="w-0.5 bg-amber-400 h-1/2 animate-bounce [animation-delay:0.4s]" />
                    </span>
                  )}
                </h4>
                <p className="text-[11px] font-medium text-amber-300/80 truncate mt-0.5">
                  {currentSong.nepaliTitle} • {currentSong.artist}
                </p>
              </div>
            </div>

            {/* Center: Playback Controls (Prev, Play/Pause, Next) */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handlePrev}
                className="p-1.5 text-zinc-300 hover:text-white transition cursor-pointer"
                title="Previous Song"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={handlePlayPause}
                className={`w-10 h-10 rounded-full text-zinc-950 flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition cursor-pointer ${
                  isPlaying ? 'bg-amber-400' : 'bg-white'
                }`}
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-zinc-950" />
                ) : (
                  <Play className="w-4 h-4 fill-zinc-950 ml-0.5" />
                )}
              </button>

              <button
                onClick={handleNext}
                className="p-1.5 text-zinc-300 hover:text-white transition cursor-pointer"
                title="Next Song"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            {/* Right: Actions (Custom Link, YouTube, Playlist) */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => {
                  setCustomLinkInput(currentSong.audioPreviewUrl || `https://www.youtube.com/watch?v=${currentSong.youtubeId}`);
                  setCustomTitleInput(currentSong.title);
                  setShowCustomLinkModal(true);
                }}
                className="p-2 rounded-full text-amber-400 hover:text-amber-300 hover:bg-white/10 transition cursor-pointer"
                title="Add / Change Audio or YouTube Link"
              >
                <Link2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => setShowYoutubeModal(true)}
                className="p-2 rounded-full text-red-400 hover:text-red-300 hover:bg-white/10 transition cursor-pointer"
                title="Watch Official YouTube Video"
              >
                <Youtube className="w-4 h-4" />
              </button>

              <button
                onClick={() => setShowPlaylist(!showPlaylist)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-amber-300 transition cursor-pointer"
                title="Open Playlist Drawer"
              >
                <ListMusic className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Music Slide / Seek Bar */}
          <div className="flex items-center gap-2 px-1 text-[10px] font-mono font-medium text-amber-300/80">
            <span className="w-8 text-right">{formatTime(currentTime)}</span>
            <div className="relative flex-1 flex items-center">
              <input
                type="range"
                min={0}
                max={duration || 100}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer focus:outline-none accent-amber-400 hover:h-2 transition-all"
                title="Slide to change music position"
              />
            </div>
            <span className="w-8 text-left">{formatTime(duration)}</span>
          </div>

        </div>
      </div>

      {/* CUSTOM LINK / SONG AUDIO MODAL */}
      {showCustomLinkModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <form onSubmit={handleSaveCustomLink} className="bg-zinc-900 border border-white/15 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Link2 className="w-5 h-5" />
                <span>Link Custom Audio / YouTube Track</span>
              </div>
              <button
                type="button"
                onClick={() => setShowCustomLinkModal(false)}
                className="p-1.5 rounded-full text-zinc-400 hover:text-white bg-white/10 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-left">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Song Title
                </label>
                <input
                  type="text"
                  value={customTitleInput}
                  onChange={(e) => setCustomTitleInput(e.target.value)}
                  placeholder="e.g. Paan Mitho Chunama (Custom Link)"
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Audio Link or YouTube URL / ID
                </label>
                <input
                  type="text"
                  value={customLinkInput}
                  onChange={(e) => setCustomLinkInput(e.target.value)}
                  placeholder="Paste direct MP3 link OR YouTube video URL"
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-amber-300 placeholder-zinc-500 focus:outline-none focus:border-amber-400 font-mono"
                />
                <p className="text-[10px] text-zinc-400 mt-1">
                  Tip: You can paste any MP3 audio URL or YouTube video link (e.g. https://www.youtube.com/watch?v=3Xf5b2x7_sY) to play your song!
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => setShowCustomLinkModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-white bg-white/5 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl text-xs font-bold text-zinc-950 bg-amber-400 hover:bg-amber-300 transition cursor-pointer shadow"
              >
                Save & Play
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 5. YOUTUBE VIDEO POPUP MODAL */}
      {showYoutubeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col">
            <div className="p-4 bg-black/40 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
                <Youtube className="w-5 h-5" />
                <span className="text-white truncate">{currentSong.title}</span>
              </div>
              <button
                onClick={() => setShowYoutubeModal(false)}
                className="p-1.5 rounded-full text-zinc-400 hover:text-white bg-white/10 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-video w-full bg-black">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${currentSong.youtubeId}?autoplay=1`}
                title={currentSong.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* 6. MINIMAL SONG COLLECTION DRAWER */}
      {showPlaylist && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-zinc-900/95 border border-white/10 rounded-t-3xl sm:rounded-3xl w-full max-w-lg max-h-[80vh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300">
            
            {/* Drawer Header */}
            <div className="p-4 bg-black/40 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Music className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="font-extrabold text-sm text-white">
                    काभ्रेली सम्धी भाइरल प्लेलिस्ट
                  </h3>
                  <p className="text-xs text-amber-300 font-medium">
                    Tamang Selo & Sindhuli Highway Collection
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowPlaylist(false)}
                className="p-2 rounded-full text-zinc-400 hover:text-white bg-white/5 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Song List */}
            <div className="p-3 overflow-y-auto space-y-2 divide-y divide-white/5">
              {songs.map((song, index) => {
                const isCurrent = index === currentSongIndex;
                return (
                  <div
                    key={song.id}
                    onClick={() => {
                      handleSelectSong(index);
                      setShowPlaylist(false);
                    }}
                    className={`p-3 rounded-2xl flex items-center justify-between gap-3 cursor-pointer transition ${
                      isCurrent
                        ? 'bg-amber-500/20 border border-amber-500/40 text-amber-200'
                        : 'hover:bg-white/5 text-zinc-200'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0">
                        <img
                          src={song.coverImage}
                          alt={song.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        {isCurrent && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        <h4 className="text-xs font-bold truncate">
                          {song.title}
                        </h4>
                        <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                          {song.nepaliTitle} • {song.artist}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                        📍 {song.district}
                      </span>
                      <span className="text-xs font-semibold text-zinc-400">
                        {song.duration}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
