import React from 'react';
import styled from 'styled-components';
import Markdown from 'components/shared/Markdown';

const SubSectionContainer = styled.div`
  max-width: 25%;
  padding: 75px;

  &:first-child {
    padding-left: 30px;
  }

  &:last-child {
    padding-right: 30px;
  }

  img {
    max-width: 100%;
  }
`;

const ImgContainer = styled.div`
  margin: 40px 0px;
`;

export default class SubSection extends React.Component {
  render() {
    return (
      <SubSectionContainer>
        <h3>{this.props.header}</h3>
        <ImgContainer>
          <img src={this.props.cmsResourceService.getUri(this.props.image.url)}/>
        </ImgContainer>
        <Markdown>{this.props.copy}</Markdown>
      </SubSectionContainer>
    );
  }
}
