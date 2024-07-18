import { Component } from '@angular/core';
import { TaskService } from 'src/app/services/task/task.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent {
  userType : any;
  userID : any;
  todayDate = new Date().toISOString().split('T')[0];
  currentDate : any;
  totaltaskallocated : any;
  totaltaskdelivered : any;
  totaldelivered : any;
  totalallocated : any;
  totalrework : any;
  totalredo : any;
  totalresit : any;
  isExpert: boolean = false;
  currentTime: Date = new Date();
  message: string = '';
  loginName: any;
  assigntaskList: any = [];
  limit = this.common.limit;
  offset = this.common.offset;
  startDate: any;
  endDate: any;
  taskList: any = [];
  assignedList: any = [];
  completeTaskList : any = [];
  taskAllocatedCount : number = 0;
  assignedTaskWC :number = 0;
  allocationTaskWC : number = 0;
  taskDelivededCount : number = 0;
  pageName: any;

  constructor(private router: Router,private taskservice: TaskService,private activateRoute: ActivatedRoute,private common: CommonService){
    this.userID = localStorage.getItem('pmtuserId');
    this.userType = localStorage.getItem('pmtuserType');

    const today = new Date();
    this.currentDate = this.common.getTodayDate(today);

    this.pageName = this.activateRoute.snapshot.url[this.activateRoute.snapshot.url.length - 1].path;
  }


  ngOnInit() {
    this.userID = localStorage.getItem('pmtuserId');
    this.userType = localStorage.getItem('pmtuserType');
    this.loginName = localStorage.getItem('pmtfirstName');
    
    this.updateMessage();

    if(this.userType == 'SSME' || this.userType == 'SME' || this.userType == 'JSME' || this.userType == 'ATL'){
      this.isExpert = true;
    }

    if(this.userType == 'Admin' || this.userType == 'PM' || this.userType == 'TM' || this.userType == 'TL' || this.userType == 'QA'){
      this.isExpert = false;
    }

    
    if(this.pageName == 'home'){
      this.recentProjectList();
      this.getAssignedTaskList();
    }
    
  }

  goToTask(assignmentId: any,invoiceId: any,taskId: any,taskDetailsId: any){
    this.router.navigate(['pages/assigned-task/task-view/' + assignmentId + '&' + invoiceId +'&'+ taskId + '&' + taskDetailsId]);
  }


  recentProjectList(){
    
    this.taskservice.recentProjectList().subscribe((res: any) => {
      if (res.success) {
        this.taskList = res.response;
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
        this.assignedList = res.response;
      }
    })
   
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

  updateMessage(){
    const hours = this.currentTime.getHours();

    if (hours >= 5 && hours < 12) {
      this.message = 'Good Morning!';
    } else if (hours >= 12 && hours < 17) {
      this.message = 'Good Afternoon!';
    } else if (hours >= 17 && hours < 21) {
      this.message = 'Good Evening!';
    } else {
      this.message = 'Good Night!';
    }
  }


  viewAssignedTask(assignmentId: any, invoiceId: any, task_id: any, taskDetailsId: any, pageName: any){
    this.router.navigate(['pages/'+ pageName + '/task-view/' + assignmentId + '&' + invoiceId +'&'+ task_id + '&' + taskDetailsId]);
  }
 


 viewProject(assignmentId: any, invoiceId: any, taskId: any, taskDetailsId: any,pagename: any){
  this.router.navigate(['pages/projects/'+ assignmentId + '&' + invoiceId +'&'+ taskId + '&' + taskDetailsId]);
}
  

}
