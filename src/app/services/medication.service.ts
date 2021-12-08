import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MedicationService {

    constructor(
        private http: HttpClient
    ) { }
    API_URL = environment.API_URL;

    list() {
        return this.http.get(`${this.API_URL}/api/drug/username`).pipe(map((result: any) => result.Payload));
    }

    detail(id) {
        return this.http.get(`${this.API_URL}/api/drug/${id}`).pipe(map((result: any) => result.Payload));
    }

    delete(id) {
        return this.http.delete(`${this.API_URL}/api/drug/${id}`).pipe(map((result: any) => result.Payload));
    }

    update(id, data) {
        return this.http.put(`${this.API_URL}/api/drug/${id}`, data).pipe(map((result: any) => result.Payload));
    }

    create(data) {
        return this.http.post(`${this.API_URL}/api/drug`, data).pipe(map((result: any) => result.Payload));
    }
}
