import { Component } from '@angular/core';
import { CommonService } from 'src/app/services/common/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { TaskService } from 'src/app/services/task/task.service';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})

export class ProjectsComponent {
  userId: any;
  userType: any;
  taskId: any;
  taskarr: any;
  assignmentId: any;
  invoiceId: any;
  arr: any;
  taskDetailsId : any;
  collaborators: any;
  pmCollabs : any = [];
  tmCollabs : any = [];
  tlCollabs : any = [];
  qaCollabs : any = [];
  expertCollabs : any = [];
  imagePath  = "http://3.111.113.246:8088/uploads/images/";

  constructor(private common: CommonService, private activateRoute: ActivatedRoute, private router: Router , private userservice: UserService, private taskservice: TaskService){
    this.userId = localStorage.getItem('pmtuserId');
    this.userType = localStorage.getItem('pmtuserType');

    this.taskarr = this.activateRoute.snapshot.paramMap.get('id');
    this.arr = this.taskarr.split('&');
    this.assignmentId = this.arr[0];
    this.invoiceId = this.arr[1];
    this.taskId = this.arr[2];
    this.taskDetailsId = this.arr[3];


    if (this.assignmentId != 0 && this.invoiceId != 0 && this.taskId != 0 && this.taskDetailsId != 0) {
      this.getTaskDetails();
      
    } 
  }


  ngOnInit() {

  }

  goToTask(taskId: any){
    this.router.navigate(['pages/assigned-task/task-view/' + this.assignmentId + '&' + this.invoiceId +'&'+ this.taskId + '&' + this.taskDetailsId]);
  }

  getTaskDetails(){
    this.taskservice.getOtherTaskDetails(this.assignmentId,this.invoiceId,this.taskId,this.taskDetailsId).subscribe((res: any) => {
      if (res.success) {
        //console.log(res.response);
          this.taskId = res.response.taskId;
          this.collaborators = res.collaborator;
          this.pmCollabs = res.collaborator.pm;
          this.tmCollabs = res.collaborator.tm;
          this.tlCollabs = res.collaborator.tl;
          this.qaCollabs = res.collaborator.qa;
          this.expertCollabs = res.collaborator.expart;
      }
    });
  }
}
