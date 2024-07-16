import Search from '../Search';
import ErrorButton from '../ErrorButton';

import './style.scss';

function Header() {
  return (
    <header className="header">
      <h1 className="header__title">Hello, RSS React student</h1>
      <Search />
      <ErrorButton />
    </header>
  );
}

export default Header;
