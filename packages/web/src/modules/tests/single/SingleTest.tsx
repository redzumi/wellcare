import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useStore } from 'effector-react';
import { Empty, Spin } from 'antd';

import { $tests, fetchTests, saveTest, deleteTest } from 'store/tests';

import Paper from 'common/page/paper/Paper';
import EditableTest from '../editable/EditableTest';

const CreateTest = () => {
  const { id } = useParams();
  const history = useHistory();
  const { ready, data: tests } = useStore($tests);
  const currentTest = tests.find((test) => test.id === id);

  useEffect(() => {
    if (!ready) {
      fetchTests();
    }
  }, [ready]);

  const handleSave = async (value: Test) => {
    saveTest(value);
  };

  const handleDelete = async (value: Test) => {
    await deleteTest(value);
    history.push('/tests');
  };

  if (!ready) {
    return <Spin spinning />;
  }

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
