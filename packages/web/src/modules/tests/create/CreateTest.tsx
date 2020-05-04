import React from 'react';
import { useHistory } from 'react-router-dom';

import { createTest } from 'store/tests';
import Paper from 'common/page/paper/Paper';

import EditableTest from '../editable/EditableTest';

const TEST: Test = {
  id: 'new',
  name: 'Тест на хорошую погоду',
  description: 'Это шаблон теста',
  questions: [
    {
      name: 'Как вам погода?',
      weight: 1,
      answers: []
    }
  ],
  reward: 1000
};

const CreateTest = () => {
  const history = useHistory();

  const handleSave = async (value: Test) => {
    await createTest(value);
    history.push('/tests');
  };

  return (
    <Paper title="Создать тест">
      <EditableTest test={TEST} onSave={handleSave} />
    </Paper>
  );
};
export default CreateTest;
