import { Component } from '@angular/core';
import { CommonService } from 'src/app/services/common/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-rework',
  templateUrl: './rework.component.html',
  styleUrls: ['./rework.component.css']
})

export class ReworkComponent {
  userId: any;
  userType: any;
  taskId: any;
  assignmentInstruction = "" as any;
  assignment = "" as any;
  dueDate : any;
  proposedStructure = "" as any;
  FileOrg : any;
  FileOrgAll : any;
  fileDocAll : any;
  filePath = "http://3.111.113.246:8082/uploads/documents/";
  disabledSubmit: boolean = false;
  isDocDiv: boolean = false;
  isHidden : boolean = true;
  isAssign: boolean = true;
  isReadOnly: boolean = true;
  projectManagerList: any = [];
  projectmanagerarray : any = [];
  docsLink = "" as any;
  dropdownManagerSettings: any = {};
  dropdownTeamLeaderSettings: any = {};
  dropdownQAnalystSettings: any = {};
  dropdownExpertsSettings: any = {};
  dropdownProjectManagerSettings: any = {};
  teamManagerList: any= [];
  teamLeaderList: any =[];
  teamManagerarray: any = [];
  teamLeaderarray: any = [];
  qualityAnalystarray : any =[];
  qualityAnalystList: any =[];
  expertsList: any =[];
  expertsarray: any = [];
  isMark: boolean = false;
  project_manager : any = [];
  team_manager :any = [];
  team_leader :any = [];
  experts : any =[];
  uploadfiles = "" as any;


  constructor(private common: CommonService, private activateRoute: ActivatedRoute, private router: Router, private userservice: UserService, private taskservice: TaskService){
    this.userId = localStorage.getItem('pmtuserId');
    this.userType = localStorage.getItem('pmtuserType');
    this.docsLink = "Hello";

    this.taskId = this.activateRoute.snapshot.paramMap.get('id');
   
    if (this.taskId != 0) {
      this.getTaskDetailsById();
      this.getAssigneeByTaskID();
    } 

    if(this.userType == 'SME' || this.userType =='SSME' || this.userType =='JSME' || this.userType =='ATL' || this.userType =='QA' ){
      this.isAssign = false;
      this.isMark = true;
      this.isHidden = false;
    }

    if(this.userType == 'Admin'  && this.docsLink == ''){
      this.getProjectManagers();
      this.isDocDiv = false;
      this.isAssign = true;
      this.isHidden = true;
    }

    if(this.userType == 'Admin'  && this.docsLink != ''){
      this.getProjectManagers();
      this.isDocDiv = true;
      this.isHidden = false;
      this.isMark = true;
      this.isAssign = false;
    }

    if(this.userType == 'PM'){
      this.getTeamManagersById();
    }

    if(this.userType == 'TM'){
      this.getTeamLeadersById();
      this.getQualityAnalystById();
    }

    if(this.userType =='TL' && this.docsLink == ''){
      this.getExpertsById();
      this.isReadOnly = false;
      this.isDocDiv = false;
    }

    if(this.userType =='TL' && this.docsLink != ''){
      this.getExpertsById();
      this.isReadOnly = false;
      this.isDocDiv = false;
      this.isAssign = false;
      this.isMark = true;
    }

    if(this.userType == 'PM' && this.docsLink == ''){
      this.isReadOnly = true;
      this.isMark = false;
      this.isAssign = true;
      this.isHidden = true;
    }

    if(this.userType == 'PM' && this.docsLink != ''){
      this.isHidden = false;
      this.isAssign = false;
      this.isMark = true;
      this.isDocDiv = true;
    }

    if(this.userType == 'TM' && this.docsLink == ''){
      this.isReadOnly = true;
      this.isMark = false;
      this.isAssign = true;
      this.isHidden = true;
    }

    if(this.userType == 'TM' && this.docsLink != ''){
      this.isHidden = false;
      this.isAssign = false;
      this.isMark = true;
      this.isDocDiv = true;
    }


  }

  ngOnInit() {
    this.dropdownManagerSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'firstName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
    };

