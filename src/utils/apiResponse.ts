export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface ResponseData {
  Search: Movie[];
  totalResults: string;
  Response: 'True' | 'False';
}

const fetchData = async (
  value: string,
  page: number = 1
): Promise<ResponseData> => {
  try {
    const url = `https://www.omdbapi.com/?apikey=67e1bb9b&s=${value}&page=${page}`;
    const response = await fetch(url);
    const data = await response.json();
    return data || [];
  } catch (error) {
    throw new Error(`Ошибка при получении данных: ${error}`);
  }
};

export default fetchData;
