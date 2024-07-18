import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { PagesComponent } from './pages.component';
import { HomeComponent } from '../components/common/home/home.component';
import { TaskAllocationComponent } from '../components/my-tasks/task-allocation/task-allocation.component';
import { CalenderComponent } from '../components/my-tasks/calender/calender.component';
import { TaskConfirmationComponent } from '../components/my-tasks/task-confirmation/task-confirmation.component';
import { TaskDetailsComponent } from '../components/my-tasks/task-details/task-details.component';
import { TaskViewComponent } from '../components/my-tasks/task-view/task-view.component';
import { AttendanceTrackingComponent } from '../components/attendance-tracking/attendance-tracking.component';
import { TargetManagementComponent } from '../components/target-management/target-management.component';
import { ProfileCreationComponent } from '../components/profile-creation/profile-creation.component';
import { TeamProfileComponent } from '../components/teams/team-profile/team-profile.component';
import { TeamProfileDetailsComponent } from '../components/teams/team-profile-details/team-profile-details.component';
import { MyPerformenceComponent } from '../components/my-tasks/my-performence/my-performence.component';
import { ExpertComponent } from '../components/teams/expert/expert.component';
import { ExpertDetailsComponent } from '../components/teams/expert-details/expert-details.component';
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
import { ViewExtentionComponent } from '../components/my-tasks/extentions/view-extention/view-extention.component';
import { RplyQueryComponent } from '../components/my-tasks/queries/rply-query/rply-query.component';
import { ViewQueryComponent } from '../components/my-tasks/queries/view-query/view-query.component';
import { AddTaskComponent } from '../components/my-tasks/task-confirmation/add-task/add-task.component';
import { AuthGuard } from '../guard/auth.guard';
import { RouteGuard } from '../guard/route.guard';
import { NotAssignedUsersComponent } from '../components/teams/not-assigned-users/not-assigned-users.component';
import { QaUsersComponent } from '../components/teams/qa-users/qa-users.component';

const routes: Routes = [
  {
    path: '', component: PagesComponent,
    children: [
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'task-allocation', component: TaskAllocationComponent, canActivate: [AuthGuard] },
      { path: 'assigned-task', component: TaskAllocationComponent , canActivate: [AuthGuard]},
      { path: 'calender', component: CalenderComponent , canActivate: [AuthGuard]},
      { path: 'task-confirmation', component: TaskConfirmationComponent, canActivate: [AuthGuard] },
      { path: 'task-details', component:TaskDetailsComponent , canActivate: [AuthGuard]},
      { path: ':pagename/task-view/:id',component: TaskViewComponent , canActivate: [AuthGuard]},
      { path: 'attendance-tracking',component: AttendanceTrackingComponent , canActivate: [AuthGuard]},
      { path: 'target-management',component: TargetManagementComponent , canActivate: [AuthGuard]},
      { path: 'profile-creation',component: ProfileCreationComponent , canActivate: [AuthGuard]},
      { path: 'team-profile',component: TeamProfileComponent , canActivate: [AuthGuard]},
      { path: 'team-profile-details/:id', component: TeamProfileDetailsComponent , canActivate: [AuthGuard]},
      { path: 'my-performance', component:MyPerformenceComponent , canActivate: [RouteGuard]},
      { path: 'experts/:id', component:ExpertComponent , canActivate: [AuthGuard]},
      { path: 'expert-details/:id',component: ExpertDetailsComponent , canActivate: [AuthGuard]},
      { path: 'projects/:id',component: ProjectsComponent , canActivate: [AuthGuard]},
      { path: 'rework/:id',component: ReworkComponent, canActivate: [AuthGuard] },
      { path: 'redo/:id',component: RedoComponent , canActivate: [AuthGuard]},
      { path: 'team-leaders/:id',component: TeamLeadersComponent, canActivate: [AuthGuard] },
      { path: 'resit/:id',component: ResitComponent , canActivate: [AuthGuard]},
      { path: 'team-leader-details/:id',component: TeamLeaderDetailsComponent , canActivate: [AuthGuard]},
      { path: 'delivered-tasks',component: DeliveredTasksComponent , canActivate: [AuthGuard]},
      { path: 'deadline-missed-tasks',component: DeadlineMissedTasksComponent , canActivate: [AuthGuard]},
      { path: 'extentions',component: ExtentionsComponent , canActivate: [AuthGuard]},
      { path: 'queries',component: QueriesComponent , canActivate: [AuthGuard]},
      { path: 'add-extension/:id',component: AddExtensionsComponent , canActivate: [AuthGuard]},
      { path: 'add-query/:id',component: AddQueryComponent , canActivate: [AuthGuard]},
      { path: 'view-extension/:id',component: ViewExtentionComponent , canActivate: [AuthGuard]},
      { path: 'rply-query/:id',component: RplyQueryComponent , canActivate: [AuthGuard]},
      { path: 'view-query/:id',component: ViewQueryComponent , canActivate: [AuthGuard]},
      { path: 'add-task',component: AddTaskComponent , canActivate: [AuthGuard]},
      { path: 'not-assigned-users',component: NotAssignedUsersComponent , canActivate: [AuthGuard]},
      { path: 'qa-users',component: QaUsersComponent , canActivate: [AuthGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PagesRoutingModule { }
