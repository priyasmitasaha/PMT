import { Component } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-expert',
  templateUrl: './expert.component.html',
  styleUrls: ['./expert.component.css']
})

export class ExpertComponent {
 // receivedata: any;
  leaderID :any;
  expertList : any =[];
  userName :any;
  word: any;
  userType: any;
  wordarr: any;
  loginId: any;
  loginuserType: any;

  constructor(private router:Router,private common: CommonService ,private userservice: UserService, private activateRoute: ActivatedRoute){ 
    this.loginId = localStorage.getItem('pmtuserId');
    this.loginuserType = localStorage.getItem('pmtuserType');
    

    this.leaderID = this.activateRoute.snapshot.paramMap.get('id');
    this.word = this.activateRoute.snapshot.url[this.activateRoute.snapshot.url.length - 1].path;
    this.wordarr = this.word.split('&');
    this.userType = this.wordarr[1];
    if (this.leaderID != 0) {
      this.getExpertsByLeaderID();
      this.getLeaderNameById(this.leaderID);
    } 
  }

  ngOnInit() {
 
  }

  getLeaderNameById(id: any) {
    this.userservice.getuserNamebyId(id).subscribe((res: any) => {
        if (res.success) {
          this.userName = res.response;
        }
    })
  }

  getExpertsByLeaderID(){ 
    const data = {
      userId: this.wordarr[0],
      userType : this.userType
    };

      this.userservice.getUserListById(data).subscribe((res: any) => {
        if (res.success) {
          this.expertList = res.response;
        }
    })
  }

  getUserDetailsById(userId: any){
    this.router.navigate(['pages/expert-details/' + userId]);
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
