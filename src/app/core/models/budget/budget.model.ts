import { IncomeItem } from './income-item.model';
import { ExpenseItem } from './expense-item.model';

export interface Budget {
    income: IncomeItem[],
    expenses: ExpenseItem[]
}