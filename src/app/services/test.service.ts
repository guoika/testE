import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  API_URL = environment.API_URL;

  constructor(
    private http: HttpClient
  ) { }

  listParentTestcategory() {
    return this.http.get(`${this.API_URL}/api/order?VisitId=0&ProblemId=0`).pipe(map((res: any) => res.Payload));
  }

  craeteTestcategory(data) {
    return this.http.post(`${this.API_URL}/api/testcategory`, data).pipe(map((res: any) => res.Payload));
  }
  editTestcategory(id, data) {
    return this.http.put(`${this.API_URL}/api/testcategory/${id}`, data).pipe(map((res: any) => res.Payload));
  }
  deleteTestcategory(id) {
    return this.http.delete(`${this.API_URL}/api/testcategory/${id}`).pipe(map((res: any) => res.Payload));
  }

  craeteTest(data) {
    return this.http.post(`${this.API_URL}/api/Test`, data).pipe(map((res: any) => res.Payload));
  }
  editTest(id, data) {
    return this.http.put(`${this.API_URL}/api/Test/${id}`, data).pipe(map((res: any) => res.Payload));
  }
  deleteTest(id) {
    return this.http.delete(`${this.API_URL}/api/Test/${id}`).pipe(map((res: any) => res.Payload));
  }

  craeteOrgan(data) {
    return this.http.post(`${this.API_URL}/api/organ`, data).pipe(map((res: any) => res.Payload));
  }
  editOrgan(id, data) {
    return this.http.put(`${this.API_URL}/api/organ/${id}`, data).pipe(map((res: any) => res.Payload));
  }
  deleteOrgan(id) {
    return this.http.delete(`${this.API_URL}/api/organ/${id}`).pipe(map((res: any) => res.Payload));
  }

  listOrgans() {
    return this.http.get(`${this.API_URL}/api/organ`).pipe(map((res: any) => res.Payload));
  }

  createOrgans(data) {
    return this.http.post(`${this.API_URL}/api/organ`, data).pipe(map((res: any) => res.Payload));
  }

  deleteOrgans(id) {
    return this.http.delete(`${this.API_URL}/api/organ/${id}`).pipe(map((res: any) => res.Payload));
  }

  listTest(OrganId, TestCategoryId) {
    return this.http.get(`${this.API_URL}/api/VisitTest/TestCombinationTests?OrganId=${OrganId}&TestCategoryId=${TestCategoryId}`).pipe(map((res: any) => res.Payload));
  }

  createTest(data) {
    return this.http.post(`${this.API_URL}/api/test`, data).pipe(map((res: any) => res.Payload));
  }

  createTestCombination(data) {
    return this.http.post(`${this.API_URL}/api/testcombination`, data).pipe(map((res: any) => res.Payload));
  }

  listTestLab(id) {
    return this.http.get(`${this.API_URL}/api/testcategory?ParentTestcategoryId=${id}`).pipe(map((res: any) => res.Payload));
  }

  listTestLabTestcategoryId(id) {
    return this.http.get(`${this.API_URL}/api/test?TestcategoryId=${id}`).pipe(map((res: any) => res.Payload));
  }
}
