import { Component } from '@angular/core';
import { Router ,ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-team-profile',
  templateUrl: './team-profile.component.html',
  styleUrls: ['./team-profile.component.css']
})

export class TeamProfileComponent {
  userID : any;
  userType : any;
  userList : any = [];
  tmList: any = [];
  leaderList : any = [];
  tLList: any = [];
  userdetails : any;
  expertList :any =[];
  leaderID :any;
  otherexpertList :any =[];
  positionList : any = [];
  firstName : any;
  lastName : any;
  imgPath = "http://3.111.113.246:8088/uploads/images/";
  tmListCount = 0;
  tLListCount = 0;
  name: any;
  toggleDiv :boolean = false;
  

  constructor(private router:Router ,private common: CommonService, private activateRoute : ActivatedRoute,private userservice: UserService ){

    this.userID = localStorage.getItem('pmtuserId');
    this.userType = localStorage.getItem('pmtuserType');
    console.log(this.userType);

  
    if(this.userType == 'SSME' || this.userType == 'SME' || this.userType == 'JSME' || this.userType == 'ATL'){
      this.getLeaderByExpertId();
    }

    if(this.userType == 'Admin'){
      this.getProjectManagersList();
    }

    if(this.userType == 'PM'){
      this.getTeamManagerList(this.userID,this.userType, 0);
    }

    if(this.userType == 'TM'){
      this.getTeamLeaderByTManagerId();
    }

    if(this.userType == 'TL'){
      this.getExpertList(this.userID,this.userType);
    }


  }

  ngOnInit() {
   
  }

  viewTeamLeaders(tmid: number,tmtype: string){
    const data = { 
      userId :  tmid,
      userType : tmtype
    }
    this.userservice.getUserListById(data).subscribe((res: any) => {
      if (res.success) {
        
        this.tLListCount = res.count;
        
        if(this.tLListCount > 0){
          this.router.navigate(['pages/team-leaders/' + tmid+ '&' +tmtype]);
        }
      }
    })
   
  }

  getProjectManagersList(){
    
    this.userservice.specificPositionList().subscribe((res: any) => {
      if (res.success) {
        this.userList = res.response;
      }
    })
  } 

  // getQualityAnalystList(){
  //   const data = { 
  //     userType : 'QA'
  //   }
  //   this.userservice.positionList(data).subscribe((res: any) => {
  //     if (res.success) {
  //       this.positionList = res.response;
  //     }
  //   })
  // }

  getUserName(id: any){
    const data = { 
      userId :  id
    }
    this.userservice.getUserDetailsById(data).subscribe((res: any) => {
      if (res.success) {
        this.name = res.response.firstName + '' + res.response.lastName;
      }
    })
    console.log(this.name);
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


  
  getTeamManagerList(pmid: number,pmtype: string, t: number){
    const data = { 
      userId :  pmid,
      userType : pmtype
    }
    this.userservice.getUserListById(data).subscribe((res: any) => {
      if (res.success) {
        
        this.tmListCount = res.count;
        this.tmList = res.response;
      }
    })
  }

  getTeamLeaderByTManagerId(){
  
    this.userservice.specificPositionList().subscribe((res: any) => {
      if (res.success) {
        this.tLList = res.response;
       
      }
    })
   // this.tLList = this.common.getTeamLeaderList;
  }

  getUserDetailsById(userId: number){
    this.router.navigate(['pages/team-profile-details/' + userId]);
  }

  viewExperts(LeaderID :number ,LeaderType : string){
    this.router.navigate(['pages/experts/' + LeaderID + '&' + LeaderType]);
  }

  viewExpertDetails(userId: any){
    this.router.navigate(['pages/expert-details/' + userId]);
  }

  getLeaderByExpertId(){
 
    this.userservice.getLeaderByExpertId().subscribe((res: any) => {
      if (res.success) {
        this.leaderList = res.response;
        console.log(this.leaderList);
      }
    })
  }



  getLeaderList(managerID :number ,userType :string){
    const data = {
      userId: managerID,
      userType : userType
    };
        this.userservice.getLeaderListByTeamManager(data).subscribe((res: any) => {
        if (res.success) {
          this.leaderList = res.response;
        }
    })
  }

  getExpertList(leaderID : any,leaderType: any){
      const data = { 
        userId :  leaderID,
        userType : leaderType
      }
      this.userservice.getUserListById(data).subscribe((res: any) => {
        if (res.success) {
          this.expertList = res.response;
          console.log(this.expertList);
        }
    })
  
  }

  getotherexperts(userType :string){
    const data = {
      userType : userType
    };
      this.userservice.getotherexperts(data).subscribe((res: any) => {
        if (res.success) {
          this.otherexpertList = res.response;
        }
    })
  }

 
}
