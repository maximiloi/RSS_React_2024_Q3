import { useState } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetMoviesQuery } from '../../store/api';

import './style.scss';

const Pagination = () => {
  const NUMBER_CARD_ON_PAGE = 10;
  const [activePage, setActivePage] = useState(1);
  // const [searchParams] = useSearchParams();
  // const navigate = useNavigate();
  const { data, isLoading } = useGetMoviesQuery({});

  if (!data) {
    return <div>Loading...</div>;
  }

  const totalResults = data.totalResults || 0;
  const totalFilmsPage = Math.ceil(totalResults / NUMBER_CARD_ON_PAGE);

  const handleSetPage = (page: number) => {
    setActivePage(page);
    // searchParams.set('page', page.toString());
    // navigate(`?${searchParams.toString()}`);
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

  if (!totalResults) return null;

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <ul className="pagination">{renderPages()}</ul>
  );
};

export default Pagination;
