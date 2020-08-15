import React, { useState, ChangeEvent } from 'react';
import { AxiosInstance } from 'axios';
import styled from 'styled-components';
import { TextField, Button } from '@material-ui/core';

const Form = styled.form`
  padding: 50px;
  max-width: 600px;
  margin: auto;
`;

const ButtonContainer = styled.div`
  margin-top: 50px;
`;

interface IProps {
  httpService: AxiosInstance;
  onFormSubmitted: () => void;
}

type FormField = 'name' | 'email' | 'phone' | 'enquiry';

interface IForm {
  name: string;
  email: string;
  phone: string;
  enquiry: string;
}

export default function ContactForm({ httpService, onFormSubmitted }: IProps): JSX.Element {
  const [form, setForm] = useState<IForm>({
    name: '',
    email: '',
    phone: '',
    enquiry: '',
  });

  const submitForm = async (): Promise<void> => {
    await httpService.post('/enquiries', {
      Name: form.name,
      Email: form.email,
      Phone: form.phone,
      Enquiry: form.enquiry,
    });
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
        <TextField label="Name" required margin="normal" fullWidth onChange={update('name')} />
      </div>
      <div>
        <TextField label="Email" required margin="normal" fullWidth onChange={update('email')} />
      </div>
      <div>
        <TextField label="Phone" margin="normal" fullWidth onChange={update('phone')} />
      </div>
      <div>
        <TextField
          label="Your Enquiry"
          multiline
          rows="6"
          required
          margin="normal"
          fullWidth
          onChange={update('enquiry')}
        />
      </div>
      <ButtonContainer>
        <Button variant="contained" onClick={submitForm}>Submit</Button>
      </ButtonContainer>
    </Form>
  );
}
