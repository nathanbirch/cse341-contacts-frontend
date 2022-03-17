import React, { useState } from 'react';
import styles from './style.module.css';
import { FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';
import { Row, Col } from 'react-bootstrap';
import ContactForm from './contactForm';

export default function ContactView(props) {
  const [showForm, setShowForm] = useState(false);
  const [newContact, setNewContact] = useState(null);
  const startEditing = () => {
    setNewContact(JSON.parse(JSON.stringify(props.contact)));
    setShowForm(true);
  };

  const cancelEdit = () => {
    setShowForm(false);
  };
  const updateContact = async () => {
    const updateRoute = props.api + '/contacts/' + props.contact._id;
    try {
      const response = await fetch(updateRoute, {
        method: 'PUT',
        body: JSON.stringify(newContact),
      });
      console.log(response.status);
      setShowForm(false);
    } catch (err) {
      console.log(err);
    }
  };
  const deleteContact = async () => {
    const deleteRoute = props.api + '/contacts/' + props.contact._id;
    fetch(deleteRoute, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };
  return (
    <div className='text-center'>
      <h1>
        {props.contact.firstName} {props.contact.lastName}{' '}
      </h1>
      {props.contact.phone && <h3>{props.contact.phone}</h3>}
      <h3>{props.contact.email}</h3>
      <ul className={styles.contactInfoUl}>
        <li>Favorite Color: {props.contact.favoriteColor}</li>
        <li>Birthday: {props.contact.birthday}</li>
      </ul>
      <Row className={`${styles.modifyIcons} text-center`}>
        {/* <Col className={styles.iconContainer} onClick={startEditing}>
          <FaRegEdit />
        </Col> */}
        <Col className={styles.iconContainer} onClick={deleteContact}>
          <FaRegTrashAlt />
        </Col>
      </Row>
      {showForm && (
        <ContactForm
          contact={newContact}
          edit={true}
          saveHandler={updateContact}
          cancelHandler={cancelEdit}
        />
      )}
    </div>
  );
}
