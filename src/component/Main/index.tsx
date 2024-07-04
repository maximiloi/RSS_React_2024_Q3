import { Component } from 'react';
import Card from '../Card';
import LocalStorage from '../../utils/localStorage';

import './style.scss';

interface Props {
  searchTitle: string;
}

interface State {
  mainText: string;
}

class Main extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      mainText: '',
    };
  }

  componentDidMount() {
    const valueLocalStorage = LocalStorage.getResult();
    const mainText = valueLocalStorage
      ? `Your last request "${valueLocalStorage}"`
      : `Type in the title of the movie in English`;

    this.setState({ mainText });
  }

  render() {
    const { mainText } = this.state;
    const { searchTitle } = this.props;

    return (
      <main>
        <h2>{mainText}</h2>
        <Card searchWord={searchTitle} />
      </main>
    );
  }
}

export default Main;
