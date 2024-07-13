import React, { useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';

import './style.scss';

function Search() {
  const [inputValue, setInputValue] = useState<string>('');
  const [, setValue] = useLocalStorage();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValue(inputValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <form className="search" onSubmit={handleSearch}>
      <input
        type="text"
        className="search__input"
        placeholder="search movie..."
        value={inputValue}
        onChange={handleInputChange}
      />
      <button type="submit" className="search__button">
        search
      </button>
    </form>
  );
}

export default Search;
