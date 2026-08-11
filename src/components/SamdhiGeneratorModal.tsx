import React, { useState } from 'react';
import { District, SamdhiPersona } from '../types';
import { Sparkles, X, Flame, Disc, Copy, Check, Share2, Compass } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface SamdhiGeneratorModalProps {
  onClose: () => void;
}

export const SamdhiGeneratorModal: React.FC<SamdhiGeneratorModalProps> = ({ onClose }) => {
  const [district, setDistrict] = useState<District>('Kavre');
  const [hairLength, setHairLength] = useState('Flowy Shoulder Length (लामो कपाल)');
  const [sunglasses, setSunglasses] = useState('Dark Wayfarers (कालो चस्मा)');
  const [jacket, setJacket] = useState('Black Leather Jacket (लेदर ज्याकेट)');
  const [bike, setBike] = useState('Pulsar 220 Blue (पल्सर २२०)');

  const [persona, setPersona] = useState<SamdhiPersona | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generatePersona = async () => {
    setLoading(true);

    const swagScore = Math.floor(88 + Math.random() * 12); // 88 - 100

    let rhyme = '';

    // Attempt Gemini call if API key present, or use instant template
    try {
      const apiKey = (import.meta as unknown as { env: Record<string, string> }).env?.VITE_GEMINI_API_KEY || (process.env as unknown as Record<string, string>)?.GEMINI_API_KEY;
      if (apiKey) {
        const ai = new GoogleGenAI({ apiKey });
        const res = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: `Generate a funny, rhyming 2-line viral Tamang Selo couplet in Nepali (Devanagari script + Romanized Nepali) for a guy from ${district} with ${hairLength}, wearing ${sunglasses}, ${jacket}, riding a ${bike}. Make it funny, referencing Kavreli Samdhi meme culture!`,
        });
        rhyme = res.text || '';
      }
    } catch (e) {
      console.log('Using local generator fallback', e);
    }

    if (!rhyme) {
      rhyme = `पान मिठो चुनामा... ${district} को सम्धी भाइरल भयो ${bike} को धुनमा!\nPaan Mitho Chunama... ${district} ko Samdhi viral bhayo ${bike} ko dhunama!`;
    }

    setPersona({
      name: `Kavreli Samdhi ${district} Swag`,
      district,
      hairLength,
      sunglassesStyle: sunglasses,
      jacketType: jacket,
      bikeModel: bike,
      swagScore,
      rhyme,
    });

    setLoading(false);
  };

  const handleCopy = () => {
    if (persona) {
      navigator.clipboard.writeText(
        `🔥 My Kavreli Samdhi Swag Persona 🔥\nDistrict: ${persona.district}\nSwag Score: ${persona.swagScore}/100\nRhyme: ${persona.rhyme}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg p-6 relative shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-black text-base text-zinc-100">
                काभ्रेली सम्धी स्वैग जनरेटर (Swag Generator)
              </h3>
              <p className="text-xs text-zinc-400 font-medium">
                Calculate your Tamang Selo Swag score & custom rhyming verse
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

        {/* Inputs */}
        <div className="space-y-3 text-xs font-semibold text-zinc-300">
          <div>
            <label className="block mb-1 text-zinc-400 font-bold">📍 District Roots</label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value as District)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-zinc-200 focus:outline-none focus:border-amber-400"
            >
              <option value="Kavre">Kavre (काभ्रे)</option>
              <option value="Sindhuli">Sindhuli (सिन्धुली)</option>
              <option value="Ramechhap">Ramechhap (रामेछाप)</option>
              <option value="Nuwakot">Nuwakot (नुवाकोट)</option>
              <option value="Bhojpur">Bhojpur (भोजपुर)</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-zinc-400 font-bold">💈 Hair Cut Style</label>
            <select
              value={hairLength}
              onChange={(e) => setHairLength(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-zinc-200 focus:outline-none focus:border-amber-400"
            >
              <option>Flowy Shoulder Length (लामो कपाल)</option>
              <option>Mug-Cut / Mullet (मुग-कट दाइ)</option>
              <option>Traditional Tamang Topknot</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-zinc-400 font-bold">🕶️ Sunglasses Tint</label>
            <select
              value={sunglasses}
              onChange={(e) => setSunglasses(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-zinc-200 focus:outline-none focus:border-amber-400"
            >
              <option>Dark Wayfarers (कालो चस्मा)</option>
              <option>Mirrored Aviators (ऐना चस्मा)</option>
              <option>Retro Cyber Shades</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-zinc-400 font-bold">🏍️ Bike Ride Choice</label>
            <select
              value={bike}
              onChange={(e) => setBike(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-zinc-200 focus:outline-none focus:border-amber-400"
            >
              <option>Pulsar 220 Blue (पल्सर २२०)</option>
              <option>Royal Enfield Bullet 350</option>
              <option>Yamaha FZ-S Highway Edition</option>
            </select>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={generatePersona}
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 text-zinc-950 font-black rounded-xl text-xs shadow-xl hover:scale-[1.01] transition cursor-pointer flex items-center justify-center gap-2"
        >
          {loading ? (
            <Disc className="w-4 h-4 animate-spin" />
          ) : (
            <Flame className="w-4 h-4 fill-zinc-950" />
          )}
          <span>{loading ? 'Calculating Samdhi Swag...' : 'GENERATE MY SAMDHI PERSONA'}</span>
        </button>

        {/* Output Card */}
        {persona && (
          <div className="p-4 bg-zinc-950 border border-amber-500/40 rounded-xl space-y-3 animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-amber-300">
                {persona.name}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-zinc-950 font-black text-xs">
                🔥 {persona.swagScore}/100 SWAG
              </span>
            </div>

            <div className="p-3 bg-purple-950/40 border border-purple-500/30 rounded-lg text-purple-200 text-xs font-medium leading-relaxed whitespace-pre-wrap">
              {persona.rhyme}
            </div>

            <button
              onClick={handleCopy}
              className="w-full flex items-center justify-center gap-1.5 py-2 bg-zinc-800 hover:bg-zinc-700 text-amber-300 rounded-lg text-xs font-bold transition cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Share Swag Card'}</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
