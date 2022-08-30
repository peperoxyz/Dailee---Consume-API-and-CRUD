import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersDataService } from '../services/users-data.service';

/**
 * susun deklarasi
 * get data lama
 * isi data lama
 * ubah data lama
 * kirim ke api
 */

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  userId?: string | null;
  oldData: any = {};

  formUpdateUser = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    picture: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private userData: UsersDataService,
    private router: Router
  ) {}

  onSubmit() {
    this.userData
      .updateUser(this.userId, this.formUpdateUser.value)
      .subscribe((result: any) => {
        console.warn(result);
        this.formUpdateUser.reset();
        this.router.navigate(['user']);
      });
  }

  getOldData(){
    this.userData.getUsers().subscribe((result: any) => {
      this.oldData = result.data.find((item: any) => item.id == this.userId);
      this.formUpdateUser.patchValue({
        firstName: this.oldData.firstName,
        lastName: this.oldData.lastName,
        picture: this.oldData.picture,
      });
    });
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.getOldData();
  }
}
