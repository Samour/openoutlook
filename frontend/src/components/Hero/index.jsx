import React from 'react';
import PropTypes from 'prop-types';
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
    opacity: ${(props) => props.imgOpacity};
    background-image: url('${(props) => props.backgroundSrc}');
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
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

export default class Hero extends React.PureComponent {

  static propTypes = {
    title: PropTypes.string.isRequired,
    copy: PropTypes.string.isRequired,
    backgroundSrc: PropTypes.string.isRequired,
    backgroundOpacity: PropTypes.number.isRequired,
  };

  render() {
    return (
      <HeroContainer backgroundSrc={this.props.backgroundSrc} imgOpacity={this.props.backgroundOpacity}>
        <HeroTitle>{this.props.title}</HeroTitle>
        <HeroText>
          <Markdown>
            {this.props.copy}
          </Markdown>
        </HeroText>
      </HeroContainer>
    );
  }

}
