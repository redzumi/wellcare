import React, { useState, useEffect } from 'react';
import { Card, Spin, Descriptions, Button, Space, Row, Empty } from 'antd';
import { useParams } from 'react-router-dom';
import { useStore } from 'effector-react';

import { $surveys, fetchSurveys } from 'store/surveys';
import { beginSurveyQA } from 'store/surveys/actions';
import CovidIcon from 'common/icons/covid/CovidIcon';
import HealthIcon from 'common/icons/health/HealthIcon';

import Paper from 'common/page/paper/Paper';
import SurveyQuestions from './SurveyQuestions';

import styles from './styles.styl';

// TODO: from backend
const getIconByTitle = (title: string) => {
  if (title.toLowerCase().includes('коронавирус')) {
    return (
      <Row justify="center" style={{ paddingTop: 16 }}>
        <CovidIcon />
      </Row>
    );
  }

  if (title.toLowerCase().includes('здоровье')) {
    return (
      <Row justify="center" style={{ paddingTop: 16 }}>
        <HealthIcon />
      </Row>
    );
  }

  return <Empty />;
};

const BeginSurvey = () => {
  const { id } = useParams();
  const { ready, data: surveys } = useStore($surveys);
  const currentSurvey = surveys.find((survey) => survey.id === id);

  // TODO: save current state in localStorage / db
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
      <Space align="center" direction="vertical" size="small">
        <Card
          title={currentSurvey?.name}
          bordered={false}
          className={styles.card}
          cover={getIconByTitle(currentSurvey?.name)}
        >
          <Descriptions layout="vertical">
            <Descriptions.Item>
              <p className={styles.description}>{currentSurvey?.description}</p>
            </Descriptions.Item>
          </Descriptions>
        </Card>
        <Button type="primary" size="large" onClick={handleStart}>
          Начать
        </Button>
      </Space>
    </Paper>
  );
};

export default BeginSurvey;
