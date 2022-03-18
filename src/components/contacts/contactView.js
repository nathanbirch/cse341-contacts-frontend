import React, { useState } from 'react';
import styles from './style.module.css';
import { FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';
import { Row, Col } from 'react-bootstrap';
import ContactForm from './contactForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  const updateContact = async (nContact) => {
    const updateRoute = props.api + '/contacts/' + props.contact._id;
    const c = {
      firstName: nContact.firstName,
      lastName: nContact.lastName,
      email: nContact.email,
      favoriteColor: nContact.favoriteColor,
      birthday: nContact.birthday,
    };
    try {
      await fetch(updateRoute, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(c),
      });
      toast.success('Contact Edited');
      props.updateHandler(c, props.contactIndex);
      setShowForm(false);
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong');
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
      .then(() => {
        toast.success('Delete Successful');
        props.deleteHandler();
      })
      .catch((err) => {
        toast.error('Something went wrong');
      });
  };
  return (
    <div className='text-center'>
      <ToastContainer />
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
        <Col className={styles.iconContainer} onClick={startEditing}>
          <FaRegEdit />
        </Col>
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
