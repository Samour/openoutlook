import React from 'react';
import styled from 'styled-components';
import Markdown from 'components/shared/Markdown';
import SubSection from 'components/SiteSubSection';

const SectionContainer = styled.div`
  padding: 100px;
`;

const SectionHeaderBreak = styled.div`
  border-top: 1px solid;
  width: 100px;
  margin: auto;
  margin-top: 40px;
`;

const SectionCopy = styled.div`
  margin-top: 40px;
`;

const SubSectionsContainer = styled.div`
  display: flex;
`;

export default class SiteSection extends React.Component {
  render() {
    const subSections = this.props.subsections.map((subSection) => (
      <SubSection header={subSection.Header} image={subSection.Image} copy={subSection.Copy}
        cmsResourceService={this.props.cmsResourceService}/>
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
