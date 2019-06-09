import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}
  findUserByEmail(email: string): Observable<any> {
    return this.http.get(environment.baseApiUrl + 'users/?email=' + email, {
      headers: new HttpHeaders({
        'Content-Type': environment.contentTypeJson,
        Authorization: 'JWT ' + localStorage.getItem('token')
      })
    });
  }
}
