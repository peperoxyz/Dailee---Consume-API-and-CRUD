import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PostsDataService } from '../services/posts-data.service';
import { UsersDataService } from '../services/users-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { find } from 'rxjs';

@Component({
  selector: 'app-post-of-user',
  templateUrl: './post-of-user.component.html',
  styleUrls: ['./post-of-user.component.css'],
})
export class PostOfUserComponent implements OnInit {
  users: any;
  posts: any;
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
      console.warn(this.posts);
    });
  }

  getUserFromRoute(data: any) {
    this.userData.getUsers().subscribe((result: any) => {
      this.users = result.data.find((x: any) => x.id === data);
      console.warn(this.users);
    });
  }

  // try get user by id
  getUserById(data: any) {
    this.userData.getUserById(this.ownerId).subscribe((result: any) => {
      console.warn(result);
      this.users = result;
      console.warn(this.users);
    });
  }

  onDelete(data: any) {
    this.postData.deletePost(data).subscribe((result: any) => {
      this.posts = result.data;
      // this.router.navigate(['user/' + this.ownerId]);
    });
  }

  onClick(data: any) {
    this.router.navigate(['home/detailPost/' + data]);
  }

  ngOnInit(): void {
    // Get the user id from the current route
    const routeParams = this.route.snapshot.paramMap;
    this.ownerId = String(routeParams.get('ownerId'));

    // get post id from param
    const routeParamsP = this.route.snapshot.paramMap;
    this.postId = String(routeParamsP.get('postId'));

    this.getPostOfUser(this.ownerId);
    this.getUserFromRoute(this.ownerId);
    this.getUserById(this.ownerId);
    console.log(this.posts);
  }
}
