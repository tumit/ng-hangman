import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Word } from '../models/word';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  constructor(private http: HttpClient) { }

  public get(): Observable<Word> {
    return this.http.get<Word>(environment.wordUrl);
  }
}
