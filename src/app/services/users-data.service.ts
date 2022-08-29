import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersDataService {
  urlRoot = 'https://dummyapi.io/data/v1';

  constructor(private http: HttpClient) {}

  getUsers() {
    const headers = new HttpHeaders({
      'app-id': '63033943889b3aab444829f0',
    });
    const requestOptions = { headers: headers };
    return this.http.get(this.urlRoot + '/user?created=1', requestOptions);
  }

  getUserById(data: any) {
    const headers = new HttpHeaders({
      'app-id': '63033943889b3aab444829f0',
    });
    const requestOptions = { headers: headers };
    return this.http.get(this.urlRoot + '/user/' + data, requestOptions);
  }

  getOldDataUser(data: any) {
    const headers = new HttpHeaders({
      'app-id': '63033943889b3aab444829f0',
    });
    const requestOptions = { headers: headers };
    return this.http.get(this.urlRoot + '/user/' + data, requestOptions);
  }

  saveUser(data: any) {
    const headers = new HttpHeaders({
      'app-id': '63033943889b3aab444829f0',
    });
    const requestOptions = { headers: headers };
    return this.http.post(this.urlRoot + '/user/create', data, requestOptions);
  }

  updateUser(userId: any, data: any) {
    const headers = new HttpHeaders({
      'app-id': '63033943889b3aab444829f0',
    });
    const requestOptions = { headers: headers };
    return this.http.put(
      this.urlRoot + '/user/' + userId,
      data,
      requestOptions
    );
  }

  deleteUser(data: any) {
    const headers = new HttpHeaders({
      'app-id': '63033943889b3aab444829f0',
    });
    const requestOptions = { headers: headers };
    return this.http.delete(this.urlRoot + '/user/' + data, requestOptions);
  }
}
