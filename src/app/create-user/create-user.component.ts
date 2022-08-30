import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, Observable, pipe, throwError } from 'rxjs';
import { UsersDataService } from '../services/users-data.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  users: any;

  formCreateUser = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    picture: new FormControl(''),
  });

  constructor(private userData: UsersDataService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(data: any) {
    this.userData.saveUser(data).subscribe((result: any) => {
      this.formCreateUser.reset();
      this.router.navigate(['user']);
    });
  }
}
