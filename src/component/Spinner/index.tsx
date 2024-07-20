import spinnerImg from '../../assets/cinema.png';

import './style.scss';

const Spinner = () => {
  return (
    <div className="spinner">
      <img className="spinner__img" src={spinnerImg} alt="loading..." />
    </div>
  );
};

export default Spinner;
