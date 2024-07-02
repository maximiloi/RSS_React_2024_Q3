import { Component, ChangeEvent } from 'react';
import Header from './component/Header';
import Main from './component/Main';

interface Props {}

interface State {
  searchTerm: string;
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchTerm: '',
    };
  }

  handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  render() {
    const { searchTerm } = this.state;

    return (
      <>
        <Header onSearchChange={this.handleSearchChange} />
        <Main searchTitle={searchTerm} />
      </>
    );
  }
}

export default App;
