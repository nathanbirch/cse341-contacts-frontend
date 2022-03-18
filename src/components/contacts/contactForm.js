import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import styles from './style.module.css';

export default function ContactForm(props) {
  const save = () => {
    const c = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      email: email.current.value,
      favoriteColor: favoriteColor.current.value,
      birthday: birthday.current.value,
    };
    props.saveHandler(c);
  };
  const firstName = React.createRef();
  const lastName = React.createRef();
  const email = React.createRef();
  const favoriteColor = React.createRef();
  const birthday = React.createRef();
  return (
    <div>
      {!props.edit && <h2>Create New Contact</h2>}
      <Row>
        <Form>
          <Form.Group className='mb-3' controlId='formFirstName'>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type='text'
              defaultValue={props.contact.firstName}
              className={styles.regularInput}
              ref={firstName}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formLastName'>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type='text'
              defaultValue={props.contact.lastName}
              className={styles.regularInput}
              ref={lastName}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formEmail'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              defaultValue={props.contact.email}
              className={styles.regularInput}
              ref={email}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formColor'>
            <Form.Label>Favorite Color</Form.Label>
            <Form.Control
              type='text'
              defaultValue={props.contact.favoriteColor}
              className={styles.regularInput}
              ref={favoriteColor}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formColor'>
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              type='text'
              defaultValue={props.contact.birthday}
              className={styles.regularInput}
              ref={birthday}
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
