import React, { useState } from 'react';
import { Row, Col } from 'antd';
import { useStore } from 'effector-react';
import { Redirect } from 'react-router-dom';

import Paper from 'common/page/paper/Paper';
import { $session } from 'store/session';

import Login from './Login';
import Register from './Register';

const Home = () => {
  const session = useStore($session);
  const [register, setRegister] = useState(false);

  const handleRegister = () => setRegister(true);

  return (
    <Paper title="Авторизация">
      <Row>
        <Col>
          {!register && <Login onRegister={handleRegister} />}
          {register && <Register />}
        </Col>
      </Row>
      {session.token && <Redirect to="/profile" />}
    </Paper>
  );
};

export default Home;
