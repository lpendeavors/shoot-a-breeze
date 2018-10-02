import { Component, OnInit, Input, OnChanges, EventEmitter, TemplateRef, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Project } from '../../../core/models/projects/project.model';
import { IncomeItem } from '../../../core/models/budget/income-item.model';
import { ExpenseItem } from '../../../core/models/budget/expense-item.model';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-project-budget',
  templateUrl: './project-budget.component.html',
  styleUrls: ['./project-budget.component.scss']
})
export class ProjectBudgetComponent implements OnInit, OnChanges {

  modalRef: BsModalRef;

  @Input() project: Project;

  @Output() budgetUpdated: EventEmitter<any> = new EventEmitter<any>();

  incomeItems: IncomeItem[] = [];
  expenseItems: ExpenseItem[] = [];

  totalEstimatedIncome: number = 0;
  totalActualIncome: number = 0;
  totalEstimatedExpenses: number = 0;
  totalActualExpenses: number = 0;
  profitDifference: number = 0;

  newIncomeItemForm = this.fb.group({
    name: ['', Validators.compose([Validators.required])],
    estimatedAmount: ['', Validators.compose([Validators.required])],
    actualAmount: ['', Validators.compose([Validators.required])]
  });

  newExpenseItemForm = this.fb.group({
    name: ['', Validators.compose([Validators.required])],
    estimatedCost: ['', Validators.compose([Validators.required])],
    actualCost: ['', Validators.compose([Validators.required])]
  });

  constructor(private modalService: BsModalService, private fb: FormBuilder) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.project.budget) {
      this.incomeItems = this.project.budget.income ? this.project.budget.income : [];
      this.expenseItems = this.project.budget.expenses ? this.project.budget.expenses : [];
      this.calculateTotals();
    }
  }

  showModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  closeModal(): void {
    this.modalRef.hide();
    this.resetNewExpenseItemForm();
    this.resetNewIncomeItemForm();
  }

  saveIncomeItem(): void {
    if (this.newIncomeItemForm.valid) {
      const incomeItem: IncomeItem = {
        name: this.newIncomeItemForm.get('name').value.toString(),
        estimatedAmount: this.newIncomeItemForm.get('estimatedAmount').value,
        actualAmount: this.newIncomeItemForm.get('actualAmount').value
      };
      this.budgetUpdated.emit({incomeItem});
      this.modalRef.hide();
      this.resetNewIncomeItemForm();
    }
  }

  saveExpenseItem(): void {
    if (this.newExpenseItemForm.valid) {
      const expenseItem: ExpenseItem = {
        name: this.newExpenseItemForm.get('name').value.toString(),
        estimatedCost: this.newExpenseItemForm.get('estimatedCost').value,
        actualCost: this.newExpenseItemForm.get('actualCost').value
      };
      this.budgetUpdated.emit({expenseItem});
      this.modalRef.hide();
      this.resetNewExpenseItemForm();
    }
  }

  private calculateTotals(): void {
    this.totalEstimatedIncome  = 0;
    this.totalActualIncome = 0;
    this.incomeItems.forEach(item => {
      this.totalEstimatedIncome += item.estimatedAmount;
      this.totalActualIncome += item.actualAmount;
    });
    this.totalEstimatedExpenses = 0;
    this.totalActualExpenses = 0;
    this.expenseItems.forEach(item => {
      this.totalEstimatedExpenses += item.estimatedCost;
      this.totalActualExpenses += item.actualCost;
    });
    this.profitDifference = (this.totalActualIncome - this.totalEstimatedIncome) - (this.totalActualExpenses - this.totalEstimatedExpenses);
  }

  private resetNewIncomeItemForm(): void {
    this.newIncomeItemForm.patchValue({ name: '' });
    this.newIncomeItemForm.patchValue({ estimatedAmount: '' });
    this.newIncomeItemForm.patchValue({ actualAmount: '' });
  }

  private resetNewExpenseItemForm(): void {
    this.newExpenseItemForm.patchValue({ name: '' });
    this.newExpenseItemForm.patchValue({ estimatedCost: '' });
    this.newExpenseItemForm.patchValue({ actualCost: '' });
  }

}
