import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectsService } from '../../../core/projects.service';
import { Project } from '../../../core/models/projects/project.model';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {

  projects = this.projectsService.projects;
  projectsLoading: boolean = true;

  constructor(public projectsService: ProjectsService, private router: Router) { }

  openProject(project: Project): void {
    this.router.navigate([`/admin/projects/edit/${project.id}`]);
  }

  ngOnInit() {
    if (this.projects) {
      this.projectsLoading = false;
    }
  }

}
