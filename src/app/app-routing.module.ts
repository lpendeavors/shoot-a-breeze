import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';

const routes: Routes = [
    {
        path: 'admin',
        loadChildren: './authenticated/authenticated.module#AuthenticatedModule'
    },
    {
        path: 'login',
        loadChildren: './guest/guest.module#GuestModule'
    },
    {
        path: '',
        redirectTo: 'admin',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {}