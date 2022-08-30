import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsDataService } from '../services/posts-data.service';
import { UsersDataService } from '../services/users-data.service';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css'],
})
export class UpdatePostComponent implements OnInit {
  postId: any;
  oldData: any = {};
  posts: any;
  users: any;
  tags: string[] = [];
  foo: any;
  bar: any;
  selectedTags: string[] = [];

  formUpdatePost = new FormGroup({
    image: new FormControl(''),
    text: new FormControl(''),
    tags: new FormArray([new FormControl(), new FormControl()]),
    likes: new FormControl('0'),
    owner: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private postData: PostsDataService,
    private router: Router,
    private userData: UsersDataService
  ) {}

  getOldPost() {
    this.postData.getPosts().subscribe((data: any) => {
      this.oldData = data.data.find((post: any) => post.id === this.postId);
      this.formUpdatePost.patchValue({
        image: this.oldData.image,
        text: this.oldData.text,
        tags: this.oldData.tags,
        likes: this.oldData.likes,
        owner: this.oldData.owner,
      });
    });
  }

  addToTag(selectedTag: string) {
    this.selectedTags.push(selectedTag);
    this.formUpdatePost.controls['tags'].patchValue(this.selectedTags);
    this.foo = this.formUpdatePost.value.tags;
    console.warn(this.foo);
  }

  onSubmit() {
    this.postData
      .updatePost(this.postId, this.formUpdatePost.value)
      .subscribe((data: any) => {
        this.router.navigate(['/']);
      });
  }

  ngOnInit(): void {
    // get id post from url
    this.postId = this.route.snapshot.paramMap.get('postId');

    this.postData.getPosts().subscribe((data: any) => {
      this.posts = data.data;
    });

    this.userData.getUsers().subscribe((data: any) => {
      this.users = data.data;
    });

    this.postData.getTags().subscribe((data: any) => {
      this.tags = data.data.slice(6, 21);
    });

    this.getOldPost();
  }
}
