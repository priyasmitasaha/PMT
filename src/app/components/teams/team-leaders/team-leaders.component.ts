import { Component } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-team-leaders',
  templateUrl: './team-leaders.component.html',
  styleUrls: ['./team-leaders.component.css']
})


export class TeamLeadersComponent {

  teammanagerID: any;
  teamLeaderList: any =[];
  userName:any;
  word: any;
  userType: any;
  wordarr: any;
  tLListCount = 0;
  loginId: any;
  loginuserType: any;


  constructor(private router:Router,private common: CommonService ,private userservice: UserService, private activateRoute: ActivatedRoute){ 
    
    this.loginId = localStorage.getItem('pmtuserId');
    this.loginuserType = localStorage.getItem('pmtuserType');

    this.teammanagerID = this.activateRoute.snapshot.paramMap.get('id');
  
    this.word = this.activateRoute.snapshot.url[this.activateRoute.snapshot.url.length - 1].path;
    this.wordarr = this.word.split('&');
    this.userType = this.wordarr[1];
  

    if (this.teammanagerID != 0) {
      this.getTeamLeadersByManagerID();
      this.getTeamLeaderNameById(this.teammanagerID);
    } 
  }

  ngOnInit() {
 
  }

 
  getTeamLeaderNameById(id: any) {
    this.userservice.getuserNamebyId(id).subscribe((res: any) => {
        if (res.success) {
          this.userName = res.response;
        }
    })


  }

  getTeamLeadersByManagerID(){ 
   
    const data = {
      userId: this.wordarr[0],
      userType : this.userType
    };
    console.log(data);
   
      this.userservice.getUserListById(data).subscribe((res: any) => {
        if (res.success) {
          this.teamLeaderList = res.response;
        }
    })
    
  }

  getUserDetailsById(userId: any, userType : string){
    this.router.navigate(['pages/team-leader-details/' + userId + '&' + userType]);
  }

  viewExperts(LeaderID :number ,LeaderType : string){
    const data = { 
      userId :  LeaderID,
      userType : LeaderType
    }
    this.userservice.getUserListById(data).subscribe((res: any) => {
      if (res.success) {
        
        this.tLListCount = res.count;
        
        if(this.tLListCount > 0){
          this.router.navigate(['pages/experts/' + LeaderID + '&' + LeaderType]);
        }
      }
    })
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

}
