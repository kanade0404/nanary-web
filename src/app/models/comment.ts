import { Question } from './question';
import { User } from './user';

export interface Comment {
  id: string;
  content: string;
  question: Question;
  user: User;
  created_at: Date;
  updated_at: Date;
}
