import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useStore } from 'effector-react';
import { Empty } from 'antd';

import { $tests, saveTest, deleteTest } from 'store/tests';

import Paper from 'common/page/paper/Paper';
import EditableTest from '../editable/EditableTest';

const CreateTest = () => {
  const { id } = useParams();
  const history = useHistory();
  const { data: tests } = useStore($tests);
  const currentTest = tests.find((test) => test.id === id);

  const handleSave = async (value: Test) => {
    saveTest(value);
  };

  const handleDelete = async (value: Test) => {
    await deleteTest(value);
    history.push('/tests');
  };

  if (!currentTest) {
    return <Empty />;
  }

  return (
    <Paper title={currentTest.name}>
      <EditableTest
        test={currentTest}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </Paper>
  );
};
export default CreateTest;
