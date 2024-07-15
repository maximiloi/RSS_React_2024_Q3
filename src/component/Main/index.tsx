import { useState } from 'react';
import Pagination from '../Pagination';
import Card from '../Card';

import './style.scss';

function Main() {
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
    </main>
  );
}

export default Main;
