import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useActions from '../../hooks/useActions';
import { Movies } from '../../utils/apiResponse';
import { RootState } from '../../store/store';
import { useGetMoviesQuery } from '../../store/api';
import Spinner from '../Spinner';

import noMovieImg from '../../assets/no-image.svg';
import favMovie from '../../assets/fav.svg';
import noFavMovie from '../../assets/no-fav.svg';
import './style.scss';

const Card: React.FC = () => {
  const { toggleSelected, updateTotalResults } = useActions();
  const selected = useSelector((state: RootState) => state.selected);
  const searchWord = useSelector((state: RootState) => state.search.searchWord);
  const page = useSelector((state: RootState) => state.search.page);

  const fetchData = useGetMoviesQuery({
    searchTerm: searchWord,
    page,
  });
  const { data, isLoading } = fetchData;

  useEffect(() => {
    if (data) {
      updateTotalResults(data.totalResults);
    }
  }, [data, updateTotalResults]);

  const isExist = (item: string): boolean => selected.includes(item);

  const renderMovies = () => {
    if (isLoading) return <Spinner />;

    if (data.Response === 'False') return <h3>No Movies</h3>;

    return (
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
  };

  return renderMovies();
};

export default Card;
