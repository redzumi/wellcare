import React, { useState } from 'react';
import { Divider } from 'antd';

import DataForm from './DataForm';
import QuestionsTable from './QuestionsTable';

type Props = {
  test: Test;
  onChange: () => void;
};

const EditableTest = (props: Props) => {
  const { test } = props;
  const [value, setValue] = useState<Test>(test);
  const { id, name, description, questions } = value;

  const handleQuestionsChange = (data: Question[]) => {
    setValue({ ...value, questions: data });
  };

  const handleDataChange = (data: { name: string; description: string }) => {
    setValue({ ...value, ...data });
  };

  console.log(value);

  return (
    <React.Fragment>
      <DataForm
        id={id}
        name={name}
        description={description}
        onChange={handleDataChange}
      />
      <Divider dashed />
      <QuestionsTable questions={questions} onChange={handleQuestionsChange} />
    </React.Fragment>
  );
};

export default EditableTest;
