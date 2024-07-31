import { http, HttpResponse } from 'msw';

const handlers = [
  http.get('https://www.omdbapi.com/?apikey=67e1bb9b&i=tt1234567', () => {
    return HttpResponse.json(
      {
        Title: 'Test Movie',
        Poster: 'https://example.com/poster.jpg',
        Director: 'John Doe',
        Genre: 'Action',
        Awards: '2 Oscars',
        Plot: 'This is a test movie plot.',
      },
      { status: 200 }
    );
  }),
];

export default handlers;
