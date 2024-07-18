import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})

export class UserService {

  API_ROOT = environment.API_ROOT;


  constructor(private http: HttpClient) { }

  login(data: any) {
    return this.http.post(this.API_ROOT + 'user/login', data, httpOptions);
  }

  forgotpassword(data: any){
    return this.http.post(this.API_ROOT + '', data, httpOptions);
  }

  createProfile(data: any){
    return this.http.post(this.API_ROOT + 'user/addProfile', data, httpOptions);
  }

  getUserDetailsById(data: any){
    return this.http.post(this.API_ROOT + 'user/getUserDetailsById', data, httpOptions);
  }

  positionList(data: any){
    return this.http.post(this.API_ROOT + 'user/positionList',  data,httpOptions);
  }

  specificPositionList(){
    return this.http.get(this.API_ROOT + 'user/specificPositionList', httpOptions);
  }

  getTeamManagersList(data: any){
    return this.http.post(this.API_ROOT + 'user/getteammanagersList', data , httpOptions);
  }

  otherleaderList(data: any){
    return this.http.post(this.API_ROOT + 'user/otherleaderList', data , httpOptions);
  }

  getuserNamebyId(data: any){
    return this.http.post(this.API_ROOT + 'user/getusernamebyid', data , httpOptions);
  }

  getLeaderByExpertId(){
    return this.http.get(this.API_ROOT + 'user/tlNameForExpart', httpOptions);
  }

  getotherexperts(data: any){
    return this.http.post(this.API_ROOT + 'user/getotherexperts', data , httpOptions);
  }

  getExpertMonthlyDetails(data: any){
    return this.http.post(this.API_ROOT + 'user/getexpertmonthlydetails', data , httpOptions);
  }

  getTeamManagersById(data: any){
    return this.http.post(this.API_ROOT + 'user/getteammanagersbyid', data , httpOptions);
  }

  getTeamLeadersById(data: any){
    return this.http.post(this.API_ROOT + 'user/getteamleadersbyid', data , httpOptions);
  }

  getQualityAnalystById(data: any){
    return this.http.post(this.API_ROOT + 'user/getqualityanalystbyid', data , httpOptions);
  }

  getExpertsById(data: any){
    return this.http.post(this.API_ROOT + 'user/getexpertsbyid', data, httpOptions);
  }

 

  getProjectManagers(){
    return this.http.get(this.API_ROOT + 'user/getprojectmanagers',httpOptions);
  }

  getLeaderListByTeamManager(data: any){
    return this.http.post(this.API_ROOT + 'user/getleaderlistbyteammanager', data, httpOptions);
  }

  getTeamLeadersByManagerID(data: any){
    return this.http.post(this.API_ROOT + 'user/getteamleaderbymanagerid', data, httpOptions);
  }

  profileUpdate(data: any){
    return this.http.post(this.API_ROOT + 'user/updateProfile', data, httpOptions);
  }

 
  getSalesPersonList(){
    return this.http.get(this.API_ROOT + 'user/getsalespersonlist', httpOptions);
  }

  specificUserList(data: any){
    return this.http.post(this.API_ROOT + 'user/specificUserList', data,httpOptions);
  }

  getTotalCapacity(data: any){
    return this.http.post(this.API_ROOT + 'user/gettotalcapacity', data,httpOptions);
  }

  getUserListById(data: any){
    return this.http.post(this.API_ROOT + 'user/getUserListById', data,httpOptions);
  }

  notAssignedUsers(){
    return this.http.get(this.API_ROOT + 'user/notAssignedUserList', httpOptions);
  }

}