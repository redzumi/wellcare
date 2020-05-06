import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useStore } from 'effector-react';
import { Empty, Spin, message } from 'antd';

import {
  $surveys,
  fetchSurveys,
  saveSurvey,
  deleteSurvey
} from 'store/surveys';

import Paper from 'common/page/paper/Paper';
import EditableSurvey from '../editable/EditableSurvey';

const CreateSurvey = () => {
  const { id } = useParams();
  const history = useHistory();
  const { ready, data: surveys } = useStore($surveys);
  const currentSurvey = surveys.find((survey) => survey.id === id);

  useEffect(() => {
    if (!ready) {
      fetchSurveys();
    }
  }, [ready]);

  const handleSave = async (value: Survey) => {
    await saveSurvey(value);
    message.success('Сохранено!');
  };

  const handleDelete = async (value: Survey) => {
    await deleteSurvey(value);
    history.push('/surveys');
  };

  if (!ready) {
    return <Spin spinning />;
  }

  if (!currentSurvey) {
    return <Empty />;
  }

  return (
    <Paper title={currentSurvey.name}>
      <EditableSurvey
        survey={currentSurvey}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </Paper>
  );
};
export default CreateSurvey;
