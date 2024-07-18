import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/services/task/task.service';
import { CommonService } from 'src/app/services/common/common.service';
import { MatNativeDateModule, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core'; 
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-deadline-missed-tasks',
  templateUrl: './deadline-missed-tasks.component.html',
  styleUrls: ['./deadline-missed-tasks.component.css']
})
export class DeadlineMissedTasksComponent {
  userID: any;
  userType: any;
  currentDate: any;
  startDate: any;
  endDate: any;
  currstartdate: any;
  currenddate: any;
  totaltaskallocated :number = 0;
  totaldeadlinemissed :number = 0;
  deadlinemissedlist: any = [];

  constructor(private router: Router,private common: CommonService, private activateRoute: ActivatedRoute, private taskservice: TaskService){
    this.userID = localStorage.getItem('pmtuserId');
    this.userType = localStorage.getItem('pmtuserType');

    const today = new Date();
    this.currentDate = this.common.getTodayDate(today);
    const { startDate, endDate } = this.common.getCurrentMonthDates();
    this.currstartdate = this.common.getTodayDate(startDate);
    this.currenddate = this.common.getTodayDate(endDate);

    this.getDeadlineMissedTaskList();
  }

  getDeadlineMissedTaskList(){
    const data = { 
      userId :  this.userID,
      userType : this.userType,
      startDate :  this.startDate ? this.startDate : this.currentDate ,
      endDate : this.endDate ? this.endDate : 'null',
    }
    this.taskservice.getDeadlineMissedTaskList(data).subscribe((res: any) => {
      if (res.success) {
        this.totaltaskallocated = res.totaltaskallocated;
        this.totaldeadlinemissed = res.totaldeadlinemissed;
        this.deadlinemissedlist = res.reponse;
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
