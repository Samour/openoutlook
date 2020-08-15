export interface IHeroSection {
  title: string;
  copy: string;
  backgroundSrc: string;
  backgroundOpacity: number;
  logo: string;
}

export interface IImage {
  url: string;
}

export interface ISection {
  id: string;
  Order: number;
  Header: string;
  Copy: string;
  Gallery: IImage[];
}
