import { Component ,Inject} from '@angular/core';
import { MatDialog , MatDialogRef, MatDialogConfig ,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/services/common/common.service';
import { TaskConfirmationComponent } from '../../my-tasks/task-confirmation/task-confirmation.component';
import { TaskService } from 'src/app/services/task/task.service';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent {
 
  index = "" as any;
  dropdownTeamManagerSettings: any = {};
  dropdownTeamLeaderSettings: any = {};
  dropdownProjectManagerSettings: any = {};
  dropdownSalesSettings : any = {};
  dropdownQAnalystSettings: any = {};
  selectedManagerItems: any = [];
  managerName : any;
  firstName : any;
  lastName : any;
  userList : any= [];
  userType : any;
  array_teamManager : any =[];
  task_confirmation : any;
  upload_files : any;
  confirmTaskId : any;
  userID : any;
  projectManagerList: any = [];
  teamLeaderList: any = [];
  teamManagerList: any = [];
  qualityAnalystList: any = [];
  projectmanagerarray : any = [];
  teamManagerarray: any = [];
  teamLeaderarray: any = [];
  salesarray: any = [];
  qualityAnalystarray : any =[];
  taskconfirm: boolean = true;
  submitextension: boolean = true;
  pagetype: string;
  salesList : any = [];
  taskId : any;
  dateExtension : any;
  timeExtension : any;
  message : any;
  extentionList: any = [];


  constructor(public dialogRef: MatDialogRef<ModalComponent>,@Inject(MAT_DIALOG_DATA) public data: any ,private common: CommonService ,private taskservice: TaskService ) { 
    this.managerName = this.firstName + ' ' + this.lastName;
    this.userID = this.data.userID;
    this.userType = this.data.userType;
    this.pagetype = this.data.pagetype;
  


    if(this.userType == 'Admin' || this.userType == 'PM'){
      this.getSalesPersionList();
      this.submitextension = true;
    }

    if(this.userType == 'TM'){
      this.getProjectManagers(this.userID,this.userType);
      this.submitextension = true;
    }

    if(this.userType == 'TL'){
      this.getTeamManagersById(this.userID,this.userType);
      this.submitextension = true;
    }

    console.log(this.userType);

    this.dropdownProjectManagerSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'firstName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
    }
    this.dropdownTeamManagerSettings = {
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

    this.dropdownSalesSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'firstName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
    };
    

  }

  ngOnInit() {}

  getSalesPersionList(){

    // this.common.getSalesPersionList().subscribe((res: any) => {
    //   if (res.success) {
    //     this.salesList = res.response;
    //     console.log(this.teamManagerList);
    //   }
    // })
    this.salesList = this.common.getSalesPersonList;
  }


  getProjectManagers(userId: any ,userType:any){
    /*const data = { 
      userId : userId,
      userType : userType
    }
    this.common.getteammanagersbyid(data).subscribe((res: any) => {
      if (res.success) {
        this.teamManagerList = res.response;
        console.log(this.teamManagerList);
      }
    })*/
    this.projectManagerList = this.common.getProjectManagerList;
  }

  getTeamManagersById(userId: any ,userType:any){

    /*const data = { 
      userId : userId,
      userType : userType
    }
    this.common.getteammanagersbyid(data).subscribe((res: any) => {
      if (res.success) {
        this.teamManagerList = res.response;
        console.log(this.teamManagerList);
      }
    })*/

    this.teamManagerList = this.common.getTeamManagerList;
  }

  getTeamLeadersById(userId : any ,userType:any){

    /*const data = { 
      userId : userId,
      userType : userType
    }
    this.common.getteamleadersbyid(data).subscribe((res: any) => {
      if (res.success) {
        this.teamManagerList = res.response;
        console.log(this.teamManagerList);
      }
    })*/

    this.teamLeaderList = this.common.getTeamLeaderList;
  }

  getQualityAnalystById(userId: any ,userType:any){
 /*const data = { 
      userId : userId,
      userType : userType
    }
    this.common.getqualityanalystbyid(data).subscribe((res: any) => {
      if (res.success) {
        this.teamManagerList = res.response;
        console.log(this.teamManagerList);
      }
    })*/

    this.userList = this.common.getQualityAnalystList;
  }

  sendConfirmation(){
                        // id will be dynamic after api creation when project manager logins

      if (this.selectedManagerItems == "" || this.selectedManagerItems == null || this.selectedManagerItems == undefined) {
        this.common.showAlertMessage("Please select user", this.common.errContent);
        return;
      }
    
      var manager = this.selectedManagerItems;
      var selectManager = "";
    
      for (let item of this.selectedManagerItems) {
        selectManager += selectManager.length > 0 ? ',' + item.id : item.id;
      }

      console.log(selectManager);
      console.log( this.task_confirmation = this.data.task_confirmation);
      console.log( this.upload_files = this.data.upload_files);

      const data = {
        selectManager : selectManager,
        task_confirmation : this.task_confirmation,
        upload_files: this.upload_files
      }

    this.taskservice.sendTaskConfirmation(data).subscribe((res: any) => {
      if (res.success) {
       // this.confirmTaskId = res.response.confirmTaskId;
        console.log(this.confirmTaskId);
      }
    })
  }



  submitExtension(){

    if(this.userType == 'Admin' || this.userType == 'PM'){
      if (this.salesarray == "" || this.salesarray == null || this.salesarray == undefined) {
        this.common.showAlertMessage("Please select Sales Person", this.common.errContent);
        return;
      }
    }
    if(this.userType == 'TM'){
      if (this.projectmanagerarray == "" || this.projectmanagerarray == null || this.projectmanagerarray == undefined) {
        this.common.showAlertMessage("Please select Project Manager", this.common.errContent);
        return;
      }
    }

    if(this.userType == 'TL'){
      if (this.teamManagerarray == "" || this.teamManagerarray == null || this.teamManagerarray == undefined) {
        this.common.showAlertMessage("Please select Team Manager", this.common.errContent);
        return;
      }
    }

      var salesIDS = "";
      for (let item of this.salesarray) {
        salesIDS += salesIDS.length > 0 ? ',' + item.id : item.id;
      }

      var pmIDS = "";
      for (let item2 of this.projectmanagerarray) {
        pmIDS += pmIDS.length > 0 ? ',' + item2.id : item2.id;
      }

      var tmIDS = "";
      for (let item3 of this.teamManagerarray) {
        tmIDS += tmIDS.length > 0 ? ',' + item3.id : item3.id;
      }

    const data = {
      userID: this.userID,
      userType: this.userType,
      taskId: this.taskId,
      dateExtension : this.dateExtension,
      timeExtension: this.timeExtension,
      message: this.message,
      salesPerson: salesIDS ? salesIDS: '',
      projectmanagers: pmIDS ? pmIDS : '',
      teammanager: tmIDS ? tmIDS : '',
    }

    this.taskservice.addExtention(data).subscribe((res: any) => {
      if (res.success) {
        this.common.showAlertMessage(res.message, this.common.succContent);
      }
    })
  }
}
