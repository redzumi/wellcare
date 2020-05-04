import React from 'react';
import { Empty } from 'antd';
import { useParams } from 'react-router-dom';

const Tests = () => {
  const params = useParams();

  return (
    <React.Fragment>
      {JSON.stringify(params)}
      <Empty />
    </React.Fragment>
  );
};

export default Tests;
