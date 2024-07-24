import React from 'react';
import { useSelector } from 'react-redux';
import useActions from '../../hooks/useActions';
import { RootState } from '../../store/store';

import favMovie from '../../assets/fav.svg';
import noFavMovie from '../../assets/no-fav.svg';

const FavoriteButton = ({ imdbID }: { imdbID: string }) => {
  const { toggleSelected } = useActions();
  const selected = useSelector((state: RootState) => state.selected);
  const isExist = (item: string) => selected.includes(item);

  return (
    <button
      type="button"
      className="movie__button button"
      onClick={() => toggleSelected(imdbID)}
    >
      <img
        src={isExist(imdbID) ? favMovie : noFavMovie}
        alt={isExist(imdbID) ? 'Favorite movie' : 'Not favorite movie'}
      />
    </button>
  );
};

export default FavoriteButton;
