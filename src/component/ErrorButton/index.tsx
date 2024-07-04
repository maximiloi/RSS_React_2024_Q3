import { Component } from 'react';

import './style.scss';

interface ErrorButtonProps {}

interface ErrorButtonState {
  hasError: boolean;
}

class ErrorButton extends Component<ErrorButtonProps, ErrorButtonState> {
  constructor(props: ErrorButtonProps) {
    super(props);
    this.state = { hasError: false };
  }

  render() {
    const { hasError } = this.state;

    if (hasError) {
      throw new Error('Something went wrong');
    }

    const handleClick = () => {
      this.setState({ hasError: true });
    };

    return (
      <button className="button" type="button" onClick={handleClick}>
        throw an error
      </button>
    );
  }
}

export default ErrorButton;
