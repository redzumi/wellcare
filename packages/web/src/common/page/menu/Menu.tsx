import React from 'react';
import { Menu } from 'antd';
import {
  HomeOutlined,
  BarChartOutlined,
  EyeOutlined,
  ReadOutlined,
  CheckCircleOutlined,
  CoffeeOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined
} from '@ant-design/icons';

import styles from './styles.styl';

type Props = {
  withProfile?: boolean;
  horizontal?: boolean;
};

const MENU = [
  {
    id: 1,
    name: 'Главная',
    icon: <HomeOutlined />
  },
  {
    id: 2,
    name: 'Тестирование',
    icon: <EyeOutlined />
  },
  {
    id: 3,
    name: 'Статьи',
    icon: <ReadOutlined />
  },
  {
    id: 4,
    name: 'Рекомендации',
    icon: <CheckCircleOutlined />
  },
  {
    id: 5,
    name: 'Прочее',
    icon: <BarChartOutlined />
  },
  {
    id: 6,
    name: 'О нас',
    icon: <CoffeeOutlined />
  }
];

const PageMenu = (props: Props) => {
  const { horizontal, withProfile } = props;

  // TODO: make menu better
  return (
    <Menu className={styles.menu} mode={horizontal ? 'horizontal' : 'vertical'}>
      {withProfile && (
        <Menu.Item key="profile" icon={<UserOutlined />}>
          Профиль
        </Menu.Item>
      )}
      {withProfile && <Menu.Divider />}
      {MENU.map((menu) => (
        <Menu.Item key={menu.id} icon={menu.icon}>
          {menu.name}
        </Menu.Item>
      ))}
      {withProfile && <Menu.Divider />}
      {withProfile && (
        <Menu.Item key="settings" icon={<SettingOutlined />}>
          Настройки
        </Menu.Item>
      )}
      {withProfile && (
        <Menu.Item key="logout" icon={<LogoutOutlined />}>
          Выйти
        </Menu.Item>
      )}
    </Menu>
  );
};

export default PageMenu;
