import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Space, Checkbox, Steps, Button, Spin } from 'antd';
import { useStore } from 'effector-react';
import { useParams, Redirect } from 'react-router-dom';

import { $ui } from 'store/ui';
import { $surveys, fetchSurveys } from 'store/surveys';

import Paper from 'common/page/paper/Paper';

import styles from './styles.styl';

const { Step } = Steps;

const SurveyQuestions = () => {
  const { id } = useParams();

  const { media } = useStore($ui);
  const { ready, data: surveys } = useStore($surveys);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentSurvey = surveys.find((survey) => survey.id === id);

  useEffect(() => {
    if (!ready) {
      fetchSurveys();
    }
  }, [ready]);

  if (!currentSurvey || !ready) {
    return (
      <Paper>
        <Spin spinning />
      </Paper>
    );
  }

  const { questions } = currentSurvey;

  const currQuestion = questions[currentIndex];
  const prevQuestion = questions[currentIndex - 1];
  const nextQuestion = questions[currentIndex + 1];

  const handleMoveToNextQuestion = () => {
    setCurrentIndex(currentIndex + 1);
  };

  if (!currQuestion) {
    return <Redirect to={`/surveys/finish/${id}`} />;
  }

  return (
    <Paper>
      <Space direction="vertical" size="large" className={styles.questions}>
        <Steps current={currentIndex} size="small">
          {prevQuestion && (
            <Step title={prevQuestion.name} description="asdasd" />
          )}
          <Step title={currQuestion.name} />
          <Step title={nextQuestion?.name || 'Результаты'} />
        </Steps>
        <Row justify="center">
          <Col span={media === UIMedia.Mobile ? 24 : 12}>
            <Card title={currQuestion.name}>
              {currQuestion.answers.map((answer: Answer) => (
                <Checkbox key={answer.feature}>{answer.name}</Checkbox>
              ))}
              <Button type="primary" onClick={handleMoveToNextQuestion}>
                Дальше
              </Button>
            </Card>
          </Col>
        </Row>
      </Space>
    </Paper>
  );
};

export default SurveyQuestions;
