export interface Movies {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface ResponseMovies {
  Search: Movies[];
  totalResults: string;
  Response: 'True' | 'False';
}

export interface ResponseMovie {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: {
    Source: string;
    Value: string;
  }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export const fetchMovies = async (
  value: string,
  page: number = 1
): Promise<ResponseMovies> => {
  try {
    const url = `https://www.omdbapi.com/?apikey=67e1bb9b&type=movie&s=${value}&page=${page}`;
    const response = await fetch(url);
    const data = await response.json();
    return data || [];
  } catch (error) {
    throw new Error(`Ошибка при получении списка фильмов: ${error}`);
  }
};

export const fetchMovie = async (value: string): Promise<ResponseMovie> => {
  try {
    const url = `https://www.omdbapi.com/?apikey=67e1bb9b&i=${value}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Ошибка при получении данных о фильме: ${error}`);
  }
};
