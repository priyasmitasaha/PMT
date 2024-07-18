import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from '../services/task/task.service';
import { CommonService } from '../services/common/common.service';
import { HomeComponent } from '../components/common/home/home.component';
import { RouteService } from '../services/route.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent {
  width:string= '250px';

  userType : any;
  userID : any;
  isVisible: boolean = false;
  isHidden : boolean = false;
  ongoingprojectList: any = [];
  reworkprojectList: any = [];
  redoprojectList: any = [];
  resitprojectList: any = [];
  curruserType: any;
  isAdmin:  any;
  pageName: any;
  currentUrl: any;
  assigntaskList: any = [];
  limit = this.common.limit;
  offset = this.common.offset;
  startDate: any;
  endDate: any;
  taskList: any = [];
  completeTaskList : any = [];
  reDoList : any = [];
  reSitList: any = [];
  reWorkList: any = [];
  isTask = false;
  isAssign = false;
  isTeam = true;
  isQuery = true;
  isExt = true;

  constructor(private location: Location,private routeservice:RouteService, private router:Router ,private activateRoute: ActivatedRoute, private taskservice: TaskService, private common: CommonService){
    this.userID = localStorage.getItem('pmtuserId');
    this.userType = localStorage.getItem('pmtuserType');
    this.curruserType = this.routeservice.isAuthenticationChecked; 


    if(this.userType == 'SSME' || this.userType == 'SME' || this.userType == 'JSME' || this.userType == 'ATL'){
      this.isVisible = true;
      this.isTask = false;
      this.isAssign = true;
      this.isHidden = false;
      this.isQuery = false;
      this.isExt = false;
      this.reworkProjects();
      this.redoProjects();
      this.resitProjects();
      this.getTaskList();
      this.isTeam = true;
    }


    if(this.userType == 'Admin' || this.userType == 'PM' || this.userType == 'TM' || this.userType == 'TL'){
      this.isTask = true;
      this.isHidden = true;
      this.isAssign = true;
      this.isTeam = true;
      this.isQuery = true;
      this.isExt = true;
      this.reworkProjects();
      this.redoProjects();
      this.resitProjects();
      this.recentProjectList();
    }


    if(this.userType == 'QA'){
      this.isTask = false;
      this.isAssign = true;
      this.isHidden = true;
      this.isTeam = false;
      this.isQuery = true;
      this.isExt = true;
      this.reworkProjects();
      this.redoProjects();
      this.resitProjects();
      this.recentProjectList();
    }


    if(this.userType == 'Admin'){
      this.isAdmin = true;
    }
    
  }

  ngOnInit() { 
  
  }

  recentProjectList(){
    this.taskservice.recentProjectList().subscribe((res: any) => {
      if (res.success) {
        this.taskList = res.response;
      }
    })
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

  goToHome(){
    this.router.navigate(['pages/home']);
  }

  goToTaskAllocation() {
    this.router.navigate(['pages/task-allocation']);
  }

  goToCalender() {
    this.router.navigate(['pages/calender']);
  }
  
  goToAssignedTask() {
    this.router.navigate(['pages/assigned-task']);
  }

  goToTaskDetails() {
    this.router.navigate(['pages/task-details']);
  }

  goToTaskConfirmation() {
    this.router.navigate(['pages/task-confirmation']);
  }

  goToAttendanceTracking(){
    this.router.navigate(['pages/attendance-tracking']);
  }

  goToTargetManagement(){
    this.router.navigate(['pages/target-management']);
  }

  goToProfileCreation(){
    this.router.navigate(['pages/profile-creation']);
  }

  goToTeamProfile(){
    this.router.navigate(['pages/team-profile']);
  }

  goToMyPerformance(){
    this.router.navigate(['pages/my-performance']);
  }

  goToNotAssignedUsers(){
    this.router.navigate(['pages/not-assigned-users']);
  }


  goToQAList(){
    this.router.navigate(['pages/qa-users']);
  }

  


  viewProject(assignmentId: any, invoiceId: any, taskId: any, taskDetailsId: any,pagename: any){
    this.router.navigate(['pages/projects/'+ assignmentId + '&' + invoiceId +'&'+ taskId + '&' + taskDetailsId]);
  }

  reworkProjects(){
    const data = {
      userId:  this.userID,
      userType: this.userType,
      taskType: 'rework'
    };
      // this.taskservice.getReworkprojects(data).subscribe((res: any) => {
    //   if(res.success){
    //       this.reworkprojectList = res.response;
    //   }
    // });
    this.reworkprojectList = this.common.getExpertReworks;
  }

  viewReworkProject(taskId: any){
    this.router.navigate(['pages/rework/' + taskId]);
  }

  redoProjects(){
    const data = {
      userId:  this.userID,
      userType: this.userType,
      taskType: 'redo'
    };
      // this.taskservice.getRedoprojects(data).subscribe((res: any) => {
    //   if(res.success){
    //       this.redoprojectList = res.response;
    //   }
    // });
    this.redoprojectList = this.common.getRedoProjects;
  }

  viewReDoProject(taskId: any){
    this.router.navigate(['pages/redo/' + taskId]);
  }

  resitProjects(){
    const data = {
      userId:  this.userID,
      userType: this.userType,
      taskType: 'resit'
    };
    // this.taskservice.getResitprojects(data).subscribe((res: any) => {
    //   if(res.success){
    //       this.resitprojectList = res.response;
    //   }
    // });
    this.resitprojectList = this.common.getExpertResit;
  }


  viewResitProject(taskId: any){
    this.router.navigate(['pages/resit/' + taskId]);
  }

  goToMyExtentions(){
    this.router.navigate(['pages/extentions']);
  }

  goToMyQueries(){
    this.router.navigate(['pages/queries']);
  }

  goToMyDeliveredTasks(){
    this.router.navigate(['pages/delivered-tasks']);
  }
  
  goToMyDeadlinemissedTasks(){
    this.router.navigate(['pages/deadline-missed-tasks']);
  }

}
