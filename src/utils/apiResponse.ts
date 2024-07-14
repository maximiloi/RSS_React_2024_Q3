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

const fetchData = async (value: string): Promise<ResponseData> => {
  try {
    const url = `https://www.omdbapi.com/?s=${value}&apikey=67e1bb9b`;
    const response = await fetch(url);
    const data = await response.json();
    return data || [];
  } catch (error) {
    throw new Error(`Ошибка при получении данных: ${error}`);
  }
};

export default fetchData;
