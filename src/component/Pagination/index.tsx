import './style.scss';

interface PaginationProps {
  totalResults: number;
}

function Pagination({ totalResults }: PaginationProps) {
  // console.log('🚀 ~ Pagination ~ totalResults:', totalResults);
  return <div>Pagination {totalResults}</div>;
}

export default Pagination;
