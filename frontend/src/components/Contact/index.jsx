import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Fade } from 'react-reveal';
import Ref from 'shared/shapes';
import SectionHeaderBreak from 'components/shared/SectionHeaderBreak';
import ContactForm from './ContactForm';

const ContactDetailsContainer = styled.div`
  margin: 0px;
  padding: 10px;

  &:last-child {
    padding-bottom: 120px;
  }
`;

export default class ContactSection extends React.Component {

  static propTypes = {
    innerRef: Ref.isRequired,
    httpService: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      companyName: '',
      email: '',
      phone: '',
      enquirySubmittedMessage: '',
      formSubmitted: false,
    };
  }

  componentDidMount() {
    this.getContactDetails();
  }

  async getContactDetails() {
    const res = await this.props.httpService.get('/contact-details');
    this.setState({
      companyName: res.data.CompanyName,
      email: res.data.Email,
      phone: res.data.Phone,
      enquirySubmittedMessage: res.data.EnquirySubmittedMessage,
    });
  }

  formSubmitted = () => {
    this.setState({ formSubmitted: true });
  }

  renderFormElement() {
    if (this.state.formSubmitted) {
      return <h3>{this.state.enquirySubmittedMessage}</h3>;
    }
    return <ContactForm onFormSubmitted={this.formSubmitted} httpService={this.props.httpService} />;
  }

  render() {
    return (
      <div ref={this.props.innerRef}>
        <Fade up>
          <h1>Contact Us</h1>
          <SectionHeaderBreak />
          {this.renderFormElement()}
          <div>
            <ContactDetailsContainer>
              <strong><i>{this.state.companyName}</i></strong>
            </ContactDetailsContainer>
            <ContactDetailsContainer>
              <a href={`mailTo:${this.state.email}`}>{this.state.email}</a>
            </ContactDetailsContainer>
            <ContactDetailsContainer>
              p:
              {' '}
              {this.state.phone}
            </ContactDetailsContainer>
          </div>
        </Fade>
      </div>
    );
  }

}
