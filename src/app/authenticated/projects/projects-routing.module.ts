import { Route, RouterModule } from '@angular/router';

import { ProjectsComponent } from './projects.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { EditProjectComponent } from './edit-project/edit-project.component';

const routes: Route[] = [
    {
        path: '', component: ProjectsComponent,
        children: [
            { path: '', component: ProjectsListComponent },
            { path: 'add', component: AddProjectComponent }
        ]
    },
    { path: 'edit/:id', component: EditProjectComponent }
];

export const projects_routes = RouterModule.forChild(routes);
