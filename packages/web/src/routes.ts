import Home from 'modules/home';
import Tests from 'modules/tests';
import Recommends from 'modules/recommends';
import Articles from 'modules/articles';
import Etc from 'modules/etc';
import About from 'modules/about';
import Profile from 'modules/profile';
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
  { name: 'Главная', pathname: '/', module: Home, icon: HomeOutlined },
  { name: 'Тесты', pathname: '/tests', module: Tests, icon: EyeOutlined },
  { name: 'Тесты', pathname: '/tests/:id', module: Tests, icon: EyeOutlined },
  {
    name: 'Рекомендации',
    pathname: '/recommends',
    module: Recommends,
    icon: CheckCircleOutlined
  },
  {
    name: 'Статьи',
    pathname: '/articles',
    module: Articles,
    icon: ReadOutlined
  },
  { name: 'Прочее', pathname: '/etc', module: Etc, icon: BarChartOutlined },
  { name: 'О нас', pathname: '/about', module: About, icon: CoffeeOutlined },
  {
    name: 'Профиль',
    pathname: '/profile',
    module: Profile,
    icon: UserOutlined
  }
];
