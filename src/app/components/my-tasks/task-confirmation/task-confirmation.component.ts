import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';



@Component({
  selector: 'app-task-confirmation',
  templateUrl: './task-confirmation.component.html',
  styleUrls: ['./task-confirmation.component.css']
})

export class TaskConfirmationComponent {

  task_confirmation = "" as any;
  inited: boolean = false;
  modalContent: any;
  file_upload = "" as any;
  teamManagerList : any = [];
  userType : any;
  userID : any;
  


  constructor(private router: Router,private common: CommonService){ }
  
  ngOnInit() {
    this.userID = localStorage.getItem('pmtuserId');
    this.userType = localStorage.getItem('pmtuserType');
  }
  
  addTask(){
    this.router.navigate(['pages/add-task']);
  }
 
  viewTask(taskId: any){
    this.router.navigate(['pages/view-task/'+ taskId]);
  }
}
