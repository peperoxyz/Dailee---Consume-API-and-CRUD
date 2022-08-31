import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, pipe, throwError } from 'rxjs';
import { PostsDataService } from '../services/posts-data.service';
import { Post } from '../models';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  post?: Post;
  posts: Post[] = [];
  commentsByPost: Comment[] = [];
  postId?: string | null;
  constructor(private postData: PostsDataService, private router: Router) {}

  getCommentsOfPost(data: any) {
    this.postData.getCommentsOfPost(this.postId).subscribe((result: any) => {
      this.commentsByPost = result.data;
    });
  }

  /**
   *
   *
   */

  onLike(postId: any, data: any) {
    this.post = data;
    if (this.post) {
      this.post.likes = Number(this.post.likes) + 1;
      this.postData.likePost(postId, data).subscribe((result: any) => {
        this.post = result;
      });
    }
  }

  onDelete(data: any) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.postData.deletePost(data).subscribe((result: any) => {
        this.posts = result.data;
        this.postData.getPosts();
        window.location.reload();
      });
    }
  }

  ngOnInit(): void {
    this.postData.getPosts().subscribe((data: any) => {
      this.posts = data.data;
    });
  }
}
