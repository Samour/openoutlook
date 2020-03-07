import React from 'react';
import styled from 'styled-components';
import httpService from './services/httpService';
import ResourceService from './services/resourceService';
import Hero from './components/Hero';
import SiteSection from './components/SiteSection';

const SiteWrapper = styled.div`
  text-align: center;
  background: #dddddd;
`;

export default class Site extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      sections: [],
    };

    this.httpService = httpService('http://localhost:1337');
    this.cmsResourceService = new ResourceService('http://localhost:1337');
  }

  async loadSections() {
    const res = await this.httpService.get('/site-sections');

    this.setState({
      sections: res.data,
    });
  }

  componentDidMount() {
    this.loadSections();
  }

  render() {
    const sections = this.state.sections.map((section) => (
      <SiteSection header={section.Header} copy={section.Copy} subsections={section.SubSections}
        cmsResourceService={this.cmsResourceService}/>
    ));

    return (
      <SiteWrapper>
        <Hero httpService={this.httpService} cmsResourceService={this.cmsResourceService}/>
        {sections}
      </SiteWrapper>
    );
  }
}
