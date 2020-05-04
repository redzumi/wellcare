import React from 'react';
import { Row, Col, Space, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { useStore } from 'effector-react';

import Paper from 'common/page/paper/Paper';
import { $ui } from 'store/ui';

import TestCard from './card/TestCard';
import { TESTS } from './data';

const Tests = () => {
  const history = useHistory();
  const ui = useStore($ui);

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
          <Space
            direction={ui.media === UIMedia.Mobile ? 'vertical' : 'horizontal'}
            size="middle"
          >
            {TESTS.map((test) => (
              <TestCard
                key={test.title}
                title={test.title}
                description={test.description}
              />
            ))}
          </Space>
        </Col>
      </Row>
    </Paper>
  );
};

export default Tests;
