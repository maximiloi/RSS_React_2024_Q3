import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import useActions from '../../hooks/useActions';

import './style.scss';

const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState<string>('');
  const [, setSearchTerm] = useLocalStorage('');
  const { updateSearchWord, updatePage } = useActions();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchTerm(inputValue.trim());
    updateSearchWord(inputValue);
    searchParams.set('search', inputValue);
    updatePage('1');
    searchParams.set('page', '1');

    navigate(`?${searchParams.toString()}`);
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
};

export default Search;
