import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ExamResultService {
    API_URL = environment.API_URL;

    constructor(
        private http: HttpClient
    ) { }


    delete(id): Observable<any> {
        return this.http.delete(`${this.API_URL}/api/result/${id}`).pipe(map((result: any) => result.Payload));
    }
    edit(data, id): Observable<any> {
      return this.http.put(`${this.API_URL}/api/result/${id}`, data).pipe(map((result: any) => result.Payload));
    }
    create(data): Observable<any> {
        return this.http.post(`${this.API_URL}/api/result`, data).pipe(map((result: any) => result.Payload));
    }
}
