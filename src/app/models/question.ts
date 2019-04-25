import { User } from './user';

export class Question {
  id: string;
  title: string;
  content: string;
  user: User;
}
