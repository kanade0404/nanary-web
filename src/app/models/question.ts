import { User } from './user';

export class Question {
  private id: string;
  private title: string;
  private content: string;
  private user: User;
  get Id(): string {
    return this.id;
  }
  get Title() {
    return this.title;
  }
  set Title(title: string) {
    this.title = title;
  }
  get Content(): string {
    return this.content;
  }
  set Content(content: string) {
    this.content = content;
  }
  get User(): User {
    return this.user;
  }
  set User(user: User) {
    this.user = user;
  }
  Question(id: string, title: string, content: string, user: User) {
    this.id = id;
    this.Title = title;
    this.Content = content;
    this.User = user;
  }
}
