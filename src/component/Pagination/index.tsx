import { useState } from 'react';
import './style.scss';

interface PaginationProps {
  totalResults: number;
}

function Pagination({ totalResults }: PaginationProps) {
  const [totalFilmsPage] = useState(Math.floor(totalResults / 10));
  const activePage = 1;

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
      <li
        className={`pagination__item ${activePage === page ? ' active' : ''}`}
        key={`page-${page}`}
      >
        {page}
      </li>
    ));
  };

  return <ul className="pagination">{renderPages()}</ul>;
}

export default Pagination;
