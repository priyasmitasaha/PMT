import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/services/task/task.service';
import { CommonService } from 'src/app/services/common/common.service';
import { MatNativeDateModule, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core'; 
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'app-delivered-tasks',
  templateUrl: './delivered-tasks.component.html',
  styleUrls: ['./delivered-tasks.component.css']
})
export class DeliveredTasksComponent {
  userID: any;
  userType: any;
  currentDate: any;
  startDate: any;
  endDate: any;
  currstartdate: any;
  currenddate: any;
  totaltaskallocated :number = 0;
  totaltaskdelivered :number = 0;
  totaldeliveredList : any = [];
  totaltasklateby : any;


  constructor(private router: Router,private common: CommonService, private activateRoute: ActivatedRoute, private taskservice: TaskService){
    this.userID = localStorage.getItem('pmtuserId');
    this.userType = localStorage.getItem('pmtuserType');

    const today = new Date();
    this.currentDate = this.common.getTodayDate(today);
    const { startDate, endDate } = this.common.getCurrentMonthDates();
    this.currstartdate = this.common.getTodayDate(startDate);
    this.currenddate = this.common.getTodayDate(endDate);

    this.getDeliveredTaskList();
  }

  getDeliveredTaskList(){
    const data = { 
      userId :  this.userID,
      userType : this.userType,
      startDate :  this.startDate ? this.startDate : this.currentDate ,
      endDate : this.endDate ? this.endDate : 'null',
      taskType: 'delivered'
    }
    this.taskservice.getDeliveredTaskList(data).subscribe((res: any) => {
      if (res.success) {
          this.totaldeliveredList = res.response;
          this.totaltaskallocated = res.totaltaskallocated;
          this.totaltaskdelivered = res.totaltaskdelivered;
          this.totaltasklateby= res.totaltasklateby;
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
