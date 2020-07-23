import React from 'react';
import styled from 'styled-components';
import configProvider from 'services/configProvider';
import httpService from 'services/httpService';
import ResourceService from 'services/resourceService';
import Hero from 'components/Hero';
import MenuSticky from 'components/MenuSticky';
import SiteSection from 'components/SiteSection';
import Contact from 'components/Contact';
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
      heroSection: {
        title: '',
        copy: '',
        backgroundSrc: '',
        backgroundOpacity: 0,
        logo: '',
      },
      sections: [],
    };

    this.httpService = null;
    this.cmsResourceService = null;
  }

  async componentDidMount() {
    const config = await configProvider();
    this.httpService = httpService(config.apiUrl);
    this.cmsResourceService = new ResourceService(config.apiUrl);
    this.loadHeroSection();
    this.loadSections();
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
      },
    });
  }

  async loadSections() {
    const res = await this.httpService.get('/site-sections');

    const sections = res.data;
    sections.sort((a, b) => a.Order - b.Order);

    this.setState({ sections });
  }

  renderSections(menuItems) {
    const sections = this.state.sections.map((section, i) => (
      <SiteSection
        key={section.id}
        header={section.Header}
        copy={section.Copy}
        gallery={section.Gallery}
        cmsResourceService={this.cmsResourceService}
        onOpenGallery={this.openGallery}
        innerRef={menuItems[i].ref}
      />
    ));

    return <div>{sections}</div>;
  }

  render() {
    const menuItems = this.state.sections.map((s) => ({ text: s.Header, ref: React.createRef() }));
    const contactMenuItem = { text: 'Contact Us', ref: React.createRef() };
    menuItems.push(contactMenuItem);

    const contactEl = this.state.sections.length > 1
      ? <Contact innerRef={contactMenuItem.ref} httpService={this.httpService} />
      : null; // So that the reveal effect works, don't display Contact section until other sections have been loaded

    return (
      <SiteWrapper>
        <Hero
          backgroundSrc={this.state.heroSection.backgroundSrc}
          backgroundOpacity={this.state.heroSection.backgroundOpacity}
          title={this.state.heroSection.title}
          copy={this.state.heroSection.copy}
        />
        <MenuSticky logoSrc={this.state.heroSection.logo} menuItems={menuItems} />
        {this.renderSections(menuItems)}
        {contactEl}
      </SiteWrapper>
    );
  }

}