    this.dropdownTeamLeaderSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'firstName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
    };

    this.dropdownQAnalystSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'firstName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
    };

    this.dropdownExpertsSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'firstName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
    };

    this.dropdownProjectManagerSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'firstName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
    }
  }

  viewProjectById(){
    const data = {
      task_id: this.taskId    
    };

    // this.taskservice.getTaskDetails(data).subscribe((res: any) => {
    //   if (res.success) {
    //     this.dueDate = res.response.dueDate;
    //     this.assignment = res.response.assignment;
    //     this.assignmentInstruction = res.response.assignmentInstruction;
    //     this.proposedStructure = res.response.proposedStructure;
    //   }
    // });
  }

  fileUpload(event: any){
    this.FileOrg = event.target.files;
    
    if (this.FileOrg) {
      const formData = new FormData();
     
      for (let i = 0; i < this.FileOrg.length; i++) {
        const file = this.FileOrg[i];
        formData.append('files[]', file, file.name);
      }
      this.common.multipleFileUpload(formData).subscribe(
        (res: any) => {
          if (res.success) {
           
            this.common.showAlertMessage(res.message, this.common.succContent);
            let tempAssignmentDocAll: string[] = [];
            for (var i = 0; i < res.response.length; i++) {
              this.FileOrgAll = this.FileOrgAll ? this.FileOrgAll + "," + res.response[i].originalFilename : res.response[i].originalFilename;
              tempAssignmentDocAll.push(res.response[i].newFilename);
            }
            this.fileDocAll = this.fileDocAll ? this.fileDocAll.concat(tempAssignmentDocAll) : tempAssignmentDocAll;
          }
        },
        (error: any) => {
          console.error('Error uploading file:', error);
        }
      );
    }
  }

  viewFile(id: any){
    // console.log(id);
    // console.log(this.filePath);
    const viewFile = this.filePath + id;
    window.open(viewFile, "_blank");
  }

  removeFile(id: any){
    this.fileDocAll.splice(id,1);
  }

  submitAssignee(){
    if(this.userType == 'Admin'){
      if (this.projectmanagerarray == "" || this.projectmanagerarray == null || this.projectmanagerarray == undefined) {
        this.common.showAlertMessage("Please select Project Manager", this.common.errContent);
        return;
      }
    }

    if(this.userType == 'PM'){
      if (this.teamManagerarray == "" || this.teamManagerarray == null || this.teamManagerarray == undefined) {
        this.common.showAlertMessage("Please select Team Manager", this.common.errContent);
        return;
      }
    }

    if(this.userType == 'TM'){
      if (this.teamLeaderarray == "" || this.teamLeaderarray == null || this.teamLeaderarray == undefined) {
        this.common.showAlertMessage("Please select Team Leader", this.common.errContent);
        return;
      }
      if (this.qualityAnalystarray == "" || this.qualityAnalystarray == null || this.qualityAnalystarray == undefined) {
        this.common.showAlertMessage("Please select Quality Analyst", this.common.errContent);
        return;
      }
    }

    if(this.userType == 'TL'){
      if (this.expertsarray == "" || this.expertsarray == null || this.expertsarray == undefined) {
        this.common.showAlertMessage("Please select Experts", this.common.errContent);
        return;
      }

      if (this.docsLink == "" || this.docsLink == null || this.docsLink == undefined) {
        this.common.showAlertMessage("Please write in Doc Link", this.common.errContent);
        return;
      }
    }

    const data = {
      projectManager: this.userId,
      teamManager: this.teamManagerarray ? this.teamManagerarray : '',
      teamLeader: this.teamLeaderarray ? this.teamLeaderarray : '',
      qualityAnalyst: this.qualityAnalystarray ? this.qualityAnalystarray : '',
      experts: this.expertsarray ? this.expertsarray : '',
      docsLink: this.docsLink ? this.docsLink : '',
      upload_files: this.fileDocAll
    }

    this.disabledSubmit = true;
    this.taskservice.addAssignee(data).subscribe((res: any) => {
      if (res.success) {
        this.disabledSubmit = false;
        this.common.showAlertMessage(res.message, this.common.succContent);
        this.docsLink = "";
      }
    });
  }

  getTeamManagersById(){
    const data = {
      projectmanager_id: this.userId    
    };
    // this.userservice.getTeamManagersById(data).subscribe((res: any) => {
    //   if (res.success) {
    //     this.teamManagerList = res.response.team_manager;
        
    //   }
    // });
    this.teamManagerList = this.common.getTeamManagerList;
    console.log(this.teamManagerList);
  }


  getTeamLeadersById(){
    const data = {
      teammanager_id: this.userId    
    };
    // this.userservice.getTeamLeadersById(data).subscribe((res: any) => {
    //   if (res.success) {
    //     this.teamLeaderList = res.response.team_leader;
    //   }
    // });
    this.teamLeaderList = this.common.getTeamLeaderList;
  }


  getQualityAnalystById(){
    const data = {
      teammanager_id: this.userId    
    };
    // this.userservice.getQualityAnalystById(data).subscribe((res: any) => {
    //   if (res.success) {
    //     this.qualityAnalystList = res.response.quality_analyst;
    //   }
    // });
    this.qualityAnalystList = this.common.getQualityAnalystList;
  }


  getAssigneeByTaskID(){
    const data = {
      task_id: this.taskId    
    };
    this.taskservice.getAssigneeByTaskID(data).subscribe((res: any) => {
      if (res.success) {
        this.project_manager = res.response.project_manager;
        this.team_manager = res.response.team_manager;
        this.team_leader = res.response.project_manager;
        this.experts = res.response.project_manager;
      }
    });
  }

  getProjectManagers(){
    // this.userservice.getProjectManagers().subscribe((res: any) => {
    //   if (res.success) {
    //     this.projectManagerList = res.response.project_managers;
    //   }
    // });
    this.projectManagerList = this.common.getProjectManagerList;
  }


  getExpertsById(){
    const data = {
      leader_id: this.userId    
    };
    // this.userservice.getExpertsById(data).subscribe((res: any) => {
    //   if (res.success) {
    //     this.expertsList = res.response.experts;
    //   }
    // });
    this.expertsList = this.common.getExpertsByTeamLeader;
  }

  getTaskDetailsById(){
    const data = {
      task_id: this.taskId    
    };

    // this.taskservice.getTaskDetails(data).subscribe((res: any) => {
    //   if (res.success) {
    //     //console.log(res.response);
    //     if (res.response.length > 0) {
    //       this.taskId = res.response.taskId;
    //       this.assignment = res.response.assignment;
    //       this.proposedStructure = res.response.proposedStructure;
    //       this.assignmentInstruction = res.response.assignmentInstruction;
    //       this.dueDate = res.response.dueDate;
    //       this.uploadfiles = res.response.assignmentDoc;
    //       }
    //     }
    // });
  }

}
