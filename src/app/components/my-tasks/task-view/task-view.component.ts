import { Component } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { TaskService } from 'src/app/services/task/task.service';
import { MatDialog , MatDialogRef, MatDialogConfig ,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { HttpClient, HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})

export class TaskViewComponent {

  taskId = "" as any;
  driveLink = "" as any;
  taskWC = "" as any;
  wordCount = "" as any;
  deadlineTime = "" as any;
  time = "" as any;
  topic_chosen = "" as any;
  course = "" as any;
  countryId = "" as any;
  university = "" as any;
  subject = "" as any;
  assignment = "" as any;
  formating = "" as any;
  referenceStyle = "" as any;
  noOfReferences = "" as any;
  bibliography = "" as any;
  appendices = "" as any;
  student_id = "" as any;
  docLink = "" as any;
  assign_instruction = "" as any;
  countryList: any = [];
  universityList : any =[];
  courseList : any = [];
  pageName :any;
  userId : any;
  userType : any;
  isHidden : boolean = true;
  isComplete: boolean = false;
  isAssign: boolean = true;
  project_manager : any = [];
  team_manager :any = [];
  team_leader :any = [];
  experts : any =[];
  dueDate = '' as any;
  dropdownTeamManagerSettings: any = {};
  dropdownTeamLeaderSettings: any = {};
  dropdownQAnalystSettings: any = {};
  dropdownExpertsSettings: any = {};
  dropdownProjectManagerSettings: any = {};
  teamManagerList: any= [];
  teamLeaderList: any =[];
  teamManagerarray: any = [];
  teamLeaderarray: any = [];
  qualityAnalystarray : any =[];
  projectmanagerarray : any = [];
  qualityAnalystList: any =[];
  expertsList: any =[];
  expertsarray: any = [];
  projectManagerList: any = [];
  country: any;
  countryName: any;
  assignmentInstruction = "" as any;
  proposedStructure = "" as any;
  uploadfiles = "" as any;
  docLinkDiv: boolean = true;
  isUpdate: boolean = false;
  isReadOnly: boolean = true;
  isDOCLINK: boolean = false;
  isMark: boolean = false;
  isCollab: boolean = false;
  isFileDiv: boolean = true;
  FileOrg : any;
  FileOrgAll : any;
  fileDocAll : any;
  filePath = "http://3.111.113.246:8088/uploads/documents/";
  disabledSubmit: boolean = false;
  isEdit: boolean = true;
  isDocDiv: boolean = false;
  isExtension: boolean = true;
  isQuery: boolean = true;
  taskarr: any;
  assignmentId: any;
  invoiceId: any;
  arr: any;
  imgPath = "http://3.111.113.246:8082/uploads/documents/";
  allfiles : any = [];
  leadId: any;
  studentId: any;
  assignTo : any = [];
  pminputValue: any = [];
  tminputValue: any = [];
  tlinputValue: any = [];
  qainputValue: any = [];
  pmWC : any = [];
  tmWC : any = [];
  tLWC : any = [];
  qaWC : any = [];
  assignToQA: any = '';
  password = '' as any;
  assignmentDoc = "" as any;
  DetailsId : any;
  taskDetailsId : any;
  taskDoc = "" as any;
  pmAssignTo = "" as any;
  currentUrl = "" as any;
  page = "" as any;
  pmarray = "" as any;
  selectedPMItems = [] as any;
  selectedTMItems = [] as any;
  tmarray = "" as any;
  tLarray = "" as any;
  selectedTLItems = [] as any;
  QAarray = "" as any;
  selectedQAItems = [] as any;
  expertarray = "" as any;
  selectedExpItems = [] as any;
  labell: boolean = true;
  collaborators: any;
  pmCollabs : any = [];
  tmCollabs : any = [];
  tlCollabs : any = [];
  qaCollabs : any = [];
  expertCollabs : any = [];
  imagePath  = "http://3.111.113.246:8088/uploads/images/";
  workCategory = "";
  style: any;
  inputValue: any;
  showInputField = false;
  createdBy: any;
  courseId: any;
  universityId: any;
  collectedValues: any = [];
  totalSum: number = 0;
  

