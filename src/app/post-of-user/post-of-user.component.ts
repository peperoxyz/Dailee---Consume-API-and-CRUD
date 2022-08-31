import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PostsDataService } from '../services/posts-data.service';
import { UsersDataService } from '../services/users-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post, User } from '../models';

@Component({
  selector: 'app-post-of-user',
  templateUrl: './post-of-user.component.html',
  styleUrls: ['./post-of-user.component.css'],
})
export class PostOfUserComponent implements OnInit {
  user?: User;
  posts: Post[] = [];
  post?: Post;
  ownerId: string = '';
  postId: string = '';

  constructor(
    private userData: UsersDataService,
    private postData: PostsDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  getPostOfUser(data: any) {
    this.postData.getPostOfUser(this.ownerId).subscribe((result: any) => {
      this.posts = result.data;
    });
  }

  // try get user by id
  getUserById(data: any) {
    this.userData.getUserById(this.ownerId).subscribe((result: any) => {
      this.user = result;
    });
  }

  onDelete(data: any) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.postData.deletePost(data).subscribe((result: any) => {
        this.posts = result.data;
        this.router.navigate(['/user']);
      });
    }
  }

  onClick(data: any) {
    this.router.navigate(['home/detailPost/' + data]);
  }

  onLike(postId: any, data: any) {
    this.post = data;
    if (this.post) {
      this.post.likes = Number(this.post.likes) + 1;
      this.postData.likePost(postId, data).subscribe((result: any) => {
        this.post = result;
      });
    }
  }

  ngOnInit(): void {
    // Get the user id from the current route
    const routeParams = this.route.snapshot.paramMap;
    this.ownerId = String(routeParams.get('ownerId'));

    // get post id from param
    const routeParamsP = this.route.snapshot.paramMap;
    this.postId = String(routeParamsP.get('postId'));

    this.getPostOfUser(this.ownerId);
    this.getUserById(this.ownerId);
    console.log(this.posts);
  }
}

/**
 * klik icon hati
 * dapetin semua data post detail
 * jadiin itu body di request update nya
 * ambil likes, ubah ke number, tambahkan 1, kembalikan ke string
 * kirim ke server
 */
