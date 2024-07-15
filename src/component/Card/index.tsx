import { ReactElement, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import fetchData, { Movie } from '../../utils/apiResponse';
import Spinner from '../Spinner';

import './style.scss';

interface CardProps {
  getTotalResult: (value: number) => void;
}

function Card({ getTotalResult }: CardProps): ReactElement {
  const [searchTermLS] = useLocalStorage('');
  const [searchParams] = useSearchParams();
  const query = searchParams.get('search');
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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (query !== null) {
      getResponse(query);
    }
  }, [query]);

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
          <img className="card__img" src={Poster} alt={Title} />
          <p>{Year}</p>
          <h3>{Title}</h3>
        </div>
      ))}
    </div>
  );

  return content;
}

export default Card;
