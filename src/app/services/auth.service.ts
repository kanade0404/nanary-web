import { Injectable } from '@angular/core';
import { NotifyService } from './notify.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { LoginUser } from '../models/loginUser';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private notify: NotifyService) {}

  /**
   * サインイン
   * @param userData signin user info
   */
  signIn(userData: LoginUser) {
    console.log('singin');
    return this.http
      .post<any>(environment.baseUrl + 'api-auth-token/', userData, {
        headers: new HttpHeaders({
          'Content-Type': environment.contentTypeJson
        })
      })
      .pipe(
        map(response => {
          console.log(response.token);
          if (response.token) {
            localStorage.setItem('token', response.token);
          }
        })
      );
  }

  /**
   * サインアップ
   * @param userData signup user info
   */
  signUp(userData: any): Observable<any> {
    console.log('signup');
    console.log(userData);
    return this.http.post(environment.baseUrl + 'auth/', userData, {
      headers: new HttpHeaders({
        'Content-Type': environment.contentTypeJson
      })
    });
  }

  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
    this.notify.update(error.message, 'error');
  }
}
