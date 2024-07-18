import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subject } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}


type HorizontalPosition = "left" | "center" | "right";
type VerticalPosition = "top" | "bottom";

@Injectable({
  providedIn: 'root'
})

export class CommonService {
  
  alertShowTime = 4000;
  errContent = "Error"
  succContent = "Ok"
  limit: number = 10;
  offset: number = 0;
  API_ROOT = environment.API_ROOT;
  LTS_API_ROOT = environment.LTS_API_ROOT;
  private datavalue: any;
  logoutSubject = new Subject<any>();
  positionarr : any = [];


  private readonly DAYS_IN_A_YEAR = 365.25;
  private readonly DAYS_IN_A_MONTH = 30.44;
  
  positionList: any = [
    { name: 'Project Manager', value: 'PM' },
    { name: 'Team Manager', value: 'TM' },
    { name: 'Team Leader', value: 'TL' },
    { name: 'Quality Analyst', value: 'QA' },
    { name: 'Senior Subject Matter Expert', value: 'SSME' },
    { name: 'Subject Matter Expert', value: 'SME' },
    { name: 'Junior Subject Matter Expert', value: 'JSME' },
    { name: 'Assistant Team Leader', value: 'ATL' },
  ]

  getuniversityList: any = [
    { id: '1' , university_name: 'Oxford'}
  ];

  getSalesPersonList: any = [
    { id : '1' , firstName: 'Pradeep', lastName: 'Pal', position: 'Sales' ,image : '' , joining_date : '' , capacity :'2000'},
    { id : '2' , firstName: 'Souvik', lastName: 'Dhar', position: 'Sales' ,image : '' , joining_date : '' , capacity :'2000'},
  ]

  getProjectManagerList: any = [
    { id : '1' , firstName: 'Ankur', lastName: 'Pal', position: 'Project Manager' ,image : '' , joining_date : '' , capacity :'2000'},
    { id : '2' , firstName: 'Joydeep', lastName: 'Dhar', position: 'Project Manager' ,image : '' , joining_date : '' , capacity :'2000'},
  ]

  getTeamManagerList: any = [
    { id : '1' , firstName: 'Sejan', lastName: 'Pal', position: 'Team Manager' ,image : '' , joining_date : '' , capacity :'2000'},
    { id : '2' , firstName: 'Sandeep', lastName: 'Kor', position: 'Team Manager',image: '' , joining_date : '', capacity :'1000'},
  ]

  getTeamLeaderList: any = [
    { id : '3' , firstName: 'Somnath', lastName: 'Pal', position: 'Team Leader',image : '' , joining_date : ''},
    { id : '4' , firstName: 'Joydeep', lastName: 'Nath', position: 'Team Leader',image : '' , joining_date : ''},
    { id : '5' , firstName: 'Anup', lastName: 'Das', position: 'Team Leader' ,image : '' , joining_date : ''},
    { id : '6' , firstName: 'Pradeep', lastName: 'Sen', position: 'Team Leader',image : '' , joining_date : '' },
  ]

  getQualityAnalystList: any = [
    { id : '1' , firstName: 'Ankur', lastName: 'Pal', position: 'Quality Analyst' ,image : '' , joining_date : '10/3/24' , capacity :'2000'},
    { id : '2' , firstName: 'Sandeep', lastName: 'Kor', position: 'Quality Analyst',image: '' , joining_date : '1/2/24', capacity :'1000'},
  ]

  getExpertsByTeamLeader : any = [
    { id : '7' , firstName: 'Joydeep', lastName: 'Pal', position: 'SSME' ,image : '' , joining_date : '9/3/24' , capacity :'2000'},
    { id : '8' , firstName: 'Roshan', lastName: 'Kor', position: 'SME',image: '' , joining_date : '19/2/24', capacity :'1000'},
  ]


  getExpertTeamLeader: any = [
    { id : '3' , firstName: 'Somnath', lastName: 'Pal', position: 'Team Leader',image : '' , joining_date : ''},
  ]

  getExpertProjects: any = [
    { id : '3' , taskID: 'SAR#0000010', status: 'ongoing' },
    { id : '4' , taskID: 'SAR#0000011', lastName: 'ongoing' },
    { id : '5' , taskID: 'SAR#0000012', lastName: 'ongoing' },
    { id : '6' , taskID: 'SAR#0000013', lastName: 'ongoing' },
  ]

  getExpertReworks: any = [
    { id : '7' , taskID: 'SAR#0000020', status: 'rework' },
    { id : '8' , taskID: 'SAR#0000021', status: 'rework' },
    { id : '9' , taskID: 'SAR#0000022', status: 'rework' },
    { id : '10' , taskID: 'SAR#0000023', status: 'rework' },
  ]

  getRedoProjects: any = [
    { id : '11' , taskID: 'SAR#0000030', status: 'redo' },
    { id : '12' , taskID: 'SAR#0000031', status: 'redo' },
    { id : '13' , taskID: 'SAR#0000032', status: 'redo' },
    { id : '14' , taskID: 'SAR#0000033', status: 'redo' },
  ] 