  constructor(private dialog: MatDialog, private common: CommonService, private router: Router , private activateRoute: ActivatedRoute,private taskservice: TaskService, private userservice: UserService){
    
    this.userId = localStorage.getItem('pmtuserId');
    this.userType = localStorage.getItem('pmtuserType');
   console.log(this.userType);

    this.pageName = this.activateRoute.snapshot.url[this.activateRoute.snapshot.url.length - 3].path;
    if (this.pageName.includes('&')) {
      this.currentUrl = this.router.url;
      this.activateRoute.url.subscribe(urlSegment => {
        if (urlSegment.length > 0) {
          this.pageName = urlSegment[0].path; // Get the first segment
        }
      });
    }
 
    this.taskarr = this.activateRoute.snapshot.paramMap.get('id');
   
    this.arr = this.taskarr.split('&');
    this.assignmentId = this.arr[0];
    this.invoiceId = this.arr[1];
    this.taskId = this.arr[2];
    this.taskDetailsId = this.arr[3];

    if (this.userType == 'Admin') {
        if(this.pageName == 'task-allocation'){
         
          this.getTaskDetailsById();

        }else if(this.pageName == 'assigned-task' && this.assignmentId != 0 && this.invoiceId != 0 && this.taskId != 0 && this.taskDetailsId != 0){
          
          this.getTaskDetails();
          this.isAssign = false;
          this.isFileDiv = false;
        }

    }else if(this.userType != 'Admin'){

      if(this.pageName == 'task-allocation'){
        this.getTaskDetails();
      
      }else if(this.pageName == 'assigned-task' && this.assignmentId != 0 && this.invoiceId != 0 && this.taskId != 0 && this.taskDetailsId != 0){
        
        this.getTaskDetails();
        this.isAssign = false;
        this.isFileDiv = false;
      }
    }


    if(this.userType == 'SME' || this.userType =='SSME' || this.userType =='JSME' || this.userType =='ATL'){
      this.isAssign = false;
      this.isDocDiv = true;
      this.isMark = true;
      this.isHidden = false;
      this.isExtension = false;
      this.isQuery = false;
      this.labell = false;
      this.isFileDiv = false;
    }

    if(this.userType == 'Admin'  && this.docLink == ''){
      this.getProjectManagers();
      this.isDocDiv = false;
      this.isDOCLINK = true;
      this.isAssign = true;
      this.isExtension = false;
      this.isQuery = false;
      this.isHidden = true;
      this.labell = true;
    }

    if(this.userType == 'Admin'  && this.docLink != ''){
      this.getProjectManagers();
      this.isDocDiv = true;
      this.isDOCLINK = true;
      this.isHidden = false;
      this.isMark = true;
      this.isAssign = false;
      this.isExtension = false;
      this.isQuery = false;
      this.labell = true;
    }


    if(this.userType =='TL' && this.docLink == ''){
      this.getExpertsById();

      this.isReadOnly = true;
      if(this.pageName == 'task-allocation'){
        this.isExtension = false;
        this.isQuery = false;
        this.isHidden = true;
       

      }else if(this.pageName == 'assigned-task'){
        this.isExtension = true;
        this.isQuery = true;
        this.isHidden = false;
        this.isDocDiv = true;
      }
      this.labell = true;
    }


    if(this.userType =='TL' && this.docLink != ''){
      this.getExpertsById();
      this.isReadOnly = true;
      this.isDocDiv = true;
      this.isHidden = true;
      this.isAssign = false;
      this.isMark = true;
      if(this.pageName == 'task-allocation'){
        this.isExtension = false;
        this.isQuery = false;

      }else if(this.pageName == 'assigned-task'){
        this.isExtension = true;
        this.isQuery = true;
      }
      this.labell = true;
    }


    if(this.userType =='QA'){
      if(this.pageName == 'assigned-task'){
        this.isExtension = true;
        this.isQuery = true;
        this.labell = false;
        this.isAssign = false;
        this.isDocDiv = true;
        this.isMark = true;
        this.isHidden = false;
        this.isDOCLINK = true;
      }
    }


    if(this.userType == 'PM' && this.docLink == ''){
      this.getTeamManagersById();
      this.isReadOnly = true;
      this.isMark = false;
      this.isAssign = true;
      this.isHidden = true;
      this.isDOCLINK = true;

      //if(this.pageName == 'task-allocation'){
        this.isExtension = false;
        this.isQuery = false;

      // }else if(this.pageName == 'assigned-task'){
      //   this.isExtension = true;
      //   this.isQuery = true;
      // }
      this.labell = true;
    }
  

    if(this.userType == 'PM' && this.docLink != ''){
      this.getTeamManagersById();
      this.isHidden = false;
      this.isAssign = false;
      this.isMark = true;
      this.isDOCLINK = true;
      this.isDocDiv = true;
      //if(this.pageName == 'task-allocation'){
      this.isExtension = false;
      this.isQuery = false;

      // }else if(this.pageName == 'assigned-task'){
      //   this.isExtension = true;
      //   this.isQuery = true;
      // } 
      this.labell = true;
    }

  
    if(this.userType == 'TM' && this.docLink == ''){
      this.getTeamLeadersById();
      this.getQualityAnalystById();
      this.isReadOnly = true;
      this.isMark = false;
      this.isAssign = true;
      this.isHidden = true;
      this.isDOCLINK = true;
      //if(this.pageName == 'task-allocation'){
        this.isExtension = false;
        this.isQuery = false;

      // }else if(this.pageName == 'assigned-task'){
      //   this.isExtension = true;
      //   this.isQuery = true;
      // } 
      this.labell = true;
    }

  
    if(this.userType == 'TM' && this.docLink != ''){
      this.getTeamLeadersById();
      this.getQualityAnalystById();
      this.isHidden = false;
      this.isAssign = false;
      this.isMark = true;
      this.isDocDiv = true;

      //if(this.pageName == 'task-allocation'){
        this.isExtension = false;
        this.isQuery = false;

      // }else if(this.pageName == 'assigned-task'){
      //   this.isExtension = true;
      //   this.isQuery = true;
      // } 
      this.labell = true;
    }
  }




