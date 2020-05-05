import Home from 'modules/home';

import Surveys from 'modules/surveys';
import CreateSurvey from 'modules/surveys/create/CreateSurvey';
import SingleSurvey from 'modules/surveys/single/SingleSurvey';

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

  { pathname: '/surveys', module: Surveys },
  { pathname: '/surveys/new', module: CreateSurvey },
  { pathname: '/surveys/:id', module: SingleSurvey },

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
    name: 'Опросы',
    pathname: '/surveys',
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
