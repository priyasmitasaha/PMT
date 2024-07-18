import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/services/task/task.service';
import { CommonService } from 'src/app/services/common/common.service';
import { MatNativeDateModule, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core'; 
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule} from '@angular/material/form-field';



@Component({
  selector: 'app-task-allocation',
  templateUrl: './task-allocation.component.html',
  styleUrls: ['./task-allocation.component.css'],
})

export class TaskAllocationComponent {

  taskList: any = [];
  assigntaskList: any = [];
  taskAllocatedCount : number = 0;
  assignedTaskWC :number = 0;
  allocationTaskWC : number = 0;
  taskDetails = [];
  limit = this.common.limit;
  offset = this.common.offset;
  pageName: any;
  task_id:any;
  userId : any;
  userType : any;
  isDivVisible: boolean = true;
  isHidden : boolean = true;
  currentDate : any;
  startDate: any;
  endDate: any;
  assignmentId: any;
  taskDeliveredCount : number = 0;
  taskAllocationCount : number = 0;


  constructor(private router: Router,private taskservice: TaskService,private common: CommonService, private activateRoute: ActivatedRoute){
    this.userId = localStorage.getItem('pmtuserId');
    this.userType = localStorage.getItem('pmtuserType');

    const today = new Date();
    this.currentDate = this.common.getTodayDate(today);
  }

  

  ngOnInit() {
    this.pageName = this.activateRoute.snapshot.url[this.activateRoute.snapshot.url.length - 1].path;

      if(this.pageName == 'task-allocation'){
        this.getAllTaskList();
        this.getTaskCount();
      
        if(this.userType =='SME' || this.userType =='SSME' || this.userType =='JSME' || this.userType =='ATL'){
          this.isDivVisible = false;
        }
        
      }else if(this.pageName == 'assigned-task'){
        this.getAssignedTaskList();
        this.getTaskCount();
        this.getAllTaskList();
      }
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

  getTaskList(){
    const data = {
      limit : this.limit,
      offset: this.offset,
      fromDate :  this.startDate ? this.startDate : '',
      toDate : this.endDate ? this.endDate : '',
    };

    this.taskservice.getTaskList(data).subscribe((res: any) => {
      if (res.success) {
        this.taskList = res.response;
      }
    })
  }
  
  getAllTaskList() {
    const data = {
      userId :  this.userId,
      limit : this.limit,
      offset: this.offset,
      fromDate :  this.startDate ? this.startDate : '',
      toDate : this.endDate ? this.endDate : '',
    };

    this.taskservice.getAllTaskList(data).subscribe((res: any) => {
      if (res.success) {
        if(this.pageName != 'assigned-task'){
          this.taskList = res.response;
        }

        this.taskAllocationCount = res.count;
      }
    })
  }


  getAssignedTaskList(){
    const data = {
      limit : this.limit,
      offset: this.offset,
      fromDate :  this.startDate ? this.startDate : '',
      toDate : this.endDate ? this.endDate : '',
    };
    this.taskservice.getAssignedTaskList(data).subscribe((res: any) => {
      if (res.success) {
        this.taskList = res.response;
      }
    })
   
  }



  getTaskCount(){
     const data = { 
      fromDate :  this.startDate ? this.startDate : '',
      toDate : this.endDate ? this.endDate : '',
    }
    this.taskservice.getTaskCount(data).subscribe((res: any) => {
      if (res.success) {
          this.allocationTaskWC = res.allocationTaskWC;
          this.assignedTaskWC = res.assignedTaskWC;
          this.taskDeliveredCount = res.taskDeliveredCount;
          this.taskAllocatedCount = res.taskAllocatedCount;
      }
    })
  }
  

  viewTaskdetails(assignmentId: any, invoiceId: any, task_id: any,taskDetailsId: any, pageName: any){
    console.log(pageName);
    this.router.navigate(['pages/'+ pageName + '/task-view/' + assignmentId + '&' + invoiceId +'&'+ task_id + '&' + taskDetailsId]);
  }

  startDateChanged(event: any) {
    this.startDate = event.value;
  }

  endDateChanged(event: any) {
    this.endDate = event.value;
  }

  viewAssignedTask(assignmentId: any, invoiceId: any, task_id: any, taskDetailsId: any, pageName: any){
    this.router.navigate(['pages/'+ pageName + '/task-view/' + assignmentId + '&' + invoiceId +'&'+ task_id + '&' + taskDetailsId]);
  }

}
