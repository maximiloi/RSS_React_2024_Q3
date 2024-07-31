import { Movie } from './apiResponseType';

const saveToCSV = (selectedItems: Movie[]): void => {
  if (selectedItems.length === 0) return;

  const numSelected = selectedItems.length;
  const filename = `${numSelected}_items.csv`;

  const headers = Object.keys(selectedItems[0]) as (keyof Movie)[];
  const csvContent = `data:text/csv;charset=utf-8,${headers.join(',')}\n${selectedItems.map((item) => headers.map((header) => item[header]).join(',')).join('\n')}`;

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
};

export default saveToCSV;
