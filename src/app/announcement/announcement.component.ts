import { Component, OnInit, OnChanges, AfterViewInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { fromEvent } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import * as _ from 'lodash';
@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent implements OnInit, AfterViewInit {
  nav = false;
  comment = false;
  announcementData = [];
  tempAnnouncementData = [];
  searchText: string;
  commentData = [];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getAnnouncements();
  }
  ngAfterViewInit() {
    let searchBox = document.getElementById("search");
    fromEvent(searchBox, "input")
      .pipe(
        map((e: KeyboardEvent) => e.target['value']),
        debounceTime(10),
        distinctUntilChanged(),

        switchMap(() => this.filterAnnouncement(this.tempAnnouncementData, this.searchText))
      )
      .subscribe(() => { })
  }

  filterAnnouncement(value: any[], filterString: String) {
    if (!value) {
      return [-1];
    }
    filterString = filterString.toLocaleLowerCase();
    value = value.filter((data) => {
      return (data.subject)
        .toLocaleLowerCase()
        .includes(filterString.toString());
    });
    this.announcementData = value;
  }

  getCommentsData() {
    _.forEach(this.announcementData, data => {
      const requestBody = {
        companyId: JSON.parse(localStorage.getItem('userData')).companyId,
        announcementId: data['announcementId']
      }
      this.dataService.getComments(requestBody).subscribe((responseData: Comment[]) => {
        this.commentData.push(responseData['comments']);
        data['comment'] = responseData['comments'].length;
      })
    })
  }
  getAnnouncements() {
    let userData = JSON.parse(localStorage.getItem('userData'));
    this.dataService.getAnnouncementsApiService({ companyId: userData['companyId'], userEmail: userData['userEmail'] }).subscribe(responseData => {
      this.announcementData = responseData['announcementData'];
      this.tempAnnouncementData = this.announcementData;
      this.getCommentsData();
    })
  }

  updateCommentData(event) {
    _.forEach(this.announcementData, data => {
      if (data.announcementId == event.announcementId) {
        data['comment'] = event.count;
      }
    })
  }

}
