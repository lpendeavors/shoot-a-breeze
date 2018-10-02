import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from '../../../core/projects.service';
import { Project } from '../../../core/models/projects/project.model';
import { TabDirective } from 'ngx-bootstrap/tabs';
import { DocumentSnapshot } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { ProjectTreatment } from '../../../core/models/projects/project-treatment.model';
import { ShotListItem } from '../../../core/models/projects/shot-list-item.models';
import { CastMember } from '../../../core/models/projects/cast-member.model';
import { CrewMember } from '../../../core/models/projects/crew-member.model';
import { IncomeItem } from '../../../core/models/budget/income-item.model';
import { Budget } from '../../../core/models/budget/budget.model';
import { ExpenseItem } from '../../../core/models/budget/expense-item.model';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {

  private project: Project;
  private projectRef: DocumentSnapshot<any>;
  private projectSubscription: Subscription;

  loadingError: string;
  selectedTab: string = "Timeline";

  constructor(private route: ActivatedRoute, private projectsService: ProjectsService) { }

  onTabSelect(data: TabDirective): void {
    this.selectedTab = data.heading;
  }

  onTaskAdded(data: any): void {
    if (!this.project.tasks) {
      this.project.tasks = [];
    }
    let task = data.item;
    this.project.tasks.push(task);
    this.projectRef.ref.update({
      tasks: this.project.tasks
    });
  }

  onTaskUpdated(data: any): void {
    const taskIndex = data.item.$index;
    this.project.tasks[taskIndex] = data.item;
    this.projectRef.ref.update({
      tasks: this.project.tasks
    });
  }

  onTaskDeleted(data: any): void {
    const taskIndex = data.item.$index;
    this.project.tasks.splice(taskIndex, 1);
    this.projectRef.ref.update({
      tasks: this.project.tasks
    });
  }

  onLinkAdded(data: any): void {
    if (!this.project.taskLinks) {
      this.project.taskLinks = [];
    }
    let link = data.item;
    this.project.taskLinks.push(link);
    this.projectRef.ref.update({
      taskLinks: this.project.taskLinks
    });
  }

  onLinkUpdated(data: any): void {
    const linkIndex = data.item.$index;
    this.project.taskLinks[linkIndex] = data.item;
    this.projectRef.ref.update({
      taskLinks: this.project.taskLinks
    });
  }

  onLinkDeleted(data: any): void {
    const linkIndex = data.item.$index;
    this.project.taskLinks.splice(linkIndex, 1);
    this.projectRef.ref.update({
      taskLinks: this.project.taskLinks
    });
  }

  onTreatmentSaved(data: any): void {
    this.project.treatment = data.treatment as ProjectTreatment;
    this.projectRef.ref.update({
      treatment: this.project.treatment
    });
  }

  onScriptSaved(data: any): void {
    let updatedScript = data.updatedScript as string;
    if (updatedScript) {
      this.project.script = updatedScript;
      this.projectRef.ref.update({
        script: this.project.script
      });
    } else if (!updatedScript && this.project.script) {
      this.project.script = '';
      this.projectRef.ref.update({
        script: this.project.script
      });
    }
  }

  onShotSaved(data: any): void {
    if (!this.project.shotList) {
      this.project.shotList = [];
    }
    let shotListItem = data.shotListItem as ShotListItem;
    this.project.shotList.push(shotListItem);
    this.projectRef.ref.update({
      shotList: this.project.shotList
    });
  }

  onStoryboardUpdated(data: any): void {
    this.project.shotList = data.updatedShotList as ShotListItem[];
    this.projectRef.ref.update({
      shotList: this.project.shotList
    });
  }

  onCastUpdated(data: any): void {
    const newCastMember = data.castMember as CastMember;
    if (!this.project.cast) {
      this.project.cast = [];
    }
    this.project.cast.push(newCastMember);
    this.projectRef.ref.update({
      cast: this.project.cast
    });
  }

  onCrewUpdated(data: any): void {
    const newCrewMember = data.crewMember as CrewMember;
    if (!this.project.crew) {
      this.project.crew = [];
    }
    this.project.crew.push(newCrewMember);
    this.projectRef.ref.update({
      crew: this.project.crew
    });
  }

  onBudgetUpdated(data: any): void {
    if (!this.project.budget) this.project.budget = {} as Budget;

    if (data.incomeItem) {
      const newIncomeItem = data.incomeItem as IncomeItem;
      if (!this.project.budget.income) this.project.budget.income = [] as IncomeItem[];
      this.project.budget.income.push(newIncomeItem);
      this.projectRef.ref.update({
        budget: this.project.budget
      });
    } else if (data.expenseItem) {
      const newExpenseItem = data.expenseItem as ExpenseItem;
      if (!this.project.budget.expenses) this.project.budget.expenses = [] as ExpenseItem[];
      this.project.budget.expenses.push(newExpenseItem);
      this.projectRef.ref.update({
        budget: this.project.budget
      });
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectSubscription = this.projectsService.getProjectById(params['id'])
        .subscribe(p => {
          this.projectRef = p as DocumentSnapshot<any>;
          this.project = this.projectRef.data() as Project;
        });
    });
  }

  ngOnDestroy(): void {
    this.projectSubscription.unsubscribe();
  }

}
