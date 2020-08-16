import React, { useEffect, useState, Ref } from 'react';
import styled from 'styled-components';
import { Fade } from 'react-reveal';
import { ICmsService } from 'services/cmsService';
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
  apiService: ICmsService;
}

interface IContactDetails {
  companyName: string;
  email: string;
  phone: string;
  enquirySubmittedMessage: string;
}

export default function ContactSection({ innerRef, apiService }: IProps): JSX.Element {
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
      const details = await apiService.getContactDetails();
      setContactDetails({
        companyName: details.CompanyName,
        email: details.Email,
        phone: details.Phone,
        enquirySubmittedMessage: details.EnquirySubmittedMessage,
      });
    };

    if (!dataLoaded) {
      setDataLoaded(true);
      getContactDetails();
    }
  }, [dataLoaded, apiService]);

  const onFormSubmitted = (): void => {
    setFormSubmitted(true);
  };

  const FormElement = (): JSX.Element => {
    if (formSubmitted) {
      return <h3>{contactDetails.enquirySubmittedMessage}</h3>;
    } else {
      return <ContactForm onFormSubmitted={onFormSubmitted} apiService={apiService} />;
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
