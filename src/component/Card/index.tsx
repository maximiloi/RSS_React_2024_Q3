import { Component } from 'react';
import ApiResponse from '../../utils/apiResponse';
import LocalStorage from '../../utils/localStorage';

import './style.scss';
import Spinner from '../Spinner';

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
  responseData: ResponseState[];
  isLoading: boolean;
}

class Card extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      responseData: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    let searchTerm = LocalStorage.getResult();
    searchTerm = searchTerm || 'star wars';
    this.getResponse(searchTerm);
  }

  componentDidUpdate(prevProps: Props) {
    const { searchWord } = this.props;

    if (prevProps.searchWord !== searchWord) {
      this.getResponse(searchWord);
    }
  }

  async getResponse(searchTerm: string) {
    this.setState({ isLoading: true });
    try {
      const response: ResponseState[] = await ApiResponse.fetchData(searchTerm);
      this.setState({ responseData: response, isLoading: false });
    } catch (error) {
      throw Error('Error fetching movie data:');
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { responseData, isLoading } = this.state;

    return (
      <div>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="card card__wrapper">
            {responseData?.map(
              ({ imdbID, Title, Poster, Year }: ResponseState) => (
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
              )
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Card;
