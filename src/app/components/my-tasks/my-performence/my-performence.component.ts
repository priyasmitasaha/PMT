import { Component } from '@angular/core';
import { Router ,ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { UserService } from 'src/app/services/user/user.service';
import { MatNativeDateModule, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core'; 
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-my-performence',
  templateUrl: './my-performence.component.html',
  styleUrls: ['./my-performence.component.css']
})

export class MyPerformenceComponent {

  userID: any;
  userType: any;
  startDate: any;
  endDate: any;
  currstartdate: any;
  currenddate: any;
  currentDate: any;
  monthlywordCount: any;
  monthlyallocation: any;
  monthlydelivery: any;
  monthlyrework: any;
  monthlyredo: any;
  monthlyresit: any;
  monthlydissertations: any;

  constructor(private router:Router ,private common: CommonService, private activateRoute : ActivatedRoute,private userservice: UserService ){
    
    this.userID = localStorage.getItem('pmtuserId');
    this.userType = localStorage.getItem('pmtuserType');

    const today = new Date();
    this.currentDate = this.common.getTodayDate(today);

    const { startDate, endDate } = this.common.getCurrentMonthDates();
    this.currstartdate = this.common.getTodayDate(startDate);
    this.currenddate = this.common.getTodayDate(endDate);

    
  }

  ngOnInit() {
    if(this.userType == 'SME'){
      this.getExpertMonthlyDetails();
    } 
  }


  getExpertMonthlyDetails(){

    const data = {
      userID: this.userID,
      userType : this.userType,
      startDate :  this.startDate ? this.startDate : this.currstartdate ,
      endDate : this.endDate ? this.endDate : this.currenddate,
    };
    //console.log(data);
    this.userservice.getExpertMonthlyDetails(data).subscribe((res: any) => {
      if (res.success) {
        if (res.response.length > 0) {
          this.monthlyallocation = res.response.monthlyallocation;
          this.monthlydelivery = res.response.monthlydelivery;
          this.monthlyrework = res.response.monthlyrework;
          this.monthlyredo = res.response.monthlyredo;
          this.monthlyresit = res.response.monthlyresit;
          this.monthlydissertations = res.response.monthlydissertations;
        }
      }
    })
  }

  startDateChanged(event: any) {
    this.startDate = event.value;
  }

  endDateChanged(event: any) {
    this.endDate = event.value;
  }

}
