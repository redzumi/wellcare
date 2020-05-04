import React from 'react';
import { Row, Col, Button } from 'antd';
import { useHistory } from 'react-router-dom';

import Paper from 'common/page/paper/Paper';

const Tests = () => {
  const history = useHistory();
  const handleCreateClick = () => history.push('/tests/new');

  return (
    <Paper title="Тесты">
      <Row>
        <Col>
          <Button type="primary" onClick={handleCreateClick}>
            Создать тест
          </Button>
        </Col>
      </Row>
    </Paper>
  );
};

export default Tests;
