import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import * as $ from 'jquery';
import * as _ from 'lodash'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserData } from '../models/userData';
import { DataService } from '../service/data.service';
import { MatDialog } from '@angular/material';
import { NotificationComponent } from '../notification/notification.component';
@Component({
  selector: 'app-announcement-form',
  templateUrl: './announcement-form.component.html',
  styleUrls: ['./announcement-form.component.scss']
})
export class AnnouncementFormComponent implements OnInit, OnChanges {
  userData: UserData;
  showEmailBox = false;
  event = false;
  reminder = false;
  category: string;
  checkBox = [{ text: 'To All Members', state: false }, { text: 'Choose Persons', state: false }, { text: 'Choose Departments/Role', state: false }];
  selectedCheckBoxes: string;
  announcementForm: FormGroup;
  message: string;
  @Input() resetFormFields: boolean;
  @Output() updateAnnouncementData = new EventEmitter();

  constructor(private dataService: DataService, private dialog: MatDialog) { }

  ngOnInit() {
    $(document).ready(function() {
      $(".category ul> li").click(function() {
        $(".category ul> li").removeClass('current');
        $(this).addClass('current');
      });
    });
    $(document).on('click', 'input[type="checkbox"]', function() {
      $('input[type="checkbox"]').not(this).prop('checked', false);
    });

    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.announcementForm = new FormGroup({
      subject: new FormControl(null, Validators.required),
      date: new FormControl(null),
      time: new FormControl(null),
      location: new FormControl(null),
      description: new FormControl(null, Validators.required),
      multiEmail: new FormControl(null)
    })
  }

  ngOnChanges() {
    if (this.resetFormFields == false) {
      this.resetForm();
    }
  }
  getSelectedCheckBoxValues(selectedValue) {
    this.selectedCheckBoxes = selectedValue;
  }
  clear(category) {
    this.category = category;
    this.announcementForm.controls['location'].reset();
    this.announcementForm.controls['date'].reset();
    this.announcementForm.controls['time'].reset();
  }
  checkFormData(formData) {
    for (var key in formData) {
      if (formData.hasOwnProperty(key)) {
        if (!formData[key]) {
          this.dialog.open(NotificationComponent, { data: { message: "Invalid inputs" } })
          return false;
        }
      }
    }
    return true;
  }
  submit() {
    if (!this.selectedCheckBoxes) {
      this.dialog.open(NotificationComponent, { data: { message: "Invalid inputs" } })
    }
    else {
      const announcement = {};
      announcement['subject'] = this.announcementForm.value.subject,
        announcement['category'] = this.category,
        announcement['description'] = this.announcementForm.value.description,
        announcement['companyId'] = this.userData.companyId,
        announcement['userId'] = this.userData.userId
      if (this.category == 'events') {
        announcement['date'] = this.announcementForm.value.date;
        announcement['time'] = new Date(this.announcementForm.value.time);
        announcement['location'] = this.announcementForm.value.location;
      }
      else if (this.category == 'reminder') {
        announcement['date'] = this.announcementForm.value.date;
      }
      if (this.selectedCheckBoxes['text'] == 'Choose Persons') {
        announcement['notify'] = this.announcementForm.value.multiEmail
      }
      else {
        announcement['notify'] = this.selectedCheckBoxes['text'];
      }
      if (this.checkFormData(announcement)) {
        this.dataService.saveAnnouncementsApiService(announcement).subscribe(responseData => {
          if (responseData['message']) {
            this.dialog.open(NotificationComponent, { data: { message: responseData['message'] } });
            this.updateAnnouncementData.emit();
          }
        })
      }
    }

  }
  resetForm() {
    if (this.announcementForm) {
      this.announcementForm.reset();
    }
  }
}
