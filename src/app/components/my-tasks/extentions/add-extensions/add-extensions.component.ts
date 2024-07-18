import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/services/task/task.service';
import { CommonService } from 'src/app/services/common/common.service';




@Component({
  selector: 'app-add-extensions',
  templateUrl: './add-extensions.component.html',
  styleUrls: ['./add-extensions.component.css']
})

export class AddExtensionsComponent {
  userId: any;
  userType: any;
  currentDate : any;
  maxDate : any;
  startDate: any;
  endDate: any;
  taskList: any = [];
  taskId = "" as any;
  dateExtension: any;
  timeExtension: any;
  message: any;
  teamManagerID: any;
  sendTo: any;
  sendTo2: any;
  sendTo3: any;
  projectManagerID: any;
  salesperson: any;
  taskarr: any;
  arr: any;
  assignmentId: any;
  invoiceId: any;
  taskDetailsId: any;

  constructor(private router: Router,private taskservice: TaskService,private common: CommonService, private activateRoute: ActivatedRoute){
    this.userId = localStorage.getItem('pmtuserId');
    this.userType = localStorage.getItem('pmtuserType');

    this.taskarr = this.activateRoute.snapshot.paramMap.get('id');
   
    this.arr = this.taskarr.split('&');
    this.assignmentId = this.arr[0];
    this.invoiceId = this.arr[1];
    this.taskId = this.arr[2];
    this.taskDetailsId = this.arr[3];
    
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];
   // this.currentDate = this.common.getTodayDate(today);

    if(this.userType == 'TL'){
      this.getAssigneeByTaskID(this.taskId);
    }
  }

  ngOnInit() {
    
  }

  getAssigneeByTaskID(taskID: any){
    const data = {
      taskID: taskID,
    }

    this.taskservice.getAssigneeByTaskID(data).subscribe((res: any) => {
        this.teamManagerID = res.response.teammanagerid;
    })
  }

  submitExtention(){
    if(this.dateExtension == "" || this.dateExtension == null || this.dateExtension == undefined) {
      this.common.showAlertMessage("Please enter date extension", this.common.errContent);
      return;
    }

    if(this.timeExtension == "" || this.timeExtension == null || this.timeExtension == undefined) {
      this.common.showAlertMessage("Please enter time extension", this.common.errContent);
      return;
    }

    if(this.message == "" || this.message == null || this.message == undefined) {
      this.common.showAlertMessage("Please enter message", this.common.errContent);
      return;
    }

    if(this.userType == 'TL'){
      this.sendTo = this.teamManagerID;
    }

    if(this.userType == 'TM'){
      this.sendTo2 = this.projectManagerID;
    }

    if(this.userType == 'PM'){
      this.sendTo3 = this.salesperson;
    }

    const data = {
      taskId: this.taskId,
      assignmentId: this.assignmentId,
      invoiceId: this.invoiceId,
      taskDetailsId: this.taskDetailsId,
      extentionDate: this.dateExtension,
      extentionTime: this.timeExtension,
      extentionMessage: this.message,
    };

    this.taskservice.addExtention(data).subscribe((res: any) => {
      if (res.success) {
        this.router.navigate(['pages/extentions']);
        this.common.showAlertMessage(res.message, this.common.succContent);
      }
    })
  }
 
}
