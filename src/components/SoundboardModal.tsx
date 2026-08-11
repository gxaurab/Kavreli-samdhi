import React from 'react';
import { SOUND_EFFECTS } from '../data/songs';
import { audioSynth } from '../lib/audioSynth';
import { Volume2, X, Truck, Zap, Disc, Sparkles, Music } from 'lucide-react';

interface SoundboardModalProps {
  onClose: () => void;
}

export const SoundboardModal: React.FC<SoundboardModalProps> = ({ onClose }) => {
  const triggerSound = (synthType: string) => {
    switch (synthType) {
      case 'horn':
        audioSynth.playTipperHorn();
        break;
      case 'engine':
        audioSynth.playPulsarRev();
        break;
      case 'damphu':
        audioSynth.playDamphu();
        break;
      case 'whistle':
        audioSynth.playWhistle();
        break;
      case 'shout':
        audioSynth.playSeloMelody();
        break;
      default:
        audioSynth.playDamphu();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg p-6 relative shadow-2xl space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-purple-400" />
            <div>
              <h3 className="font-black text-base text-zinc-100">
                काभ्रेली भाइरल साउन्डबोर्ड (Viral Soundboard)
              </h3>
              <p className="text-xs text-zinc-400 font-medium">
                Tata Tipper Horns, Pulsar 220 Engine Revs, & Damphu Beats
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

        {/* Sound FX Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {SOUND_EFFECTS.map((fx) => (
            <button
              key={fx.id}
              onClick={() => triggerSound(fx.synthType)}
              className="p-4 rounded-xl bg-zinc-950 hover:bg-purple-950/40 border border-zinc-800 hover:border-purple-500/50 flex flex-col items-center justify-center gap-2 text-center group transition active:scale-95 cursor-pointer shadow-lg"
            >
              <div className="w-10 h-10 rounded-full bg-purple-500/10 group-hover:bg-purple-500/30 flex items-center justify-center text-purple-300 group-hover:text-amber-400 transition">
                {fx.synthType === 'horn' && <Truck className="w-5 h-5" />}
                {fx.synthType === 'engine' && <Zap className="w-5 h-5" />}
                {fx.synthType === 'damphu' && <Disc className="w-5 h-5" />}
                {fx.synthType === 'whistle' && <Volume2 className="w-5 h-5" />}
                {fx.synthType === 'shout' && <Sparkles className="w-5 h-5" />}
              </div>

              <div>
                <span className="block text-xs font-black text-zinc-100 group-hover:text-amber-300">
                  {fx.name}
                </span>
                <span className="block text-[11px] font-bold text-amber-400 mt-0.5">
                  {fx.nepaliLabel}
                </span>
              </div>
            </button>
          ))}
        </div>

        <p className="text-[11px] text-zinc-500 text-center font-medium pt-2">
          💡 Tip: Tap buttons during music playback for instant live highway mashup!
        </p>

      </div>
    </div>
  );
};
