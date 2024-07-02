interface Response {
  imdbID: string;
  Title: string;
  Poster: string;
  Year: string;
}

class ApiResponse {
  static async fetchData(value: string): Promise<Response[]> {
    const url = `https://www.omdbapi.com/?s=${value}&apikey=67e1bb9b`;

    const response = await fetch(url);
    const data = await response.json();
    const results = await data.Search;

    return results;
  }
}

export default ApiResponse;
