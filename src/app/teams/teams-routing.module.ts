import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamsComponent } from './teams.component';
import { TeamProfileComponent } from '../components/teams/team-profile/team-profile.component';
const routes: Routes = [
  {
    path: '', component: TeamsComponent,
    children: [
      { path: 'team-profile', component: TeamProfileComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsRoutingModule { }
