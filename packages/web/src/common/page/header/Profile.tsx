import React from 'react';
import { Popover, Button, Menu } from 'antd';
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { logoutUser } from 'store/session';

import styles from './styles.styl';

const Profile = () => {
  const handleLogout = () => logoutUser();

  const menu = (
    <Menu className={styles.profileMenu}>
      <Menu.Item key="0" icon={<UserOutlined />}>
        Профиль
      </Menu.Item>
      <Menu.Item key="1" icon={<SettingOutlined />}>
        Настройки
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" onClick={handleLogout} icon={<LogoutOutlined />}>
        Выйти
      </Menu.Item>
    </Menu>
  );

  return (
    <Popover placement="bottomRight" content={menu} trigger="click">
      <Button icon={<UserOutlined />} />
    </Popover>
  );
};

export default Profile;
