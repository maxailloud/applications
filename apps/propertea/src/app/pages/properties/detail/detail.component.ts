import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ExpensesDataService } from '@data-services/expenses-data.service';
import { SelectExpense, SelectProperty } from '@schema/schema';

@Component({
    selector: 'propertea-property-detail',
    standalone: true,
    templateUrl: 'detail.component.html',
    styleUrl: 'detail.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        RouterLink
    ]
})
export default class DetailComponent implements OnInit {
    private activatedRoute = inject(ActivatedRoute);
    private expensesDataService = inject(ExpensesDataService);

    public isLoading = signal<boolean>(true);
    public property: SelectProperty;
    public expenses = signal<SelectExpense[]>([]);

    public constructor() {
        this.property = this.activatedRoute.snapshot.data.property;
    }

    public async ngOnInit(): Promise<void> {
        await this.refreshExpenses();
    }

    private async refreshExpenses(): Promise<void> {
        try {
            const {data: expenses, error, status} = await this.expensesDataService.readExpenses(this.property.id);

            if (error) {
                console.error(error, status);
            }

            if (expenses) {
                this.expenses.set(expenses);
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

    public async deleteExpense(expenseId: string): Promise<void> {
        try {
            await this.expensesDataService.deleteExpense(expenseId);

            await this.refreshExpenses();
        } catch (error) {
            if (error instanceof Error) {
                console.error(error);
            }
        }
    }
}
