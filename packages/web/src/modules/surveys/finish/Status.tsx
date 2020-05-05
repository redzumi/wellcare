import React from 'react';
import { Space, Card, Statistic } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';

const Status = () => {
  return (
    <Space>
      <Card>
        <Statistic
          title="Заболело"
          value={9.3}
          precision={2}
          valueStyle={{ color: '#cf1322' }}
          prefix={<ArrowUpOutlined />}
          suffix=".тыс"
        />
      </Card>
      <Card>
        <Statistic
          title="Выздоровело"
          value={11.28}
          precision={2}
          valueStyle={{ color: '#3f8600' }}
          prefix={<ArrowUpOutlined />}
          suffix=".тыс"
        />
      </Card>
    </Space>
  );
};

export default Status;
