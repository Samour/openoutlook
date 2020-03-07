import React from 'react';
import Markdown from 'components/shared/Markdown';
import styled from 'styled-components';

const HeroContainer = styled.div`
  min-height: 600px;
  position: relative;
  background: #333333;

  color: white;
  text-shadow: 0px 0px 1px black;
  text-shadow: 0px 0px 8px black;

  &::after {
    content: "";
    opacity: ${props => props.imgOpacity};
    background-image: url('${props => props.backgroundSrc}');
    background-repeat: no-repeat;
    background-size: cover;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
  }

  * {
    position: relative;
    z-index: 5;
  }
`;

const HeroTitle = styled.h1`
  font-size: 65px;
  max-width: 600px;
  margin: auto;
  padding-top: 100px;
`;

const HeroText = styled.h4`
  max-width: 800px;
  padding: 100px 0px;
  margin: auto;
  line-height: 1.8;
`;

export default class Hero extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      copy: '',
      backgroundSrc: '',
      imgOpacity: '',
    };
  }

  async getSectionContent() {
    const res = await this.props.httpService.get('/hero-section');

    this.setState({
      title: res.data.Title,
      copy: res.data.Copy,
      backgroundSrc: this.props.cmsResourceService.getUri(res.data.Image.url),
      backgroundOpacity: res.data.ImageOpacity,
    });
  }

  componentDidMount() {
    this.getSectionContent();
  }

  render() {
    return (
      <HeroContainer backgroundSrc={this.state.backgroundSrc} imgOpacity={this.state.backgroundOpacity}>
        <HeroTitle>{this.state.title}</HeroTitle>
        <HeroText>
          <Markdown>
            {this.state.copy}
          </Markdown>
        </HeroText>
      </HeroContainer>
    );
  }
}
