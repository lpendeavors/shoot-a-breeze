import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { ModalModule } from 'ngx-bootstrap/modal';

import { ProjectTimelineComponent } from './components/project-timeline/project-timeline.component';
import { ProjectTreatmentComponent } from './components/project-treatment/project-treatment.component';
import { ProjectShotListComponent } from './components/project-shot-list/project-shot-list.component';
import { ProjectScriptComponent } from './components/project-script/project-script.component';
import { ProjectStoryboardComponent } from './components/project-storyboard/project-storyboard.component';
import { ProjectCastCrewComponent } from './components/project-cast-crew/project-cast-crew.component';
import { ProjectBudgetComponent } from './components/project-budget/project-budget.component';

@NgModule({
  imports: [
    CommonModule,
    QuillModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  declarations: [
    ProjectTimelineComponent, 
    ProjectTreatmentComponent, 
    ProjectShotListComponent, 
    ProjectScriptComponent, 
    ProjectStoryboardComponent, 
    ProjectCastCrewComponent, 
    ProjectBudgetComponent
  ],
  exports: [
    ProjectTimelineComponent, 
    ProjectTreatmentComponent, 
    ProjectShotListComponent, 
    ProjectScriptComponent, 
    ProjectStoryboardComponent,
    ProjectCastCrewComponent, 
    ProjectBudgetComponent
  ]
})
export class SharedModule { }
