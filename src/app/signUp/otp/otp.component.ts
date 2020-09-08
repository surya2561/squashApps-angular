import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { UserData } from 'src/app/models/userData';
import { CompanyDetails } from 'src/app/models/companyDetails';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})

export class OtpComponent implements OnInit {

  state: boolean;
  @Input() userData: UserData;
  companyData: CompanyDetails;
  message: string;
  minutes: number;
  seconds: number;
  @Output() back = new EventEmitter();
  @Input() user: boolean;

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    let endTime = new Date(new Date().getTime() + 20 * 6000).getTime();;
    this.companyData = JSON.parse(localStorage.getItem('companyData'));
    let interval = setInterval(() => {
      let currentTime = new Date().getTime();
      let distance = endTime - currentTime;
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
      if (this.seconds <= 0 && this.minutes <= 0) {
        clearInterval(interval);
      }
    }, 1000);
  }
  onOtpChange($event) {
    if ($event.length == 6) {
      const otp = {
        email: localStorage.getItem('email'),
        otpValue: $event
      }

      this.dataService.verifyOtpApiService(otp).subscribe(responseData => {
        if (responseData.message != 'Invalid otp' && !this.user) {
          this.router.navigateByUrl('/company-details');
        }
        else if (responseData.message != 'Invalid otp' && this.user) {
          this.companyData = JSON.parse(localStorage.getItem('companyData'));
          this.dataService.saveCompanyApiService(this.companyData).subscribe(companyResponseData => {
            this.userData.companyId = companyResponseData['companyId'];
            if (companyResponseData['companyId']) {
              this.dataService.signUpApiService(this.userData).subscribe(responseData => {
                if (responseData.message == 'User saved successfully') {
                  localStorage.removeItem('companyData');
                  this.router.navigateByUrl('/login');
                }
                else {
                  this.message = 'Unable to store user details please try after some time';
                }
              })
            }
            else {
              this.message = 'Unable to store company details please try after some time';
            }
          })
        }
        else {
          this.message = responseData.message;
        }
      })
    }
  }
  resendOtp() {
    this.dataService.getOtpApiService(localStorage.getItem('email')).subscribe(responseData => {
      this.message = responseData.message;
    })
  }

  backNav() {
    this.back.emit();
  }

}
