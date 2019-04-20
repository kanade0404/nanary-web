import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotifyService } from './notify.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GlobalService } from './global.service';
import { MatSnackBar } from '@angular/material';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json;charset=utf-8' });

  constructor(private http: HttpClient,
    private globalService: GlobalService,
    private notify: NotifyService,
    private snackBar: MatSnackBar, private router: Router) {}

  /**
   * sign out and remove token in local storage
   */
  signOut() {
    localStorage.removeItem('token');
  }

  /**
   * sing in
   * @param userData signin user info
   */
  signIn(userData: any) {
    this.http.post(environment.baseUrl + 'api-auth-token/', userData, { headers: this.httpHeaders }).subscribe(
      response => {
        this.globalService.me = response['user'];
        localStorage.setItem('token', response['token']);
        this.snackBar.open(
          'ログインに成功しました',
          '',
          { duration: 2000 }
        );
        this.router.navigate(['home']);
      },
      error => {
        this.handleError(error);
        this.snackBar.open(
          'ログインに失敗しました',
          '',
          { duration: 2000 }
        );
      }
    )
  }

  /**
   * sign up
   * @param userData signup user info
   */
  signUp(userData: any) {
    this.http.post(environment.baseUrl + 'auth/', userData, { headers: this.httpHeaders }).subscribe(
      response => {
        this.snackBar.open(
          'ユーザー登録に成功しました',
          '',
          {duration: 2000}
        );
        this.router.navigate(['login']);
      },
      error => {
        this.handleError(error);
        this.snackBar.open(
          'ユーザー登録に失敗しました',
          '',
          {duration: 2000}
        );
      }
    )
  }

  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
    this.notify.update(error.message, 'error');
  }
}
