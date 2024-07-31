import Search from '../Search';
import ErrorButton from '../ErrorButton';
import ThemeTogglerButton from '../ThemeTogglerButton';

import './style.scss';

const Header = () => {
  return (
    <header className="header">
      <h1 className="header__title">Hello, RSS React student</h1>
      <Search />
      <ErrorButton />
      <ThemeTogglerButton />
    </header>
  );
};

export default Header;
