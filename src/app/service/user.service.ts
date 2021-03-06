import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURI: String = "http://localhost:8081/userservice/";

  constructor(private http: HttpClient) { }

  getUsers(): any {
    return this.http.get(this.baseURI + 'users');
  }

  saveUser(user): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
      })
    };
    return this.http.post(this.baseURI + 'save', user, httpOptions);
  }
}
