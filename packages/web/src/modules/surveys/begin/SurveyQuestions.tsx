import React, { useState } from 'react';
import { Space, Card, Checkbox, Button } from 'antd';
import Paper from 'common/page/paper/Paper';
import { useStore } from 'effector-react';
import { $surveys } from 'store/surveys';

import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useHistory, useParams } from 'react-router-dom';

const SurveyQuestions = () => {
  const { id } = useParams();
  const history = useHistory();
  const { ready, data: surveys } = useStore($surveys);
  const currentSurvey = surveys.find((survey) => survey.id === id);

  const [currQuestion, setCurrQuestion] = useState(1);

  const handleMoveToNextQuestion = () => {
    setCurrQuestion(currQuestion + 1);
  };

  return (
    <Paper>
      <Space align="center" direction="vertical" size="middle">
        <Card title={currentSurvey?.questions[currQuestion].name}>
          {currentSurvey?.questions[currQuestion].answers.map((value) => (
            <Checkbox>{value.name}</Checkbox>
          ))}
          <Button type="primary" onClick={handleMoveToNextQuestion}>
            Дальше
          </Button>
        </Card>
        {currQuestion}/{currentSurvey?.questions.length}
      </Space>
    </Paper>
  );
};

export default SurveyQuestions;
