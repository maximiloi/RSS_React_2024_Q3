import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import useActions from '../../hooks/useActions';
import { RootState } from '../../store/store';
import { useGetMoviesQuery } from '../../store/api';
import Spinner from '../Spinner';
import MovieCard from '../MovieCard';

const MoviesList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { updateTotalResults } = useActions();
  const searchWord = useSelector(
    (state: RootState) => state.search?.searchWord
  );
  const page = useSelector((state: RootState) => state.search?.page);

  const urlSearchTerm = searchParams.get('search') || searchWord;
  const urlPage = searchParams.get('page') || page;

  const fetchData = useGetMoviesQuery({
    searchTerm: urlSearchTerm,
    page: urlPage,
  });
  const { data, isLoading } = fetchData;

  useEffect(() => {
    if (!data) return;
    updateTotalResults(data.totalResults);
    // if (!searchParams.get('page')) return;
    // updateActivePage(parseInt(searchParams.get('page'), 10));
  }, [data, updateTotalResults]);

  const renderMovies = () => {
    if (isLoading) return <Spinner />;

    if (!data || data.Response === 'False') return <h3>No Movies</h3>;

    return (
      <div className="movie">
        <MovieCard movieData={data.Search} />
      </div>
    );
  };

  return renderMovies();
};

export default MoviesList;
