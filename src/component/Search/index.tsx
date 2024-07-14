import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';

import './style.scss';

function Search() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState<string>('');
  const [, setSearchTerm] = useLocalStorage('');

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchTerm(inputValue.trim());
    searchParams.set('search', inputValue);
    navigate(`?${searchParams.toString()}`);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    const query = searchParams.get('search');
    if (!query) return;
    setSearchTerm(query.trim());
    setInputValue(query);
  }, []);

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
