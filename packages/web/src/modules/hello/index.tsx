import React from 'react';
import { Button, DatePicker } from 'antd';

import Page from 'common/page';

const Hello = () => {
  return (
    <Page>
      Hello from wellcare
      <DatePicker />
      <Button type="primary" style={{ marginLeft: 8 }}>
        Primary Button
      </Button>
    </Page>
  );
};

export default Hello;
