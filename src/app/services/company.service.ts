import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CompanyService {
    API_URL = environment.API_URL;
    constructor(
        private http: HttpClient
    ) { }

    detail() {
        return this.http.get(`${this.API_URL}/api/company/username`).pipe(map((result: any) => result.Payload));
    }
    getSubcription() {
      return this.http.get(`${this.API_URL}/api/company/getCompanySubscriberInfo`).pipe(map((result: any) => result.Payload));
    }
    getCompanyPaymentMethods() {
      return this.http.get(`${this.API_URL}/api/company/getCompanyPaymentMethods`).pipe(map((result: any) => result.Payload));
    }
    addCompanyPaymentMethod(data) {
      return this.http.post(`${this.API_URL}/api/company/addCompanyPaymentMethod`, data).pipe(map((result: any) => result.Payload));
    }
    payWithMethod( id1, id2) {
      return this.http.post(`${this.API_URL}/api/company/payWithMethod/${id1}/${id2}`, null);
    }
    setDefaultCompanyPaymentMethod(id) {
      return this.http.post(`${this.API_URL}/api/company/setDefaultCompanyPaymentMethod/${id}`, null)
      .pipe(map((result: any) => result.Payload));
    }
    deleteCompanyPaymentMethod(id) {
      return this.http.post(`${this.API_URL}/api/company/deleteCompanyPaymentMethod/${id}`, null)
      .pipe(map((result: any) => result.Payload));
    }
    getPaymentPaypalURL(id) {
      return this.http.get(`${this.API_URL}/api/company/getCompanyPaymentPaypalURL/${id}`).pipe(map((result: any) => result.Payload));
    }
    getCompanyPaymentLogs() {
      return this.http.get(`${this.API_URL}/api/company/getCompanyPaymentLogs`).pipe(map((result: any) => result.Payload));
    }
    update(id, data) {
        return this.http.put(`${this.API_URL}/api/company/${id}`, data).pipe(map((result: any) => result.Payload));
    }
    registerClinic(data) {
      return this.http.post(`${this.API_URL}/api/Account/RegisterClinic`, data);

    }
}
