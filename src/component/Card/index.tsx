import { Component } from 'react';
import ApiResponse from '../../utils/apiResponse';
import LocalStorage from '../../utils/localStorage';

import './style.scss';

interface Props {
  searchWord: string;
}

interface ResponseState {
  readonly imdbID?: string;
  readonly Title?: string;
  readonly Poster?: string;
  readonly Year?: string;
}

interface State {
  responseData: null | ResponseState[];
}

class Card extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { responseData: null };
  }

  async componentDidMount() {
    let valueLocalStorage = LocalStorage.getResult();

    if (!valueLocalStorage) {
      valueLocalStorage = 'star wars';
    }

    if (typeof valueLocalStorage === 'string') {
      const response: ResponseState[] =
        await ApiResponse.fetchData(valueLocalStorage);
      this.setState({ responseData: response });
    }
  }

  async componentDidUpdate(prevProps: Props) {
    const { searchWord } = this.props;

    if (prevProps.searchWord !== searchWord) {
      const response: ResponseState[] = await ApiResponse.fetchData(searchWord);
      this.setState({ responseData: response });
    }
  }

  render() {
    const { responseData } = this.state;

    return (
      <div className="card card__wrapper">
        {responseData &&
          responseData.map(({ imdbID, Title, Poster, Year }: ResponseState) => (
            <div className="card__item" key={imdbID}>
              <img
                className="card__img"
                src={Poster}
                alt={Title}
                width="182px"
                height="268px"
              />
              <p>{Year}</p>
              <h3>{Title}</h3>
            </div>
          ))}
      </div>
    );
  }
}

export default Card;
