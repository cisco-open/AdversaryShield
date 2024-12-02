import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { take } from 'rxjs';
import { DrawerClose, DrawerService, DrawerStatus } from '../../shared/components/drawer';
import { DrawerActionTypeEnum } from '../../shared/components/drawer/models/enums/drawer-action-type.enum';
import { DefensesStore } from '../../state/defenses/defenses.store';
import { Defense } from '../../state/defenses/models/defense.interface';
import { DefensesActionsDrawerComponent } from './components/defenses-actions-drawer/defenses-actions-drawer.component';
import { DefensesTableComponent } from './components/defenses-table/defenses-table.component';

@Component({
	selector: 'as-defenses',
	imports: [MatCardModule, DefensesTableComponent, MatIconModule, MatButtonModule],
	templateUrl: './defenses.component.html',
	styleUrl: './defenses.component.scss'
})
export class DefensesComponent {
	readonly defensesStore = inject(DefensesStore);
	readonly drawerService = inject(DrawerService);

	addDefense() {
		const drawerRef = this.drawerService.open(DefensesActionsDrawerComponent, {
			title: 'Add defense',
			saveButtonLabel: 'Add',
			showCloseButton: true,
			closeButtonLabel: 'Close',
			actionType: DrawerActionTypeEnum.ADD
		});

		drawerRef
			.afterClosed()
			.pipe(take(1))
			.subscribe((drawerCloseEvent: DrawerClose<Defense>) => {
				const { status } = drawerCloseEvent;
				if (status === DrawerStatus.DISMISS || status === DrawerStatus.CLOSE) {
					return;
				}

				this.defensesStore.add(drawerCloseEvent.result as Defense);
			});
	}
}
