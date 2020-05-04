import Home from 'modules/home';
import Tests from 'modules/tests';
import CreateTest from 'modules/tests/create/CreateTest';
import SingleTest from 'modules/tests/single/SingleTest';
import Recommends from 'modules/recommends';
import Articles from 'modules/articles';
import Etc from 'modules/etc';
import About from 'modules/about';
import Profile from 'modules/profile';
import Login from 'modules/login';

import {
  HomeOutlined,
  BarChartOutlined,
  EyeOutlined,
  ReadOutlined,
  CheckCircleOutlined,
  CoffeeOutlined,
  UserOutlined
} from '@ant-design/icons';

export const ROUTES = [
  { pathname: '/', module: Home },
  { pathname: '/tests', module: Tests },
  { pathname: '/tests/new', module: CreateTest },
  { pathname: '/tests/:id', module: SingleTest },
  { pathname: '/recommends', module: Recommends },
  { pathname: '/articles', module: Articles },
  { pathname: '/etc', module: Etc },
  { pathname: '/about', module: About },
  { pathname: '/profile', module: Profile },
  { pathname: '/login', module: Login }
];

export const PAGES = [
  {
    name: 'Главная',
    pathname: '/',
    icon: HomeOutlined
  },
  {
    name: 'Профиль',
    pathname: '/profile',
    icon: UserOutlined,
    deviders: true
  },
  {
    name: 'Тесты',
    pathname: '/tests',
    icon: EyeOutlined
  },
  {
    name: 'Рекомендации',
    pathname: '/recommends',
    icon: CheckCircleOutlined
  },
  {
    name: 'Статьи',
    pathname: '/articles',
    icon: ReadOutlined
  },
  {
    name: 'Прочее',
    pathname: '/etc',
    icon: BarChartOutlined
  },
  {
    name: 'О нас',
    pathname: '/about',
    icon: CoffeeOutlined
  }
];
