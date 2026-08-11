import React, { useState, useEffect } from 'react';
import { Song } from '../types';
import { X, Navigation, Gauge, Volume2, Play, Pause, Zap, MapPin, Sparkles } from 'lucide-react';
import { audioSynth } from '../lib/audioSynth';

interface SindhuliSimulatorModalProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onClose: () => void;
}

const SINDHULI_RIDE_IMG = '/src/assets/images/sindhuli_pulsar_ride_1786456383879.jpg';

export const SindhuliSimulatorModal: React.FC<SindhuliSimulatorModalProps> = ({
  currentSong,
  isPlaying,
  onTogglePlay,
  onClose,
}) => {
  const [speed, setSpeed] = useState(85);
  const [rpm, setRpm] = useState(6500);
  const [mileageKm, setMileageKm] = useState(12);
  const [locationName, setLocationName] = useState('BP Highway (Sindhuli Lane)');

  // Accelerate / Rev Pulsar 220
  const handleThrottle = () => {
    audioSynth.playPulsarRev();
    setSpeed((prev) => Math.min(prev + 15, 125));
    setRpm((prev) => Math.min(prev + 1200, 9500));

    setTimeout(() => {
      setSpeed(85);
      setRpm(6500);
    }, 2000);
  };

  const handleHorn = () => {
    audioSynth.playTipperHorn();
  };

  // Milestone progression simulator
  useEffect(() => {
    const interval = setInterval(() => {
      setMileageKm((prev) => {
        const next = prev <= 1 ? 48 : prev - 1;
        if (next < 10) setLocationName('Sindhuli Gadhi Pass');
        else if (next < 25) setLocationName('BP Highway Lane');
        else setLocationName('Khurkot Bridge Road');
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl relative flex flex-col">
        
        {/* Top Header */}
        <div className="p-4 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <Navigation className="w-5 h-5 text-amber-400 animate-pulse" />
            <div>
              <h3 className="font-black text-sm text-zinc-100 flex items-center gap-2">
                <span>Pulsar 220 FPP Highway Simulator</span>
                <span className="text-[10px] bg-amber-500 text-zinc-950 px-2 py-0.5 rounded-full font-black">
                  LIVE 220 RIDE
                </span>
              </h3>
              <p className="text-xs text-amber-300 font-semibold">
                📍 {locationName} • Sindhuli {mileageKm} KM Milestone
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

        {/* FPP Ride Viewport Container */}
        <div className="relative w-full h-80 sm:h-[420px] bg-black overflow-hidden group">
          <img
            src={SINDHULI_RIDE_IMG}
            alt="Pulsar 220 Sindhuli Highway Ride"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />

          {/* Speedometer & Bike Dashboard Overlay */}
          <div className="absolute top-4 left-4 z-20 bg-zinc-950/90 border border-amber-500/40 backdrop-blur-md rounded-2xl p-3 shadow-2xl text-white space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] font-black text-amber-400 uppercase tracking-wider">
              <Gauge className="w-3.5 h-3.5" />
              <span>DIGITAL DASH</span>
            </div>
            
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black tracking-tighter text-amber-300 font-mono">
                {speed}
              </span>
              <span className="text-xs font-bold text-zinc-400">KM/H</span>
            </div>

            <div className="text-[10px] font-bold text-zinc-400">
              RPM: <span className="text-purple-300">{rpm}</span> • GEAR: <span className="text-emerald-400">5TH</span>
            </div>
          </div>

          {/* Location Milestone Marker Pill */}
          <div className="absolute top-4 right-4 z-20 bg-zinc-950/90 border border-amber-500/40 backdrop-blur-md rounded-full px-3 py-1.5 shadow-xl text-amber-300 text-xs font-bold flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Sindhuli {mileageKm} KM Marker</span>
          </div>

          {/* Radio Display (Playing Track) */}
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 z-20 bg-zinc-950/95 border border-purple-500/40 backdrop-blur-md rounded-2xl p-3 shadow-2xl max-w-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-purple-500/50">
              <img
                src={currentSong?.coverImage || SINDHULI_RIDE_IMG}
                alt="Radio"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold text-purple-400 block uppercase">
                📻 PULSAR 220 HIGHWAY RADIO
              </span>
              <p className="text-xs font-black text-zinc-100 truncate">
                {currentSong?.title || 'Paan Mitho Chunama'}
              </p>
              <p className="text-[11px] font-semibold text-amber-300 truncate">
                {currentSong?.nepaliTitle}
              </p>
            </div>

            <button
              onClick={onTogglePlay}
              className="w-8 h-8 rounded-full bg-amber-400 text-zinc-950 flex items-center justify-center shrink-0 cursor-pointer hover:scale-105 transition"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>
          </div>

        </div>

        {/* Bike Handlebar Controls Bar */}
        <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleThrottle}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-zinc-950 font-black text-xs shadow-xl hover:scale-105 active:scale-95 transition cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-zinc-950" />
              <span>REV THROTTLE (Full Power)</span>
            </button>

            <button
              onClick={handleHorn}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs shadow-lg transition cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>BLAST HORN</span>
            </button>
          </div>

          <span className="text-xs text-zinc-400 font-medium hidden sm:inline">
            Press Throttle or Horn for realistic audio feedback!
          </span>

        </div>

      </div>
    </div>
  );
};
