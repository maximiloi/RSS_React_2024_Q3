import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useActions from '../../hooks/useActions';
import { RootState } from '../../store/store';

import './style.scss';

const Pagination = () => {
  const NUMBER_CARD_ON_PAGE = 10;
  const [activePage, setActivePage] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<string>('1');

  const { updatePage } = useActions();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const totalResultsStore = useSelector(
    (state: RootState) => state.search.totalResults
  );

  const totalFilmsPage = Math.ceil(Number(totalResults) / NUMBER_CARD_ON_PAGE);

  const handleSetPage = (page: number) => {
    setActivePage(page);
    updatePage(page.toString());
    searchParams.set('page', page.toString());
    navigate(`?${searchParams.toString()}`);
  };

  const renderPages = () => {
    const pages = [];
    const pagesToShow = 2;

    pages.push(1);

    for (let i = activePage - pagesToShow; i < activePage; i += 1) {
      if (i > 1) {
        pages.push(i);
      }
    }

    if (activePage !== 1 && activePage !== totalFilmsPage) {
      pages.push(activePage);
    }

    for (let i = activePage + 1; i <= activePage + pagesToShow; i += 1) {
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
    if (!totalResultsStore) return;
    setTotalResults(totalResultsStore.toString());
  }, [totalResultsStore]);

  return <ul className="pagination">{renderPages()}</ul>;
};

export default Pagination;
