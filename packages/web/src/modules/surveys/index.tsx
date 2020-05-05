import React, { useEffect } from 'react';
import { Row, Col, Space, Empty, Button, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useStore } from 'effector-react';
import chunk from 'lodash.chunk';

import { $ui } from 'store/ui';
import { $surveys, fetchSurveys } from 'store/surveys';
import Paper from 'common/page/paper/Paper';

import Card from './card/Card';

import styles from './styles.styl';

const Surveys = () => {
  const history = useHistory();
  const ui = useStore($ui);
  const surveys = useStore($surveys);

  const handleCreateClick = () => history.push('/surveys/new');
  const handleSurveyClick = (id: string) => () =>
    history.push(`/surveys/${id}`);

  useEffect(() => {
    fetchSurveys();
  }, []);

  return (
    <Paper title="Опросы">
      {surveys.ready ? (
        <React.Fragment>
          <Row>
            <Col>
              <Button
                type="primary"
                onClick={handleCreateClick}
                icon={<PlusOutlined />}
              >
                Создать опрос
              </Button>
            </Col>
          </Row>
          <Space direction="vertical" size="large">
            {surveys.data.length ? (
              chunk(surveys.data, 2).map((row) => (
                <Row key={JSON.stringify(row)} gutter={[16, 16]}>
                  <Space
                    align="start"
                    direction={
                      ui.media === UIMedia.Mobile ? 'vertical' : 'horizontal'
                    }
                    size="middle"
                  >
                    {row.map((survey) => (
                      <Card
                        key={survey.id}
                        id={survey.id}
                        title={survey.name}
                        description={survey.description}
                        onClick={handleSurveyClick(survey.id)}
                      />
                    ))}
                  </Space>
                </Row>
              ))
            ) : (
              <div className={styles.empty}>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              </div>
            )}
          </Space>
        </React.Fragment>
      ) : (
        <Spin spinning />
      )}
    </Paper>
  );
};

export default Surveys;
