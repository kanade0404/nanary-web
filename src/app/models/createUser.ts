export class CreateUser {
  private username: string;
  private email: string;
  private password: string;
  /**
   * Getter
   */
  get Username(): string {
    return this.username;
  }
  get Email(): string {
    return this.email;
  }
  get Password(): string {
    return this.password;
  }
  /**
   * Setter
   */
  set Username(username: string) {
    this.username = username;
  }
  set Email(email: string) {
    this.email = email;
  }
  set Password(password: string) {
    this.password = password;
  }
}