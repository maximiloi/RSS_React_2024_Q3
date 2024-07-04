import { Component, ChangeEvent } from 'react';
import Search from '../Search';

import './style.scss';
import ErrorButton from '../ErrorButton';

type TProps = {
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

class Header extends Component<TProps> {
  render() {
    const { onSearchChange } = this.props;

    return (
      <header className="header">
        <h1 className="header__title">Hello, RSS React student</h1>
        <Search onSearchChange={onSearchChange} />
        <ErrorButton />
      </header>
    );
  }
}

export default Header;
