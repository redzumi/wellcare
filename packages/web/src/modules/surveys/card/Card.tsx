import React from 'react';
import { Descriptions, Empty, Card } from 'antd';

type Props = {
  title: string;
  description: string;
  onClick: () => void;
};

const SurveyCard = (props: Props) => {
  const { title, description, onClick } = props;

  return (
    <Card title={title} bordered hoverable onClick={onClick}>
      <Empty />
      <Descriptions layout="vertical">
        <Descriptions.Item>{description}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default SurveyCard;
