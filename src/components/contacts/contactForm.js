import React, { useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import styles from './style.module.css';

export default function ContactForm(props) {
  const [newContact] = useState(props.contact);
  const save = () => {
    if (props.edit) {
      props.saveHandler(newContact);
    } else {
      props.saveHandler(newContact);
    }
  };
  return (
    <div>
      {!props.edit && <h2>Create New Contact</h2>}
      <Row>
        <Form>
          <Form.Group className='mb-3' controlId='formFirstName'>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type='text'
              value={newContact.firstName}
              onChange={(e) => (newContact.firstName = e.target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formLastName'>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type='text'
              value={newContact.lastName}
              onChange={(e) => (newContact.lastName = e.target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formEmail'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              value={newContact.email}
              onChange={(e) => (newContact.email = e.target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formColor'>
            <Form.Label>Favorite Color</Form.Label>
            <Form.Control
              type='text'
              value={newContact.favoriteColor}
              onChange={(e) => (newContact.favoriteColor = e.target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formColor'>
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              type='text'
              value={newContact.birthday}
              onChange={(e) => (newContact.birthday = e.target.value)}
            />
          </Form.Group>
          <Row className={`${styles.modifyIcons} text-center`}>
            <Col className={styles.iconContainer} onClick={save}>
              Save
            </Col>
            <Col className={styles.iconContainer} onClick={props.cancelHandler}>
              Cancel
            </Col>
          </Row>
        </Form>
      </Row>
    </div>
  );
}