  onItemSelect(item: any) {
  
    if (item.userId > 0) {
      this.showInputField = true;
    } else {
      this.showInputField = false;
    }
  }


  ngOnInit() {

    this.activateRoute.url.subscribe(url => {
      const pageName = url[0].path;
    });

    this.dropdownTeamManagerSettings = {
      singleSelection: false,
      idField: 'userId',
      textField: 'firstName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
    };

    this.dropdownTeamLeaderSettings = {
      singleSelection: false,
      idField: 'userId',
      textField: 'firstName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
    };

    this.dropdownQAnalystSettings = {
      singleSelection: false,
      idField: 'userId',
      textField: 'firstName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
    };

    this.dropdownExpertsSettings = {
      singleSelection: false,
      idField: 'userId',
      textField: 'firstName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
    };

    this.dropdownProjectManagerSettings = {
      singleSelection: false,
      idField: 'userId',
      textField: 'firstName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
    }
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
    const viewFile = this.filePath + id;
    window.open(viewFile, "_blank");
  }

  viewDoc(id: any){
    const viewFile = this.imgPath + id;
    window.open(viewFile, "_blank");
  }

  removeFile(id: any){
    this.fileDocAll.splice(id,1);
  }

  arrayToString(array: string[]): string {
    return array.join(', ');
  }

 
  markasComplete(){
    const data = {
      taskDetailsId: this.userId ,
      invoiceId: this.invoiceId,
      assignmentId: this.assignmentId,
      leadId: this.leadId,
      taskId: this.taskId,
      deliveredWordCount: this.wordCount
    };

    this.taskservice.taskMarkAsComplete(data).subscribe((res: any) => {
      if (res.success) {
        this.common.showAlertMessage(res.message, this.common.succContent);
        this.router.navigate(['pages/assigned-task']);
        this.isComplete = true;
        this.isMark = false;
      }else{
        this.common.showAlertMessage(res.message, this.common.errContent);
      }
    })
  }


  getTeamManagersById(){
    const data = { 
      userId :  this.userId,
      userType : this.userType
    }
    this.userservice.getUserListById(data).subscribe((res: any) => {
      if (res.success) {
        this.teamManagerList = res.response;
        //console.log(this.teamManagerList);
      }
    })
  }


  getTeamLeadersById(){
    this.userservice.specificPositionList().subscribe((res: any) => {
      if (res.success) {
        this.teamLeaderList = res.response;
      }
    })
  }


  getQualityAnalystById(){
    const data = { 
      userType : 'QA'
    }
    this.userservice.positionList(data).subscribe((res: any) => {
      if (res.success) {
        this.qualityAnalystList = res.response;
        console.log(this.qualityAnalystList);
      }
    })
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
      this.userservice.specificPositionList().subscribe((res: any) => {
        if (res.success) {
          this.projectManagerList = res.response;
          console.log(this.projectManagerList);
        }
      })
  }


