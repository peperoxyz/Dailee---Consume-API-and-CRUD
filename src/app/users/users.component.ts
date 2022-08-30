import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { catchError, Observable, pipe, throwError } from 'rxjs';
import { UsersDataService } from '../services/users-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: any;

  constructor(private userData: UsersDataService, private router: Router) {}

  ngOnInit(): void {
    this.userData.getUsers().subscribe((data: any) => {
      this.users = data.data;
    });
  }

  onDelete(data: any) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userData.deleteUser(data).subscribe((result: any) => {
        this.users = result.data;
      });
    }
  }
}
