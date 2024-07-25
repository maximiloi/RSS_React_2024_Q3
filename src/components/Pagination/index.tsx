import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useActions from '../../hooks/useActions';
import { RootState } from '../../store/store';

import './style.scss';

const Pagination: React.FC = () => {
  const [activePage, setActivePage] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<string>('1');
  const { updatePage } = useActions();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const totalResultsStore = useSelector(
    (state: RootState) => state.search?.totalResults
  );
  const activePageStore = useSelector(
    (state: RootState) => state.search?.activePage
  );

  const handleSetPage = (page: number) => {
    setActivePage(page);
    updatePage(page.toString());
    searchParams.set('page', page.toString());
    navigate(`?${searchParams.toString()}`);
  };

  const renderPages = () => {
    const NUMBER_CARD_ON_PAGE = 10;
    const PAGES_TO_SHOW = 2;
    const pages = [];

    const totalFilmsPage = Math.ceil(
      Number(totalResults) / NUMBER_CARD_ON_PAGE
    );

    pages.push(1);

    for (let i = activePage - PAGES_TO_SHOW; i < activePage; i += 1) {
      if (i > 1) {
        pages.push(i);
      }
    }

    if (activePage !== 1 && activePage !== totalFilmsPage) {
      pages.push(activePage);
    }

    for (let i = activePage + 1; i <= activePage + PAGES_TO_SHOW; i += 1) {
      if (i < totalFilmsPage) {
        pages.push(i);
      }
    }

    if (totalFilmsPage !== 1) {
      pages.push(totalFilmsPage);
    }

    return pages.map((page) => (
      <li className="pagination__item" key={`page-${page}`}>
        <button
          type="button"
          className={
            activePage === page
              ? 'pagination__button active'
              : 'pagination__button'
          }
          onClick={() => handleSetPage(page)}
        >
          {page}
        </button>
      </li>
    ));
  };

  useEffect(() => {
    setTotalResults(totalResultsStore.toString());
    setActivePage(activePageStore);
  }, [totalResultsStore, activePageStore]);

  return <ul className="pagination">{renderPages()}</ul>;
};

export default Pagination;
