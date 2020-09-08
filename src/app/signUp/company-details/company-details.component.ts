import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {
  companyForm: FormGroup;
  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.companyForm = new FormGroup({
      companyName: new FormControl(null, Validators.required),
      location: new FormControl(null, Validators.required),
      employeesCount: new FormControl(null, Validators.required),
      domainName: new FormControl(null, Validators.required)
    })
  }
  generateRandomNumber() {
    const alphaNumericString = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lengthOfOTP = 6;
    let randomNumber = '';
    for (let i = lengthOfOTP; i > 0; --i) {
      randomNumber += alphaNumericString[Math.round(Math.random() * (alphaNumericString.length - 1))];
    }
    return randomNumber;
  }
  submit() {
    localStorage.setItem('companyData', JSON.stringify(this.companyForm.value))
    this.router.navigateByUrl('/user-details');
  }
}
