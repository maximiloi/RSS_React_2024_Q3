import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useActions from '../../hooks/useActions';
import { RootState } from '../../store/store';
import { Movie } from '../../utils/apiResponse';

import noMovieImg from '../../assets/no-image.svg';
import favMovie from '../../assets/fav.svg';
import noFavMovie from '../../assets/no-fav.svg';
import './style.scss';

const MovieCard = ({ data }: { data: Movie[] }) => {
  const { toggleSelected } = useActions();
  const selected = useSelector((state: RootState) => state.selected);
  const isExist = (item: string) => selected.includes(item);

  return (
    <div className="movie__wrapper">
      {data &&
        data.map((movie: Movie) => (
          <div className="movie__item" key={movie.imdbID}>
            <button
              type="button"
              className="movie__button button"
              onClick={() => toggleSelected(movie.imdbID)}
            >
              <img
                src={isExist(movie.imdbID) ? favMovie : noFavMovie}
                alt={
                  isExist(movie.imdbID)
                    ? 'Favorite movie'
                    : 'Not favorite movie'
                }
              />
            </button>
            <Link to={`movie/${movie.imdbID}`}>
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
