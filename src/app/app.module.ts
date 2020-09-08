import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LandingDashboardComponent } from './landing-dashboard/landing-dashboard.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { HeadingComponent } from './heading/heading.component';
import { AnnouncementFormComponent } from './announcement-form/announcement-form.component';
import { CommentSectionComponent } from './comment-section/comment-section.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { OtpComponent } from './signUp/otp/otp.component';
import { EmailComponent } from './signUp/email/email.component';
import { CompanyDetailsComponent } from './signUp/company-details/company-details.component';
import { UserInfoComponent } from './signUp/user-info/user-info.component';
import { TokenInterceptor } from './service/token-interceptor.service';
import { ErrorInterceptor } from './service/error-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule } from '@angular/material';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingDashboardComponent,
    SidemenuComponent,
    AnnouncementComponent,
    HeadingComponent,
    AnnouncementFormComponent,
    CommentSectionComponent,
    LoginComponent,
    HeaderComponent,
    OtpComponent,
    EmailComponent,
    CompanyDetailsComponent,
    UserInfoComponent,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgOtpInputModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [NotificationComponent],
})
export class AppModule { }
