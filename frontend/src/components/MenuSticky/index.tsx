import React, { RefObject } from 'react';
import styled from 'styled-components';
import breakpoints from 'config/breakpoints';
import colours from 'config/colours';

const headerHeight = 60;

const StickyContainer = styled.div`
  display: none;

  @media (min-width: ${breakpoints.lg}px) {
    display: block;
    position: sticky;
    top: 0;
    height: ${headerHeight}px;
    background: ${colours.stickyMenuBg};
    opacity: 0.7;
    z-index: 100;
  }
`;

const LogoImg = styled.img`
  height: ${headerHeight}px;
  float: left;
`;

const MenuItemsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-left: 400px;
  margin-right: 40px;
`;

const MenuItem = styled.div`
  padding: 20px;
  margin-right: 5px;
  cursor: pointer;
`;

interface MenuItem {
  text: string;
  ref: RefObject<HTMLDivElement>;
}

interface IProps {
  menuItems: MenuItem[];
  logoSrc: string;
}

export default function MenuSticky({ menuItems, logoSrc }: IProps): JSX.Element {
  const scrollToElement = (item: MenuItem): (() => void) => () => {
    if (item.ref.current) {
      window.scrollTo({ top: item.ref.current.offsetTop - headerHeight, behavior: 'smooth' });
    }
  };

  const menuItemElements = menuItems.map((item) => (
    <MenuItem key={item.text} onClick={scrollToElement(item)}>{item.text}</MenuItem>
  ));

  return (
    <StickyContainer>
      <LogoImg src={logoSrc} />
      <MenuItemsContainer>
        {menuItemElements}
      </MenuItemsContainer>
    </StickyContainer>
  );
}