  getExpertResit: any = [
    { id : '11' , taskID: 'SAR#0000024', status: 'resit' },
    { id : '12' , taskID: 'SAR#0000025', status: 'resit' },
    { id : '13' , taskID: 'SAR#0000026', status: 'resit' },
    { id : '14' , taskID: 'SAR#0000027', status: 'resit' },
  ]




  constructor(private snackBar: MatSnackBar,private http: HttpClient) { }

  public horizontal: HorizontalPosition = "right";
  public vertical: VerticalPosition = "top";

  getCurrentMonthDates(): { startDate: Date, endDate: Date } {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    // First day of the current month
    const startDate = new Date(currentYear, currentMonth, 1);

    // Last day of the current month
    const endDate = new Date(currentYear, currentMonth + 1, 0);

    return { startDate, endDate };
  }

  getPromotionLevel(position: any): string{
    var level = '';
    if(position == 'TM'){
      level = 'PM';
    } 

    if(position == 'TL'){
       level = 'TM';
    }

    if(position == 'QA'){
      level = 'TM';
    }

    if(position == 'SSME' || position == 'SME' || position == 'JSME' || position == 'ATL'){
      level = 'TL';
   }
    return level;
      
  }

  dateFormatYearMonthDate(date: any) {
    var dateComponents = date.split('T00');
    var day = dateComponents[0];
    var month = dateComponents[1];
    var year = dateComponents[2];
    if (year.length === 2) {
      var currentYear = new Date().getFullYear().toString().slice(0, 2);
      year = currentYear + year;
    }
    var outputDate = year + '-' + month + '-' + day;

    return outputDate;

  }

  convertDateTime(date: any){
    if(date){
      const inputDate = new Date(date);
      const year = inputDate.getFullYear();
      const month = String(inputDate.getMonth() + 1).padStart(2, '0');
      const day = String(inputDate.getDate()).padStart(2, '0');
      const hours = String(inputDate.getHours()).padStart(2, '0');
      const minutes = String(inputDate.getMinutes()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate;
    }else{
      return 'Not Available';
    }
  }
  

  transform(time: any): any {
    let hour = (time.split(':'))[0]
    let min = (time.split(':'))[1]
    let part = hour > 12 ? 'pm' : 'am';
    if(parseInt(hour) == 0)
     hour = 12;
    min = (min+'').length == 1 ? `0${min}` : min;
    hour = hour > 12 ? hour - 12 : hour;
    hour = (hour+'').length == 1 ? `0${hour}` : hour;
    return `${hour}:${min} ${part}`
  }

  showAlertMessage(content: any, action: any) {
    this.snackBar.open(content, action, {
      duration: this.alertShowTime,
      verticalPosition:'top', 
      horizontalPosition: "center"
    });
  }

  setData(data: any) {
    this.datavalue = data;
  }

  getData() {
    return this.datavalue;
  }

  phoneNumberFormat(phoneNo: any) {
    const phoneNo_format = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    if (phoneNo_format.test(phoneNo)) {
      return true;
    } else {
      return false;
    }
  }

  mailFormatCheck(email: any) {
    const format: any = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (format.test(email)) {
      return true;
    } else {
      return false;
    }
  }

  convertDaysToMonthsYears(days: number){
    const years = Math.floor(days / this.DAYS_IN_A_YEAR);
    const remainingDaysAfterYears = days % this.DAYS_IN_A_YEAR;

    const months = Math.floor(remainingDaysAfterYears / this.DAYS_IN_A_MONTH);
    const remainingDays = Math.floor(remainingDaysAfterYears % this.DAYS_IN_A_MONTH);
    var outputDate =`${years} years ${months} months ${days} days`;
    return outputDate;
   
  }

   getTodayDate(date: Date): string {
    // Get the year, month, and day from the date object
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth() is zero-indexed
    const day = date.getDate();

    // Return the formatted date string
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }

  getCountryList() {
    return this.http.get(this.API_ROOT + 'common/countryList', httpOptions);
  }

  getUniversityList(data: any) {
    return this.http.post(this.API_ROOT + 'common/universityList', data,httpOptions);
  }

  getCourseList(){
    return this.http.get(this.API_ROOT + 'common/courseList', httpOptions);
  }

  getAttendanceTrackingCount(data: any){
    return this.http.post(this.API_ROOT + 'common/attendancetrackingcountList', data, httpOptions);
  }

  getAttendanceTrackingList(data: any){
    return this.http.post(this.API_ROOT + 'common/attendancetrackingList', data, httpOptions);
  }

  getStateList(data: any) {
    return this.http.post('http://3.111.113.246:8082/v1/common/stateList', data);
  }

 
  multipleFileUpload(data: any){
    return this.http.post(this.API_ROOT + 'common/multipleFileUpload', data);
  }

  imageUpload(data: any){
    return this.http.post(this.API_ROOT + 'common/imageUpload', data)
  }

  
}