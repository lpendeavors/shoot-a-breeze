import { Route, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { DashboardOverviewComponent } from './dashboard-overview/dashboard-overview.component';

const routes: Route[] = [
    {
        path: '', component: DashboardComponent,
        children: [
            { path: '', component: DashboardOverviewComponent },
            { path: 'projects', loadChildren: '../projects/projects.module#ProjectsModule' }
        ]
    }
];

export const dashboard_routes = RouterModule.forChild(routes);