import { Component } from 'react';
import spinnerImg from '../../assets/cinema.png';
import './style.scss';

class Spinner extends Component {
  render() {
    return (
      <div className="spinner">
        <img className="spinner__img" src={spinnerImg} alt="loading..." />
      </div>
    );
  }
}

export default Spinner;
