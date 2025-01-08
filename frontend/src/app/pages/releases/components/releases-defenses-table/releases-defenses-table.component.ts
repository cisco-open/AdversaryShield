import { AfterViewInit, Component, inject, linkedSignal, OnInit, Signal, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Defense } from '../../../../services/client/models/defenses/defense.interface';
import { DialogMessageService } from '../../../../shared/components/dialog/features/dialog-message/services/dialog-message.service';
import { DrawerService } from '../../../../shared/components/drawer';
import { TableNoRecordsComponent } from '../../../../shared/components/table-no-records/table-no-records.component';
import { TableSkeletonLoaderComponent } from '../../../../shared/components/table-skeleton-loader/table-skeleton-loader.component';
import { DefensesStore } from '../../../../state/defenses/defenses.store';
import { ReleasesStateService } from '../../services/releases-state.service';

@Component({
	selector: 'as-releases-defenses-table',
	imports: [
		MatTableModule,
		MatPaginatorModule,
		MatTooltipModule,
		MatIconModule,
		MatButtonModule,
		MatDividerModule,
		TableNoRecordsComponent,
		TableSkeletonLoaderComponent
	],
	templateUrl: './releases-defenses-table.component.html',
	styleUrl: './releases-defenses-table.component.scss',
	providers: [DialogMessageService]
})
export class ReleasesDefensesTableComponent implements OnInit, AfterViewInit {
	readonly defensesStore = inject(DefensesStore);
	readonly drawerService = inject(DrawerService);
	readonly dialogMessageService = inject(DialogMessageService);
	readonly releasesStateService = inject(ReleasesStateService);

	isLoading: Signal<boolean> = this.defensesStore.isLoading;
	defenses: Signal<Defense[]> = this.defensesStore.defenses;

	dataSource = linkedSignal<Defense[], MatTableDataSource<Defense>>({
		source: this.defenses,
		computation: (newDefenses, previous) => {
			const dataSource = previous?.value ?? new MatTableDataSource<Defense>();
			const transformedData = newDefenses.map((defense) => ({
				id: defense.id,
				name: defense.name,
				repoUrl: defense.repoUrl
			}));
			dataSource.data = transformedData;
			return dataSource;
		}
	});

	readonly paginator = viewChild.required(MatPaginator);
	displayedColumns: string[] = ['id', 'name', 'repoUrl'];

	selectedDefense: Defense | null = null;

	ngOnInit() {
		this.defensesStore.loadAll();
	}

	ngAfterViewInit() {
		this.dataSource().paginator = this.paginator();
	}

	selectRow(selectedDefense: Defense) {
		if (selectedDefense.id === this.selectedDefense?.id) {
			this.selectedDefense = null;
			this.releasesStateService.selectDefense(null);
			return;
		}

		this.selectedDefense = this.defenses().find((defense) => defense.id === selectedDefense.id) ?? null;
		this.releasesStateService.selectDefense(this.selectedDefense);
	}
}
