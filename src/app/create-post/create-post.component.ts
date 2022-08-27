import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { catchError, Observable, pipe, throwError } from 'rxjs';
import { PostsDataService } from '../services/posts-data.service';
import { UsersDataService } from '../services/users-data.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  posts: any;
  users: any;
  tags: string[] = [];
  ownerId: string = '';
  selectedTag: string[] = [];
  postId: string = '';

  formCreatePost = new FormGroup({
    image: new FormControl(''),
    text: new FormControl(''),
    tag: new FormArray([new FormControl(), new FormControl()]),
    owner: new FormControl(''),
    likes: new FormControl('0'),
  });

  constructor(
    private postData: PostsDataService,
    private userData: UsersDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.postData.getPosts().subscribe((data: any) => {
      this.posts = data.data;
    });

    this.userData.getUsers().subscribe((data: any) => {
      this.users = data.data;
    });

    this.postData.getTags().subscribe((data: any) => {
      this.tags = data.data.slice(3, 13);
    });
  }

  addToTag(selectedTag: string) {
    this.selectedTag.push(selectedTag);
    this.formCreatePost.controls['tag'].patchValue(this.selectedTag);
  }

  selectedUser(userId: string) {
    this.ownerId = userId;
    this.formCreatePost.controls['owner'].setValue(this.ownerId);
  }

  onSubmit() {
    this.postData
      .savePost(this.formCreatePost.value)
      .subscribe((result: any) => {
        this.posts = result.data;
        console.warn(this.posts);
      });
  }
}
