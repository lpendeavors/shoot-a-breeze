import { Component, ElementRef, OnInit, OnChanges, AfterViewChecked, ViewChild, Input, EventEmitter, Output, SimpleChanges, OnDestroy } from '@angular/core';

import "dhtmlx-gantt";
import {} from "@types/dhtmlxgantt";
import { Project } from '../../../core/models/projects/project.model';

@Component({
  selector: 'app-project-timeline',
  templateUrl: './project-timeline.component.html',
  styleUrls: ['./project-timeline.component.scss']
})
export class ProjectTimelineComponent implements OnInit, OnChanges, OnDestroy, AfterViewChecked {

  @Input() project: Project;
  @ViewChild("gantt_here") ganttContainer: ElementRef;

  @Output() taskAdded: EventEmitter<any> = new EventEmitter<any>();
  @Output() taskUpdated: EventEmitter<any> = new EventEmitter<any>();
  @Output() taskDeleted: EventEmitter<any> = new EventEmitter<any>();

  @Output() linkAdded: EventEmitter<any> = new EventEmitter<any>();
  @Output() linkUpdated: EventEmitter<any> = new EventEmitter<any>();
  @Output() linkDeleted: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    gantt.config.xml_date = "%m/%d/%Y %H:%i";
    gantt.config.api_date = "%m/%d/%Y %H:%i";
    gantt.config.task_date = "%m/%d/%Y %H:%i";

    gantt.init(this.ganttContainer.nativeElement);

    gantt.attachEvent("onAfterTaskAdd", (id, item) => {
      this.taskAdded.emit({id, item});
    });

    gantt.attachEvent("onAfterTaskUpdate", (id, item) => {
      this.taskUpdated.emit({id, item});
      this.loadChart();
    })

    gantt.attachEvent("onAfterTaskDelete", (id, item) => {
      this.taskDeleted.emit({id, item});
      this.loadChart();
    });

    gantt.attachEvent("onAfterLinkAdd", (id, item) => {
      this.linkAdded.emit({id, item})
    });

    gantt.attachEvent("onAfterLinkUpdate", (id, item) => {
      this.linkUpdated.emit({id, item});
    });

    gantt.attachEvent("onAfterLinkDelete", (id, item) => {
      this.linkDeleted.emit({id, item});
    });

    gantt.parse({ data: this.convertDates(this.project.tasks), links: this.project.taskLinks });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes.project;
    if (change.previousValue) {
      gantt.parse({ data: this.convertDates(this.project.tasks), links: this.project.taskLinks });
    }
  }

  ngOnDestroy(): void {
    gantt.clearAll();
  }

  ngAfterViewChecked(): void {
    this.loadChart();
  }

  private loadChart(): void {
    gantt.render();
  }

  private convertDates(taskArray: any[]) {
    const tasks = taskArray || [];
    if (tasks.length > 0) {
      tasks.forEach(task => {
        task.start_date = new Date(task.start_date.seconds*1000);
        task.end_date = new Date(task.end_date.seconds*1000);
      });
    }
    return tasks;
  }
}
