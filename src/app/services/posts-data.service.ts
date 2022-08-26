import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/**
 * susun deklarasi
 * get data lama
 * isi data lama
 * ubah data lama
 * kirim ke api
 */

@Injectable({
  providedIn: 'root',
})
export class PostsDataService {
  tags: any;
  urlRoot = 'https://dummyapi.io/data/v1';

  constructor(private http: HttpClient) {}

  getPosts() {
    const headers = new HttpHeaders({
      'app-id': '63033943889b3aab444829f0',
    });
    const requestOptions = { headers: headers };
    return this.http.get(this.urlRoot + '/post', requestOptions);
    // return this.http.get(this.urlRoot + '/post?created=1', requestOptions);
  }

  savePost(data: any) {
    const headers = new HttpHeaders({
      'app-id': '63033943889b3aab444829f0',
    });
    const requestOptions = { headers: headers };
    return this.http.post(this.urlRoot + '/post/create', data, requestOptions);
  }

  deletePost(data: any) {
    const headers = new HttpHeaders({
      'app-id': '63033943889b3aab444829f0',
    });
    const requestOptions = { headers: headers };
    return this.http.delete(this.urlRoot + '/post/' + data, requestOptions);
  }

  getTags() {
    const headers = new HttpHeaders({
      'app-id': '63033943889b3aab444829f0',
    });
    const requestOptions = { headers: headers };
    return this.http.get(this.urlRoot + '/tag?limit=10', requestOptions);
  }

  getPostOfUser(data: any) {
    const headers = new HttpHeaders({
      'app-id': '63033943889b3aab444829f0',
    });
    const requestOptions = { headers: headers };
    return this.http.get(
      this.urlRoot + '/user/' + data + '/post',
      requestOptions
    );
  }
}
