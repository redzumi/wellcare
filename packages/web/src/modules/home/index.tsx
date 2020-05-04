import React, { useState } from 'react';
import { Row, Col } from 'antd';

import Paper from 'common/page/paper/Paper';

import Login from './Login';
import Register from './Register';

const Home = () => {
  const [register, setRegister] = useState(false);

  const handleRegister = () => setRegister(true);

  return (
    <Paper title="Главная">
      <Row>
        <Col>
          {!register && <Login onRegister={handleRegister} />}
          {register && <Register />}
        </Col>
      </Row>
    </Paper>
  );
};

export default Home;
