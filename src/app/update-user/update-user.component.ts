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

  formUpdateUser = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private userData: UsersDataService,
    private router: Router
  ) {
    this.userId = this.route.snapshot.paramMap.get('userId');
  }

  onSubmit() {
    this.userData
      .updateUser(this.userId, this.formUpdateUser.value)
      .subscribe((result: any) => {
        console.warn(result);
        this.formUpdateUser.reset();
        this.router.navigate(['user']);
      });
  }

  ngOnInit(): void {
    window.alert('User id: ' + this.userId);
    this.userData.getOldDataUser(this.userId).subscribe((result: any) => {
      this.formUpdateUser.patchValue({
        firstName: result.data.firstName,
        lastName: result.data.lastName,
      });
    });
  }
}
