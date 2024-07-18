import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { TaskService } from 'src/app/services/task/task.service';
import { MatNativeDateModule, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core'; 
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule} from '@angular/material/form-field';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../../common/popup/popup.component';



@Component({
  selector: 'app-extentions',
  templateUrl: './extentions.component.html',
  styleUrls: ['./extentions.component.css']
})


export class ExtentionsComponent {
 
  extensionStatus: number = 0;
  extensionstatus: boolean = false;
  extensionList: any = [];
  userId : any;
  userType : any;
  currentDate : any;
  startDate: any;
  endDate: any;
  limit = this.common.limit;
  offset = this.common.offset;
  forAll: boolean = false;
  isDisabled: boolean = false;

  constructor(public dialog: MatDialog, private datePipe: DatePipe, private router: Router, private taskservice: TaskService,private common: CommonService){

    this.userId = localStorage.getItem('pmtuserId');
    this.userType = localStorage.getItem('pmtuserType');
    this.getExtensions();

    const today = new Date();
    this.currentDate = this.common.getTodayDate(today);

    if(this.userType == 'Admin' || this.userType == 'PM'){
      this.extensionstatus = true;
      this.forAll = false;
    }

    if(this.userType == 'TM' || this.userType == 'TL' || this.userType == 'QA'){
      this.forAll = true;
    }


  }

  ngOnInit() {}


  openConfirmDialog(taskExtentionId: any,assignmentId: any,invoiceId: any, taskId: any,taskDetailsId: any,extentionStatus: number): void {
    
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
        this.changeStatus(taskExtentionId,assignmentId,invoiceId,taskId,taskDetailsId,extentionStatus);
      } else {
        console.log(result);
      }
    });
  }

  changeStatus(taskExtentionId: any,assignmentId: any,invoiceId: any,taskId: any,taskDetailsId: any,extentionStatus: number){
    if(extentionStatus){
      
      const data = {
        taskExtentionId : taskExtentionId,
        assignmentId: assignmentId,
        taskId: taskId,
        invoiceId: invoiceId,
        taskDetailsId: taskDetailsId,
        extentionStatus: extentionStatus
      }
    
      this.taskservice.changeExtentionStatus(data).subscribe((res: any) => {
        if (res.success) {
          
          this.common.showAlertMessage(res.message, this.common.succContent);
        }else{
          this.common.showAlertMessage(res.message, this.common.errContent);
        }
      })
    }
  }

  getExtensions(){
    const data = {
      limit : this.limit,
      offset: this.offset,
    }
    this.taskservice.getallExtentions(data).subscribe((res: any) => {
      if (res.success) {
        this.extensionList = res.response;
      }
    })
  }


  changeExtentionStatus(extID: number,e: any){
      const data = {
        userId:  this.userId,
        userType: this.userType,
        extentionID: extID,
        statusValue: e.target.value
      }
      
    this.taskservice.changeExtentionstatus(data).subscribe((res: any) => {
      if (res.success) {

      }
    });
  }

  // viewExtension(taskid: string){
  //   this.router.navigate(['pages/view-extension/' + taskid]);
  // }

  startDateChanged(event: any) {
    this.startDate = event.value;
  }

  endDateChanged(event: any) {
    this.endDate = event.value;
  }

  convertTimeAMPM(value: string): string | null {
    const date = new Date(`1970-01-01T${value}Z`);
    return this.datePipe.transform(date, 'hh:mm:ss a', 'UTC');
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
  

  forwardExtention(assignmentId: number, invoiceId: number, taskId: number, taskDetailsId: number,extentionDate:any, extentionTime: any,extentionMessage: any){

    const data = {
      taskId: taskId,
      assignmentId: assignmentId,
      invoiceId:invoiceId,
      taskDetailsId: taskDetailsId,
      extentionDate: extentionDate,
      extentionTime: extentionTime,
      extentionMessage: extentionMessage,
    };

    this.taskservice.addExtention(data).subscribe((res: any) => {
      if (res.success) {
        this.router.navigate(['pages/extentions']);
        this.common.showAlertMessage(res.message, this.common.succContent);
      }
    })
  }

  requestExtension(assignmentId: number, invoiceId: number, taskId: number, taskDetailsId: number) {
    this.router.navigate(['pages/add-extension/'+ assignmentId + '&' + invoiceId + '&' + taskId + '&' + taskDetailsId]);
  }
  
}