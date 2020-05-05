import React from 'react';
import { Row } from 'antd';

type Props = {
  probability: number;
};

const SurveyResults = (props: Props) => {
  const { probability } = props;

  return <Row>Ваша группа риска: {probability}</Row>;
};

export default SurveyResults;
