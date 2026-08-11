export type MainTheme = 'Kavreli Samdhi' | 'TikTok Viral' | 'Gym Songs' | 'Meme Songs';

export type SubTheme =
  | 'Kavreli Samdhi'
  | 'TikTok Viral'
  | 'Bus Driver Classics'
  | 'Gym Tamang'
  | 'Wedding Bangers'
  | 'Janti Essentials'
  | 'Long Hair Classics'
  | 'Village Romance'
  | 'Old Cassette'
  | 'Hidden Gems'
  | 'Gym Songs'
  | 'Meme Songs';

export type District = 'Kavre' | 'Sindhuli' | 'Ramechhap' | 'Nuwakot' | 'Bhojpur' | 'All Nepal';

export interface Song {
  id: string;
  title: string;
  nepaliTitle: string;
  artist: string;
  mainTheme: MainTheme;
  subThemes: SubTheme[];
  district: District;
  youtubeId: string;
  audioPreviewUrl?: string;
  duration: string;
  bpm: number;
  viralScore: number; // 1 - 100
  longHairRating: number; // 1 - 5 stars for long hair aesthetic
  memeLore: string;
  lyricsNepali: string;
  lyricsRoman: string;
  coverImage: string;
  isTrending?: boolean;
}

export interface SoundEffect {
  id: string;
  name: string;
  nepaliLabel: string;
  category: 'motto' | 'vehicle' | 'instrument' | 'meme';
  icon: string;
  synthType: 'horn' | 'engine' | 'damphu' | 'whistle' | 'shout';
}

export interface SamdhiPersona {
  name: string;
  district: District;
  hairLength: string;
  sunglassesStyle: string;
  jacketType: string;
  bikeModel: string;
  swagScore: number;
  rhyme: string;
}
