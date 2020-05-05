import React from 'react';
import { Popover, Button, Menu } from 'antd';
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import { logoutUser } from 'store/session';

import styles from './styles.styl';

const Profile = () => {
  const history = useHistory();

  const handleLogout = () => logoutUser();
  const handleProfileClick = () => history.push('/profile');

  const menu = (
    <Menu className={styles.profileMenu}>
      <Menu.Item key="0" icon={<UserOutlined />} onClick={handleProfileClick}>
        Профиль
      </Menu.Item>
      <Menu.Item
        key="1"
        icon={<SettingOutlined />}
        onClick={handleProfileClick}
      >
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
