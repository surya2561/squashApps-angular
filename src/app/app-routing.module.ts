import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AnnouncementComponent } from './announcement/announcement.component';
import { LoginComponent } from './login/login.component';
import { EmailComponent } from './signUp/email/email.component';
import { OtpComponent } from './signUp/otp/otp.component';
import { CompanyDetailsComponent } from './signUp/company-details/company-details.component';
import { UserInfoComponent } from './signUp/user-info/user-info.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: EmailComponent, pathMatch: "full" },
  { path: "otp", component: OtpComponent, pathMatch: "full" },
  { path: "company-details", component: CompanyDetailsComponent, pathMatch: "full" },
  { path: "user-details", component: UserInfoComponent, pathMatch: "full" },
  { path: "login", component: LoginComponent, pathMatch: "full", },
  { path: 'announcement', component: AnnouncementComponent, pathMatch: "full", canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
