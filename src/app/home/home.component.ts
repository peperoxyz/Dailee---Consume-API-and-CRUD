import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, pipe, throwError } from 'rxjs';
import { Post } from '../models';
import { PostsDataService } from '../services/posts-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  constructor(private postData: PostsDataService, private router: Router) {}

  onDelete(data: any) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.postData.deletePost(data).subscribe((result: any) => {
        this.posts = result.data;
        // this.router.navigate(['/']);
      });
    }
  }

  ngOnInit(): void {
    this.postData.getPosts().subscribe((data: any) => {
      this.posts = data.data;
    });
  }
}
