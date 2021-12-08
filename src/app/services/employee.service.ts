import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    API_URL = environment.API_URL;
    constructor(
        private http: HttpClient
    ) { }

    listEmployee(type) {
        return this.http.get(`${this.API_URL}/api/provider/company/username?Status=${type}`).pipe(map((result: any) => result.Payload));
    }

    detail(id) {
        return this.http.get(`${this.API_URL}/api/provider/${id}`).pipe(map((result: any) => result.Payload));
    }

    update(id, data) {
        return this.http.put(`${this.API_URL}/api/provider/${id}`, data).pipe(map((result: any) => result.Payload));
    }

    create(data) {
        return this.http.post(`${this.API_URL}/api/Account/Register`, data).pipe(map((result: any) => result));
    }

    delete(id) {
        return this.http.delete(`${this.API_URL}/api/provider/${id}`).pipe(map((result: any) => result.Payload));
    }

    listPosition() {
        return this.http.get(`${this.API_URL}/api/position`).pipe(map((result: any) => result.Payload));
    }

}
