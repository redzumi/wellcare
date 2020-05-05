import Home from 'modules/home';

import Surveys from 'modules/surveys';
import CreateSurvey from 'modules/surveys/create/CreateSurvey';
import SingleSurvey from 'modules/surveys/single/SingleSurvey';
import BeginSurvey from 'modules/surveys/begin/BeginSurvey';
import FinishSurvey from 'modules/surveys/finish/FinishSurvey';

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
  { pathname: '/surveys/begin/:id', module: BeginSurvey },
  { pathname: '/surveys/finish/:id', module: FinishSurvey },

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
    icon: UserOutlined
  },
  {
    name: 'Опросы',
    pathname: '/surveys',
    icon: EyeOutlined,
    deviders: true
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
  }
];
