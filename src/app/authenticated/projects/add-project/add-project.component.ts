import { Component } from '@angular/core';
import { ProjectsService } from '../../../core/projects.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Project } from '../../../core/models/projects/project.model';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent {

  newProjectForm = this.fb.group({
    title: ['', Validators.compose([Validators.required])],
    description: ['', Validators.compose([Validators.required])],
    duration: [''],
    startDate: ['', Validators.compose([Validators.required])],
    endDate: [''],
    category: ['']
  });

  formError: string;
  formLoading: boolean;

  constructor(private projectsService: ProjectsService, private fb: FormBuilder, private router: Router) { }

  saveProject(): void {
    this.formError = null;
    this.formLoading = true;

    if (this.newProjectForm.valid) {
      let newProject: Project = {
        title: this.newProjectForm.controls['title'].value,
        description: this.newProjectForm.controls['description'].value,
        category: this.newProjectForm.controls['category'].value,
        startDate: this.newProjectForm.controls['startDate'].value,
        endDate: this.newProjectForm.controls['endDate'].value
      };

      this.projectsService.addProject(newProject)
        .then(response => {
          console.log(response);
          this.router.navigate(['/admin/projects']);
        })
        .catch(error => {
          this.formError = error.message;
          this.formLoading = false;
        });
    }
  }
  
}
