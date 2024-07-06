import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ExpensesDataService } from '@data-services/expenses-data.service';
import { ExpenseFormFactory } from '@factories/expense-form.factory';

@Component({
    selector: 'propertea-expense-create',
    standalone: true,
    templateUrl: 'expense-create.component.html',
    styleUrl: 'expense-create.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        RouterLink,
        ReactiveFormsModule,
    ],
    providers: [
        ExpenseFormFactory,
    ],
})
export default class ExpenseCreateComponent {
    public createExpenseForm = inject(ExpenseFormFactory).createForm();
    public expensesDataService = inject(ExpensesDataService);
    public router = inject(Router);
    public activatedRoute = inject(ActivatedRoute);

    public isLoading = signal<boolean>(false);
    public propertyId = signal<string>('');

    public constructor() {
        // To replace with input when in a modal
        this.propertyId.set(this.activatedRoute.snapshot.params.propertyId);
    }

    public async createExpense(): Promise<void> {
        if (this.createExpenseForm.valid) {
            try {
                this.isLoading.set(true);

                const { data: expense, error } = await this.expensesDataService.createExpense(
                    this.createExpenseForm.controls.name.value,
                    this.createExpenseForm.controls.amount.value,
                    this.propertyId(),
                );

                if (error) {
                    console.error(error);
                }

                if (expense) {
                    void this.router.navigate(['properties', 'detail', this.propertyId()], {fragment: 'expenses'});
                }
            } catch (error) {
                if (error instanceof Error) {
                    console.error(error);
                }

                this.isLoading.set(false);
            } finally {
                this.isLoading.set(false);
            }
        }
    }
}
