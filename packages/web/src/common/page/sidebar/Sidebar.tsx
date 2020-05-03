import React from 'react';
import { Layout } from 'antd';

import Menu from '../menu/Menu';

const { Sider } = Layout;

const PageSidebar = () => {
  return (
    <Sider
      collapsed
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0
      }}
    >
      <div className="logo" />
      <Menu />
    </Sider>
  );
};

export default PageSidebar;
