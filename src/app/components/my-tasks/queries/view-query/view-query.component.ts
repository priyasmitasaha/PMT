import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/services/task/task.service';
import { CommonService } from 'src/app/services/common/common.service';


@Component({
  selector: 'app-view-query',
  templateUrl: './view-query.component.html',
  styleUrls: ['./view-query.component.css']
})


export class ViewQueryComponent {
  userId: any;
  userType: any;
  taskarr: any;
  assignmentId: any;
  invoiceId: any;
  arr: any;
  taskDetailsId: any;
  taskID: any;
  taskQueryId: any;
  query: any;
  solutionlist : any = [];
  docsFile: any = [];
  queryDocsArr: any = [];
  doc2Arr: any = [];
  queryDocs: any;
  filePath = "http://3.111.113.246:8088/uploads/documents/";


  constructor(private router: Router,private taskservice: TaskService,private common: CommonService, private activateRoute: ActivatedRoute){
    this.userId = localStorage.getItem('pmtuserId');
    this.userType = localStorage.getItem('pmtuserType');

    this.taskarr = this.activateRoute.snapshot.paramMap.get('id');
    this.arr = this.taskarr.split('&');
    this.taskQueryId = this.arr[0];
    this.assignmentId = this.arr[1];
    this.invoiceId = this.arr[2];
    this.taskID = this.arr[3];
    this.taskDetailsId = this.arr[4];
    this.taskQueryDetails();
  }

  

  taskQueryDetails(){
    const data = {
      taskQueryId : this.taskQueryId,
      assignmentId: this.assignmentId,
      taskId: this.taskID,
      taskDetailsId: this.taskDetailsId,
    }

    this.taskservice.taskQueryDetails(data).subscribe((res: any) => {
      if (res.success) {
        this.query = res.query.query;
        this.queryDocsArr = res.query.queryDocs;
        this.queryDocs =  this.queryDocsArr.split(",");


        this.solutionlist = res.solution;
        for(let i=0;i<this.solutionlist.length;i++){
            const docsFile = this.solutionlist[i].solutionDocs;
            const docarr = docsFile.split(",");
            this.doc2Arr.push(docarr)
        }
       
      }
    })
  }

  sendRply(taskQueryId: any, assignmentId: any,taskId: any, taskDetailsId: any){
    this.router.navigate(['pages/rply-query/' + taskQueryId + '&' + assignmentId + '&' + taskId + '&' + taskDetailsId]);
  }

  sendQuery(query: any, queryDocs: any){
    const data = {
      taskId: this.taskID,
      assignmentId: this.assignmentId,
      invoiceId: this.invoiceId,
      taskDetailsId: this.taskDetailsId,
      query: this.query,
      queryDocs: this.queryDocs,
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


  viewQueryDoc(id: any){
    const viewFile = this.filePath + id;
    window.open(viewFile, "_blank");
  }

  viewSolutionDoc(id: any){
    const viewFile = this.filePath + id;
    window.open(viewFile, "_blank");
  }

}
