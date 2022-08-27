import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsDataService } from '../services/posts-data.service';
import { UsersDataService } from '../services/users-data.service';

@Component({
  selector: 'app-detail-posts',
  templateUrl: './detail-posts.component.html',
  styleUrls: ['./detail-posts.component.css'],
})
export class DetailPostsComponent implements OnInit {
  postById: any;
  postId: string = '';

  constructor(
    private postData: PostsDataService,
    private userData: UsersDataService,
    private route: ActivatedRoute
  ) {}

  getPostById(data: any) {
    this.postData.getPostById(this.postId).subscribe((result: any) => {
      this.postById = result.data;
      console.warn(this.postId);
    });
  }

  ngOnInit(): void {
    // get post id from param
    const routeParams = this.route.snapshot.paramMap;
    this.postId = String(routeParams.get('postId'));

    this.getPostById(this.postId);
    console.log(this.postById);
  }
}
