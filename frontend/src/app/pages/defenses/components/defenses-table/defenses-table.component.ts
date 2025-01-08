import { AfterViewInit, Component, inject, linkedSignal, OnInit, Signal, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { take } from 'rxjs';
import { Defense } from '../../../../services/client/models/defenses/defense.interface';
import { DialogClose, DialogStatus } from '../../../../shared/components/dialog';
import { DialogMessageService } from '../../../../shared/components/dialog/features/dialog-message/services/dialog-message.service';
import { DrawerClose, DrawerService, DrawerStatus } from '../../../../shared/components/drawer';
import { DrawerActionTypeEnum } from '../../../../shared/components/drawer/models/enums/drawer-action-type.enum';
import { TableNoRecordsComponent } from '../../../../shared/components/table-no-records/table-no-records.component';
import { TableSkeletonLoaderComponent } from '../../../../shared/components/table-skeleton-loader/table-skeleton-loader.component';
import { isNil } from '../../../../shared/shared.utils';
import { DefensesStore } from '../../../../state/defenses/defenses.store';
import { DefensesActionsDrawerComponent } from '../defenses-actions-drawer/defenses-actions-drawer.component';

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
	templateUrl: './defenses-table.component.html',
	styleUrl: './defenses-table.component.scss',
	providers: [DialogMessageService]
})
export class DefensesTableComponent implements OnInit, AfterViewInit {
	readonly defensesStore = inject(DefensesStore);
	readonly drawerService = inject(DrawerService);
	readonly dialogMessageService = inject(DialogMessageService);

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
	displayedColumns: string[] = ['id', 'name', 'repoUrl', 'actions'];

	ngOnInit() {
		this.defensesStore.loadAll();
	}

	ngAfterViewInit() {
		this.dataSource().paginator = this.paginator();
	}

	viewDefense(id: number) {
		this.drawerService.open(DefensesActionsDrawerComponent, {
			title: 'View defense',
			data: {
				...this.defenses().find((defense) => parseInt(defense.id ?? '', 10) === id)
			} as Defense,
			saveButtonLabel: 'View',
			showCloseButton: true,
			showSaveButton: false,
			closeButtonLabel: 'Close',
			actionType: DrawerActionTypeEnum.VIEW
		});
	}

	editDefense(id: number) {
		const origDefense = this.defenses().find((defense) => parseInt(defense.id ?? '', 10) === id);

		const drawerRef = this.drawerService.open(DefensesActionsDrawerComponent, {
			title: 'Edit defense',
			data: {
				...origDefense
			} as Defense,
			saveButtonLabel: 'Update',
			showCloseButton: true,
			closeButtonLabel: 'Cancel',
			actionType: DrawerActionTypeEnum.EDIT
		});

		drawerRef
			.afterClosed()
			.pipe(take(1))
			.subscribe((drawerCloseEvent: DrawerClose<Defense>) => {
				const { status } = drawerCloseEvent;
				if (status === DrawerStatus.DISMISS || status === DrawerStatus.CLOSE) {
					return;
				}

				const editedDefense = drawerCloseEvent.result as Defense;
				editedDefense.id = origDefense!.id;
				editedDefense.version = origDefense?.version ?? '';

				this.defensesStore.edit(editedDefense);
			});
	}

	removeDefense(id: number) {
		if (isNil(id)) {
			return;
		}

		const dialogMessageConfirmation = this.dialogMessageService.openWarningDialog(
			{
				message: 'Are you sure you want to remove it?'
			},
			{
				closeButtonLabel: 'No',
				width: '800px'
			}
		);

		dialogMessageConfirmation
			.afterClosed()
			.pipe(take(1))
			.subscribe((dialogCloseEvent: DialogClose<unknown>) => {
				if (dialogCloseEvent.status !== DialogStatus.SAVE) {
					return;
				}
				this.defensesStore.removeById(id);
			});
	}
}
