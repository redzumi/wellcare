import React, { useEffect } from 'react';
import { Result } from 'antd';
import { useParams } from 'react-router-dom';
import { useStore } from 'effector-react';

import { $surveys, fetchSurveys } from 'store/surveys';
import Paper from 'common/page/paper/Paper';

const FinishSurvey = () => {
  const { id } = useParams();

  const { ready, data: surveys } = useStore($surveys);
  const currentSurvey = surveys.find((survey) => survey.id === id);

  useEffect(() => {
    if (!ready) {
      fetchSurveys();
    }
  }, [ready]);

  return (
    <Paper>
      <Result
        status="success"
        title={`Вы успешно прошли: ${currentSurvey?.name}!`}
      />
    </Paper>
  );
};

export default FinishSurvey;
