import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

import ChartWrapper from './ChartWrapper';

const App = () => {
  return (
    <>
      <Navbar bg="light">
        <Navbar.Brand>React D3 js</Navbar.Brand>
      </Navbar>
      <Container>
        <ChartWrapper />
      </Container>
    </>
  );
};

export default App;
