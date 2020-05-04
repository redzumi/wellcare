import React from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from 'effector-react';
import { Empty } from 'antd';

import { $tests } from 'store/tests';

import Paper from 'common/page/paper/Paper';
import EditableTest from '../editable/EditableTest';

const CreateTest = () => {
  const { id } = useParams();
  const { data: tests } = useStore($tests);
  const currentTest = tests.find((test) => test.id === id);

  const handleSave = (value: Test) => {
    console.log(value);
  };

  if (!currentTest) {
    return <Empty />;
  }

  return (
    <Paper title={currentTest.name}>
      <EditableTest test={currentTest} onSave={handleSave} />
    </Paper>
  );
};
export default CreateTest;
