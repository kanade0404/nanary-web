import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { Session } from '../../models/session';
import { Subject } from 'rxjs';
import { LoginUserInfo } from '../../models/loginUserInfo';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  /**
   * Session
   */
  public session = new Session();
  public sessionSubject = new Subject<Session>();
  public sessionState = this.sessionSubject.asObservable();

  /**
   * ログインフォーム画面またはユーザー登録フォーム画面を判定
   */
  public isSignForm = false;
  public isSignFormSubject = new Subject<boolean>();
  public isSignFormState = new Subject<boolean>();
  /**
   * ログインユーザー
   */
  public loginUserInfo: LoginUserInfo = new LoginUserInfo();
  public userSubject = new Subject<LoginUserInfo>();
  public userState = this.userSubject.asObservable();

  /**
   * ログインユーザー情報とJWTトークンをlocalStrageに格納
   * @param userData ログインユーザー情報
   * @param token JWTトークン
   */
  me(userData: User): void {
    this.loginUserInfo.user = new User();
    this.loginUserInfo.user.id = userData['id'];
    this.loginUserInfo.user.username = userData['username'];
    this.loginUserInfo.user.email = userData['email'];
    this.loginUserInfo.user.displayUsername = userData['display_username'];
    this.loginUserInfo.user.profile = userData['profile'];
    this.loginUserInfo.user.iconImage = userData['icon_image'];
    localStorage.setItem('user', JSON.stringify(this.loginUserInfo));
  }

  /**
   * ログイン処理
   * @param loginUser ユーザー情報
   * @param token アクセストークン
   */
  login(loginUser: User): void {
    this.me(loginUser);
    this.session.login = true;
    this.sessionSubject.next(this.session);
    this.userSubject.next(this.loginUserInfo);
  }

  /**
   * ログアウト処理
   */
  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.userSubject.next(this.loginUserInfo.reset());
    this.sessionSubject.next(this.session.reset());
    console.log(this.session.login);
  }

  /**
   * ログイン状態を判定
   * トークンがあればログイン済みとする
   */
  chkLogin(): boolean {
    return !!localStorage.getItem('token') && !!localStorage.getItem('user');
  }

  /**
   * ログインフォームまたは登録フォームを判定
   * @param isSignForm
   */
  IsSignForm(isSignForm: boolean): void {
    this.isSignForm = isSignForm;
    this.isSignFormSubject.next(this.isSignForm);
  }
}
