import { User } from './user';

export interface Question {
  id: string;
  title: string;
  content: string;
  user: User;
  created_at: Date;
  updated_at: Date;
}
