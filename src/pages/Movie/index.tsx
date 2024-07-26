import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetMovieQuery } from '../../store/api';

import noMovieImg from '../../assets/no-image.svg';
import './style.scss';
import Spinner from '../../components/Spinner';

const Movie = () => {
  const { imdbID } = useParams();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(true);

  const movieData = useGetMovieQuery(imdbID);
  const { data, isFetching, isSuccess } = movieData;

  const handlerClose = () => {
    setIsActive(false);
    navigate(-1);
  };

  useEffect(() => {
    setIsActive(true);
  }, []);

  const { Title, Poster, Director, Genre, Awards, Plot } = data;

  let content;
  if (isFetching) {
    content = <Spinner />;
  } else if (isSuccess) {
    content = (
      <div
        className="movie-desc"
        onClick={() => {
          handlerClose();
        }}
        aria-hidden="true"
      >
        <div className="movie-desc__content">
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
    );
  }
  return isActive && content;
};

export default Movie;