  getExpertsById(){
    const data = {
      userId: this.userId,
      userType : this.userType
    };
    this.userservice.getUserListById(data).subscribe((res: any) => {
      if (res.success) {
        this.expertsList = res.response;
      }
    });
  }

  
  getTaskDetails(){
    this.taskservice.getOtherTaskDetails(this.assignmentId,this.invoiceId,this.taskId,this.taskDetailsId).subscribe((res: any) => {
      if (res.success) {

        setTimeout(() => {

          /******* Show Multi select values in dropdown  PM *******************/
          this.pmarray = res.response.adminAssignTo;
            if(this.pmarray){
             
              var pmId : any = [];
              if (this.pmarray.includes(",")) {
                var Arr = [];
                Arr = this.pmarray.split(",");
                for (let i = 0; i < Arr.length; i++) {
                  pmId.push(Number(Arr[i]));
                }
              } else {
                pmId.push(Number(this.pmarray));
              }
              this.selectedPMItems = this.projectManagerList.filter((item: any) => pmId.includes(item.userId));
              this.projectmanagerarray = this.selectedPMItems;
            }

          /***************************** TM **********************************/
        
                this.tmarray = res.response.pmAssignTo;
                if(this.tmarray){
                  var tmId : any = [];
                  if (this.tmarray.includes(",")) {
                    var tempArr = [];
                    tempArr = this.tmarray.split(",");
                    for (let i = 0; i < tempArr.length; i++) {
                      tmId.push(Number(tempArr[i]));
                    }
                  } else {
                    tmId.push(Number(this.tmarray));
                  }
                
                  this.selectedTMItems = this.teamManagerList.filter((item: any) => tmId.includes(item.userId));
                  this.teamManagerarray = this.selectedTMItems; 
                }

          /***************************** TL *********************************/

                this.tLarray = res.response.tmAssignTo;
                if(this.tLarray){ 
                    var tLId : any = [];
                    if (this.tLarray.includes(",")) {
                      var tempArray = [];
                      tempArray = this.tLarray.split(",");
                      for (let i = 0; i < tempArray.length; i++) {
                        tLId.push(Number(tempArray[i]));
                      }
                    } else {
                      tLId.push(Number(this.tLarray));
                    }
                  
                    this.selectedTLItems = this.teamLeaderList.filter((item: any) => tLId.includes(item.userId));
                    this.teamLeaderarray = this.selectedTLItems; 
                }


          /***************************** QA **********************************/

              this.QAarray = res.response.tmAssignToQA;
                if(this.QAarray){ 
                    var qaId : any = [];
                    if (this.QAarray.includes(",")) {
                      var QAArr = [];
                      QAArr = this.QAarray.split(",");
                      for (let i = 0; i < QAArr.length; i++) {
                        qaId.push(Number(QAArr[i]));
                      }
                    } else {
                      qaId.push(Number(this.QAarray));
                    }
                  
                    this.selectedQAItems = this.qualityAnalystList.filter((item: any) => qaId.includes(item.userId));
                    this.qualityAnalystarray = this.selectedQAItems; 
                }

          /**************************** Expert ********************************/

          this.expertarray = res.response.tlAssignTo;
          if(this.expertarray){ 
              var eId : any = [];
              if (this.expertarray.includes(",")) {
                var EArr = [];
                EArr = this.expertarray.split(",");
                for (let i = 0; i < EArr.length; i++) {
                  eId.push(Number(EArr[i]));
                }
              } else {
                eId.push(Number(this.expertarray));
              }
            
              this.selectedExpItems = this.expertsList.filter((item: any) => eId.includes(item.userId));
              this.expertsarray = this.selectedExpItems; 
          }

        /*********************************************************************/
      
      }, 800);
       

        //console.log(res.response);
          this.taskId = res.response.taskId;
          this.wordCount = res.response.wordCount;
          this.deadlineTime = res.response.deadlineTime;
          this.topic_chosen = res.response.topicChoosen;
          this.studentId = res.response.studentId;
          this.leadId = res.response.leadId;
          this.password = res.response.password;
          this.countryId = res.response.countryId;
          this.universityId = res.response.universityId;
          this.courseId = res.response.courseId;
          this.country = res.response.countryName;
          this.university = res.response.universityName;
          this.course = res.response.courseName;
          this.subject = res.response.subject;
          this.assignment = res.response.assignment;
          this.proposedStructure = res.response.proposedStructure;
          this.referenceStyle = res.response.referenceStyle;
          this.noOfReferences = res.response.noOfReferences;
          this.assignmentInstruction = res.response.assignmentInstruction;
          this.bibliography = res.response.bibliography;
          this.appendices = res.response.appendices;
          this.createdBy = res.response.createdBy;
          this.docLink = res.response.docLink;
          this.driveLink = res.response.driveLink;
          this.dueDate = this.convertDateTime(res.response.dueDate);
          this.workCategory = res.response.workCategory;
          this.uploadfiles = res.response.assignmentDoc;
          if(this.uploadfiles){
            this.allfiles = this.uploadfiles.split(',');
          }
         
          this.taskDoc = res.response.taskDoc;
          if( this.taskDoc){
          this.fileDocAll = this.taskDoc.split(',');
          }

          this.collaborators = res.collaborator;
          this.pmCollabs = res.collaborator.pm;
          this.tmCollabs = res.collaborator.tm;
          this.tlCollabs = res.collaborator.tl;
          this.qaCollabs = res.collaborator.qa;
          this.expertCollabs = res.collaborator.expart;
        
      }
    });
  }
 

