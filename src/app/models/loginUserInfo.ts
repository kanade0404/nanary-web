import { User } from './user';

export class LoginUserInfo {
  user: User;
  token: string;
  reset(): LoginUserInfo {
    this.user = null;
    this.token = null;
    return this;
  }
}
