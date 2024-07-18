import { Component } from '@angular/core';
import { Router ,ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { UserService } from 'src/app/services/user/user.service';



@Component({
  selector: 'app-not-assigned-users',
  templateUrl: './not-assigned-users.component.html',
  styleUrls: ['./not-assigned-users.component.css']
})



export class NotAssignedUsersComponent {
  userID : any;
  userType : any;
  notassignusers: any = [];


  constructor(private router:Router ,private common: CommonService, private activateRoute : ActivatedRoute,private userservice: UserService ){
    this.userID = localStorage.getItem('pmtuserId');
    this.userType = localStorage.getItem('pmtuserType');
    
    
    if(this.userType == 'Admin'){
      this.notAssignedUsers();
    }
   
  }

  ngOnInit() {
   
  }


  notAssignedUsers(){
    this.userservice.notAssignedUsers().subscribe((res: any) => {
      if (res.success) {
        this.notassignusers = res.response;
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
