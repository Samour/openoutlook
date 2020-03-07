import React from 'react';
import styled from 'styled-components';
import httpService from './services/httpService';
import ResourceService from './services/resourceService';
import Hero from './components/Hero';
import MenuSticky from './components/MenuSticky';
import SiteSection from './components/SiteSection';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import colours from 'config/colours';

const SiteWrapper = styled.div`
  text-align: center;
  background: linear-gradient(
    to right,
    ${colours.pageBgOuter},
    ${colours.pageBgInner} 5%,
    ${colours.pageBgInner} 95%,
    ${colours.pageBgOuter}
  );
`;

export default class Site extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      heroSection: {},
      sections: [],
      galleryView: null,
      galleryCloseReturnToHeight: 0,
    };

    this.httpService = httpService('http://localhost:1337');
    this.cmsResourceService = new ResourceService('http://localhost:1337');
  }

  async loadHeroSection() {
    const res = await this.httpService.get('/hero-section');

    this.setState({
      heroSection: {
        title: res.data.Title,
        copy: res.data.Copy,
        backgroundSrc: this.cmsResourceService.getUri(res.data.Image.url),
        backgroundOpacity: res.data.ImageOpacity,
        logo: this.cmsResourceService.getUri(res.data.Logo.url),
      }
    });
  }

  async loadSections() {
    const res = await this.httpService.get('/site-sections');

    const sections = res.data;
    sections.sort((a, b) => a.Order - b.Order);

    this.setState({ sections });
  }

  componentDidMount() {
    this.loadHeroSection();
    this.loadSections();
  }

  renderMainContent(menuItems) {
    if (this.state.galleryView) {
      return this.renderGallery();
    } else {
      return this.renderSections(menuItems);
    }
  }

  renderSections(menuItems) {
    const sections = this.state.sections.map((section, i) => (
      <SiteSection
        key={section.id}
        header={section.Header}
        copy={section.Copy}
        subsections={section.SubSections}
        cmsResourceService={this.cmsResourceService}
        onOpenGallery={this.openGallery}
        innerRef={menuItems[i].ref}/>
    ));

    return <div>{sections}</div>;
  }

  renderGallery() {
    return (
      <Gallery
        copy={this.state.galleryView.copy}
        gallery={this.state.galleryView.images}
        onCloseGallery={this.closeGallery}
        cmsResourceService={this.cmsResourceService}/>
    );
  }

  openGallery = (images, copy) => {
    this.setState({
      galleryView: { images, copy },
      galleryCloseReturnToHeight: window.pageYOffset,
    }, () => {
      window.scrollTo({top: 600 }); // Bottom of hero section
    });
  }

  closeGallery = () => {
    this.setState({ galleryView: null }, () => {
      window.scrollTo({top: this.state.galleryCloseReturnToHeight, behavior: 'smooth' });
    });
  }

  render() {
    const menuItems = this.state.sections.map((s) => ({ text: s.Header, ref: React.createRef() }));
    const contactMenuItem = { text: 'Contact Us', ref: React.createRef() };
    menuItems.push(contactMenuItem);

    const contactEl = this.state.sections.length > 1 ? 
      <Contact innerRef={contactMenuItem.ref} httpService={this.httpService}/>
      : null; // So that the reveal effect works, don't display Contact section until other sections have been loaded

    return (
      <SiteWrapper>
        <Hero {...this.state.heroSection}/>
        <MenuSticky logoSrc={this.state.heroSection.logo} menuItems={menuItems}/>
        {this.renderMainContent(menuItems)}
        {contactEl}
      </SiteWrapper>
    );
  }
}
