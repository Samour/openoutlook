import styled from 'styled-components';
import breakpoints from 'config/breakpoints';

const SectionContainer = styled.div`
  padding: 20px;

  @media (min-width: ${breakpoints.md}px) {
    padding: 20px 100px;

    &:first-child {
      padding-top: 100px;
    }
  }
`;

export default SectionContainer;
