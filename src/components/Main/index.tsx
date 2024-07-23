import { useEffect } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import useActions from '../../hooks/useActions';
import Pagination from '../Pagination';
import Card from '../Card';

import './style.scss';

const Main: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [searchTermLS] = useLocalStorage('');
  const { updateActivePage, updateSearchWord, updatePage } = useActions();

  useEffect(() => {
    const termFromParams = searchParams.get('search');
    const pageFromParams = searchParams.get('page');

    if (termFromParams) {
      updateSearchWord(termFromParams);
    }

    if (pageFromParams) {
      updatePage(pageFromParams);
      updateActivePage(parseInt(pageFromParams, 10));
    }

    if (!termFromParams && !pageFromParams) {
      updateSearchWord(searchTermLS);
    }
  }, [
    searchParams,
    searchTermLS,
    updateActivePage,
    updatePage,
    updateSearchWord,
  ]);

  return (
    <main>
      <div className="main__container">
        <h2>Type in the title of the movie in English</h2>
        <Pagination />
      </div>
      <Card />
      <Outlet />
    </main>
  );
};

export default Main;
