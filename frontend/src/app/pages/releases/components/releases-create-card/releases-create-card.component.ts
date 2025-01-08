import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Defense } from '../../../../services/client/models/defenses/defense.interface';
import { isNil } from '../../../../shared/shared.utils';
import { ReleasesStore } from '../../../../state/releases/releases.store';
import { ReleasesStateService } from '../../services/releases-state.service';
import { ReleasesDefensesParametersTableComponent } from '../releases-defenses-parameters-table/releases-defenses-parameters-table.component';
import { ReleasesDefensesTableComponent } from '../releases-defenses-table/releases-defenses-table.component';

@Component({
	selector: 'as-releases-create-card',
	imports: [
		CommonModule,
		ReleasesDefensesTableComponent,
		ReleasesDefensesParametersTableComponent,
		MatButtonModule,
		MatCardModule
	],
	templateUrl: './releases-create-card.component.html',
	styleUrl: './releases-create-card.component.scss'
})
export class ReleasesCreateCardComponent {
	readonly releasesStore = inject(ReleasesStore);
	readonly releasesStateService = inject(ReleasesStateService);

	createRelease(defense: Defense | null): void {
		if (isNil(defense)) {
			return;
		}

		this.releasesStore.createService(defense);
	}
}
