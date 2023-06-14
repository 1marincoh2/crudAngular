import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  //url: string = 'https://dummyjson.com/';
  url2: string = 'https://jsonserve.vercel.app/';
  constructor(private http: HttpClient) {}

  /* getProducts() {
    return this.http.get(`${this.url}products`);
  }
 */

  getDatos() {
    return this.http.get(`${this.url2}posts`);
  }
  postDatos(body: any) {
    return this.http.post(`${this.url2}posts`, body);
  }
  UpdateDatos(id: any, body: any) {
    return this.http.put(`${this.url2}posts/${id}`, body);
  }
  deleteDatos(id: any) {
    return this.http.delete(`${this.url2}posts/${id}`);
  }
}
