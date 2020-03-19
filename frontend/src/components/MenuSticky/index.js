import React from 'react';
import styled from 'styled-components';
import colours from 'config/colours';

const headerHeight = 60;

const StickyContainer = styled.div`
  position: sticky;
  top: 0;
  height: ${headerHeight}px;
  background: ${colours.stickyMenuBg};
  opacity: 0.7;
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


  scrollToElement(item) {
    return () => {
      if (item.ref.current) {
        window.scrollTo({ top: item.ref.current.offsetTop - headerHeight, behavior: 'smooth' });
      }
    };
  }

  render() {
    const menuItems = this.props.menuItems
      .map((item, i) => <MenuItem key={i} onClick={this.scrollToElement(item)}>{item.text}</MenuItem>)

    return (
      <StickyContainer>
        <LogoImg src={this.props.logoSrc}/>
        <MenuItemsContainer>
          {menuItems}
        </MenuItemsContainer>
      </StickyContainer>
    );
  }
}
