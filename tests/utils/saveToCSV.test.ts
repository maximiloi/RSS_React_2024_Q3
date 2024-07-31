import { describe, it, expect, vi } from 'vitest';
import saveToCSV from '../../src/utils/saveToCSV';
import { Movie } from '../../src/utils/apiResponseType';

describe('utils saveToCSV', () => {
  it('should correctly save data to CSV', () => {
    const createElementSpy = vi.spyOn(document, 'createElement');
    const appendChildSpy = vi.spyOn(document.body, 'appendChild');

    const mockLink = document.createElement('a');
    vi.spyOn(mockLink, 'setAttribute');
    vi.spyOn(mockLink, 'click');

    createElementSpy.mockReturnValue(mockLink);

    const selectedItems: Movie[] = [
      {
        Title: 'Saw',
        Year: '2004',
        imdbID: 'tt0387564',
        Type: 'movie',
        Poster:
          'https://m.media-amazon.com/images/M/MV5BM2M1MzI1MWYtYmM2ZC00OWY3LTk0ZGMtNmRkNzU1NzEzMWE5XkEyXkFqcGdeQXVyODUwOTkwODk@._V1_SX300.jpg',
      },
      {
        Title: 'Saw II',
        Year: '2005',
        imdbID: 'tt0432348',
        Type: 'movie',
        Poster:
          'https://m.media-amazon.com/images/M/MV5BMjY4Mjg4YTgtZWU2MC00MzVlLTg3MDgtYzUyYzU1NGMyMmU5XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
      },
    ];

    saveToCSV(selectedItems);

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(appendChildSpy).toHaveBeenCalledWith(mockLink);
    expect(mockLink.setAttribute).toHaveBeenCalledWith(
      'href',
      expect.stringContaining('data:text/csv;charset=utf-8')
    );
    expect(mockLink.setAttribute).toHaveBeenCalledWith(
      'download',
      '2_items.csv'
    );
    expect(mockLink.click).toHaveBeenCalled();

    createElementSpy.mockRestore();
    appendChildSpy.mockRestore();
  });

  it('should do nothing if there are no selected items', () => {
    const selectedItems: Movie[] = [];
    const createElementSpy = vi.spyOn(document, 'createElement');

    saveToCSV(selectedItems);
    expect(createElementSpy).not.toHaveBeenCalled();
    createElementSpy.mockRestore();
  });
});
