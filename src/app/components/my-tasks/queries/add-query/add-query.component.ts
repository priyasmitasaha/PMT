import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/services/task/task.service';
import { CommonService } from 'src/app/services/common/common.service';




@Component({
  selector: 'app-add-query',
  templateUrl: './add-query.component.html',
  styleUrls: ['./add-query.component.css']
})

export class AddQueryComponent {

  userId: any;
  userType: any;
  taskId = "" as any;
  query: any;
  status: any;
  sendTo: any;
  teamManagerID: any;
  countQuery: any;
  statusValue: any;
  myFiles: any = [];
  queryFileOrg : any;
  queryFileOrgAll : any;
  queryDocAll : any;
  filePath = "http://3.111.113.246:8088/uploads/documents/";
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
    console.log(this.userType);

    if(this.userType == 'TL'){
      this.getAssigneeByTaskID(this.taskId);
    }
  }


  getAssigneeByTaskID(taskID: any){

    const data = {
      taskID: taskID,
    }

    this.taskservice.getAssigneeByTaskID(data).subscribe((res: any) => {
        this.teamManagerID = res.response.teammanagerid;
    })
  }

  submitQuery(){

    if(this.query == "" || this.query == null || this.query == undefined) {
      this.common.showAlertMessage("Please enter query", this.common.errContent);
      return;
    }

    const data = {
      taskId: this.taskId,
      assignmentId: this.assignmentId,
      invoiceId: this.invoiceId,
      taskDetailsId: this.taskDetailsId,
      query: this.query,
      queryDocs: this.queryDocAll ? this.queryDocAll.toString(): "",
    }

    this.taskservice.addQuery(data).subscribe((res: any) => {
      if (res.success) {
        this.common.showAlertMessage(res.message, this.common.succContent);
        this.router.navigate(['pages/queries']);
      }else{
        this.common.showAlertMessage(res.message, this.common.errContent);
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
