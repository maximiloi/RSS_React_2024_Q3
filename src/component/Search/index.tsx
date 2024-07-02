import { Component, ChangeEvent } from 'react';

import './style.scss';

interface InputValueState {
  inputValue: string;
}

interface InputValueProps {
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

class Search extends Component<InputValueProps, InputValueState> {
  constructor(props: InputValueProps) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  handleSearch = () => {
    const { onSearchChange } = this.props;
    const { inputValue } = this.state;

    onSearchChange({
      target: {
        value: inputValue,
      },
    } as ChangeEvent<HTMLInputElement>);

    if (inputValue) {
      localStorage.setItem('name-cinema-iloi', inputValue);
    }
  };

  handleKeyPress = ({ key }: { key: string }) => {
    if (key === 'Enter') {
      this.handleSearch();
    }
  };

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: event.target.value });
  };

  render() {
    const { inputValue } = this.state;

    return (
      <div className="search">
        <input
          type="text"
          className="search__input"
          placeholder="search movie..."
          value={inputValue}
          onChange={this.handleInputChange}
          onKeyDown={this.handleKeyPress}
        />
        <button
          type="submit"
          className="search__button"
          onClick={this.handleSearch}
        >
          search
        </button>
      </div>
    );
  }
}

export default Search;
