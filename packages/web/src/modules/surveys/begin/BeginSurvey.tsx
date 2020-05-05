import React, { useState } from 'react';
import { Card, Descriptions, Button, Space } from 'antd';
import { useParams } from 'react-router-dom';
import Paper from 'common/page/paper/Paper';

import { useStore } from 'effector-react';

import { $surveys } from 'store/surveys';

import SurveyQuestions from './SurveyQuestions';

import styles from './styles.styl';

const BeginSurvey = () => {
  const { id } = useParams();
  const { data: surveys } = useStore($surveys);
  const currentSurvey = surveys.find((survey) => survey.id === id);

  const [isStarted, setIsStarted] = useState(false);

  const handleStart = () => {
    setIsStarted(true);
  };

  if (!isStarted) {
    return (
      <Paper>
        <Space align="center" direction="vertical" size="middle">
          <Card
            title={currentSurvey?.name}
            bordered={false}
            className={styles.cardTitle}
          >
            <Descriptions layout="vertical">
              <Descriptions.Item>
                {currentSurvey?.description}
              </Descriptions.Item>
            </Descriptions>
          </Card>
          <Button type="primary" onClick={handleStart}>
            Начать
          </Button>
        </Space>
      </Paper>
    );
  }
  return <SurveyQuestions />;
};

export default BeginSurvey;