  setDynamicClasses(taskId: any,workCategory: any){
    
    if(workCategory == 'Management'){
      this.style = "red";
    }else if(workCategory == 'Medical'){
      this.style  = "#00e5ff";
    }
    return this.style;
  }

  
  submitAssignee(){

   // this.taskWC = this.wordCount;

    if(this.userType == 'Admin'){
      if (this.projectmanagerarray == "" || this.projectmanagerarray == null || this.projectmanagerarray == undefined) {
        this.common.showAlertMessage("Please select Project Manager", this.common.errContent);
        return;
      }
      let ids: any = [];
      this.projectmanagerarray.forEach( (element: any) => {
        ids.push(element.userId);
      });
      this.assignTo = ids.join(",");


      /*this.pminputValue = this.projectmanagerarray.map((item: any) => item.pminputValue);
      this.totalSum = this.pminputValue.reduce((sum: any, value: any) => sum + Number(value), 0);
     
      this.pmWC = this.pminputValue.join(",");


      if(this.totalSum < this.taskWC){
        this.common.showAlertMessage("Total Sum of Wordcounts should not less than " + this.taskWC, this.common.errContent);
      }else if(this.totalSum > this.taskWC){
        this.common.showAlertMessage("Total Sum of Wordcounts should not greater than " + this.taskWC, this.common.errContent);
      }*/
    }


    if(this.userType == 'PM'){
      if (this.teamManagerarray == "" || this.teamManagerarray == null || this.teamManagerarray == undefined) {
        this.common.showAlertMessage("Please select Team Manager", this.common.errContent);
        return;
      }
      let ids: any = [];
      this.teamManagerarray.forEach( (element: any) => {
        ids.push(element.userId);
      });
      this.assignTo = ids.join(",");

      /*this.tminputValue = this.teamManagerarray.map((item: any) => item.tminputValue);
      this.totalSum = this.tminputValue.reduce((sum: any, value: any) => sum + Number(value), 0);
      this.tmWC = this.tminputValue.join(",");

      if(this.totalSum < this.taskWC){
        this.common.showAlertMessage("Total Sum of Wordcounts should not less than " + this.taskWC, this.common.errContent);
      }else if(this.totalSum > this.taskWC){
        this.common.showAlertMessage("Total Sum of Wordcounts should not greater than " + this.taskWC, this.common.errContent);
      }*/
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

      let ids: any = [];
      this.teamLeaderarray.forEach( (element: any) => {
        ids.push(element.userId);
      });
      this.assignTo = ids.join(",");


     /* this.tlinputValue = this.teamLeaderarray.map((item: any) => item.tlinputValue);
      this.tLWC = this.tlinputValue.join(",");*/


      let id: any = [];
      this.qualityAnalystarray.forEach( (element: any) => {
        id.push(element.userId);
      });
      this.assignToQA = id.join(",");

      /*this.qainputValue = this.qualityAnalystarray.map((item: any) => item.qainputValue);
      this.qaWC = this.qainputValue.join(",");*/
    }


    if(this.userType == 'TL'){
      if (this.expertsarray == "" || this.expertsarray == null || this.expertsarray == undefined) {
        this.common.showAlertMessage("Please select Experts", this.common.errContent);
        return;
      }
      let ids: any = [];
      this.expertsarray.forEach( (element: any) => {
        ids.push(element.userId);
      });
      this.assignTo = ids.join(",");


      if (this.docLink == "" || this.docLink == null || this.docLink == undefined) {
        this.common.showAlertMessage("Please write in Doc Link", this.common.errContent);
        return;
      }
    }

    if(this.userType == 'Admin'){
      this.taskDetailsId = '';
    }else if(this.userType != 'Admin'){
      this.taskDetailsId = this.taskDetailsId;
    }

    const data = {
      assignTo: this.assignTo ? this.assignTo : '',
      assignToQA: this.assignToQA ? this.assignToQA : '',
      taskId: this.taskId,
      assignmentId: this.assignmentId,
      invoiceId: this.invoiceId,
      leadId: this.leadId,
      docLink: this.docLink ? this.docLink : '',
      taskDoc: this.fileDocAll ? this.fileDocAll.toString(): "",
      taskDetailsId: this.taskDetailsId,
      assignmentCreatedBy: this.createdBy,
      countryId: this.countryId,
      universityId: this.universityId,
      courseId: this.courseId,
    }

    console.log(data);

    this.disabledSubmit = true;
    this.taskservice.addAssignee(data).subscribe((res: any) => {
      if (res.success) {
        this.disabledSubmit = false;
        this.common.showAlertMessage(res.message, this.common.succContent);
        this.docLink = "";
        this.router.navigate(['pages/assigned-task']);
      }else{
        this.common.showAlertMessage(res.message, this.common.errContent);
      }
    });
  }

