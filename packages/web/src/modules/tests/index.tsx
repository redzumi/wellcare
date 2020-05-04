import React, { useEffect } from 'react';
import { Row, Col, Space, Empty, Button, Spin } from 'antd';
import { useHistory } from 'react-router-dom';
import { useStore } from 'effector-react';

import { $ui } from 'store/ui';
import { $tests, fetchTests } from 'store/tests';
import Paper from 'common/page/paper/Paper';

import TestCard from './card/TestCard';

import styles from './styles.styl';

const Tests = () => {
  const history = useHistory();
  const ui = useStore($ui);
  const tests = useStore($tests);

  const handleCreateClick = () => history.push('/tests/new');

  useEffect(() => {
    fetchTests();
  }, []);

  return (
    <Paper title="Тесты">
      {tests.ready ? (
        <React.Fragment>
          <Row>
            <Col>
              <Button type="primary" onClick={handleCreateClick}>
                Создать тест
              </Button>
            </Col>
          </Row>
          <Row>
            {tests.data.length ? (
              <Col>
                <Space
                  direction={
                    ui.media === UIMedia.Mobile ? 'vertical' : 'horizontal'
                  }
                  size="middle"
                >
                  {tests.data.map((test) => (
                    <TestCard
                      key={test.id}
                      title={test.name}
                      description={test.description}
                    />
                  ))}
                </Space>
              </Col>
            ) : (
              <div className={styles.empty}>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              </div>
            )}
          </Row>
        </React.Fragment>
      ) : (
        <Spin spinning />
      )}
    </Paper>
  );
};

export default Tests;
