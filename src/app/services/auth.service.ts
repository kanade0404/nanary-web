import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotifyService } from './notify.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GlobalService } from './global.service';
import { MatSnackBar } from '@angular/material';
import { User } from '../models/user';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpHeaders = new HttpHeaders(environment.httpHeaders);

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
  signIn(userData: User): Observable<any> {
    return this.http.post(environment.baseUrl + 'api-auth-token/', userData, { headers: this.httpHeaders });
  }

  /**
   * sign up
   * @param userData signup user info
   */
  signUp(userData: any): Observable<any> {
    return this.http.post(environment.baseUrl + 'auth/', userData, { headers: this.httpHeaders });
  }

  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
    this.notify.update(error.message, 'error');
  }
}
