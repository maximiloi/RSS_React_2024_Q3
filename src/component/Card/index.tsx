import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import fetchData, { MovieData } from '../../utils/apiResponse';
import Spinner from '../Spinner';

import './style.scss';

function Card() {
  const [searchTermLS] = useLocalStorage('');
  const [searchParams] = useSearchParams();
  const query = searchParams.get('search');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseData, setResponseData] = useState<MovieData[]>([]);

  const getResponse = async (searchTerm: string) => {
    setIsLoading(true);
    try {
      const response: MovieData[] = await fetchData(searchTerm);
      setResponseData(response);
    } catch (error) {
      throw Error('Error fetching movie data:');
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
      {responseData?.map(({ imdbID, Title, Poster, Year }) => (
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
