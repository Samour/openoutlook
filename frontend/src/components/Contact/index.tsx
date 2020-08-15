import React, { useEffect, useState, Ref } from 'react';
import { AxiosInstance } from 'axios';
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

interface IProps {
  innerRef: Ref<HTMLDivElement>;
  httpService: AxiosInstance;
}

interface IContactDetails {
  companyName: string;
  email: string;
  phone: string;
  enquirySubmittedMessage: string;
}

export default function ContactSection({ innerRef, httpService }: IProps): JSX.Element {
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [contactDetails, setContactDetails] = useState<IContactDetails>({
    companyName: '',
    email: '',
    phone: '',
    enquirySubmittedMessage: '',
  });
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const getContactDetails = async (): Promise<void> => {
      const res = await httpService.get('/contact-details');
      setContactDetails({
        companyName: res.data.CompanyName,
        email: res.data.Email,
        phone: res.data.Phone,
        enquirySubmittedMessage: res.data.EnquirySubmittedMessage,
      });
    };

    if (!dataLoaded) {
      setDataLoaded(true);
      getContactDetails();
    }
  }, [dataLoaded, httpService]);

  const onFormSubmitted = (): void => {
    setFormSubmitted(true);
  };

  const FormElement = (): JSX.Element => {
    if (formSubmitted) {
      return <h3>{contactDetails.enquirySubmittedMessage}</h3>;
    } else {
      return <ContactForm onFormSubmitted={onFormSubmitted} httpService={httpService} />;
    }
  };

  return (
    <div ref={innerRef}>
      <Fade up>
        <h1>Contact Us</h1>
        <SectionHeaderBreak />
        <FormElement />
        <div>
          <ContactDetailsContainer>
            <strong><i>{contactDetails.companyName}</i></strong>
          </ContactDetailsContainer>
          <ContactDetailsContainer>
            <a href={`mailTo:${contactDetails.email}`}>{contactDetails.email}</a>
          </ContactDetailsContainer>
          <ContactDetailsContainer>
            {`p: ${contactDetails.phone}`}
          </ContactDetailsContainer>
        </div>
      </Fade>
    </div>
  );
}
