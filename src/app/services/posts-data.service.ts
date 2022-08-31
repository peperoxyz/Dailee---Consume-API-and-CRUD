import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostsDataService {
  tags: any;
  urlRoot = 'https://dummyapi.io/data/v1';
  headers = new HttpHeaders({
    'app-id': '63033943889b3aab444829f0',
  });
  requestOptions = { headers: this.headers };

  constructor(private http: HttpClient) {}

  getPosts() {
    // return this.http.get(this.urlRoot + '/post', requestOptions);
    return this.http.get(this.urlRoot + '/post?created=1', this.requestOptions);
  }

  // get post by id
  getPostById(data: any) {
    return this.http.get(this.urlRoot + '/post/' + data, this.requestOptions);
  }

  getCommentsOfPost(data: any) {
    return this.http.get(
      this.urlRoot + '/post/' + data + '/comment',
      this.requestOptions
    );
  }

  getComments() {
    return this.http.get(this.urlRoot + '/comment', this.requestOptions);
  }

  savePost(data: any) {
    return this.http.post(
      this.urlRoot + '/post/create',
      data,
      this.requestOptions
    );
  }

  updatePost(postId: any, data: any) {
    return this.http.put(
      this.urlRoot + '/post/' + postId,
      data,
      this.requestOptions
    );
  }

  likePost(postId: any, data: any) {
    return this.http.put(
      this.urlRoot + '/post/' + postId,
      data,
      this.requestOptions
    );
  }

  saveComment(data: any) {
    return this.http.post(
      this.urlRoot + '/comment/create',
      data,
      this.requestOptions
    );
  }

  deletePost(data: any) {
    return this.http.delete(
      this.urlRoot + '/post/' + data,
      this.requestOptions
    );
  }

  getTags() {
    return this.http.get(this.urlRoot + '/tag?limit=10', this.requestOptions);
  }

  getPostOfUser(data: any) {
    return this.http.get(
      this.urlRoot + '/user/' + data + '/post',
      this.requestOptions
    );
  }
}
