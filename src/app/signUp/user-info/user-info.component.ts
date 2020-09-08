import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { UserData } from 'src/app/models/userData';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  userForm: FormGroup;
  user: boolean = true;
  otp: boolean = false;
  userData: UserData;
  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }

  submit() {
    this.userForm.value.userId = localStorage.getItem('email');
    this.dataService.getOtpApiService(localStorage.getItem('email')).subscribe(responseData => {
      this.otp = true;
      this.user = false;
      this.userData = this.userForm.value;
    })
  }

}
