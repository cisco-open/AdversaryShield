import { AfterViewInit, Component, DestroyRef, inject, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Parameter } from '../../../../services/client/models/defenses/defense.interface';
import { TableNoRecordsComponent } from '../../../../shared/components/table-no-records/table-no-records.component';
import { ReleasesStateService } from '../../services/releases-state.service';

@Component({
	selector: 'as-releases-defenses-parameters-table',
	imports: [MatTableModule, MatPaginatorModule, TableNoRecordsComponent, MatCheckboxModule],
	templateUrl: './releases-defenses-parameters-table.component.html',
	styleUrl: './releases-defenses-parameters-table.component.scss'
})
export class ReleasesDefensesParametersTableComponent implements AfterViewInit {
	readonly releasesStateService = inject(ReleasesStateService);
	readonly destroyRef = inject(DestroyRef);

	dataSource = new MatTableDataSource<Parameter>();

	readonly paginator = viewChild.required(MatPaginator);
	displayedColumns: string[] = ['id', 'parameterKey', 'paraeterType', 'defaultValue', 'isMandatory', 'isReadOnly'];

	ngOnInit() {
		this.releasesStateService.parameters$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((parameters) => {
			this.dataSource.data = parameters;
		});
	}

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator();
	}
}
