import React, { useState } from 'react';
import { Divider } from 'antd';

import DataForm from './DataForm';
import QuestionsTable from './QuestionsTable';

type Props = {
  survey: Survey;
  onSave: (value: Survey) => void;
  onDelete?: (value: Survey) => void;
};

const EditableSurvey = (props: Props) => {
  const { survey, onSave, onDelete } = props;
  const [value, setValue] = useState<Survey>(survey);
  const { id, name, description, questions } = value;

  const handleDataChange = (data: { name: string; description: string }) => {
    setValue({ ...value, ...data });
  };

  const handleQuestionsChange = (data: Question[]) => {
    setValue({ ...value, questions: data });
  };

  const handleFinish = () => onSave(value);
  const handleDelete = () => onDelete && onDelete(value);

  return (
    <React.Fragment>
      <DataForm
        id={id}
        name={name}
        description={description}
        onChange={handleDataChange}
        onSave={handleFinish}
        onDelete={handleDelete}
      />
      <Divider dashed />
      <QuestionsTable questions={questions} onChange={handleQuestionsChange} />
    </React.Fragment>
  );
};

export default EditableSurvey;
