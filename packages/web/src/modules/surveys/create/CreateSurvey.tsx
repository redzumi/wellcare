import React from 'react';
import { useHistory } from 'react-router-dom';

import { createSurvey } from 'store/surveys';
import Paper from 'common/page/paper/Paper';

import EditableSurvey from '../editable/EditableSurvey';

const SURVEY: Survey = {
  id: 'new',
  name: 'Опрос на хорошую погоду',
  description: 'Это шаблон опрос',
  questions: [
    {
      name: 'Как вам погода?',
      weight: 1,
      answers: []
    }
  ],
  reward: 1000
};

const CreateSurvey = () => {
  const history = useHistory();

  const handleSave = async (value: Survey) => {
    await createSurvey(value);
    history.push('/surveys');
  };

  return (
    <Paper title="Создать опрос">
      <EditableSurvey survey={SURVEY} onSave={handleSave} />
    </Paper>
  );
};
export default CreateSurvey;
