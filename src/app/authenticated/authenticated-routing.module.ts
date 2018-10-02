import { RouterModule, Route } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Route[] = [
    { 
        path: 'admin',
        component: DashboardComponent
    }
];

export const authenticated_routes = RouterModule.forChild(routes);