import { User } from './user';
import { Book } from './book';

export interface Question {
  id: string;
  title: string;
  content: string;
  user: {
    [key: string]: User;
  };
  book: {
    [key: string]: Book;
  };
  created_at: Date;
  updated_at: Date;
}
