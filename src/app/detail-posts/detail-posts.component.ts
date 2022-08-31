import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
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
  detailPost: any;
  postId?: string | null;
  comments: any;
  commentsByPost: any;
  users: any;
  ownerId: string = '';

  formCreateComment = new FormGroup({
    message: new FormControl(''),
    owner: new FormControl(''),
    post: new FormControl(''),
  });

  constructor(
    private postData: PostsDataService,
    private userData: UsersDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  getPostById(data: any) {
    this.postData.getPosts().subscribe((result: any) => {
      this.postById = result.data.find((x: any) => x.id == this.postId);
    });
  }

  getComments() {
    this.postData.getComments().subscribe((result: any) => {
      this.comments = result.data;
    });
  }

  getCommentsOfPost(data: any) {
    this.postData.getCommentsOfPost(this.postId).subscribe((result: any) => {
      this.commentsByPost = result.data;
    });
  }

  selectedUser(userId: string) {
    this.ownerId = userId;
    this.formCreateComment.controls['owner'].setValue(this.ownerId);
  }

  onDelete(postId: any) {
    if (confirm('Are you sure you want to delete this post?')) {
      this.postData.deletePost(postId).subscribe((result: any) => {
        this.users = result.data;
        // this.router.navigate(['/user']);
      });
    }
  }

  onSubmit() {
    this.postData
      .saveComment(this.formCreateComment.value)
      .subscribe((result: any) => {
        this.comments = result.data;
      });
    this.getCommentsOfPost(this.postId);
    // this.formCreateComment.reset();
    // this.formCreateComment.patchValue({ post: this.postId });
    this.formCreateComment.get('message')?.reset();
  }

  /**
   * klik icon hati
   * dapetin semua data post detail
   * jadiin itu body di request update nya
   * ambil likes, ubah ke number, tambahkan 1
   * kirim ke server
   */

  onLike() {
    this.postById.likes = Number(this.postById.likes) + 1;
    this.postData
      .likePost(this.postId, this.postById)
      .subscribe((result: any) => {
        this.postById = result;
      });
  }

  ngOnInit(): void {
    this.userData.getUsers().subscribe((data: any) => {
      this.users = data.data;
    });

    // get post id from param
    const routeParams = this.route.snapshot.paramMap;
    this.postId = String(routeParams.get('postId'));
    this.formCreateComment.patchValue({ post: this.postId });
    // load posts by id in param
    this.getPostById(this.postId);
    this.getCommentsOfPost(this.postId);
    this.getComments();
  }
}
