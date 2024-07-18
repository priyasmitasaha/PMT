import { NgModule } from '@angular/core';
import { CommonModule ,DatePipe} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule} from '@angular/material/form-field';
import { PagesComponent } from './pages.component';
import { HomeComponent } from '../components/common/home/home.component';
import { TaskAllocationComponent } from '../components/my-tasks/task-allocation/task-allocation.component';
import { CalenderComponent } from '../components/my-tasks/calender/calender.component';
import { TaskDetailsComponent } from '../components/my-tasks/task-details/task-details.component';
import { TaskConfirmationComponent } from '../components/my-tasks/task-confirmation/task-confirmation.component';
import { TaskViewComponent } from '../components/my-tasks/task-view/task-view.component';
import { AttendanceTrackingComponent } from '../components/attendance-tracking/attendance-tracking.component';
import { TargetManagementComponent } from '../components/target-management/target-management.component';
import { ProfileCreationComponent } from '../components/profile-creation/profile-creation.component';
import { TeamProfileComponent } from '../components/teams/team-profile/team-profile.component';
import { TeamProfileDetailsComponent } from '../components/teams/team-profile-details/team-profile-details.component';
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatButtonModule } from '@angular/material/button';
import { ModalComponent } from '../components/common/modal/modal.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MyPerformenceComponent } from '../components/my-tasks/my-performence/my-performence.component';
import { ExpertComponent } from '../components/teams/expert/expert.component';
import { ExpertDetailsComponent } from '../components/teams/expert-details/expert-details.component';
import { MatNativeDateModule, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { ProjectsComponent } from '../components/projects/projects.component';
import { ReworkComponent } from '../components/rework/rework.component';
import { RedoComponent } from '../components/redo/redo.component';
import { TeamLeadersComponent } from '../components/teams/team-leaders/team-leaders.component';
import { ResitComponent } from '../components/resit/resit.component';
import { TeamLeaderDetailsComponent } from '../components/teams/team-leader-details/team-leader-details.component';
import { DeliveredTasksComponent } from '../components/my-tasks/delivered-tasks/delivered-tasks.component';
import { DeadlineMissedTasksComponent } from '../components/my-tasks/deadline-missed-tasks/deadline-missed-tasks.component';
import { ExtentionsComponent } from '../components/my-tasks/extentions/extentions.component';
import { QueriesComponent } from '../components/my-tasks/queries/queries.component';
import { AddExtensionsComponent } from '../components/my-tasks/extentions/add-extensions/add-extensions.component';
import { AddQueryComponent } from '../components/my-tasks/queries/add-query/add-query.component';
import { HeaderComponent } from '../components/common/header/header.component';
import { ViewExtentionComponent } from '../components/my-tasks/extentions/view-extention/view-extention.component';
import { RplyQueryComponent } from '../components/my-tasks/queries/rply-query/rply-query.component';
import { ViewQueryComponent } from '../components/my-tasks/queries/view-query/view-query.component';
import { AddTaskComponent } from '../components/my-tasks/task-confirmation/add-task/add-task.component';
import { HttpClientModule } from '@angular/common/http';
import { NotAssignedUsersComponent } from '../components/teams/not-assigned-users/not-assigned-users.component';
import { QaUsersComponent } from '../components/teams/qa-users/qa-users.component';
import { AlertDialogComponent } from '../components/common/alert-dialog/alert-dialog.component';


@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    TaskAllocationComponent,
    CalenderComponent,
    TaskDetailsComponent,
    TaskConfirmationComponent,
    TaskViewComponent,
    AttendanceTrackingComponent,
    TargetManagementComponent,
    ProfileCreationComponent,
    TeamProfileComponent,
    TeamProfileDetailsComponent,
    ModalComponent,
    MyPerformenceComponent,
    ExpertComponent,
    ExpertDetailsComponent,
    ProjectsComponent,
    ReworkComponent,
    RedoComponent,
    TeamLeadersComponent,
    ResitComponent,
    TeamLeaderDetailsComponent,
    DeliveredTasksComponent,
    DeadlineMissedTasksComponent,
    ExtentionsComponent,
    QueriesComponent,
    AddExtensionsComponent,
    AddQueryComponent,
    HeaderComponent,
    ViewExtentionComponent,
    RplyQueryComponent,
    ViewQueryComponent,
    AddTaskComponent,
    NotAssignedUsersComponent,
    QaUsersComponent,
    AlertDialogComponent
  ],
  
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
    DatePipe,
  ],
})
export class PagesModule { }
