import React from 'react';
import styled from 'styled-components';
import ImageGallery from 'react-image-gallery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Markdown from 'components/shared/Markdown';
import SectionContainer from 'components/shared/SectionContainer';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import 'react-image-gallery/styles/css/image-gallery.css';

const CopyContainer = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 50px 0px;
`;

const ExitButton = styled.button`
  background: none;
  border: none;
  font-size: 30px;
  cursor: pointer;
  float: right;
  margin: 30px 100px 0px 0px;
  color: #555555;
`;

export default class Gallery extends React.Component {

  render() {
    const imgs = this.props.gallery
      .map((i) => this.props.cmsResourceService.getUri(i.url))
      .map((url) => ({ original: url }));

    return (
      <SectionContainer>
        <ExitButton onClick={this.props.onCloseGallery}>
          <FontAwesomeIcon icon={faTimes}/>
        </ExitButton>
        <CopyContainer>
          <Markdown>{this.props.copy}</Markdown>
        </CopyContainer>
        <ImageGallery items={imgs} showThumbnails={false} showPlayButton={false} showFullscreenButton={false}/>
      </SectionContainer>
    );
  }
}
