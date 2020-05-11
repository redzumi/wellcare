import React, { useState, useEffect } from 'react';
import { Row, Col, Space, Spin, Divider } from 'antd';
import { useStore } from 'effector-react';
import { useParams, Redirect } from 'react-router-dom';
import { Store } from 'antd/lib/form/interface';

import { $ui } from 'store/ui';
import { $surveys, fetchSurveys } from 'store/surveys';
import { sendSurveyQA } from 'store/surveys/actions';
import { $reasons, fetchReasonReactions } from 'store/surveys/reasons';
import { $session } from 'store/session';

import Paper from 'common/page/paper/Paper';
import SurveyReason from './SurveyReason';
import SurveyProgress from './SurveyProgress';

import styles from './styles.styl';
import SurveyQuestionCard from './SurveyQuestionCard';

const SurveyQuestions = () => {
  const { id } = useParams();

  const { media } = useStore($ui);
  const reasons = useStore($reasons);
  const { user } = useStore($session);
  const { ready, data: surveys } = useStore($surveys);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentSurvey = surveys.find((survey) => survey.id === id);

  useEffect(() => {
    if (!ready) {
      fetchSurveys();
    }
  }, [ready]);

  useEffect(() => {
    if (!reasons.surveys[id]) {
      fetchReasonReactions(id);
    }
  }, [reasons.surveys]);

  if (!currentSurvey || !ready) {
    return (
      <Paper>
        <Spin spinning />
      </Paper>
    );
  }

  const { questions } = currentSurvey;
  const currQuestion = questions[currentIndex];

  if (!currQuestion || !user) {
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
            {currQuestion.reason && (
              <SurveyReason
                key={currQuestion.feature}
                id={id}
                user={user}
                feature={currQuestion.feature}
                reactions={reasons.surveys[id]}
                text={currQuestion.reason}
              />
            )}
          </Col>
        </Row>
      </Space>
    </Paper>
  );
};

export default SurveyQuestions;
