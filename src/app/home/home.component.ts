import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, Observable, pipe, throwError } from 'rxjs';
import { PostsDataService } from '../services/posts-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  posts: any;
  constructor(private postData: PostsDataService) {}

  onDelete(data: any) {
    this.postData.deletePost(data).subscribe((result: any) => {
      this.posts = result.data;
    });
  }

  // ngOnDestroy(): void {
  //   return this.ngOnInit();
  // }

  ngOnInit(): void {
    // this.getPosts();
    this.postData.getPosts().subscribe((data: any) => {
      this.posts = data.data;
    });
  }
}
