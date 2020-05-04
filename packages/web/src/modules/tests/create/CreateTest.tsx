import React from 'react';

import Paper from 'common/page/paper/Paper';
import EditableTest from '../editable/EditableTest';

const TEST: Test = {
  id: 'new',
  name: 'Тестовый',
  description: 'Описание',
  questions: [
    {
      name: 'ВопросВопросВопрос ВопросВопрос ВопросВопрос Вопрос Вопрос 1',
      weight: 1,
      answers: []
    },
    {
      name: 'Вопрос 2',
      weight: 1,
      answers: []
    },
    {
      name: 'Вопрос 3',
      weight: 1,
      answers: []
    }
  ],
  reward: 1000
};

const CreateTest = () => {
  const handleChange = () => {
    console.log('changes by 2pac');
  };

  return (
    <Paper title="Создать тест">
      <EditableTest test={TEST} onChange={handleChange} />
    </Paper>
  );
};
export default CreateTest;
