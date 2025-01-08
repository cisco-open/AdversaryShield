import { AfterViewInit, Component, inject, linkedSignal, OnInit, Signal, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { take } from 'rxjs';
import { TargetModel } from '../../../../services/client/models/target-models/target-model.interface';
import { DialogClose, DialogStatus } from '../../../../shared/components/dialog';
import { DialogMessageService } from '../../../../shared/components/dialog/features/dialog-message/services/dialog-message.service';
import { DrawerClose, DrawerService, DrawerStatus } from '../../../../shared/components/drawer';
import { DrawerActionTypeEnum } from '../../../../shared/components/drawer/models/enums/drawer-action-type.enum';
import { TableNoRecordsComponent } from '../../../../shared/components/table-no-records/table-no-records.component';
import { TableSkeletonLoaderComponent } from '../../../../shared/components/table-skeleton-loader/table-skeleton-loader.component';
import { isNil } from '../../../../shared/shared.utils';
import { TargetModelsStore } from '../../../../state/target-models/target-models.store';
import { TargetModelActionsDrawerComponent } from '../target-model-actions-drawer/target-model-actions-drawer.component';

@Component({
	selector: 'as-target-models-table',
	imports: [
		MatTableModule,
		MatIconModule,
		MatPaginatorModule,
		TableNoRecordsComponent,
		MatButtonModule,
		TableSkeletonLoaderComponent,
		MatTooltipModule
	],
	templateUrl: './target-models-table.component.html',
	styleUrl: './target-models-table.component.scss',
	providers: [DialogMessageService]
})
export class TargetModelsTableComponent implements OnInit, AfterViewInit {
	readonly targetModelsStore = inject(TargetModelsStore);
	readonly drawerService = inject(DrawerService);
	readonly dialogMessageService = inject(DialogMessageService);

	targetModels: Signal<TargetModel[]> = this.targetModelsStore.targetModels;

	displayedColumns: string[] = ['id', 'model', 'url', 'method', 'actions'];

	dataSource = linkedSignal<TargetModel[], MatTableDataSource<TargetModel>>({
		source: this.targetModels,
		computation: (newTargetModels, previous) => {
			const dataSource = previous?.value ?? new MatTableDataSource<TargetModel>();
			dataSource.data = newTargetModels.map((model) => ({
				id: model.id,
				model: model.model,
				url: model.url,
				method: model.method
			}));
			return dataSource;
		}
	});

	readonly paginator = viewChild.required(MatPaginator);

	ngOnInit() {
		this.targetModelsStore.loadAll();
	}

	ngAfterViewInit() {
		this.dataSource().paginator = this.paginator();
	}

	editTargetModel(id: number) {
		const origTargetModel = this.targetModels().find((targetModel) => targetModel.id === id);

		const drawerRef = this.drawerService.open(TargetModelActionsDrawerComponent, {
			title: 'Edit target model',
			data: {
				...origTargetModel
			} as TargetModel,
			saveButtonLabel: 'Update',
			showCloseButton: true,
			closeButtonLabel: 'Cancel',
			actionType: DrawerActionTypeEnum.EDIT
		});

		drawerRef
			.afterClosed()
			.pipe(take(1))
			.subscribe((drawerCloseEvent: DrawerClose<TargetModel>) => {
				const { status } = drawerCloseEvent;
				if (status === DrawerStatus.DISMISS || status === DrawerStatus.CLOSE) {
					return;
				}

				const editedTargetModel = drawerCloseEvent.result as TargetModel;
				editedTargetModel.id = origTargetModel!.id;
				this.targetModelsStore.edit(editedTargetModel);
			});
	}

	removeTargetModel(id: number) {
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

				this.targetModelsStore.removeById(id);
			});
	}
}
