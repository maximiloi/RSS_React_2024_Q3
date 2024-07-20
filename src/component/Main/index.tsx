import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Pagination from '../Pagination';
import Card from '../Card';

import './style.scss';

const Main = () => {
  const [totalResults, setTotalResults] = useState(0);

  const handleTotalResult = (value: number) => {
    setTotalResults(value);
  };

  return (
    <main>
      <div className="main__container">
        <h2>Type in the title of the movie in English</h2>
        {totalResults >= 10 && <Pagination totalResults={totalResults} />}
      </div>
      <Card getTotalResult={handleTotalResult} />
      <Outlet />
    </main>
  );
};

export default Main;
