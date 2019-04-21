import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Session } from '../models/session';
import { Subject } from 'rxjs';

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
  public user: User = new User();
  public userSubject = new Subject<User>();
  public userState = this.userSubject.asObservable();

  set me(userData: any) {
    this.user = new User();
    this.user.Id = userData['id'];
    this.user.UUID = userData['uuid'];
    this.user.Username = userData['username'];
    this.user.Email = userData['email'];
    this.user.DisplayUsername = userData['display_username'];
    this.user.Profile = userData['profile'];
    this.user.IconImage = userData['icon_image'];
    localStorage.setItem('account', JSON.stringify(this.user));
  }

  /**
   * ログイン処理
   * @param user ユーザー情報
   * @param token アクセストークン
   */
  login(user: User, token: string): void {
    // ユーザー情報をセット
    localStorage.setItem('account', JSON.stringify(user));
    this.user = user;
    // トークンをセット
    localStorage.setItem('token', token);
    this.session.login = true;
    this.sessionSubject.next(this.session);
    this.userSubject.next(this.user);
  }
  // ログアウト処理
  logout(): void {
    localStorage.removeItem('account');
    localStorage.removeItem('token');
    this.userSubject.next(this.user.reset());
    this.sessionSubject.next(this.session.reset());
  }

  /**
   * ログイン状態を判定
   * トークンがあればログイン済みとする
   */
  chkLogin(): boolean {
    return localStorage.getItem('token') && localStorage.getItem('user')? true: false;
  }

  IsSignForm(isSignForm: boolean): void {
    this.isSignForm = isSignForm;
    this.isSignFormSubject.thrownError(this.isSignForm);
  }
}
