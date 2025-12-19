
import { SectionId } from './types';

export const COLORS = {
  charcoalBlack: '#1E1E1E',
  warmGraphite: '#2B2B2B',
  softIvory: '#F4F2EE',
  mutedStoneGrey: '#D1D1CF', // Brightened from #B8B6B2
  darkOlive: '#5F6654',
};

export const FRAME_COUNT = 192;

export const SEQUENCES = {
  [SectionId.HERO]: 'https://rgnrxlkzixenmlmwqpsz.supabase.co/storage/v1/object/public/chris_personal_seq1/frame_',
  [SectionId.STYLE]: 'https://rgnrxlkzixenmlmwqpsz.supabase.co/storage/v1/object/public/chris_personal_seq2/frame_',
  [SectionId.CONTACT]: 'https://rgnrxlkzixenmlmwqpsz.supabase.co/storage/v1/object/public/chris_personal_seq3/frame_',
};

export const getFrameUrl = (baseUrl: string, index: number) => {
  const paddedIndex = index.toString().padStart(3, '0');
  return `${baseUrl}${paddedIndex}_delay-0.04s.webp`;
};
