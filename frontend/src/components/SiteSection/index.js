import React from 'react';
import styled from 'styled-components';
import { Fade, Zoom } from 'react-reveal';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import Markdown from 'components/shared/Markdown';
import SectionContainer from 'components/shared/SectionContainer';
import SectionHeaderBreak from 'components/shared/SectionHeaderBreak';
import './style.css';

const SectionCopy = styled.div`
  margin: 80px;
`;

export default class SiteSection extends React.Component {

  renderGallery() {
    if (this.props.gallery.length < 1) {
      return null;
    }

    const imageUrls = this.props.gallery
      .map(i => this.props.cmsResourceService.getUri(i.url))
      .map((url) => ({ original: url }));
    console.log(imageUrls);

    return (
      <Zoom>
        <div className="section-gallery">
          <ImageGallery
            items={imageUrls}
            showThumbnails={false}
            showPlayButton={false}
            showFullscreenButton={false}
            autoPlay={true}/>
        </div>
      </Zoom>
    );
  }

  render() {
    return (
      <SectionContainer>
        <div ref={this.props.innerRef}>
          <Fade up>
            <h1>{this.props.header}</h1>
          </Fade>
          <Fade up>
            <SectionHeaderBreak/>
          </Fade>
          <Fade up>
            <SectionCopy>
              <Markdown>{this.props.copy}</Markdown>
            </SectionCopy>
          </Fade>
          {this.renderGallery()}
        </div>
      </SectionContainer>
    );
  }
}
