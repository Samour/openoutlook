import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import { TextField, Button } from '@material-ui/core';
import { IEnquiry } from 'models/Sections';
import { ICmsService } from 'services/cmsService';

const Form = styled.form`
  padding: 50px;
  max-width: 600px;
  margin: auto;
`;

const ButtonContainer = styled.div`
  margin-top: 50px;
`;

interface IProps {
  apiService: ICmsService;
  onFormSubmitted: () => void;
}

type FormField = 'Name' | 'Email' | 'Phone' | 'Enquiry';

export default function ContactForm({ apiService, onFormSubmitted }: IProps): JSX.Element {
  const [form, setForm] = useState<IEnquiry>({
    Name: '',
    Email: '',
    Phone: '',
    Enquiry: '',
  });

  const submitForm = async (): Promise<void> => {
    await apiService.submitEnquiry(form);
    onFormSubmitted();
  };

  const update = (field: FormField): ((event: ChangeEvent<HTMLInputElement>) => void) =>
    (event: ChangeEvent<HTMLInputElement>) => { // eslint-disable-line
      const formUpdate = { ...form };
      formUpdate[field] = event.target.value;
      setForm(formUpdate);
    };

  return (
    <Form onSubmit={submitForm}>
      <div>
        <TextField label="Name" required margin="normal" fullWidth onChange={update('Name')} />
      </div>
      <div>
        <TextField label="Email" required margin="normal" fullWidth onChange={update('Email')} />
      </div>
      <div>
        <TextField label="Phone" margin="normal" fullWidth onChange={update('Phone')} />
      </div>
      <div>
        <TextField
          label="Your Enquiry"
          multiline
          rows="6"
          required
          margin="normal"
          fullWidth
          onChange={update('Enquiry')}
        />
      </div>
      <ButtonContainer>
        <Button variant="contained" onClick={submitForm}>Submit</Button>
      </ButtonContainer>
    </Form>
  );
}
