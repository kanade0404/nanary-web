import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(private http: HttpClient) {}

  findAll(): Observable<any> {
    return this.http.get(environment.baseApiUrl + 'question/', {
      headers: new HttpHeaders({
        'Content-Type': environment.contentTypeJson,
        Authorization: 'JWT ' + localStorage.getItem('token')
      })
    });
  }
  findById(id: string): Observable<any> {
    return this.http.get(environment.baseApiUrl + `question/${id}/`, {
      headers: new HttpHeaders({
        'Content-Type': environment.contentTypeJson,
        Authorization: 'JWT ' + localStorage.getItem('token')
      })
    });
  }
  save(question: Question): Observable<any> {
    return this.http.post(environment.baseApiUrl + 'question/', question, {
      headers: new HttpHeaders({
        'Content-Type': environment.contentTypeJson,
        Authorization: 'JWT ' + localStorage.getItem('token')
      })
    });
  }
  update(question: Question): Observable<any> {
    return this.http.put(environment.baseApiUrl + 'question/', question, {
      headers: new HttpHeaders({
        'Content-Type': environment.contentTypeJson,
        Authorization: 'JWT ' + localStorage.getItem('token')
      })
    });
  }
}
