import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Session } from '../models/session';
import { Subject } from 'rxjs';
import { LoginUserInfo } from '../models/loginUserInfo';
import { UserService } from './user.service';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';

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

  public isSignForm = false;
  public isSignFormSubject = new Subject<boolean>();
  public isSignFormState = new Subject<boolean>();
  /**
   * User
   */
  public loginUserInfo: LoginUserInfo = new LoginUserInfo();
  public userSubject = new Subject<LoginUserInfo>();
  public userState = this.userSubject.asObservable();

  set me(userData: any) {
    this.loginUserInfo.user = new User();
    this.loginUserInfo.user.id = userData['user']['id'];
    this.loginUserInfo.user.username = userData['user']['username'];
    this.loginUserInfo.user.email = userData['user']['email'];
    this.loginUserInfo.user.displayUsername =
      userData['user']['display_username'];
    this.loginUserInfo.user.profile = userData['user']['profile'];
    this.loginUserInfo.user.iconImage = userData['user']['icon_image'];
    this.loginUserInfo.token = userData['token'];
    localStorage.setItem('user_info', JSON.stringify(this.loginUserInfo));
  }

  /**
   * ログイン処理
   * @param user ユーザー情報
   * @param token アクセストークン
   */
  login(loginUser: User, token: string): void {
    this.me = { user: loginUser, token: token };
    this.session.login = true;
    this.sessionSubject.next(this.session);
    this.userSubject.next(this.loginUserInfo);
  }
  // ログアウト処理
  logout(): void {
    localStorage.removeItem('user_info');
    this.userSubject.next(this.loginUserInfo.reset());
    this.sessionSubject.next(this.session.reset());
    console.log(this.session.login);
  }

  /**
   * ログイン状態を判定
   * トークンがあればログイン済みとする
   */
  chkLogin(): boolean {
    return localStorage.getItem('user_info') ? true : false;
  }

  IsSignForm(isSignForm: boolean): void {
    this.isSignForm = isSignForm;
    this.isSignFormSubject.next(this.isSignForm);
  }
}
