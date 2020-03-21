import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Ref from 'shared/shapes';
import breakpoints from 'config/breakpoints';
import colours from 'config/colours';

const MenuItemShape = {
  text: PropTypes.string.isRequired,
  ref: Ref,
};

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

export default class MenuSticky extends React.Component {

  static propTypes = {
    menuItems: PropTypes.arrayOf(PropTypes.shape(MenuItemShape)).isRequired,
    logoSrc: PropTypes.string.isRequired,
  };

  scrollToElement(item) {
    return () => {
      if (item.ref.current) {
        window.scrollTo({ top: item.ref.current.offsetTop - headerHeight, behavior: 'smooth' });
      }
    };
  }

  render() {
    const menuItems = this.props.menuItems
      .map((item) => <MenuItem key={item.text} onClick={this.scrollToElement(item)}>{item.text}</MenuItem>);

    return (
      <StickyContainer>
        <LogoImg src={this.props.logoSrc} />
        <MenuItemsContainer>
          {menuItems}
        </MenuItemsContainer>
      </StickyContainer>
    );
  }

}
