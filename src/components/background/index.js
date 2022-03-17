import React, { useState } from 'react';
import { Row, Container } from 'react-bootstrap';
import ApiPicker from '../apiPicker';
import Contacts from '../contacts';
import './style.module.css';

export default function Background() {
  const [api, setApi] = useState(null);
  const setApiState = (api) => {
    setApi(api);
  };
  return (
    <div className='d-flex flex-column justify-content-center w-100 h-100'>
      <Container>
        <ApiPicker api={api} setHandler={setApiState} />
        <Row>{api && <Contacts api={api} />}</Row>
      </Container>
    </div>
  );
}
