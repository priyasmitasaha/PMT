import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/services/task/task.service';
import { CommonService } from 'src/app/services/common/common.service';


@Component({
  selector: 'app-rply-query',
  templateUrl: './rply-query.component.html',
  styleUrls: ['./rply-query.component.css']
})

export class RplyQueryComponent {

  userId: any;
  userType: any;
  taskId = "" as any;
  solution = "" as any;
  myFiles: any = [];
  queryFileOrg : any;
  queryFileOrgAll : any;
  queryDocAll : any;
  filePath = "http://3.111.113.246:8088/uploads/documents/";
  taskarr: any;
  assignmentId: any;
  invoiceId: any;
  arr: any;
  taskDetailsId: any;
  taskID: any;
  taskQueryId: any;


  constructor(private router: Router,private taskservice: TaskService,private common: CommonService, private activateRoute: ActivatedRoute){
    this.userId = localStorage.getItem('pmtuserId');
    this.userType = localStorage.getItem('pmtuserType');

    this.taskarr = this.activateRoute.snapshot.paramMap.get('id');
    this.arr = this.taskarr.split('&');
    this.taskQueryId = this.arr[0];
    this.assignmentId = this.arr[1];
    this.taskId = this.arr[2];
    this.taskDetailsId = this.arr[3];
  }


  rplyQuery(){
    if(this.solution == "" || this.solution == null || this.solution == undefined) {
      this.common.showAlertMessage("Please enter solution", this.common.errContent);
      return;
    }

    const data = {
      taskId: this.taskId,
      taskQueryId : this.taskQueryId,
      assignmentId: this.assignmentId,
      solution: this.solution,
      solutionDocs: this.queryDocAll ? this.queryDocAll.toString(): "",
      taskDetailsId: this.taskDetailsId,
    }

    this.taskservice.taskQuerySolution(data).subscribe((res: any) => {
      if (res.success) {
        this.router.navigate(['pages/queries']);
      }
    })
  }

  queryfileUpload(event: any){
    this.queryFileOrg = event.target.files;
    
    if (this.queryFileOrg) {
      const formData = new FormData();
     
      for (let i = 0; i < this.queryFileOrg.length; i++) {
        const file = this.queryFileOrg[i];
        formData.append('files[]', file, file.name);
      }
      this.common.multipleFileUpload(formData).subscribe(
        (res: any) => {
          if (res.success) {
           
            this.common.showAlertMessage(res.message, this.common.succContent);
            let tempAssignmentDocAll: string[] = [];
            for (var i = 0; i < res.response.length; i++) {
              this.queryFileOrgAll = this.queryFileOrgAll ? this.queryFileOrgAll + "," + res.response[i].originalFilename : res.response[i].originalFilename;
              tempAssignmentDocAll.push(res.response[i].newFilename);
            }
            this.queryDocAll = this.queryDocAll ? this.queryDocAll.concat(tempAssignmentDocAll) : tempAssignmentDocAll;
          }
        },
        (error: any) => {
          console.error('Error uploading file:', error);
        }
      );
    }
  }

  viewFile(id: any){
    const viewFile = this.filePath + id;
    window.open(viewFile, "_blank");
  }

  removeFile(id: any){
    this.queryDocAll.splice(id,1);
  }

}
