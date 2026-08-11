import React, { useState } from 'react';
import { Play, Volume2, Flame, MapPin, Zap, Compass, Sparkles, Navigation } from 'lucide-react';
import { audioSynth } from '../lib/audioSynth';
import { Song } from '../types';

interface HeroBannerProps {
  onPlaySong: (song: Song) => void;
  featuredSong: Song;
  onOpenSimulator: () => void;
}

// Image paths created via generate_image tool
const SINDHULI_RIDE_IMG = '/src/assets/images/sindhuli_pulsar_ride_1786456383879.jpg';
const TAMANG_SELO_IMG = '/src/assets/images/tamang_selo_vibes_1786456407635.jpg';

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onPlaySong,
  featuredSong,
  onOpenSimulator,
}) => {
  const [activeTab, setActiveTab] = useState<'ride' | 'wedding'>('ride');
  const [hotspotText, setHotspotText] = useState<string | null>(null);

  const handlePillarClick = () => {
    audioSynth.playTipperHorn();
    setHotspotText('📍 Sindhuli 12 KM Milestone: "Horn OK Please!"');
    setTimeout(() => setHotspotText(null), 3000);
  };

  const handleRiderClick = () => {
    audioSynth.playPulsarRev();
    setHotspotText('🏍️ Mug-Cut Rider Revs Pulsar 220 Engine! Vroom Vroom!');
    setTimeout(() => setHotspotText(null), 3000);
  };

  const handleTipperClick = () => {
    audioSynth.playTipperHorn();
    setHotspotText('🚚 Tata Tipper Truck Blasts Air Horn on Oncoming Lane!');
    setTimeout(() => setHotspotText(null), 3000);
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl">
      {/* Background Image Container */}
      <div className="relative h-96 sm:h-[450px] w-full overflow-hidden group">
        <img
          src={activeTab === 'ride' ? SINDHULI_RIDE_IMG : TAMANG_SELO_IMG}
          alt="Kavreli Samdhi Sindhuli Highway Ride"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/40 to-transparent" />

        {/* Interactive Hotspots for Sindhuli Ride Image */}
        {activeTab === 'ride' && (
          <>
            {/* Hotspot 1: Milestone Pillar (Bottom Left) */}
            <button
              onClick={handlePillarClick}
              className="absolute left-6 bottom-28 sm:left-12 sm:bottom-32 z-20 group/hotspot cursor-pointer focus:outline-none"
              title="Tap Sindhuli Milestone Pillar"
            >
              <div className="flex items-center gap-2 bg-zinc-900/90 hover:bg-amber-500 text-amber-300 hover:text-zinc-950 border border-amber-500/50 rounded-full px-3 py-1 text-xs font-bold transition shadow-lg shadow-amber-500/20 backdrop-blur-md animate-bounce">
                <MapPin className="w-3.5 h-3.5" />
                <span>Sindhuli 12 KM</span>
              </div>
            </button>

            {/* Hotspot 2: Mug-cut Rider Ahead (Center Right) */}
            <button
              onClick={handleRiderClick}
              className="absolute right-1/4 top-1/2 z-20 group/hotspot cursor-pointer focus:outline-none"
              title="Tap Mug-Cut Pulsar 220 Rider"
            >
              <div className="flex items-center gap-1.5 bg-zinc-900/90 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/50 rounded-full px-3 py-1 text-xs font-bold transition shadow-lg shadow-purple-500/20 backdrop-blur-md">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Mug-Cut Rider (220)</span>
              </div>
            </button>

            {/* Hotspot 3: Oncoming Tipper Truck (Center Left) */}
            <button
              onClick={handleTipperClick}
              className="absolute left-1/3 top-2/5 z-20 group/hotspot cursor-pointer focus:outline-none"
              title="Tap Oncoming Tata Tipper Truck"
            >
              <div className="flex items-center gap-1.5 bg-zinc-900/90 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/50 rounded-full px-3 py-1 text-xs font-bold transition shadow-lg shadow-red-500/20 backdrop-blur-md">
                <Volume2 className="w-3.5 h-3.5 text-red-400" />
                <span>Tata Tipper</span>
              </div>
            </button>
          </>
        )}

        {/* Hotspot Alert Toast Notification */}
        {hotspotText && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-amber-400 text-zinc-950 font-black px-4 py-2 rounded-full text-xs shadow-2xl border-2 border-amber-300 animate-pulse flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>{hotspotText}</span>
          </div>
        )}

        {/* Hero Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-10 flex flex-col justify-end">
          
          {/* Top Pills */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md">
              <Flame className="w-3.5 h-3.5 fill-white text-white" />
              #1 VIRAL TREND
            </span>

            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
              <Compass className="w-3 h-3" />
              Sindhuli - Kavre BP Highway
            </span>

            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-zinc-800/90 text-zinc-300 border border-zinc-700">
              Pulsar 220 FPP View
            </span>
          </div>

          {/* Title & Description */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight drop-shadow-md leading-tight mb-2">
            काभ्रेली सम्धी <span className="bg-gradient-to-r from-amber-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">Paan Mitho Chunama</span>
          </h1>

          <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl font-normal leading-relaxed mb-6 line-clamp-2 sm:line-clamp-none">
            The breezy Himalayan road trip ride aesthetic. Mug-cut haircuts, sunglasses, black vests, long-hair Tamang Selo wedding bangers, and Tata Tipper air horns echoing across Kavre, Sindhuli, Nuwakot, & Bhojpur!
          </p>

          {/* Hero Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onPlaySong(featuredSong)}
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 text-zinc-950 font-black text-sm shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition cursor-pointer"
            >
              <Play className="w-4 h-4 fill-zinc-950" />
              <span>Play Kavreli Anthem</span>
            </button>

            <button
              onClick={onOpenSimulator}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-amber-300 border border-amber-500/40 font-bold text-xs transition cursor-pointer"
            >
              <Navigation className="w-4 h-4 text-amber-400" />
              <span>Launch FPP Highway Rider Mode</span>
            </button>

            {/* Tab Switcher for Image Background */}
            <div className="ml-auto hidden sm:flex items-center gap-1 bg-zinc-950/80 p-1 rounded-full border border-zinc-800 backdrop-blur-md">
              <button
                onClick={() => setActiveTab('ride')}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition ${
                  activeTab === 'ride'
                    ? 'bg-amber-500 text-zinc-950 shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                🏍️ Sindhuli Ride View
              </button>
              <button
                onClick={() => setActiveTab('wedding')}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition ${
                  activeTab === 'wedding'
                    ? 'bg-purple-600 text-white shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                💃 Tamang Selo Aesthetic
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
