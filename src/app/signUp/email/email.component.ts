import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {
  emailForm: FormGroup;
  message: string;
  email: boolean = true;
  otp: boolean = false;
  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.emailForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email])
    })
  }

  submit() {
    localStorage.setItem('email', this.emailForm.value.email);
    this.dataService.getOtpApiService(this.emailForm.value.email).subscribe(responseData => {
      if (responseData.message == 'Email already gets registered') {
        this.message = responseData.message;
      }
      else {
        this.otp = true;
        this.email = false;
      }
    })
  }

}
