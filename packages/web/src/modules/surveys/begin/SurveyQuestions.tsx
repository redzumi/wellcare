import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import { useStore } from 'effector-react';
import { useParams, Redirect } from 'react-router-dom';
import { Store } from 'antd/lib/form/interface';

import { $ui } from 'store/ui';
import { $surveys, fetchSurveys } from 'store/surveys';
import { sendSurveyQA } from 'store/surveys/actions';
import { $reasons, fetchReasonReactions } from 'store/surveys/reasons';
import { $session } from 'store/session';

import Paper from 'common/page/paper/Paper';
import SurveyQuestion from './SurveyQuestion';

const SurveyQuestions = () => {
  const { id } = useParams();

  const { user } = useStore($session);
  const { media } = useStore($ui);
  const { surveys: reactions } = useStore($reasons);
  const { ready, data: surveys } = useStore($surveys);

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentSurvey = surveys.find((survey) => survey.id === id);

  useEffect(() => {
    if (!ready) fetchSurveys();
  }, [ready]);

  useEffect(() => {
    if (!reactions[id]) fetchReasonReactions(id);
  }, [reactions]);

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
      <SurveyQuestion
        surveyId={currentSurvey.id}
        media={media}
        user={user}
        question={currQuestion}
        questions={questions}
        reaction={reactions[currentSurvey.id]}
        onComplete={handleMoveToNextQuestion}
      />
    </Paper>
  );
};

export default SurveyQuestions;
