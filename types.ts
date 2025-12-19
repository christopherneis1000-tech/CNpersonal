
export interface ImageSequenceConfig {
  baseUrl: string;
  frameCount: number;
}

export interface SectionContent {
  title: string;
  subtitle?: string;
  description: string;
  ctaText?: string;
  secondaryCtaText?: string;
}

export enum SectionId {
  HERO = 'hero',
  STYLE = 'style',
  CONTACT = 'contact'
}
