import { Component, OnChanges, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '../../../core/models/projects/project.model';

@Component({
  selector: 'app-project-script',
  templateUrl: './project-script.component.html',
  styleUrls: ['./project-script.component.scss']
})
export class ProjectScriptComponent implements OnChanges, OnDestroy {

  @Input() project: Project;

  @Output() scriptSaved: EventEmitter<any> = new EventEmitter<any>();

  script: String;

  constructor() { }

  ngOnChanges(): void {
    this.script = this.project.script || '';
  }

  ngOnDestroy(): void {
    const updatedScript = this.script;
    this.scriptSaved.emit({updatedScript});
  }

}
