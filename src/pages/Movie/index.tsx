import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetMovieQuery } from '../../store/api';

import './style.scss';

import noMovieImg from '../../assets/no-image.svg';
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

  let content;
  if (isFetching) {
    content = <Spinner />;
  } else if (isSuccess) {
    const { Title, Poster, Director, Genre, Awards, Plot } = data;
    const posterContent =
      Poster === 'N/A' ? (
        <div className="no-poster">
          <img src={noMovieImg} alt="Постер недоступен" width="300" />
          <p>Постер недоступен</p>
        </div>
      ) : (
        <img src={Poster} alt={Title} width="300" />
      );

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
          {posterContent}
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
