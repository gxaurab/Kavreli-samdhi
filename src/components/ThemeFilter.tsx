import React from 'react';
import { MainTheme, SubTheme, District } from '../types';
import { Flame, Dumbbell, Sparkles, Volume2, Music, Disc, MapPin, Radio, Heart } from 'lucide-react';

interface ThemeFilterProps {
  selectedMainTheme: MainTheme | 'All';
  setSelectedMainTheme: (theme: MainTheme | 'All') => void;
  selectedSubTheme: SubTheme | 'All';
  setSelectedSubTheme: (theme: SubTheme | 'All') => void;
  selectedDistrict: District | 'All Nepal';
  setSelectedDistrict: (district: District | 'All Nepal') => void;
  totalSongCount: number;
}

const MAIN_THEMES: { id: MainTheme; label: string; icon: React.ReactNode; color: string; bg: string }[] = [
  {
    id: 'Kavreli Samdhi',
    label: 'Kavreli Samdhi',
    icon: <Sparkles className="w-4 h-4 text-purple-400" />,
    color: 'from-purple-600 via-pink-600 to-amber-500',
    bg: 'bg-purple-950/40 border-purple-500/50 text-purple-200',
  },
  {
    id: 'TikTok Viral',
    label: 'TikTok Viral',
    icon: <Flame className="w-4 h-4 text-pink-400" />,
    color: 'from-pink-600 to-rose-600',
    bg: 'bg-pink-950/40 border-pink-500/50 text-pink-200',
  },
  {
    id: 'Gym Songs',
    label: 'Gym Songs',
    icon: <Dumbbell className="w-4 h-4 text-amber-400" />,
    color: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-950/40 border-amber-500/50 text-amber-200',
  },
  {
    id: 'Meme Songs',
    label: 'Meme Songs',
    icon: <Volume2 className="w-4 h-4 text-emerald-400" />,
    color: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200',
  },
];

const SUB_THEMES: { id: SubTheme; label: string; icon: string }[] = [
  { id: 'Kavreli Samdhi', label: '🟣 Kavreli Samdhi', icon: '🟣' },
  { id: 'TikTok Viral', label: '🔥 TikTok Viral', icon: '🔥' },
  { id: 'Bus Driver Classics', label: '🚌 Bus Driver Classics', icon: '🚌' },
  { id: 'Gym Tamang', label: '🏋️ Gym Tamang', icon: '🏋️' },
  { id: 'Wedding Bangers', label: '💃 Wedding Bangers', icon: '💃' },
  { id: 'Janti Essentials', label: '🎺 Janti Essentials', icon: '🎺' },
  { id: 'Long Hair Classics', label: '💈 Long Hair Classics', icon: '💈' },
  { id: 'Village Romance', label: '🌾 Village Romance', icon: '🌾' },
  { id: 'Old Cassette', label: '📻 Old Cassette', icon: '📻' },
  { id: 'Hidden Gems', label: '💎 Hidden Gems', icon: '💎' },
];

const DISTRICTS: District[] = ['Kavre', 'Sindhuli', 'Ramechhap', 'Nuwakot', 'Bhojpur'];

export const ThemeFilter: React.FC<ThemeFilterProps> = ({
  selectedMainTheme,
  setSelectedMainTheme,
  selectedSubTheme,
  setSelectedSubTheme,
  selectedDistrict,
  setSelectedDistrict,
  totalSongCount,
}) => {
  return (
    <div className="w-full space-y-6 my-6">
      
      {/* 1. Main 4 Featured Themes Section (Prominent as requested) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-amber-400 animate-pulse" />
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-zinc-300">
              The 4 Core Viral Themes
            </h2>
          </div>
          <span className="text-xs font-semibold text-zinc-400 bg-zinc-900 px-2.5 py-1 rounded-full border border-zinc-800">
            {totalSongCount} Bangers Loaded
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* All Theme Button */}
          <button
            onClick={() => {
              setSelectedMainTheme('All');
              setSelectedSubTheme('All');
            }}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden ${
              selectedMainTheme === 'All' && selectedSubTheme === 'All'
                ? 'bg-amber-500 text-zinc-950 font-black border-amber-400 shadow-lg shadow-amber-500/20'
                : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800/80'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider">🔥 ALL BANGERS</span>
              <Disc className="w-4 h-4 opacity-70" />
            </div>
            <p className="text-[11px] mt-1 opacity-80">Every Tamang Selo & Highway Trend</p>
          </button>

          {/* 4 Core Themes */}
          {MAIN_THEMES.map((theme) => {
            const isSelected = selectedMainTheme === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => {
                  setSelectedMainTheme(isSelected ? 'All' : theme.id);
                  if (theme.id === 'Kavreli Samdhi') setSelectedSubTheme('Kavreli Samdhi');
                  else if (theme.id === 'TikTok Viral') setSelectedSubTheme('TikTok Viral');
                  else if (theme.id === 'Gym Songs') setSelectedSubTheme('Gym Tamang');
                  else if (theme.id === 'Meme Songs') setSelectedSubTheme('Meme Songs');
                }}
                className={`p-3 rounded-xl border transition-all cursor-pointer relative overflow-hidden group ${
                  isSelected
                    ? `bg-gradient-to-r ${theme.color} text-white font-extrabold shadow-xl border-white/40 scale-[1.02]`
                    : `${theme.bg} hover:border-zinc-700 hover:bg-zinc-800/90`
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                    {theme.icon}
                    {theme.label}
                  </span>
                </div>
                <p className="text-[10px] mt-1 opacity-85 font-medium line-clamp-1">
                  {theme.id === 'Kavreli Samdhi' && 'Paan Mitho, Long Hair, Janti'}
                  {theme.id === 'TikTok Viral' && 'Short-video dance trends'}
                  {theme.id === 'Gym Songs' && 'Heavy Damphu bass PR boost'}
                  {theme.id === 'Meme Songs' && 'Tipper horns & bus memes'}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Sub-theme Filter Tags */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
          Filter By Vibe & Aesthetic
        </span>
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setSelectedSubTheme('All')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${
              selectedSubTheme === 'All'
                ? 'bg-zinc-200 text-zinc-950 font-bold'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            All Vibes
          </button>
          {SUB_THEMES.map((sub) => {
            const isSelected = selectedSubTheme === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => setSelectedSubTheme(isSelected ? 'All' : sub.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500 text-zinc-950 font-black shadow-md border border-amber-400'
                    : 'bg-zinc-900/90 border border-zinc-800/80 text-zinc-300 hover:border-zinc-700 hover:text-white'
                }`}
              >
                {sub.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Regional District Filter Chips */}
      <div className="flex items-center gap-2 pt-2 border-t border-zinc-800/80">
        <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span className="text-xs font-bold text-zinc-400 shrink-0">District Roots:</span>
        
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setSelectedDistrict('All Nepal')}
            className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold transition cursor-pointer ${
              selectedDistrict === 'All Nepal'
                ? 'bg-purple-600 text-white'
                : 'bg-zinc-900 text-zinc-400 hover:text-white'
            }`}
          >
            All Nepal
          </button>

          {DISTRICTS.map((dist) => {
            const isSelected = selectedDistrict === dist;
            return (
              <button
                key={dist}
                onClick={() => setSelectedDistrict(isSelected ? 'All Nepal' : dist)}
                className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold transition cursor-pointer ${
                  isSelected
                    ? 'bg-amber-400 text-zinc-950 font-bold shadow'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-amber-300'
                }`}
              >
                📍 {dist}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};
