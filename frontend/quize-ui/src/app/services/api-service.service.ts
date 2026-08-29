import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private readonly apiUrl = environment.url;

  constructor(private http: HttpClient) { }

  getData(endpoint: string) {
    const url = `${this.apiUrl}/${endpoint}`;
    return this.http.get(url);
  }

  postData(endpoint: string, data: any) {
    return this.http.post(`${this.apiUrl}/${endpoint}`, data);
  }

  putData(endpoint: string, data: any) {
    return this.http.put(`${this.apiUrl}/${endpoint}`, data);
  }

  patchData(endpoint: string, data: any) {
    return this.http.patch(`${this.apiUrl}/${endpoint}`, data);
  }

  deleteData(endpoint: string) {
    return this.http.delete(`${this.apiUrl}/${endpoint}`);
  }
}
