import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Question } from '../models/question';


@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json;charset=UTF-8',
   'Authorization': 'Token ' + localStorage.getItem('token')});
  constructor(private http: HttpClient) { }
  
  findAll(): Observable<any> {
    return this.http.get(environment.baseApiUrl + 'question/',
    {headers: this.httpHeaders});
  }
  findById(id: string): Observable<any> {
    return this.http.get(environment.baseApiUrl + `question/${id}/`,
    {headers: this.httpHeaders});
  }
  save(question: Question): Observable<any> {
    return this.http.post(environment.baseApiUrl + 'question/', question,
    {headers: this.httpHeaders});
  }
  update(question: Question): Observable<any> {
    return this.http.put(environment.baseApiUrl + 'question/', question,
    {headers: this.httpHeaders});
  }
}
