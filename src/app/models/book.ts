import { Author } from './author';
import { Publisher } from './publisher';

export interface Book {
  id: string;
  title: string;
  isbn: string;
  cover: string;
  author: {
    [key: string]: Author;
  };
  publisher: {
    [key: string]: Publisher;
  };
  publish_date: string;
}
