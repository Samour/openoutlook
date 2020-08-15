import React, { RefObject } from 'react';
import styled from 'styled-components';
import { Fade, Zoom } from 'react-reveal';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { IImage } from 'models/Sections';
import Markdown from 'components/shared/Markdown';
import SectionContainer from 'components/shared/SectionContainer';
import SectionHeaderBreak from 'components/shared/SectionHeaderBreak';
import { IResourceService } from 'services/resourceService';
import './style.css';

const SectionCopy = styled.div`
  margin: 80px;
`;

interface IProps {
  header: string;
  copy: string;
  innerRef: RefObject<HTMLDivElement>;
  gallery: IImage[];
  cmsResourceService: IResourceService | null;
}

export default function SiteSection({
  header,
  copy,
  innerRef,
  gallery,
  cmsResourceService,
}: IProps): JSX.Element {
  const Gallery = (): JSX.Element | null => {
    if (gallery.length < 1) {
      return null;
    }

    const imageUrls = gallery.map(({ url }) => cmsResourceService?.getUri(url) || '')
      .map((original) => ({ original }));

    return (
      <Zoom>
        <div className="section-gallery">
          <ImageGallery
            items={imageUrls}
            showThumbnails={false}
            showPlayButton={false}
            showFullscreenButton={false}
            autoPlay
          />
        </div>
      </Zoom>
    );
  };

  return (
    <SectionContainer>
      <div ref={innerRef}>
        <Fade up>
          <h1>{header}</h1>
        </Fade>
        <Fade up>
          <SectionHeaderBreak />
        </Fade>
        <Fade up>
          <SectionCopy>
            <Markdown>{copy}</Markdown>
          </SectionCopy>
        </Fade>
        <Gallery />
      </div>
    </SectionContainer>
  );
}
