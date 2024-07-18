import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';


@Component({
  selector: 'app-attendance-tracking',
  templateUrl: './attendance-tracking.component.html',
  styleUrls: ['./attendance-tracking.component.css']
})


export class AttendanceTrackingComponent {

  targetCount: number = 0;
  wordCount: number = 0;
  invoiceCount: number = 0;
  customerCount: number = 0;
  attendanceList = [];
  isHidden: boolean = true;
  isExpert: boolean = false;
  userType: any;
  userID: any;
  allocatedwordCount: any;
  deliveredwordCount: any;
  currentDate : any;
  startDate: any;
  endDate: any;
  deliveredcapacity: any;
  allocatedcapacity: any;

  constructor(private router: Router,private common: CommonService, private activateRoute: ActivatedRoute){

    this.userID = localStorage.getItem('pmtuserId');
    this.userType = localStorage.getItem('pmtuserType');

    const today = new Date();
    this.currentDate = this.common.getTodayDate(today);
  }

  ngOnInit() {
    this.getAttendanceTrackingList();
    this.getAttendanceTrackingCount();

    if(this.userType == 'SSME' || this.userType == 'SME' || this.userType == 'JSME' || this.userType == 'ATL'){
      this.isHidden = false;
      this.isExpert = true;
    }

    if(this.userType == 'Admin' || this.userType == 'PM' || this.userType == 'TM' || this.userType == 'TL'){
      this.isHidden = true;
      this.isExpert = false;
    }

  }


  getAttendanceTrackingCount(){
    const data = { 
      userId : this.userID,
      userType : this.userType,
      startDate :  this.startDate ? this.startDate : this.currentDate ,
      endDate : this.endDate ? this.endDate : 'null',
    }

    this.common.getAttendanceTrackingCount(data).subscribe((res: any) => {
      if (res.success) {

        if(this.userType == 'Admin' || this.userType == 'PM' || this.userType == 'TM' || this.userType == 'TL'){
          this.targetCount = res.targetcount;
          this.wordCount = res.wordCount;
          this.invoiceCount = res.invoiceCount;
          this.customerCount = res.customerCount;
        }

        if(this.userType == 'SSME' || this.userType == 'SME' || this.userType == 'JSME' || this.userType == 'ATL'){
          this.allocatedwordCount = res.allocatedwordCount;
          this.allocatedcapacity = res.allocatedcapacity;
          this.deliveredcapacity = res.deliveredcapacity;
          this.deliveredwordCount = res.deliveredwordCount;
        }
      }
    })
  }
  

  getAttendanceTrackingList(){
    const data = { 
      userId : this.userID,
      userType : this.userType,
      startDate :  this.startDate ? this.startDate : this.currentDate,
      endDate : this.endDate ? this.endDate : 'null',
    }
    this.common.getAttendanceTrackingList(data).subscribe((res: any) => {
        if (res.success) {
          this.attendanceList = res.response;
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
