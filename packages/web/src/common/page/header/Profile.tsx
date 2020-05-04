import React from 'react';
import { Dropdown, Avatar, Menu } from 'antd';
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined
} from '@ant-design/icons';

import styles from './styles.styl';

const Profile = () => {
  const menu = (
    <Menu className={styles.profileMenu}>
      <Menu.Item key="0" icon={<UserOutlined />}>
        Профиль
      </Menu.Item>
      <Menu.Item key="1" icon={<SettingOutlined />}>
        Настройки
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" icon={<LogoutOutlined />}>
        Выйти
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown placement="bottomRight" overlay={menu} trigger={['click']}>
      <Avatar className={styles.avatar} icon={<UserOutlined />} />
    </Dropdown>
  );
};

export default Profile;
