import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';

import { dashboard_routes } from './dashboard-routing.module';
import { DashboardOverviewComponent } from './dashboard-overview/dashboard-overview.component';

@NgModule({
  imports: [
    dashboard_routes,
    CommonModule
  ],
  declarations: [DashboardComponent, DashboardOverviewComponent],
  exports: [DashboardComponent]
})
export class DashboardModule { }
