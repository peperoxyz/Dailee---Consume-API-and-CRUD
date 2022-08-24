import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpClient) {}

  posts: any;

  getPosts() {
    const headers = new HttpHeaders({
      'app-id': '63033943889b3aab444829f0',
    });
    const requestOptions = { headers: headers };

    this.http
      .get('https://dummyapi.io/data/v1/post', requestOptions)
      .subscribe((posts: any) => {
        this.posts = posts.data;
      });
  }

  ngOnInit(): void {
    this.getPosts();
  }
}
