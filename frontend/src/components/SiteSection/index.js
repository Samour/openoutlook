import React from 'react';
import styled from 'styled-components';
import Markdown from 'components/shared/Markdown';
import SectionContainer from 'components/shared/SectionContainer';
import SectionHeaderBreak from 'components/shared/SectionHeaderBreak';
import SubSection from 'components/SiteSubSection';

const SectionCopy = styled.div`
  margin-top: 40px;
`;

const SubSectionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default class SiteSection extends React.Component {
  render() {
    const subSections = this.props.subsections.map((subSection) => (
      <SubSection 
        key={subSection.id} 
        header={subSection.Header} 
        image={subSection.Image} 
        copy={subSection.Copy}
        galleryCopy={subSection.GalleryCopy}
        gallery={subSection.Gallery} 
        cmsResourceService={this.props.cmsResourceService} 
        onOpenGallery={this.props.onOpenGallery}/>
    ));

    return (
      <SectionContainer>
        <h1>{this.props.header}</h1>
        <SectionHeaderBreak/>
        <SectionCopy>
          <Markdown>{this.props.copy}</Markdown>
        </SectionCopy>
        <SubSectionsContainer>
          {subSections}
        </SubSectionsContainer>
      </SectionContainer>
    );
  }
}
