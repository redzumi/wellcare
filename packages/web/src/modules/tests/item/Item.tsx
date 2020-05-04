import React from 'react';
import { Descriptions, Empty } from 'antd';

type Props = {
  title: string;
  description: string;
  key: string;
};

const Item = (props: Props) => {
  const { title, description, key } = props;

  return (
    <div key={key}>
      <Empty>
        <Descriptions title={title} layout="vertical">
          <Descriptions.Item>{description}</Descriptions.Item>
        </Descriptions>
      </Empty>
    </div>
  );
};

export default Item;
