import React, { useState } from 'react';
import styles from './style.module.css';
import {
  Form,
  Button,
  Navbar,
  Row,
  Col,
  Container,
  FormControl,
  InputGroup,
} from 'react-bootstrap';

export default function ApiPicker(props) {
  const [api, setApi] = useState('https://cse341-contacts.herokuapp.com');
  const onSubmit = (event) => {
    event.preventDefault();
    props.setHandler(api);
  };
  return (
    <Navbar expand='lg'>
      <Container fluid>
        <Row className={styles.full}>
          <Navbar.Toggle aria-controls='navbarScroll' />
          <Navbar.Collapse id='navbarScroll'>
            <Col>
              <p className={styles.urlDesc}>
                Insert your API URL for this frontend application to work. For
                example: (https://cse341-contacts.herokuapp.com)
              </p>
            </Col>
            <Col>
              <Form className='d-flex' onSubmit={onSubmit}>
                <InputGroup>
                  <FormControl
                    type='url'
                    aria-label='api-url'
                    value={api}
                    onChange={(e) => setApi(e.target.value)}
                    className={styles.longInput}
                  />
                  <InputGroup.Text
                    id='btnGroupAddon2'
                    type='submit'
                    onClick={onSubmit}>
                    Go
                  </InputGroup.Text>
                </InputGroup>
              </Form>
            </Col>
          </Navbar.Collapse>
        </Row>
      </Container>
    </Navbar>
    // <div className='d-flex d-flex justify-content-center'>
    //   <p>
    //     For this frontend application to work, please enter your API url below.{' '}
    //   </p>
    //   <Form onSubmit={onSubmit}>
    //     <Form.Group className='mb-3' controlId='formBasicEmail'>
    //       <Form.Label>API URL</Form.Label>
    //       <Form.Control
    //         value={api}
    //         onChange={(e) => setApi(e.target.value)}
    //         type='url'
    //         placeholder='Your API URL'
    //       />
    //       <Form.Text className='text-muted'>
    //         Please enter your API URL, for example:
    //         https://cse341-contacts.herokuapp.com
    //       </Form.Text>
    //     </Form.Group>
    //     <Button variant='primary' type='submit'>
    //       Submit
    //     </Button>
    //   </Form>
    // </div>
  );
}
