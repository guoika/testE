import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http: HttpClient
    constructor(private handler: HttpBackend) {
        this.http = new HttpClient(handler);
    }
    public login(username: string, pwd: string): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        };
        return this.http.post<any>(`${environment.API_URL}/token`,
            `grant_type=password&username=${username}&password=${pwd}`,
            httpOptions);

    }
}
