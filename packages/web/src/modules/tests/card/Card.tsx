import React from 'react';
import { Descriptions, Empty, Card } from 'antd';

type Props = {
  title: string;
  description: string;
};

const TestCard = (props: Props) => {
  const { title, description } = props;

  return (
    <Card title={title} bordered hoverable>
      <Empty />
      <Descriptions layout="vertical">
        <Descriptions.Item>{description}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default TestCard;
