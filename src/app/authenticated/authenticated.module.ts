import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardModule } from './dashboard/dashboard.module';
import { ClientsModule } from './clients/clients.module';
import { ProjectsModule } from './projects/projects.module';
import { TalentModule } from './talent/talent.module';

import { authenticated_routes } from './authenticated-routing.module';

@NgModule({
  imports: [
    authenticated_routes,
    CommonModule,
    DashboardModule,
    ClientsModule,
    ProjectsModule,
    TalentModule
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AuthenticatedModule { }
