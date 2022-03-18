import React, { useState, useEffect, useCallback } from 'react';
import styles from './style.module.css';
import ContactView from './contactView';
import { Col } from 'react-bootstrap';
import { css } from '@emotion/react';
import PuffLoader from 'react-spinners/PuffLoader';
import ContactForm from './contactForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ContactList(props) {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chosenContact, setChosenContact] = useState(null);
  const [chosenContactIndex, setChosenContactIndex] = useState(null);
  const [error, setError] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const displayForm = () => {
    setShowForm(true);
  };
  const cancelCreate = () => {
    setShowForm(false);
  };
  const createContact = (newContact) => {
    const postRoute = props.api + '/contacts';
    fetch(postRoute, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newContact),
    })
      .then((response) => response.json())
      .then(() => {
        toast.success('Contact Created');
        setShowForm(false);
        updateContactList(newContact, null);
      })
      .catch((err) => {
        toast.error('Something went wrong');
        console.log(err);
      });
  };

  const getContacts = useCallback(async () => {
    const getAllRoute = props.api + '/contacts';
    try {
      const response = await fetch(getAllRoute);
      const dbContacts = await response.json();
      setContacts(dbContacts);
      setLoading(false);
      setError(false);
    } catch (err) {
      setLoading(false);
      setError(true);
    }
  }, [props.api]);
  const updateContactList = (contact, index) => {
    const newContacts = [...contacts];
    if (contact) {
      if (index || index === 0) {
        newContacts[index] = contact;
      } else {
        newContacts.push(contact);
      }
    } else {
      newContacts.splice(index, 1);
    }
    setChosenContact(null);
    setContacts(newContacts);
  };
  const updateChosenContact = (contactIndex) => {
    setChosenContact(contacts[contactIndex]);
    setChosenContactIndex(contactIndex);
  };
  const removeChosenContact = () => {
    setChosenContact(null);
    updateContactList(null, chosenContactIndex);
  };
  const override = css`
    display: block;
    margin: 0 auto;
    bordergit branch-color: red;
  `;
  useEffect(() => {
    getContacts();
  }, [props.api, getContacts]);
  return (
    <>
      <ToastContainer />
      {loading && <PuffLoader color={'white'} css={override} size={80} />}
      {error && (
        <div>
          <p>
            It looks like we didn't find any data with your API url. Possible
            reasons for this could be:
          </p>
          <ul>
            <li>
              Your url is not in the correct format. It needs to look exactly
              like this: https://cse341-contacts.herokuapp.com
            </li>
            <li>There is a trailing "/" in your url or another typo</li>
            <li>
              Your API endpoints don't match the api contracts from the
              assignment. These can be found{' '}
              <a
                href='https://youtu.be/6SIACHzJe3g'
                target='_blank'
                rel='noopener noreferrer'>
                here
              </a>
              .
            </li>
            <li>You don't have any contacts in your database</li>
            <li>
              Your api endpoints don't work. You can test these with Rest Client
              in VS Code, or using your swagger documentation.
            </li>
          </ul>
        </div>
      )}
      {!error && contacts.length > 0 && (
        <Col sm={12} md={6}>
          <h2>
            Your Contacts
            {!showForm && (
              <div className={styles.plusIcon} onClick={displayForm}>
                Create New
              </div>
            )}
          </h2>
          <ul className={styles.contactsUl}>
            {contacts.map((contact, i) => {
              return (
                <li key={i}>
                  <span
                    onClick={() => {
                      updateChosenContact(i);
                    }}>
                    {contact.firstName} {contact.lastName}
                  </span>
                </li>
              );
            })}
          </ul>
        </Col>
      )}
      {(chosenContact || showForm) && (
        <Col sm={12} md={6}>
          {showForm ? (
            <ContactForm
              contact={{
                firstName: '',
                lastName: '',
                email: '',
                favoriteColor: '',
                birthday: '',
              }}
              saveHandler={createContact}
              cancelHandler={cancelCreate}
            />
          ) : (
            chosenContact && (
              <ContactView
                contact={chosenContact}
                contactIndex={chosenContactIndex}
                api={props.api}
                deleteHandler={removeChosenContact}
                updateHandler={updateContactList}
              />
            )
          )}
        </Col>
      )}
    </>
  );
}
