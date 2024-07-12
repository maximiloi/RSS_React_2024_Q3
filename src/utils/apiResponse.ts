interface MoviesResponse {
  imdbID: string;
  Title: string;
  Poster: string;
  Year: string;
}

const fetchData = async (value: string): Promise<MoviesResponse[]> => {
  try {
    const url = `https://www.omdbapi.com/?s=${value}&apikey=67e1bb9b`;
    const response = await fetch(url);
    const data = await response.json();
    return data.Search || [];
  } catch (error) {
    throw new Error(`Ошибка при получении данных: ${error}`);
  }
};

export default fetchData;
