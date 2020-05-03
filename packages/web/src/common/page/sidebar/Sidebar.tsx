import React from 'react';
import { Layout } from 'antd';

import Menu from '../menu/Menu';
import Logo from '../logo/Logo';

import styles from './styles.styl';

type Props = {
  collapsed: boolean;
};

const { Sider } = Layout;

const PageSidebar = (props: Props) => {
  const { collapsed } = props;

  return (
    <Sider collapsed={collapsed} className={styles.sidebar}>
      <Logo />
      <Menu />
    </Sider>
  );
};

export default PageSidebar;
