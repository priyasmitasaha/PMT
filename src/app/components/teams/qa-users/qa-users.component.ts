import { Component } from '@angular/core';
import { Router ,ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-qa-users',
  templateUrl: './qa-users.component.html',
  styleUrls: ['./qa-users.component.css']
})


export class QaUsersComponent {
  userID : any;
  userType : any;
  qausers: any = [];
  positionList: any = [];

  constructor(private router:Router ,private common: CommonService, private activateRoute : ActivatedRoute,private userservice: UserService ){
    this.userID = localStorage.getItem('pmtuserId');
    this.userType = localStorage.getItem('pmtuserType');
    
    
    if(this.userType == 'Admin'){
      this.getQualityAnalystList();
    }
   
  }

  ngOnInit() {
   
  }

  getQualityAnalystList(){
    const data = { 
      userType : 'QA'
    }
    this.userservice.positionList(data).subscribe((res: any) => {
      if (res.success) {
        this.positionList = res.response;
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

  getUserDetailsById(userId: number){
    this.router.navigate(['pages/team-profile-details/' + userId]);
  }

}
