import { ReactElement, useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useActions } from '../../hooks/useActions';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Movies, fetchMovies } from '../../utils/apiResponse';
import { RootState } from '../../store/store';
import Spinner from '../Spinner';

import noMovieImg from '../../assets/no-image.svg';
import favMovie from '../../assets/fav.svg';
import noFavMovie from '../../assets/no-fav.svg';
import './style.scss';

interface CardProps {
  getTotalResult: (value: number) => void;
}

function Card({ getTotalResult }: CardProps): ReactElement {
  const { selected } = useSelector((state: RootState) => state);
  const { toggleSelected } = useActions();
  const [searchTermLS] = useLocalStorage('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchValue = searchParams.get('search');
  const pageNumber = searchParams.get('page');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseMovies, setResponseMovies] = useState<Movies[]>([]);

  const isExist = (item: string): boolean => {
    return selected.includes(item);
  };

  const getResponse = async (searchTerm: string, page?: number) => {
    setIsLoading(true);

    try {
      const response = await fetchMovies(searchTerm, page);
      if (response && response.Search) {
        setResponseMovies(response.Search);
        getTotalResult(Number(response.totalResults));
      } else {
        throw new Error('No movie data found');
      }
    } catch (error) {
      console.error('Error fetching movie data:', error);
      throw new Error('Error fetching movie data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchValue !== null) {
      getResponse(searchValue, Number(pageNumber));
    }
  }, [searchValue, pageNumber]);

  useEffect(() => {
    if (searchTermLS) {
      getResponse(searchTermLS);
      searchParams.set('search', searchTermLS);
    } else {
      getResponse('star wars');
      searchParams.set('search', 'star wars');
    }
    navigate(`?${searchParams.toString()}`);
  }, []);

  const content = isLoading ? (
    <Spinner />
  ) : (
    <div className="card card__wrapper">
      {responseMovies?.map(({ imdbID, Title, Poster, Year }) => (
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
}

export default Card;
