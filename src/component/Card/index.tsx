import { useEffect, useState } from 'react';
import fetchData, { MovieData } from '../../utils/apiResponse';
import Spinner from '../Spinner';

import './style.scss';

function Card({ searchWord }: { searchWord: string }) {
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
    getResponse(searchWord);
  }, [searchWord]);

  return (
    <div>
      {isLoading ? (
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
      )}
    </div>
  );
}

export default Card;
