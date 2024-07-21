import { ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useActions from '../../hooks/useActions';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Movies } from '../../utils/apiResponse';
import { RootState } from '../../store/store';
import { useGetMoviesQuery } from '../../store/api';
import Spinner from '../Spinner';

import noMovieImg from '../../assets/no-image.svg';
import favMovie from '../../assets/fav.svg';
import noFavMovie from '../../assets/no-fav.svg';
import './style.scss';

const Card = (): ReactElement => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchTermLS] = useLocalStorage();
  const { toggleSelected, updateTotalResults } = useActions();
  const selected = useSelector((state: RootState) => state.selected);
  const searchWord = useSelector((state: RootState) => state.search.searchWord);
  const pageString = useSelector((state: RootState) => state.search.page);

  const { data, isLoading } = useGetMoviesQuery({
    searchTerm,
    page: pageString,
  });

  if (data) {
    updateTotalResults(data.totalResults);
  }

  const isExist = (item: string): boolean => {
    return selected.includes(item);
  };

  useEffect(() => {
    setSearchTerm(searchWord);
  }, [searchWord]);

  useEffect(() => {
    if (searchTermLS) {
      setSearchTerm(searchTermLS);
    }
  }, [searchTermLS]);

  const content = isLoading ? (
    <Spinner />
  ) : (
    <div className="card card__wrapper">
      {data.Search?.map(({ imdbID, Title, Poster, Year }: Movies) => (
        <div className="card__item" key={imdbID}>
          <button
            type="button"
            className="card__button button"
            onClick={() => toggleSelected(imdbID)}
          >
            <img
              src={isExist(imdbID) ? favMovie : noFavMovie}
              alt="selected movie"
            />
          </button>
          <Link to={`movie/${imdbID}`}>
            <img
              className="card__img"
              src={Poster === 'N/A' ? noMovieImg : Poster}
              alt={Title}
            />
            <p>{Year}</p>
            <h3>{Title}</h3>
          </Link>
        </div>
      ))}
    </div>
  );

  return content;
};

export default Card;
