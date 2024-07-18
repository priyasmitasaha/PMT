import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { TargetService } from 'src/app/services/target/target.service';
import { MatNativeDateModule, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core'; 
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'app-target-management',
  templateUrl: './target-management.component.html',
  styleUrls: ['./target-management.component.css']
})



export class TargetManagementComponent {
  customertargetCount :number = 0;
  wordCounttarget :number = 0;
  reachoutstarget :number = 0;
  universitytargetCount :number = 0;
  invoicetargetCount :number = 0;
  dissertationtargetCount :number = 0;
  isHidden: boolean = true;
  isExpert: boolean = true;
  currentDate : any;
  startDate: any;
  endDate: any;
  wordCountdelivered: number = 0;
  userType: any;
  userID: any;
  month: any;

  constructor(private router: Router,private target: TargetService, private activateRoute: ActivatedRoute,private common: CommonService){

    this.userID = localStorage.getItem('pmtuserId');
    this.userType = localStorage.getItem('pmtuserType');

    const today = new Date();
    this.currentDate = this.common.getTodayDate(today);
  }

  ngOnInit() {
    this.getAllTargetCount();

    if(this.userType == 'SSME' || this.userType == 'SME' || this.userType == 'JSME' || this.userType == 'ATL'){
      this.isHidden = false;
      this.isExpert = true;
    }

    if(this.userType == 'Admin' || this.userType == 'PM' || this.userType == 'TM' || this.userType == 'TL'){
      this.isHidden = true;
      this.isExpert = false;
    }
  }

  getAllTargetCount(){

    const data = { 
      userId : this.userID,
      userType : this.userType,
      startDate :  this.startDate ? this.startDate : this.currentDate ,
      endDate : this.endDate ? this.endDate : 'null',
    }

    this.target.getAllTargetCount(data).subscribe((res: any) => {
      if (res.success) {
        if(this.userType == 'Admin' || this.userType == 'PM' || this.userType == 'TM' || this.userType == 'TL'){
          this.customertargetCount = res.customertargetCount;
          this.wordCounttarget = res.wordCounttarget;
          this.reachoutstarget = res.reachoutstarget;
          this.universitytargetCount = res.universitytargetCount;
          this.invoicetargetCount = res.invoicetargetCount;
          this.dissertationtargetCount = res.dissertationtargetCount;
        }
         
        if(this.userType == 'SSME' || this.userType == 'SME' || this.userType == 'JSME' || this.userType == 'ATL'){
          this.wordCounttarget = res.wordCounttarget;
          this.wordCountdelivered = res.wordCountdelivered;
       
        }
      }
    })
  }

  getWordTargetMonthly(){
    const data ={
      userId : this.userID,
      userType : this.userType,
      month : this.month
    }
    console.log(data);
    this.target.getmonthlyTargetCount(data).subscribe((res: any) => {

        this.wordCounttarget = res.wordCounttarget;
        this.wordCountdelivered = res.wordCountdelivered;
    })
  }

  startDateChanged(event: any) {
    this.startDate = event.value;
  }

  endDateChanged(event: any) {
    this.endDate = event.value;
  }


}
