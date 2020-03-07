import React from 'react';
import styled from 'styled-components';
import { Fade } from 'react-reveal';
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

  componentDidMount() {
    this.getContactDetails();
  }

  renderFormElement() {
    if (this.state.formSubmitted) {
      return <h3>{this.state.enquirySubmittedMessage}</h3>;
    } else {
      return <ContactForm onFormSubmitted={this.formSubmitted} httpService={this.props.httpService}/>;
    }
  }

  render() {
    return (
      <div ref={this.props.innerRef}>
        <Fade up>
          <h1>Contact Us</h1>
          <SectionHeaderBreak/>
          {this.renderFormElement()}
          <div>
            <ContactDetailsContainer>
              <strong><i>{this.state.companyName}</i></strong>
            </ContactDetailsContainer>
            <ContactDetailsContainer>
              <a href={`mailTo:${this.state.email}`}>{this.state.email}</a>
            </ContactDetailsContainer>
            <ContactDetailsContainer>
              p: {this.state.phone}
            </ContactDetailsContainer>
          </div>
        </Fade>
      </div>
    );
  }
}
