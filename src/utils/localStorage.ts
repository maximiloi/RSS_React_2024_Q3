class LocalStorage {
  static getResult(): string | void | null {
    if (localStorage.getItem('name-cinema-iloi')) {
      return localStorage.getItem('name-cinema-iloi');
    }
    return localStorage.setItem('name-cinema-iloi', '');
  }

  static setResult(inputValue: string) {
    localStorage.setItem('name-cinema-iloi', inputValue);
  }
}

export default LocalStorage;
