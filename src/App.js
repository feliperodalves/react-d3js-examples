import React, { useState } from 'react';
import { Col, Container, Navbar, Row } from 'react-bootstrap';

import ChartWrapper from './ChartWrapper';
import GenderDropdown from './GenderDropdown';

const App = () => {
  const [genderSelected, setGenderSelected] = useState('men');

  return (
    <>
      <Navbar bg="light">
        <Navbar.Brand>React D3 js</Navbar.Brand>
      </Navbar>
      <Container>
        <Container>
          <Row>
            <Col xs={12}>
              <GenderDropdown value={genderSelected} handleChange={setGenderSelected} />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <ChartWrapper gender={genderSelected} />
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default App;
