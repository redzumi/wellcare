import React from 'react';
import { Descriptions, Empty, Card } from 'antd';

import styles from './styles.styl';

type Props = {
  title: string;
  description: string;
  key: string;
};

const TestsItem = (props: Props) => {
  const { title, description, key } = props;

  return (
    <Card title={title} bordered={false}>
      <div key={key}>
        <Empty className={styles.empty} />
        <Descriptions layout="vertical">
          <Descriptions.Item>{description}</Descriptions.Item>
        </Descriptions>
      </div>
    </Card>
  );
};

export default TestsItem;
