import React from 'react';
import { Button, DatePicker } from 'antd';

const Hello = () => {
  return (
    <div>
      Hello from wellcare
      <DatePicker />
      <Button type="primary" style={{ marginLeft: 8 }}>
        Primary Button
      </Button>
    </div>
  );
};

export default Hello;
