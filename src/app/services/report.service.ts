import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class ReportService {
    API_URL = environment.API_URL;
    constructor(
        private http: HttpClient
    ) { }
    getFormReport(providerId): Observable<any> {
        return this.http.get(`${this.API_URL}/api/ReportForm/${providerId}`).pipe(map((result: any) => result.Payload));
    }
    createFormReport(data): Observable<any> {
        return this.http.post(`${this.API_URL}/api/ReportForm`, data).pipe(map((result: any) => result.Payload));
    }
    getReport(sDate, eDate): Observable<any> {
        return this.http.get(`${this.API_URL}/api/ReportForm/Report?FromDate=${sDate}&ToDate=${eDate}`)
          .pipe(map((result: any) => result.Payload));
    }
}
