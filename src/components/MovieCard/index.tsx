import { Link } from 'react-router-dom';
import { Movie } from '../../utils/apiResponseType';
import FavoriteButton from '../FavoriteButton';

import noMovieImg from '../../assets/no-image.svg';
import './style.scss';

const MovieCard = ({ movieData }: { movieData: Movie[] }) => {
  if (movieData.length === 0) return <h3>No Movies</h3>;

  return (
    <div className="movie__wrapper">
      {movieData &&
        movieData.map((movie: Movie) => (
          <div className="movie__item" key={movie.imdbID}>
            <FavoriteButton movie={movie} />
            <Link to={`/movie/${movie.imdbID}`}>
              <img
                className="movie__img"
                src={movie.Poster === 'N/A' ? noMovieImg : movie.Poster}
                alt={movie.Title}
              />
              <p>{movie.Year}</p>
              <h3>{movie.Title}</h3>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default MovieCard;