  getTaskDetailsById(){
   
    this.taskservice.getTaskDetails(this.assignmentId,this.invoiceId,this.taskId).subscribe((res: any) => {
      if (res.success) {
        console.log(res.response);
          this.taskId = res.response.taskId;
          this.wordCount = res.response.wordCount;
          this.deadlineTime = this.transform(res.response.deadlineTime);
          this.topic_chosen = res.response.topicChoosen;
          this.studentId = res.response.studentId;
          this.leadId = res.response.leadId;
          this.password = res.response.password;
          this.country = res.response.countryName;
          this.university = res.response.universityName;
          this.countryId = res.response.countryId;
          this.universityId = res.response.universityId;
          this.courseId = res.response.courseId;
          this.course = res.response.courseName;
          this.subject = res.response.subject;
          this.assignment = res.response.assignment;
          this.createdBy = res.response.createdBy;
          this.proposedStructure = res.response.proposedStructure;
          this.referenceStyle = res.response.referenceStyle;
          this.noOfReferences = res.response.noOfReferences;
          this.assignmentInstruction = res.response.assignmentInstruction;
          this.bibliography = res.response.bibliography;
          this.appendices = res.response.appendices;
          this.docLink = res.response.docLink;
          this.driveLink = res.response.driveLink;
          this.dueDate = this.convertDateTime(res.response.dueDate);
          this.uploadfiles = res.response.assignmentDoc;
          if(this.uploadfiles){
            this.allfiles = this.uploadfiles.split(',');
          }
         
          this.taskDoc = res.response.taskDoc;
          if(this.taskDoc){
            this.fileDocAll = this.taskDoc.split(',');
          }
          this.teamManagerarray = res.response.pmAssignTo;
          this.workCategory = res.response.workCategory;
      }
    });
  }

  editTask(){
    this.isEdit = false;
    this.isUpdate = true;
    this.isAssign = false;
    this.isFileDiv = false;
  }

  updateTask(){

    const data = {
      taskId: this.taskId,
      assignmentId: this.assignmentId,
      invoiceId: this.invoiceId,
      assignment: this.assignment,
      proposedStructure: this.proposedStructure,
      referenceStyle: this.referenceStyle,
      noOfReferences: this.noOfReferences,
      assignmentInstruction: this.assignmentInstruction,
      bibliography: this.bibliography,
    }

    this.taskservice.assignmentUpdate(data).subscribe((res: any) => {
      if (res.success) {
        this.common.showAlertMessage(res.message, this.common.succContent);
        this.isEdit = true;
      }else{
        this.common.showAlertMessage(res.message, this.common.errContent);
      }
    });

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



  requestExtension(assignmentId: number, invoiceId: number, taskId: number, taskDetailsId: number) {
    this.router.navigate(['pages/add-extension/'+ assignmentId + '&' + invoiceId + '&' + taskId + '&' + taskDetailsId]);
  }

  sendQuery(assignmentId: number, invoiceId: number, taskId: number, taskDetailsId: number){
    this.router.navigate(['pages/add-query/'+ assignmentId + '&' + invoiceId + '&' + taskId + '&' + taskDetailsId]);
  }


}
