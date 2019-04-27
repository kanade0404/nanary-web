import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json;charset=UTF-8',
    Authorization: 'Token ' + localStorage.getItem('token')
  });
  constructor(private http: HttpClient) {}
  findAll(): Observable<any> {
    return this.http.get(environment.baseApiUrl + 'comment/', {
      headers: this.httpHeaders
    });
  }
  findById(id: string): Observable<any> {
    return this.http.get(environment.baseApiUrl + `comment/${id}/`, {
      headers: this.httpHeaders
    });
  }
  save(comment: Comment): Observable<any> {
    return this.http.post(environment.baseApiUrl + 'comment/', comment, {
      headers: this.httpHeaders
    });
  }
  update(comment: Comment): Observable<any> {
    return this.http.put(environment.baseApiUrl + 'comment/', comment, {
      headers: this.httpHeaders
    });
  }
}
