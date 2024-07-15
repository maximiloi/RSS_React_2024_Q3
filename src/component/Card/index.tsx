import { ReactElement, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import fetchData, { Movie } from '../../utils/apiResponse';
import Spinner from '../Spinner';

import noMovieImg from '../../assets/no-image.svg';
import './style.scss';

interface CardProps {
  getTotalResult: (value: number) => void;
}

function Card({ getTotalResult }: CardProps): ReactElement {
  const [searchTermLS] = useLocalStorage('');
  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get('search');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseMovies, setResponseMovies] = useState<Movie[]>([]);

  const getResponse = async (searchTerm: string) => {
    setIsLoading(true);

    try {
      const response = await fetchData(searchTerm);
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
      getResponse(searchValue);
    }
  }, [searchValue]);

  useEffect(() => {
    if (searchTermLS) {
      getResponse(searchTermLS);
    } else {
      getResponse('star wars');
    }
  }, []);

  const content = isLoading ? (
    <Spinner />
  ) : (
    <div className="card card__wrapper">
      {responseMovies?.map(({ imdbID, Title, Poster, Year }) => (
        <div className="card__item" key={imdbID}>
          <img
            className="card__img"
            src={Poster === 'N/A' ? noMovieImg : Poster}
            alt={Title}
          />
          <p>{Year}</p>
          <h3>{Title}</h3>
        </div>
      ))}
    </div>
  );

  return content;
}

export default Card;
