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
  const { updateActivePage, updateTotalResults } = useActions();
  const searchWord = useSelector(
    (state: RootState) => state.search?.searchWord
  );
  const pageStore = useSelector((state: RootState) => state.search?.page);

  const searchTerm = searchParams.get('search') || searchWord;
  const page = searchParams.get('page') || pageStore;

  const fetchData = useGetMoviesQuery({
    searchTerm,
    page,
  });
  const { data, isLoading } = fetchData;

  useEffect(() => {
    if (!data) return;
    updateTotalResults(data.totalResults);
    updateActivePage(parseInt(page, 10));
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
