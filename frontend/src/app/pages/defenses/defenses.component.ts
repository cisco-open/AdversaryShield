import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DrawerService } from '../../shared/components/drawer';
import { DrawerActionTypeEnum } from '../../shared/components/drawer/models/enums/drawer-action-type.enum';
import { DefensesActionsDrawerComponent } from './components/defenses-actions-drawer/defenses-actions-drawer.component';
import { DefensesTableComponent } from './components/defenses-table/defenses-table.component';

@Component({
	selector: 'as-defenses',
	imports: [MatCardModule, DefensesTableComponent, MatIconModule, MatButtonModule],
	templateUrl: './defenses.component.html',
	styleUrl: './defenses.component.scss'
})
export class DefensesComponent {
	readonly drawerService = inject(DrawerService);
	addDefense() {
		this.drawerService.open(DefensesActionsDrawerComponent, {
			title: 'Add defense',
			saveButtonLabel: 'Add',
			showCloseButton: true,
			closeButtonLabel: 'Close',
			actionType: DrawerActionTypeEnum.ADD
		});
	}
}
