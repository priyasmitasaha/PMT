import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog , MatDialogRef, MatDialogConfig ,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/components/common/modal/modal.component';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})

export class AddTaskComponent {

  task_confirmation = "" as any;
  inited: boolean = false;
  modalContent :any;
  file_upload = "" as any;
  teamManagerList : any = [];
  userType : any;
  userID : any;
  myFiles: any = [];
  taskFileOrg : any;
  taskFileOrgAll : any;
  taskDocAll : any;
  filePath = "http://3.111.113.246:8088/uploads/documents/";
  pageName: any;
  taskId: any;

  constructor(private activateRoute: ActivatedRoute,private dialog: MatDialog, private httpClient: HttpClient ,private router: Router,private common: CommonService, private taskservice: TaskService){ }
  
  ngOnInit() {
    this.userID = localStorage.getItem('pmtuserId');
    this.userType = localStorage.getItem('pmtuserType');

     this.pageName = this.router.url.split('/')[2];

    if(this.pageName == 'view-task'){
      this.taskId = this.activateRoute.snapshot.paramMap.get('id');
      this.getTaskConfirmDetailsById(this.taskId);
    }
  }

 
  
  openDialog(pagetype: string): void {

    if (this.task_confirmation == "" || this.task_confirmation == null || this.task_confirmation == undefined) {
      this.common.showAlertMessage("Please enter task confirmation", this.common.errContent);
      return;
    }
   
    const dialogRef: MatDialogRef<any> = this.dialog.open(ModalComponent, {
      width: '550px',
      data: {
        task_confirmation: this.task_confirmation,
        upload_files: this.taskDocAll,
        userID : this.userID,
        userType : this.userType,
        pagetype: pagetype
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  getFileDetails(event:any) {
    //console.log(e.target.files);
    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files(i));
    }
    console.log(this.myFiles);
  }


  taskfileUpload(event: any){
    this.taskFileOrg = event.target.files;
    
    if (this.taskFileOrg) {
      const formData = new FormData();
     
      for (let i = 0; i < this.taskFileOrg.length; i++) {
        const file = this.taskFileOrg[i];
        formData.append('files[]', file, file.name);
      }
      this.common.multipleFileUpload(formData).subscribe(
        (res: any) => {
          if (res.success) {
           
            this.common.showAlertMessage(res.message, this.common.succContent);
            let tempAssignmentDocAll: string[] = [];
            for (var i = 0; i < res.response.length; i++) {
              this.taskFileOrgAll = this.taskFileOrgAll ? this.taskFileOrgAll + "," + res.response[i].originalFilename : res.response[i].originalFilename;
              tempAssignmentDocAll.push(res.response[i].newFilename);
            }
            this.taskDocAll = this.taskDocAll ? this.taskDocAll.concat(tempAssignmentDocAll) : tempAssignmentDocAll;
          }
        },
        (error: any) => {
          console.error('Error uploading file:', error);
        }
      );
    }
  }


  viewFile(id: any){
    console.log(id);
    console.log(this.filePath);
    const viewFile = this.filePath + id;
    window.open(viewFile, "_blank");
  }

  removeFile(id: any){
    this.taskDocAll.splice(id,1);
  }


  getTeamManagerList(){
    /*this.common.getTeamManagerList().subscribe((res: any) => {
      if (res.success) {
        this.teamManagerList = res.response;
        console.log(this.teamManagerList);
      }
    })*/

    this.teamManagerList = this.common.getTeamManagerList;
    console.log(this.teamManagerList);
  }

  getTaskConfirmDetailsById(taskId: any){
    const data = {
      taskId: taskId,
    }
    this.task_confirmation = 'Hello';
    this.taskservice.getTaskConfirmationDetails(data).subscribe((res: any) => {
      if (res.success) {
        
      }
    })
  }

}
