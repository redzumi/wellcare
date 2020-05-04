import React from 'react';
import { Row, Col, Button } from 'antd';
import { useHistory } from 'react-router-dom';

import Paper from 'common/page/paper/Paper';
import Item from './item/Item';
import { TESTS } from './data';

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
      <Row>
        <Col>
          {TESTS.map((test) => (
            <Item
              title={test.title}
              description={test.description}
              key={test.title}
            />
          ))}
        </Col>
      </Row>
    </Paper>
  );
};

export default Tests;
