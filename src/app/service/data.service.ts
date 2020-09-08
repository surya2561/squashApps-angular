import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api } from 'src/environments/environment';
import { UserData } from '../models/userData';
import { CompanyDetails } from '../models/companyDetails';
import { ResponseMessage } from '../models/responseMessage';
import { Announcement } from '../models/announcement';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  checkState: boolean;
  companyData: CompanyDetails;
  userData: UserData;
  email: string;

  constructor(private http: HttpClient) { }

  setEmail(email: string) {
    this.email = email;
  }
  getEmail() {
    return this.email;
  }
  setCompanyData(companyData: CompanyDetails) {
    this.companyData = companyData
  }
  getCompanyData() {
    return this.companyData;
  }
  setUserData(userData: UserData) {
    this.userData = userData
  }
  getUserData() {
    return this.userData;
  }

  signinApiService(userFormData): Observable<UserData> {
    return this.http.post<UserData>(api.signin, userFormData);
  }

  getOtpApiService(email: String): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(api.getOtp, { email: email });
  }

  verifyOtpApiService(otp: { email: string, otpValue: string }): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(api.verifyOtp, otp);
  }

  signUpApiService(userData: UserData): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(api.signUp, userData);
  }

  saveCompanyApiService(companyData: CompanyDetails): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(api.saveCompany, companyData);
  }

  getAnnouncementsApiService(userData: { companyId: string, userEmail: string }): Observable<{ userId: string, companyId: string }> {
    return this.http.post<{ userId: string, companyId: string }>(api.getAnnouncements, userData);
  }

  saveAnnouncementsApiService(announcementData: any): Observable<Announcement> {
    return this.http.post<Announcement>(api.saveAnnouncement, announcementData);
  }

  getComments(requestData: { companyId: string, announcementId: string }): Observable<Comment[]> {
    return this.http.post<Comment[]>(api.getComments, requestData);
  }

  saveComments(commentData: any): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(api.saveComments, commentData);
  }
}
