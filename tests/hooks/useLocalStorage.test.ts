import { renderHook } from '@testing-library/react';
import useLocalStorage from '../../src/hooks/useLocalStorage';

describe('useLocalStorage', () => {
  it('should initializes with a default value', async () => {
    const { result } = renderHook(() => useLocalStorage('initialValue'));

    expect(result.current[0]).toBe('initialValue');
  });

  it('should initializes with a stored value', async () => {
    const storedValue = 'storedValue';
    localStorage.setItem('cinema-name', JSON.stringify(storedValue));
    const { result } = renderHook(() => useLocalStorage());

    expect(result.current[0]).toBe(storedValue);
  });
});
