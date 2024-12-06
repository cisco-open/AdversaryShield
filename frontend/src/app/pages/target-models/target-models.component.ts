import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { take } from 'rxjs';
import { TargetModel } from '../../services/client/models/target-models/target-model.interface';
import { DrawerClose, DrawerService, DrawerStatus } from '../../shared/components/drawer';
import { DrawerActionTypeEnum } from '../../shared/components/drawer/models/enums/drawer-action-type.enum';
import { TargetModelsStore } from '../../state/target-models/target-models.store';
import { TargetModelActionsDrawerComponent } from './components/target-model-actions-drawer/target-model-actions-drawer.component';
import { TargetModelsTableComponent } from './components/target-models-table/target-models-table.component';

@Component({
	selector: 'as-target-models',
	imports: [MatCardModule, MatIconModule, MatButtonModule, TargetModelsTableComponent],
	templateUrl: './target-models.component.html',
	styleUrl: './target-models.component.scss'
})
export class TargetModelsComponent {
	readonly drawerService = inject(DrawerService);
	readonly targetModelsStore = inject(TargetModelsStore);

	addTargetModel() {
		const drawerRef = this.drawerService.open(TargetModelActionsDrawerComponent, {
			title: 'Add target model',
			saveButtonLabel: 'Add',
			showCloseButton: true,
			closeButtonLabel: 'Close',
			actionType: DrawerActionTypeEnum.ADD
		});

		drawerRef
			.afterClosed()
			.pipe(take(1))
			.subscribe((drawerCloseEvent: DrawerClose<TargetModel>) => {
				const { status } = drawerCloseEvent;
				if (status === DrawerStatus.DISMISS || status === DrawerStatus.CLOSE) {
					return;
				}

				this.targetModelsStore.add(drawerCloseEvent.result as TargetModel);
			});
	}
}
