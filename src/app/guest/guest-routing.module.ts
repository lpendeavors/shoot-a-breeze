import { RouterModule, Route } from '@angular/router';

import { LoginComponent } from './login/login.component';

const routes: Route[] = [
    { path: '', component: LoginComponent }
];

export const guest_routes = RouterModule.forChild(routes);