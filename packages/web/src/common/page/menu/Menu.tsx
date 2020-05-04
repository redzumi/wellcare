import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'routes';

import styles from './styles.styl';

type Props = {
  withProfile?: boolean;
  horizontal?: boolean;
};

const PageMenu = (props: Props) => {
  const { horizontal } = props;
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const history = useHistory();
  const { location } = history;

  useEffect(() => setSelectedKeys([location.pathname]), [location]);

  const handleMenuClick = (pathname: string) => () => history.push(pathname);

  return (
    <Menu
      className={styles.menu}
      mode={horizontal ? 'horizontal' : 'vertical'}
      selectedKeys={selectedKeys}
    >
      {ROUTES.map((route) => (
        <Menu.Item
          key={route.pathname}
          icon={<route.icon />}
          onClick={handleMenuClick(route.pathname)}
        >
          {route.name}
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default PageMenu;
