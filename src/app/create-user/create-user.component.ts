import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, Observable, pipe, throwError } from 'rxjs';
import { User } from '../models';
import { UsersDataService } from '../services/users-data.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  users: User[] = [];

  formCreateUser = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    picture: new FormControl(''),
  });

  submitted = false;

  get f() {
    return this.formCreateUser.controls;
  }

  constructor(private userData: UsersDataService, private router: Router) {}

  ngOnInit(): void {
    console.warn(this.submitted);
  }

  onSubmit(data: any) {
    this.submitted = true;
    this.userData.saveUser(data).subscribe((result: any) => {
      this.formCreateUser.reset();
      this.router.navigate(['user']);
    });
  }
}
