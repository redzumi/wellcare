import React, { useState, useEffect } from 'react';
import { Card, Spin, Descriptions, Button, Space } from 'antd';
import { useParams } from 'react-router-dom';
import { useStore } from 'effector-react';

import { $surveys, fetchSurveys } from 'store/surveys';
import { beginSurveyQA } from 'store/surveysActions';

import Paper from 'common/page/paper/Paper';
import SurveyQuestions from './SurveyQuestions';

import styles from './styles.styl';

const BeginSurvey = () => {
  const { id } = useParams();
  const { ready, data: surveys } = useStore($surveys);
  const currentSurvey = surveys.find((survey) => survey.id === id);

  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    if (!ready) {
      fetchSurveys();
    }
  }, [ready]);

  if (!currentSurvey) {
    return <Spin spinning />;
  }

  const handleStart = async () => {
    setIsStarted(true);
    await beginSurveyQA(currentSurvey);
  };

  if (isStarted) {
    return <SurveyQuestions />;
  }

  return (
    <Paper>
      <Space align="center" direction="vertical" size="middle">
        <Card
          title={currentSurvey?.name}
          bordered={false}
          className={styles.card}
        >
          <Descriptions layout="vertical">
            <Descriptions.Item>
              <p className={styles.description}>{currentSurvey?.description}</p>
            </Descriptions.Item>
          </Descriptions>
        </Card>
        <Button type="primary" onClick={handleStart}>
          Начать
        </Button>
      </Space>
    </Paper>
  );
};

export default BeginSurvey;
