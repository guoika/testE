import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ServicepriceService {
    API_URL = environment.API_URL;
    constructor(private http: HttpClient) { }

    list() {
        return this.http.get(`${this.API_URL}/api/serviceprice`).pipe(map((result: any) => result.Payload));
    }

    create(data) {
        return this.http.post(`${this.API_URL}/api/serviceprice`, data).pipe(map((result: any) => result.Payload));
    }

    delete(id) {
        return this.http.delete(`${this.API_URL}/api/serviceprice/${id}`).pipe(map((result: any) => result));
    }

    update(id, data) {
        return this.http.put(`${this.API_URL}/api/serviceprice/${id}`, data).pipe(map((result: any) => result));
    }
    listServiceTypes() {
        return this.http
            .get(`${this.API_URL}/api/ServiceTypes`)
            .pipe(map((res: any) => res.Payload));
    }
}
