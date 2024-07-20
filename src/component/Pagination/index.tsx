import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import './style.scss';

interface PaginationProps {
  totalResults: number;
}

const Pagination = ({ totalResults }: PaginationProps) => {
  const NUMBER_CARD_ON_PAGE = 10;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState(1);

  const [totalFilmsPage, setTotalFilmsPage] = useState(
    Math.ceil(totalResults / NUMBER_CARD_ON_PAGE)
  );

  const handleSetPage = (page: number) => {
    setActivePage(page);
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
    setTotalFilmsPage(Math.floor(totalResults / NUMBER_CARD_ON_PAGE) + 1);
    handleSetPage(1);
  }, [totalResults]);

  useEffect(() => {
    searchParams.set('page', '1');
    navigate(`?${searchParams.toString()}`);
  }, []);

  return <ul className="pagination">{renderPages()}</ul>;
};

export default Pagination;
