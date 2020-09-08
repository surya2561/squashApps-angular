import { Component, OnInit, Input, OnChanges, AfterViewInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { DataService } from '../service/data.service';
import { MatDialog } from '@angular/material';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss']
})
export class CommentSectionComponent implements OnInit, OnChanges {
  @Input() selectedDescription: any;
  @Output() updateComment = new EventEmitter();
  textArea: string;
  commentData: any;
  getComments: Comment[] = [];
  message: any;
  constructor(private dataService: DataService, private dialog: MatDialog) { }

  ngOnInit() {
  }
  ngOnChanges() {
    if (this.selectedDescription) {
      this.getCommentsData();
    }
  }
  getCommentsData() {
    const requestBody = {
      companyId: JSON.parse(localStorage.getItem('userData')).companyId,
      announcementId: this.selectedDescription.announcementId
    }
    this.dataService.getComments(requestBody).subscribe((responseData: Comment[]) => {
      this.getComments = responseData['comments'];
      this.updateComment.emit({ announcementId: this.selectedDescription.announcementId, count: this.getComments.length });
    })
  }
  saveComment() {
    if (this.textArea) {
      this.commentData = {
        announcementId: this.selectedDescription.announcementId,
        comment: this.textArea,
        userId: JSON.parse(localStorage.getItem('userData')).userId,
        companyId: JSON.parse(localStorage.getItem('userData')).companyId
      }
      this.dataService.saveComments(this.commentData).subscribe(responseData => {
        if (responseData['message']) {
          this.dialog.open(NotificationComponent, { data: { message: responseData['message'] } });
          this.getCommentsData();
          this.textArea = null;
        }
      })
    }
    else {
      this.message = 'Enter a comment';
    }
  }

}
