import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TalentComponent } from './talent.component';

import { talent_routes } from './talent-routing.module';

@NgModule({
  imports: [
    talent_routes,
    CommonModule
  ],
  declarations: [TalentComponent]
})
export class TalentModule { }
