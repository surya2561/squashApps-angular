import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  message: string;
  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    })
  }

  submit() {
    this.dataService.signinApiService(this.loginForm.value).subscribe(responseData => {
      if (responseData['userData']) {
        localStorage.setItem('userData', JSON.stringify(responseData['userData']));
        this.router.navigateByUrl('/announcement');
      }
      else {
        this.message = responseData['message'];
      }
    })
  }

}
