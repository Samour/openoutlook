declare module 'react-image-gallery' {
  interface IImage {
    original: string;
  }

  export default function ImageGallery(props: {
    items: IImage[];
    showThumbnails?: boolean;
    showPlayButton?: boolean;
    showFullscreenButton?: boolean;
    autoPlay?: bollean;
  });
}
