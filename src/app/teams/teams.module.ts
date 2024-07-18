import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeamsRoutingModule } from './teams-routing.module';
import { TeamsComponent } from './teams.component';
import { TeamProfileComponent } from '../components/teams/team-profile/team-profile.component';


@NgModule({
  declarations: [
    TeamsComponent,
    TeamProfileComponent
  ],
  imports: [
    CommonModule,
    TeamsRoutingModule,
    FormsModule
  ]
})
export class TeamsModule { }
