export class Session {
  login: boolean;
  constructor() {
    this.login = false;
  }
  reset(): Session {
    this.login = false;
    return this;
  }
}
