import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PostsDataService } from '../services/posts-data.service';
import { UsersDataService } from '../services/users-data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-of-user',
  templateUrl: './post-of-user.component.html',
  styleUrls: ['./post-of-user.component.css'],
})
export class PostOfUserComponent implements OnInit {
  users: any;
  posts: any;
  ownerId: string = '';

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

  onDelete(data: any) {
    this.postData.deletePost(data).subscribe((result: any) => {
      this.posts = result.data;
      this.router.navigate(['user/' + this.ownerId]);
    });
  }

  ngOnInit(): void {
    // Get the user id from the current route
    const routeParams = this.route.snapshot.paramMap;
    this.ownerId = String(routeParams.get('ownerId'));

    this.getPostOfUser(this.ownerId);
    console.log(this.posts);
  }
}
