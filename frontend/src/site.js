import React from 'react';
import styled from 'styled-components';
import httpService from './services/httpService';
import ResourceService from './services/resourceService';
import Hero from './components/Hero';
import SiteSection from './components/SiteSection';
import Gallery from './components/Gallery';
import Contact from './components/Contact';

const outerColour = '#a8aaaf';
const innerColour = '#dddddd';

const SiteWrapper = styled.div`
  text-align: center;
  background: linear-gradient(to right, ${outerColour}, ${innerColour} 5%, ${innerColour} 95%, ${outerColour});
`;

export default class Site extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      sections: [],
      galleryView: null,
      galleryCloseReturnToHeight: 0,
    };

    this.httpService = httpService('http://localhost:1337');
    this.cmsResourceService = new ResourceService('http://localhost:1337');
  }

  async loadSections() {
    const res = await this.httpService.get('/site-sections');

    const sections = res.data;
    sections.sort((a, b) => a.Order - b.Order);

    this.setState({ sections });
  }

  componentDidMount() {
    this.loadSections();
  }

  renderMainContent() {
    if (this.state.galleryView) {
      return this.renderGallery();
    } else {
      return this.renderSections();
    }
  }

  renderSections() {
    const sections = this.state.sections.map((section) => (
      <SiteSection
        key={section.id}
        header={section.Header}
        copy={section.Copy}
        subsections={section.SubSections}
        cmsResourceService={this.cmsResourceService}
        onOpenGallery={this.openGallery}/>
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
    });
  }

  closeGallery = () => {
    this.setState({ galleryView: null }, () => {
      window.scrollTo(window.pageXOffset, this.state.galleryCloseReturnToHeight);
    });
  }

  render() {
    return (
      <SiteWrapper>
        <Hero httpService={this.httpService} cmsResourceService={this.cmsResourceService}/>
        {this.renderMainContent()}
        <Contact httpService={this.httpService}/>
      </SiteWrapper>
    );
  }
}
