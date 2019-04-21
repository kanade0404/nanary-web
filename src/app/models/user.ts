export class User {
  /**
   * Field
   */
  private id: string;
  private uuid: string;
  private username: string;
  private displayUsername: string;
  private email: string;
  private profile: string = '';
  private iconImage: string = '';
  user: User = null;
  /**
   * Getter
   */
  get Id(): string {
    return this.id;
  }
  get UUID(): string {
    return this.uuid;
  }
  get Username(): string {
    return this.username;
  }
  get DisplayUsername(): string {
    return this.displayUsername;
  }
  get Email(): string {
    return this.email;
  }
  get Profile(): string {
    return this.profile;
  }
  get IconImage(): string {
    return this.iconImage;
  }
  /**
   * Setter
   */
  set Id(id: string) {
    this.id = id;
  }
  set UUID(uuid: string) {
    this.uuid = uuid;
  }
  set Username(username: string) {
    this.username = username;
  }
  set DisplayUsername(displayUsername: string) {
    this.displayUsername = displayUsername;
  }
  set Email(email: string) {
    this.email = email;
  }
  set Profile(profile: string) {
    this.profile = profile;
  }
  set IconImage(iconImage: string) {
    this.iconImage = iconImage;
  }

  reset() {
    localStorage.removeItem('token');
    localStorage.removeItem('account');
    this.user = null;
    return this.user;
  }
}
