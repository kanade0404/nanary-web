import { Question } from './question';
import { User } from './user';
export class Comment {
  /**
   * Field
   */
  private id: string;
  private content: string;
  private question: Question;
  private user: User;

  /**
   * Getter
   */
  get Id(): string {
    return this.id;
  }
  get Content(): string {
    return this.content;
  }
  get Question(): Question {
    return this.question;
  }
  get Uset(): User {
    return this.user;
  }
  /**
   * Setter
   */
  set Content(content: string) {
    this.content = content;
  }
  set Question(question: Question) {
    this.question = question;
  }
  set User(user: User) {
    this.user = user;
  }
  Comment(id: string, content: string, question: Question, user: User) {
    this.id = id;
    this.Content = content;
    this.Question = question;
    this.User = user;
  }
}