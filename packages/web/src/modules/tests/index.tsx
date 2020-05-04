import React, { useEffect } from 'react';
import { Row, Col, Space, Empty, Button, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useStore } from 'effector-react';

import { $ui } from 'store/ui';
import { $tests, fetchTests } from 'store/tests';
import Paper from 'common/page/paper/Paper';

import Card from './card/Card';

import styles from './styles.styl';

const Tests = () => {
  const history = useHistory();
  const ui = useStore($ui);
  const tests = useStore($tests);

  const handleCreateClick = () => history.push('/tests/new');
  const handleTestClick = (id: string) => () => history.push(`/tests/${id}`);

  useEffect(() => {
    fetchTests();
  }, []);

  return (
    <Paper title="Тесты">
      {tests.ready ? (
        <React.Fragment>
          <Row>
            <Col>
              <Button
                type="primary"
                onClick={handleCreateClick}
                icon={<PlusOutlined />}
              >
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
                    <Card
                      key={test.id}
                      title={test.name}
                      description={test.description}
                      onClick={handleTestClick(test.id)}
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
