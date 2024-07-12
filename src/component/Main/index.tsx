import Card from '../Card';

import './style.scss';

function Main() {
  return (
    <main>
      <h2>Type in the title of the movie in English</h2>
      <Card searchWord="star wars" />
    </main>
  );
}

export default Main;
