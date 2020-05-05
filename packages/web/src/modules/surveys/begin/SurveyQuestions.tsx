import React, { useState, useEffect } from 'react';
import { Space, Card, Checkbox, Button, Empty, Spin } from 'antd';
import Paper from 'common/page/paper/Paper';
import { useStore } from 'effector-react';
import { $surveys, fetchSurveys } from 'store/surveys';

import { useParams, Redirect } from 'react-router-dom';

const SurveyQuestions = () => {
  const { id } = useParams();

  const [currQuestion, setCurrQuestion] = useState(0);
  const { ready, data: surveys } = useStore($surveys);
  const currentSurvey = surveys.find((survey) => survey.id === id);

  useEffect(() => {
    if (!ready) {
      fetchSurveys();
    }
  }, [ready]);

  if (!currentSurvey && !ready) {
    return (
      <Paper>
        <Spin spinning />
      </Paper>
    );
  }

  if (!currentSurvey) {
    return (
      <Paper>
        <Empty />
      </Paper>
    );
  }

  const { questions } = currentSurvey;

  console.log(questions);

  const handleMoveToNextQuestion = () => {
    setCurrQuestion(currQuestion + 1);
  };

  if (!questions[currQuestion]) {
    return <Redirect to={`/surveys/finish/${id}`} />;
  }

  return (
    <Paper>
      <Space align="center" direction="vertical" size="middle">
        <Card title={questions[currQuestion].name}>
          {questions[currQuestion].answers.map((answer: Answer) => (
            <Checkbox key={answer.feature}>{answer.name}</Checkbox>
          ))}
          <Button type="primary" onClick={handleMoveToNextQuestion}>
            Дальше
          </Button>
        </Card>
        {currQuestion}/{questions.length}
      </Space>
    </Paper>
  );
};

export default SurveyQuestions;
