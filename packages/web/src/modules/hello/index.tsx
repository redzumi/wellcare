import React from 'react';
import { Button, DatePicker } from 'antd';
import { useStore } from 'effector-react';

import { $ui } from 'store/ui';

import Page from 'common/page';

const Hello = () => {
  const ui = useStore($ui);

  return (
    <Page media={ui.media}>
      Hello from wellcare
      {ui.media}
      <DatePicker />
      <Button type="primary" style={{ marginLeft: 8 }}>
        Primary Button
      </Button>
    </Page>
  );
};

export default Hello;
