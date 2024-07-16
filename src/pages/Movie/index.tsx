import { useEffect, useState } from 'react';
import { LoaderFunction, useLoaderData, useNavigate } from 'react-router-dom';
import { fetchMovie, ResponseMovie } from '../../utils/apiResponse';

import noMovieImg from '../../assets/no-image.svg';
import './style.scss';

interface MovieId {
  id: string;
}

export const movieLoader: LoaderFunction<{ params: MovieId }> = async ({
  params,
}) => {
  try {
    if (!params.id) return null;
    const movieData = await fetchMovie(params.id);
    return { movieData };
  } catch (error) {
    throw new Error('No fetch Movie data');
  }
};

function Movie() {
  const { movieData } = useLoaderData() as { movieData: ResponseMovie };
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(true);

  const handlerClose = () => {
    setIsActive(false);
    navigate('/');
  };

  useEffect(() => {
    setIsActive(true);
  }, []);

  const { Title, Poster, Director, Genre, Awards, Plot } = movieData;
  return (
    isActive && (
      <div
        className="movie"
        onClick={() => {
          handlerClose();
        }}
        aria-hidden="true"
      >
        <div className="movie__content">
          <h2>{Title}</h2>
          <img
            src={Poster === 'N/A' ? noMovieImg : Poster}
            alt={Title}
            width="300"
          />
          <p>Awards: {Awards}</p>
          <p>Director: {Director}</p>
          <p>Genre: {Genre}</p>
          <p>Plot: {Plot}</p>
        </div>
      </div>
    )
  );
}

export default Movie;
