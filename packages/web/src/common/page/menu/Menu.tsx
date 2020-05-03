import React from 'react';
import { Menu } from 'antd';
import {
  HomeOutlined,
  BarChartOutlined,
  EyeOutlined,
  ReadOutlined,
  CheckCircleOutlined,
  CoffeeOutlined
} from '@ant-design/icons';

import styles from './styles.styl';

type Props = {
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
  const { horizontal } = props;

  return (
    <Menu className={styles.menu} mode={horizontal ? 'horizontal' : 'vertical'}>
      {MENU.map((menu) => (
        <Menu.Item key={menu.id} icon={menu.icon}>
          {menu.name}
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default PageMenu;
