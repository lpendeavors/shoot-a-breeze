import { Route, RouterModule } from '@angular/router';

import { TalentComponent } from './talent.component';

const routes: Route[] = [
    {
        path: '', component: TalentComponent,
        children: [

        ]
    }
];

export const talent_routes = RouterModule.forChild(routes);
