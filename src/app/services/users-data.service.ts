import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersDataService {
  urlRoot = 'https://dummyapi.io/data/v1';
  headers = new HttpHeaders({
    'app-id': '63033943889b3aab444829f0',
  });
  requestOptions = { headers: this.headers };

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(this.urlRoot + '/user?created=1', this.requestOptions);
  }

  getUserById(data: any) {
    return this.http.get(this.urlRoot + '/user/' + data, this.requestOptions);
  }

  getOldDataUser(data: any) {
    return this.http.get(this.urlRoot + '/user/' + data, this.requestOptions);
  }

  saveUser(data: any) {
    return this.http.post(
      this.urlRoot + '/user/create',
      data,
      this.requestOptions
    );
  }

  updateUser(userId: any, data: any) {
    return this.http.put(
      this.urlRoot + '/user/' + userId,
      data,
      this.requestOptions
    );
  }

  deleteUser(data: any) {
    return this.http.delete(
      this.urlRoot + '/user/' + data,
      this.requestOptions
    );
  }
}
