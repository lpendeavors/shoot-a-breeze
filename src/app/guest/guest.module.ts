import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { guest_routes } from './guest-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    guest_routes
  ],
  declarations: [
    LoginComponent
  ],
  exports: [
    RouterModule
  ]
})
export class GuestModule { }
