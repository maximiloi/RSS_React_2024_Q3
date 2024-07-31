import { useSelector } from 'react-redux';
import useActions from '../../hooks/useActions';
import { RootState } from '../../store/store';

import favMovie from '../../assets/fav.svg';
import noFavMovie from '../../assets/no-fav.svg';
import { Movie } from '../../utils/apiResponseType';

const FavoriteButton = ({ movie }: { movie: Movie }) => {
  const { toggleSelected } = useActions();
  const selected = useSelector((state: RootState) => {
    return state.selected;
  });
  const isExist = (compareItem: Movie): boolean => {
    return (
      selected && selected.some((item) => item.imdbID === compareItem.imdbID)
    );
  };

  return (
    <button
      type="button"
      className="movie__button button"
      onClick={() => toggleSelected(movie)}
    >
      <img
        src={isExist(movie) ? favMovie : noFavMovie}
        alt={isExist(movie) ? 'Favorite movie' : 'Not favorite movie'}
      />
    </button>
  );
};

export default FavoriteButton;
