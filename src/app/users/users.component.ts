import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { catchError, Observable, pipe, throwError } from 'rxjs';
import { UsersDataService } from '../services/users-data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: any;

  constructor(private userData: UsersDataService) {}

  ngOnInit(): void {
    this.userData.getUsers().subscribe((data: any) => {
      this.users = data.data;
    });
  }

  onDelete(data: any) {
    this.userData.deleteUser(data).subscribe((result: any) => {
      this.users = result.data;
    });
  }
}
