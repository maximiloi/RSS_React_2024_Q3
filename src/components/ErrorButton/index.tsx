import { useState } from 'react';
import './style.scss';

const ErrorButton = () => {
  const [isError, setIsError] = useState(false);

  if (isError) {
    throw new Error('Something went wrong');
  }

  const handleClick = () => {
    setIsError(true);
  };

  return (
    <button className="button" type="button" onClick={handleClick}>
      throw an error
    </button>
  );
};

export default ErrorButton;
