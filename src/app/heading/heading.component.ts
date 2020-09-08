import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss']
})
export class HeadingComponent implements OnInit {
  userName: string;
  constructor() { }

  ngOnInit() {
    this.userName = JSON.parse(localStorage.getItem('userData')).firstName;
  }

}
