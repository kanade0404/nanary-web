export class LoginUser {
  private email: string;
  private password: string;
  get Email(): string {
    return this.email;
  }
  get Password(): string {
    return this.password;
  }
}
