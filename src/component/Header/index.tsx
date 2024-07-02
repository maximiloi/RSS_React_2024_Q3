import { Component, ChangeEvent } from 'react';
import Search from '../Search';

import './style.scss';

interface Props {
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

class Header extends Component<Props> {
  render() {
    const { onSearchChange } = this.props;

    return (
      <header className="header">
        <h1 className="header__title">Hello, RSS React student</h1>
        <Search onSearchChange={onSearchChange} />
      </header>
    );
  }
}

export default Header;
