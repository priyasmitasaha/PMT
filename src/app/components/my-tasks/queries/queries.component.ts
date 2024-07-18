import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/services/task/task.service';
import { CommonService } from 'src/app/services/common/common.service';
import { MatNativeDateModule, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core'; 
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule} from '@angular/material/form-field';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../../common/alert-dialog/alert-dialog.component';


@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.css']
})



export class QueriesComponent {
  userId: any;
  userType: any;
  queryList: any = [];
  solution = 0;
  isSend: boolean = false;
  isStatus:  boolean = false;
  taskID: any;
  projectManagerID: any;
  sendTo: any;
  forPM: boolean = false;
  currentDate : any;
  startDate: any;
  endDate: any;
  limit = this.common.limit;
  offset = this.common.offset;
  queryStatus: any;
  isDropdownDisabled: boolean = false;
  type: any;
  isActive = false;
  isActiveBtn = true;
  isBtn = false;


  constructor(public dialog: MatDialog, private datePipe: DatePipe, private router: Router,private taskservice: TaskService,private common: CommonService, private activateRoute: ActivatedRoute){
    this.userId = localStorage.getItem('pmtuserId');
    this.userType = localStorage.getItem('pmtuserType');

    const today = new Date();
    this.currentDate = this.common.getTodayDate(today);

  

    if(this.userType == 'TL' || this.userType == 'QA'){
      this.isStatus = true;
      this.getQueries('unsolved');
    }

    if(this.userType == 'TM'){
      this.isSend = false;
      this.getQueries('unsolved');
    }

    if(this.userType == 'PM' || this.userType == 'TM'){
      this.forPM = true;
      this.getQueries('unsolved');
    }

    if(this.userType == 'Admin'){
      this.forPM = true;
      this.isSend = false;
      this.getQueries('unsolved');
    }
  }

  openConfirmDialog(taskQueryId: any,assignmentId: any,taskId: any,taskDetailsId: any,queryStatus: number): void {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.changeStatus(taskQueryId,assignmentId,taskId,taskDetailsId,queryStatus);
      } else {
        console.log(result);
      }
    });
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

  // getTime(value: any){
  //   const dateTimeString = value;
  //   const date = new Date(dateTimeString);
    
  //   // Extract the time components
  //   const hours = date.getUTCHours();
  //   const minutes = date.getUTCMinutes();
  //   const seconds = date.getUTCSeconds();
    
  //   // Format the time as a string
  //   return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  // }

  getTime(value: any){
    const date = new Date(value);
    const offset = 5.5 * 60 * 60 * 1000; // 5.5 hours in milliseconds

    const istDate = new Date(date.getTime() + offset);

    const pad = (num: any) => num.toString().padStart(2, '0');

    const day = pad(istDate.getUTCDate());
    const month = pad(istDate.getUTCMonth() + 1); // Months are zero-indexed
    const year = istDate.getUTCFullYear();
    const hours = pad(istDate.getUTCHours());
    const minutes = pad(istDate.getUTCMinutes());
    const seconds = pad(istDate.getUTCSeconds());

    const formattedISTDate = `${hours}:${minutes}:${seconds}`;
    return formattedISTDate;

    console.log(formattedISTDate);
  }
  

  convertTimeAMPM(value: string): string | null {
    const date = new Date(`1970-01-01T${value}Z`);
    return this.datePipe.transform(date, 'hh:mm:ss a', 'UTC');
  }

  getQuery(type: any){
    console.log(type);
    if(type == 'solved'){
      this.getQueries(type);
      this.isDropdownDisabled = true;
      this.isActive = !this.isActive;   //true
      this.isActiveBtn = !this.isActiveBtn;  //false
      this.isBtn = this.isBtn;             //false
     
    }else if(type == 'unsolved'){
      this.getQueries(type);
      this.isDropdownDisabled = false;  
      this.isActive = !this.isActive;     //false
      this.isActiveBtn = !this.isActiveBtn;           //true
      this.isBtn = this.isBtn;                 //false

    }else if(type == 'partialSolved'){
      this.getQueries(type);
      this.isDropdownDisabled = false;
      this.isActive = this.isActive;
      this.isActiveBtn = !this.isActiveBtn;
      this.isBtn = !this.isBtn;

    }
  }

  getQueries(type: any){
    const data = {
      limit : this.limit,
      offset: this.offset,
      fromDate :  this.startDate ? this.startDate : this.currentDate ,
      toDate : this.endDate ? this.endDate : 'null',
      queryStatus: type,
    }

    this.taskservice.getQuery(data).subscribe((res: any) => {
      if (res.success) {
        this.queryList = res.response;
        for(let i=0;i<this.queryList.length;i++){
          if(this.queryList[i].queryStatus == 1){
            this.isDropdownDisabled = true;
          }
        }
      }
    })
  }
  

  changeStatus(taskQueryId: any,assignmentId: any,taskId: any,taskDetailsId: any,queryStatus: number){
    if(queryStatus){
      
      const data = {
        taskQueryId : taskQueryId,
        assignmentId: assignmentId,
        taskId: taskId,
        taskDetailsId: taskDetailsId,
        queryStatus: queryStatus
      }
    
      this.taskservice.changeQueryStatus(data).subscribe((res: any) => {
        if (res.success) {
          
          this.common.showAlertMessage(res.message, this.common.succContent);
        }else{
          this.common.showAlertMessage(res.message, this.common.errContent);
        }
      })
    }
  }


  

  getAssigneeByTaskID(taskID: any){

    const data = {
      taskID: taskID,
    }

    this.taskservice.getAssigneeByTaskID(data).subscribe((res: any) => {
        this.projectManagerID = res.response.projectmanagerid;
    })
  }
  

  viewQuery(taskQueryId: any, assignmentId: any,invoiceId: any,taskId: any, taskDetailsId: any){
    this.router.navigate(['pages/view-query/' + taskQueryId + '&' + assignmentId + '&' + invoiceId + '&' + taskId + '&' + taskDetailsId] );
  }

  startDateChanged(event: any) {
    this.startDate = event.value;
  }

  endDateChanged(event: any) {
    this.endDate = event.value;
  }

}
