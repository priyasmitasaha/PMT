import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-view-extention',
  templateUrl: './view-extention.component.html',
  styleUrls: ['./view-extention.component.css']
})
export class ViewExtentionComponent {
  userId : any;
  userType : any;
  taskId: any;

  constructor(private router: Router,private taskservice: TaskService,private common: CommonService,private activateRoute: ActivatedRoute){
    this.userId = localStorage.getItem('pmtuserId');
    this.userType = localStorage.getItem('pmtuserType');

    this.taskId = this.activateRoute.snapshot.paramMap.get('id');
    console.log(this.taskId);
    if (this.taskId != 0) {
      this.getTaskExtentionDetails();
    }
  
  }

  getTaskExtentionDetails(){
    const data = {
      taskId: this.taskId,
    }

    this.taskservice.getTaskExtentionDetails(data).subscribe((res: any) => {
      if (res.success) {

      }
    });
  }


}
