import { AfterViewInit, Component, computed, inject, OnInit, Signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { take } from 'rxjs';
import { DialogClose, DialogStatus } from '../../../../shared/components/dialog';
import { DialogMessageService } from '../../../../shared/components/dialog/features/dialog-message/services/dialog-message.service';
import { DrawerClose, DrawerService, DrawerStatus } from '../../../../shared/components/drawer';
import { DrawerActionTypeEnum } from '../../../../shared/components/drawer/models/enums/drawer-action-type.enum';
import { TableNoRecordsComponent } from '../../../../shared/components/table-no-records/table-no-records.component';
import { isNil } from '../../../../shared/shared.utils';
import { DefensesStore } from '../../../../state/defenses/defenses.store';
import { Defense } from '../../../../state/defenses/models/defense.interface';
import { DefensesActionsDrawerComponent } from '../defenses-actions-drawer/defenses-actions-drawer.component';

@Component({
	selector: 'as-defenses-table',
	imports: [
		MatTableModule,
		MatPaginatorModule,
		MatTooltipModule,
		MatIconModule,
		MatButtonModule,
		MatDividerModule,
		TableNoRecordsComponent
	],
	templateUrl: './defenses-table.component.html',
	styleUrl: './defenses-table.component.scss',
	providers: [DialogMessageService]
})
export class DefensesTableComponent implements OnInit, AfterViewInit {
	readonly defensesStore = inject(DefensesStore);
	readonly drawerService = inject(DrawerService);
	readonly dialogMessageService = inject(DialogMessageService);

	defenses: Signal<Defense[]> = this.defensesStore.defenses;

	displayedColumns: string[] = ['id', 'name', 'repoUrl', 'actions'];

	dataSource = computed(() => {
		const defenses = this.defenses();

		return new MatTableDataSource(
			defenses.map((defense) => ({
				id: defense.id,
				name: defense.name,
				repoUrl: defense.repoUrl
			}))
		);
	});

	@ViewChild(MatPaginator) paginator!: MatPaginator;

	ngOnInit() {
		this.defensesStore.loadAll();
	}

	ngAfterViewInit() {
		this.dataSource().paginator = this.paginator;
	}

	viewDefense(id: number) {
		this.drawerService.open(DefensesActionsDrawerComponent, {
			title: 'View defense',
			data: {
				...this.defenses().find((defense) => defense.id === id)
			} as Defense,
			saveButtonLabel: 'View',
			showCloseButton: true,
			showSaveButton: false,
			closeButtonLabel: 'Close',
			actionType: DrawerActionTypeEnum.VIEW
		});
	}

	editDefense(id: number) {
		const origDefense = this.defenses().find((defense) => defense.id === id);

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

		const dialogMessageConfirmation = this.dialogMessageService.openWarningDialog({
			message: 'Are you sure you want to remove it?'
		});

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
