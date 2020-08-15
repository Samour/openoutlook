import React from 'react';
import Markdown from 'components/shared/Markdown';
import styled from 'styled-components';

const HeroContainer = styled.div<{ imgOpacity: number, backgroundSrc: string }>`
  min-height: 600px;
  position: relative;
  background: #333333;

  color: white;
  text-shadow: 0px 0px 1px black;
  text-shadow: 0px 0px 8px black;

  &::after {
    content: "";
    opacity: ${({ imgOpacity }) => imgOpacity};
    background-image: url('${({ backgroundSrc }) => backgroundSrc}');
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

interface IProps {
  title: string;
  copy: string;
  backgroundSrc: string;
  backgroundOpacity: number;
}

export default function ({
  title,
  copy,
  backgroundSrc,
  backgroundOpacity,
}: IProps): JSX.Element {
  return (
    <HeroContainer backgroundSrc={backgroundSrc} imgOpacity={backgroundOpacity}>
      <HeroTitle>{title}</HeroTitle>
      <HeroText>
        <Markdown>
          {copy}
        </Markdown>
      </HeroText>
    </HeroContainer>
  );
}
