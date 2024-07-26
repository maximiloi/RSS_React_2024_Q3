import { Outlet } from 'react-router-dom';

import Pagination from '../Pagination';
import Card from '../MoviesList';

import './style.scss';

const Main: React.FC = () => {
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
