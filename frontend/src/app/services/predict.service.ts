// src/app/services/predict.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PredictService {
  private apiUrl = 'http://localhost:8000/predict/';  // API endpoint URL

  constructor(private http: HttpClient) { }

  predict(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');

    return this.http.post(this.apiUrl, formData, { headers: headers });
  }
}
