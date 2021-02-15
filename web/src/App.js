import React from 'react';
import './style.css';
import { Container, Col } from 'reactstrap';

import Routes from './routes';

function App() {
  return (
      <div className="app">
        <Container className="d-flex col-6 root mt-5 Root" fluid>
            <Col>
                <Routes />
            </Col>
        </Container>
      </div>
  );
}

export default App;
