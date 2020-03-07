import React from 'react';
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

export default class ContactForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      phone: '',
      enquiry: '',
    };
  }

  update(field) {
    return (event) => {
      const updateObj = {};
      updateObj[field] = event.target.value;
      this.setState({ ...updateObj });
    };
  }

  submitForm = async () => {
    await this.props.httpService.post('/enquiries', {
      Name: this.state.name,
      Email: this.state.email,
      Phone: this.state.phone,
      Enquiry: this.state.enquiry,
    });

    this.props.onFormSubmitted();
  }

  render() {
    return (
      <Form onSubmit={this.submitForm}>
        <div>
          <TextField label="Name" required margin="normal" fullWidth onChange={this.update('name')}/>
        </div>
        <div>
          <TextField label="Email" required margin="normal" fullWidth onChange={this.update('email')}/>
        </div>
        <div>
          <TextField label="Phone" margin="normal" fullWidth onChange={this.update('phone')}/>
        </div>
        <div>
          <TextField label="Your Enquiry" multiline rows="6" required margin="normal" fullWidth 
            onChange={this.update('enquiry')}/>
        </div>
        <ButtonContainer>
          <Button variant="contained" onClick={this.submitForm}>Submit</Button>
        </ButtonContainer>
      </Form>
    );
  }
}
