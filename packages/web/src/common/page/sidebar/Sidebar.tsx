import React from 'react';
import { Layout } from 'antd';

import Menu from '../menu/Menu';
import Logo from '../logo/Logo';

type Props = {
  collapsed: boolean;
};

const { Sider } = Layout;

const PageSidebar = (props: Props) => {
  const { collapsed } = props;

  return (
    <Sider
      collapsed={collapsed}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        borderRight: '1px solid #f0f0f0'
      }}
    >
      <Logo />
      <Menu />
    </Sider>
  );
};

export default PageSidebar;
