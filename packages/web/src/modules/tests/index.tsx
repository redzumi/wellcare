import React from 'react';
import { useParams } from 'react-router-dom';

import Paper from 'common/page/paper/Paper';

const Tests = () => {
  const params = useParams();

  return <Paper title="Тесты">{JSON.stringify(params)}</Paper>;
};

export default Tests;
