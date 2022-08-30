import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  selectedTags: string[] = [];
  postId: string = '';
  foo: any;
  bar: any;

  formCreatePost = new FormGroup({
    image: new FormControl(''),
    text: new FormControl(''),
    tags: new FormArray([new FormControl(), new FormControl()]),
    owner: new FormControl(''),
    likes: new FormControl('0'),
  });

  constructor(
    private postData: PostsDataService,
    private userData: UsersDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.postData.getPosts().subscribe((data: any) => {
      this.posts = data.data;
    });

    this.userData.getUsers().subscribe((data: any) => {
      this.users = data.data;
    });

    this.postData.getTags().subscribe((data: any) => {
      this.tags = data.data.slice(6, 21);
    });
  }

  addToTag(selectedTag: string) {
    this.selectedTags.push(selectedTag);
    this.formCreatePost.controls['tags'].patchValue(this.selectedTags);
    this.foo = this.formCreatePost.value.tags;
    console.warn(this.foo);
  }

  onReset() {
    this.formCreatePost.value.tags = [];
    this.formCreatePost.controls['tags'].patchValue(this.foo);
    console.log(this.foo);
  }

  selectedUser(userId: string) {
    this.ownerId = userId;
    this.formCreatePost.controls['owner'].setValue(this.ownerId);
    this.bar = this.formCreatePost.value.owner
  }

  onSubmit() {
    this.postData
      .savePost(this.formCreatePost.value)
      .subscribe((result: any) => {
        this.posts = result.data;
        console.warn(this.formCreatePost.value);
        this.formCreatePost.reset();
        this.router.navigate(['home']);
      });
  }
}
