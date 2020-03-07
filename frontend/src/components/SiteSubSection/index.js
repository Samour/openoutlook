import React from 'react';
import styled from 'styled-components';
import { Fade } from 'react-reveal';
import Markdown from 'components/shared/Markdown';
import breakpoints from 'config/breakpoints';

const SubSectionContainer = styled.div`
  width: 100%;

  @media (min-width: ${breakpoints.md}px) {
    max-width: 50%;
  }

  @media (min-width: ${breakpoints.xl}px) {
    max-width: 33%;
  }

  img {
    max-width: 100%;
  }
`;

const SubSectionContentContainer = styled.div`
  padding: 30px 0px;

  @media (min-width: ${breakpoints.md}px) {
    padding: 30px;
  }

  @media (min-width: ${breakpoints.xl}px) {
    padding: 30px 75px;
  }
`;

const SubSectionHeader = styled.h3`
  cursor: pointer;

  @media (min-width: ${breakpoints.md}px) {
    min-height: 50px;
  }
`;

const ImgContainer = styled.div`
  cursor: pointer;
  margin: 40px 0px;
`;

export default class SubSection extends React.Component {

  openGallery = () => {
    this.props.onOpenGallery(this.props.gallery, this.props.galleryCopy);
  }

  render() {
    return (
      <SubSectionContainer>
        <SubSectionContentContainer>
          <Fade up>
            <SubSectionHeader onClick={this.openGallery}>{this.props.header}</SubSectionHeader>
            <ImgContainer onClick={this.openGallery}>
              <img src={this.props.cmsResourceService.getUri(this.props.image.url)}/>
            </ImgContainer>
            <Markdown>{this.props.copy}</Markdown>
          </Fade>
        </SubSectionContentContainer>
      </SubSectionContainer>
    );
  }
}
