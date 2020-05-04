import Home from 'modules/home';
import Tests from 'modules/tests';
import Recommends from 'modules/recommends';
import Articles from 'modules/articles';
import Etc from 'modules/etc';
import About from 'modules/about';
import Profile from 'modules/profile';

export const ROTES = [
  { name: 'Тесты', pathname: '/tests', module: Tests },
  { name: 'Рекомендации', pathname: '/recommends', module: Recommends },
  { name: 'Статьи', pathname: '/articles', module: Articles },
  { name: 'Прочее', pathname: '/etc', module: Etc },
  { name: 'О нас', pathname: '/about', module: About },
  { name: 'Профиль', pathname: '/profile', module: Profile },
  { name: 'Главная', pathname: '/', module: Home }
];
