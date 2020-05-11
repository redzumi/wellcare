import React, { useState, useEffect } from 'react';
import { Row, Col, Space, Spin, Divider } from 'antd';
import { useStore } from 'effector-react';
import { useParams, Redirect } from 'react-router-dom';
import { Store } from 'antd/lib/form/interface';

import { $ui } from 'store/ui';
import { $surveys, fetchSurveys } from 'store/surveys';
import { sendSurveyQA } from 'store/surveysActions';

import Paper from 'common/page/paper/Paper';
import SurveyReason from './SurveyReason';
import SurveyProgress from './SurveyProgress';

import styles from './styles.styl';
import SurveyQuestionCard from './SurveyQuestionCard';

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

  if (!currQuestion) {
    return <Redirect to={`/surveys/finish/${id}`} />;
  }

  const handleMoveToNextQuestion = async (values: Store) => {
    await sendSurveyQA({
      survey: currentSurvey,
      question: currQuestion.feature,
      answer: values.answer
    });
    setCurrentIndex(currentIndex + 1);
  };

  return (
    <Paper>
      <Space direction="vertical" size="large" className={styles.questions}>
        <SurveyProgress
          media={media}
          currentIndex={currentIndex}
          questions={questions}
        />
        <Row justify="center">
          <Col span={media === UIMedia.Mobile ? 24 : 12}>
            <SurveyQuestionCard
              question={currQuestion}
              onComplete={handleMoveToNextQuestion}
            />
            <Divider dashed />
          </Col>
        </Row>
      </Space>
    </Paper>
  );
};

export default SurveyQuestions;
