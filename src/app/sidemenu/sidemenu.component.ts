import { Component, OnInit, HostListener } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})

export class SidemenuComponent implements OnInit {
  list = [
    { text: "Dashboard", path: "assets/home.png" },
    { text: "Tas", path: "assets/timeline.png" },
    { text: "Project", path: "assets/settings.png" },
    { text: "Client", path: "assets/man.png" },
    { text: "Wik", path: "assets/edit.png" },
    { text: "Timesheet", path: "assets/timeline.png" },
    { text: "Human", path: "assets/group.png", },
    { text: "Announcement", path: "assets/announcement.png", route: "/announcement" },
    { text: "Setting", path: "assets/settings.png", },
    { text: "Logout", path: "assets/man.png" },

  ];
  constructor(private router: Router) { }


  ngOnInit() {
    $(document).ready(function() {
      $(".menu > li").click(function() {
        $(".menu > li").removeClass('current');
        $(this).addClass('current');
      });
    });
  }
  logOut() {
    localStorage.removeItem('userData');
    this.router.navigateByUrl('/login');
  }
}
